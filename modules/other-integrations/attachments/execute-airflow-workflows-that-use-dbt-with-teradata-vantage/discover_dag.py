# Airflow DAG to load a generic number of parquet, csv and json files into a Teradata 20 database on Amazon Web Services (AWS). 
# The files are assumed to be located on specific S3 buckets (location defined in Airflow variables - csv files go to the csv 
# S3 bucket, json files to the json bucket, parquet into the parquet bucket).
# The script locates the files, determines the structure of the files (columns, delimiters, etc.) and:
# 1. Creates the needed databases (scv database for csv files, json database for json files, multiple parquet databases are created based on the
#    parquet directory names). If databases are already created, it skips this step.
# 2. Creates a teradata foreign table that point to the files
# 3. Creates a NOS table (uses S3 storage) and uses the previously created foreign tables to load them (doing select from 
#    foreign tables / insert into NOS tables).
#
# The Airflow environment must be created by using a docker_compose.yaml and Dockerfile to include all the needed packages and libraries.


from datetime import datetime, timedelta
from airflow.decorators import dag,task
from airflow import AirflowException
from airflow.models import Variable
import teradatasql
import logging
import getpass
import urllib.parse
import sqlalchemy
from sqlalchemy import exc
from sqlalchemy.dialects import registry
from airflow import DAG
from airflow.operators.python import PythonOperator, BranchPythonOperator
from airflow.operators.bash import BashOperator
from airflow.operators.dummy_operator import DummyOperator
import os
import sys
import ijson
import json
import subprocess
import csv
import boto3

# Airflow variables that must be imported before running this DAG.
# A sample variables.json file is provided aas an example
# AWS keys:
aws_access_key_id =Variable.get("aws_access_key_id")
aws_secret_access_key =Variable.get("aws_secret_access_key")
# S3 Locations. Ls locations (to be used for the aws ls command line interface) have a different format than ft locations (where files reside)
s3_location_parq_ls =Variable.get("s3_location_parq_ls")
s3_location_parq_ft =Variable.get("s3_location_parq_ft")
s3_location_csv_ls =Variable.get("s3_location_csv_ls")
s3_location_csv_create =Variable.get("s3_location_csv_create")
s3_location_csv_ft =Variable.get("s3_location_csv_ft")
s3_location_json_ls =Variable.get("s3_location_json_ls")
s3_location_json_ft =Variable.get("s3_location_json_ft")
s3_location_json_create =Variable.get("s3_location_json_create")
# s3 bucket is the top S3 bucket where the data resides (and where the parquet directories start), csv and json are subbuckets where these types of 
# files reside
s3_bucket =Variable.get("s3_bucket")
csv_subbucket =Variable.get("csv_subbucket")
json_subbucket =Variable.get("json_subbucket")
# Temp file where the list of databases to be created reside
filenamedb=Variable.get("filenamedb")
# Location of temporary files where databasename tablename are listed for the program fo create tables
parqfilenamedbtab=Variable.get("parqfilenamedbtab")
csvfilenamedbtab=Variable.get("csvfilenamedbtab")
jsonfilenamedbtab=Variable.get("jsonfilenamedbtab")
alldbtab =Variable.get("alldbtab")
# Csv variables, database name and delimiters supported
csvdb=Variable.get("csvdb")
supported_csvdelimiters=Variable.get("supported_csvdelimiters")
supported_csvlineterminator=Variable.get("supported_csvlineterminator")
# Json db name
jsondb=Variable.get("jsondb")
# Target database variables - the DB user must have database create privileges - the csvdb and jsondb are going to be created under the user's
# datbase. 
DB_username =Variable.get("DB_username")
DB_password =Variable.get("DB_password")
DB_ip_address =Variable.get("DB_ip_address")
# Authorization object name
auth_name =Variable.get("auth_name")
region_name=Variable.get("region_name")
# Temp file used to determine json file format
output_file =Variable.get("output_file")
# Sample size (num of lines) to determine csv format
linenumax=int(Variable.get("linenumax"))
# Permanent size for csv and json databases. Here one size fits all, to change it has to be slightly modified
perm_dbsize=Variable.get("perm_dbsize")
# NOS storage name
nos_storage=Variable.get("nos_storage")
# Flags to let the program know which types of files to load. 'Y' to loas the specific file type.
load_csv=Variable.get("load_csv")
load_json=Variable.get("load_json")
load_parquet=Variable.get("load_parquet")



# Genertes the JSON nos select command for table table_name
def get_json_nos_select_comm(table_name):
    try:

       command_getvalues = 'select '
       json_sample_size = 'top 100'

       logging.info("Generating JSON nos select command")

       command_getfields = 'select * from (SELECT distinct * FROM JSON_KEYS (ON (SELECT ' + json_sample_size + ' payload FROM ' + table_name + ' )) AS j ) as cols;'

       logging.info("Command to get json fields: " +  command_getfields)

       registry.register("teradatasql", "teradatasqlalchemy.dialect", "TeradataDialect")
       enginedbc = sqlalchemy.create_engine('teradatasql://'+DB_ip_address+'/?user='+DB_username+'&password='+DB_password, connect_args={'sslmode': "DISABLE"})
       conn = enginedbc.connect()
       logging.info("Database connection with "+DB_ip_address+" established successfully.")
       sqlrespfields=conn.execute(command_getfields)
       for row in sqlrespfields:
          for key, value in row.items():
             fieldname = '"payload".' + str(value) + ' ' + value.replace('"."','__').replace('"','')
             print(fieldname)
             command_getvalues = command_getvalues + fieldname + ', ' 
       command_getvalues = command_getvalues[:-3]
       command_getvalues = command_getvalues + ' from ' + table_name 
       logging.info('JSON nos select command: \n\n' + command_getvalues + '\n')
       conn.close
       return(command_getvalues)
    except Exception as ex:
       logging.error(str(ex))
       raise AirflowException



# Execute a string of SQL commands separated by semicolons (;)
def execute_sql_commands(commands):
     try:
        logging.info ("SQL commands: " + commands)
        sqlcommands = commands.split(';')
        registry.register("teradatasql", "teradatasqlalchemy.dialect", "TeradataDialect")
        enginedbc = sqlalchemy.create_engine('teradatasql://'+DB_ip_address+'/?user='+DB_username+'&password='+DB_password, connect_args={'sslmode': "DISABLE"})
        conn = enginedbc.connect()
        logging.info ("Database connection with "+DB_ip_address+" established successfully.")


        # files to tbl:
        for sqlcommand in sqlcommands:
           try:
              logging.info ("SQL Command: " + sqlcommand)
              sqlresp=conn.execute(sqlcommand)
              for row in sqlresp:
                     logging.info(row)

           except exc.SQLAlchemyError as e:
               logging.warn(type(e))
               complete_err = str(e.orig.args)
               # ignore table does not exist, object does not exist, database already exists errors, storage does not exist, view does not exist
               if (("[Error 3802]" in complete_err) or ("[Error 3807]" in complete_err) or ("[Error 6938]" in complete_err) or ("[Error 5612]" in complete_err) or ("[Error 4836]" in complete_err) or ("[Error 3706]" in complete_err)):
                  logging.warn("Ignoring error "+complete_err.partition('\\n')[0])
                  continue
               else:
                  logging.error("Terminating execution because of error "+complete_err.partition('\\n')[0])
                  raise AirflowException

        conn.close

     except Exception as ex:
        logging.error(str(ex))
        raise AirflowException



# Returns bash script string containing the script that creates a file containing the database names to be created
def create_db_file_bash(filenamedb):
     empty_bash_str = 'touch ' + filenamedb + ';'
     csv_bash_str = 'echo \'' + csvdb + '\' >> ' + filenamedb + ';'
     json_bash_str = 'echo \'' + jsondb + '\' >> ' + filenamedb + ';'
     parquet_bash_str = 'export AWS_ACCESS_KEY_ID=' + aws_access_key_id + ' ; export AWS_SECRET_ACCESS_KEY=' + aws_secret_access_key + '; aws s3 ls ' + s3_location_parq_ls + ' | awk \'{print $2}\' | sed \'s#/##\' >> ' + filenamedb + ';'
     create_db_file_bash_command = empty_bash_str
     if (load_csv == 'Y'):
        create_db_file_bash_command = create_db_file_bash_command + csv_bash_str
     if (load_json == 'Y'):
        create_db_file_bash_command = create_db_file_bash_command + json_bash_str
     if (load_parquet == 'Y'):
        create_db_file_bash_command = create_db_file_bash_command + parquet_bash_str
     logging.info ("Returning db file creation bash command: " + create_db_file_bash_command)
     return (create_db_file_bash_command)


# SQL and Bash scripts

# Bash command to create placeholder empty files
create_placeholder_files_command = 'touch ' + csvfilenamedbtab + '; touch ' + jsonfilenamedbtab + '; touch ' + parqfilenamedbtab + '; touch ' + alldbtab 

# Bash command to create a file containing the names of parquet files to be loaded 
create_parq_db_tab_file_bash_command = 'export AWS_ACCESS_KEY_ID=' + aws_access_key_id + ' ; export AWS_SECRET_ACCESS_KEY=' + aws_secret_access_key + '; for DB in `aws s3 ls ' + s3_location_parq_ls + '| awk \'{print $2}\' | sed \'s#/##\' `; do aws s3 ls ' + s3_location_parq_ls + '$DB/ | awk \'{print db,$2}\' db="${DB}" | sed \'s#/##\'; done > ' +  parqfilenamedbtab

# Bash command to create a temporary file containing the names of csv files to be loaded 
create_csv_tab_file_bash_command = 'export AWS_ACCESS_KEY_ID=' + aws_access_key_id + ' ; export AWS_SECRET_ACCESS_KEY=' + aws_secret_access_key + '; aws s3 ls ' + s3_location_csv_ls + ' | awk \'{print "+csv+ " $4}\' | sed \'s#/##\' | tail -n +2 > ' + csvfilenamedbtab


# Bash command to create a temporary file containing the names of json files to be loaded 
create_json_tab_file_bash_command = 'export AWS_ACCESS_KEY_ID=' + aws_access_key_id + ' ; export AWS_SECRET_ACCESS_KEY=' + aws_secret_access_key + '; aws s3 ls ' + s3_location_json_ls + ' | awk \'{print "+json+ " $4}\' | sed \'s#/##\' | tail -n +2 > ' + jsonfilenamedbtab

# Bash commands to create a temporary file containing the names of all (json, csv, parquet) files to be loaded
join_csv_tab_files_bash_command = 'cat ' + csvfilenamedbtab + ' >> ' +  alldbtab
join_json_tab_files_bash_command = 'cat ' + jsonfilenamedbtab + ' >> ' +  alldbtab
join_parquet_tab_files_bash_command = 'cat ' + parqfilenamedbtab + ' >> ' +  alldbtab

# Bash command to clean up files containing table and database lists from the previous run if they exist
cleanup_bash_command = 'rm -f ' + filenamedb + ' ' + parqfilenamedbtab + ' ' + csvfilenamedbtab + ' ' + jsonfilenamedbtab + ' ' + alldbtab

# Returns the delimiter of the csv file. Supported csv delimiters are defined by the supported_csvdelimiters variable. 
# S3 bucket and file name are passed as arguments.
def csv_delimiter(bucket, file):
    try:
       s3 = boto3.resource( 's3', region_name=region_name, aws_access_key_id=aws_access_key_id, aws_secret_access_key=aws_secret_access_key) 
       # bucket = topmost bucket, like tc-001-teracloud-nos-us-west-2-3745abcd, file = filename incl. lower buckets, ex csvdata/inventory.csv
       # where complete path is tc-001-teracloud-nos-us-west-2-3745abcd/csvdata/inventory.csv
       obj = s3.Object(bucket,file)
       line = obj.get()['Body']._raw_stream.readline().decode('UTF-8')
       dialect = csv.Sniffer().sniff(line, delimiters=supported_csvdelimiters)
       delimiter = dialect.__dict__['delimiter']
       return(delimiter)
    except Exception as ex:
       logging.error(str(ex))
       raise AirflowException





# Returns the JSON fields (columns) in the file delimited by the '|' character. In case the Json file is nested the columns are flattened. 
# A sample of the JSON file (numner of lines defined by the linenumax variable) is copied from S3 to the filesystem and examined.
# then ijson is used to examine it. Linenumax is by default set to 100, but for complex files can be increased.
def json_fields(bucket, file):
    try:

       s3 = boto3.resource( 's3', region_name=region_name, aws_access_key_id=aws_access_key_id, aws_secret_access_key=aws_secret_access_key)
       # bucket = topmost bucket, like tc-perf-001-teracloud-nos-us-west-2-3745a70d0aef, file = filename incl. lower buckets, ex csvdata/inventory.csv
       # where complete path is tc-perf-001-teracloud-nos-us-west-2-3745a70d0aef/csvdata/inventory.csv
       logging.info('Json-fields, Bucket: ' + bucket + ', File: ' + file)
       obj = s3.Object(bucket,file)

       if os.path.exists(output_file):
           os.remove(output_file)

       f = open(output_file,'w+')

       linenum=1
       while linenum <= linenumax:
           # line = print_line(s3_bucket,json_subbucket + '/' + 'pd_review.json')
           line = obj.get()['Body']._raw_stream.readline().decode('UTF-8')
           f.write(line)
           linenum = linenum + 1

       f.seek(0)

       logging.info('Json-fields, Out Temp File: ' + output_file)
       objects = ijson.items(f, "", multiple_values=True)
       logging.info('Json-fields, Json objects: ' + str(objects))

       key_string=""

       for obj in objects:
           first = True
           for i in obj.keys():
               if first:
                   key_string=key_string+i
                   first = False
               else:
                   key_string=key_string+'|'+i
           break

       f.close
       logging.info('Json-fields, Field string: ' + key_string)
       
       return(key_string)


    except Exception as ex:
       logging.error(str(ex))
       raise AirflowException





default_args = {
    'owner': 'airflow',
    'depends_on_past': False,
    'start_date': datetime(2020,8,1),
    'retries': 0
}


@dag(dag_id="discover_dag", schedule_interval=None, start_date=datetime(2022, 4, 2))
def taskflow():


    # Create a temporary file containing the names of all databases. 
    # CSV database name comes from the variable csvdb, JSON database from variable jsondb, Parquet database(s) from the parquet sub-bucket name(s)
    # The file is created in the directory name defined by the variable filenamedb. By default this is /tmp/db.txt on the host system or 
    # /opt/airflow/tmp/db.txt on the container, but is configurable by changing the variable value and the /tmp mount in the docker_compose.yaml file
    @task
    def make_file_db():
        logging.info ("Cleaning up old files : " + cleanup_bash_command)
        subprocess.run(cleanup_bash_command, shell=True, check=True, executable='/bin/bash')
        logging.info ("Executing bash: " + create_db_file_bash(filenamedb)) 
        createdb_file_bash_command = create_db_file_bash(filenamedb)
        subprocess.run(createdb_file_bash_command, shell=True, check=True, executable='/bin/bash')
        return (filenamedb)

    # Create databases based on the database names found in the file created in the make_file_db task
    # Notice the password is the same as the database name, manually change the password as needed
    @task
    def create_db(filenamedb):
        try:
           logging.info ("Opening file " + filenamedb)
           with open(filenamedb) as file:
              lines = file.readlines()
              lines = [line.rstrip() for line in lines]
              logging.info ("File "+filenamedb+" found, opened, read successfully.")

           # for each line in the db file (i.e. for each database), create user/database and auth object to access S3
           # databases are created all of the same size because the data will not be loaded into the databasebut in the NOS storage
           for line in lines:
              sqlcommandstr = "create user " + line + " as perm=" + perm_dbsize + ",password=" + line + "; grant all on " + line + " to " + line + " with grant option; grant create database on " + line + " to  " + line + "; grant EXECUTE FUNCTION  on TD_SYSFNLIB to  " + line + "; database " + line + "; drop AUTHORIZATION " + line + "." + auth_name + "; CREATE AUTHORIZATION " + line + "." +  auth_name + " AS DEFINER TRUSTED USER '" + aws_access_key_id + "' PASSWORD '" + aws_secret_access_key + "';"
              execute_sql_commands(sqlcommandstr)
           file.close()
           os.remove(filenamedb)
           return(parqfilenamedbtab)

        except Exception as ex:
           logging.error(str(ex))
           raise AirflowException




    # Create temporary files containing all the table names. Bash commands use aws command line create a list of files/tables
    # The argument parquetfilenamedb is a placeholder to support the airflow task flow.
    @task
    def make_file_dbtab(parqfilenamedbtab):
        logging.info ("Create empty files bash: " + create_placeholder_files_command)
        subprocess.run(create_placeholder_files_command, shell=True, check=True, executable='/bin/bash')
        if (load_csv == 'Y'):
           logging.info ("Executing csv bash: " + create_csv_tab_file_bash_command)
           subprocess.run(create_csv_tab_file_bash_command, shell=True, check=True, executable='/bin/bash')
           logging.info ("Executing csv join bash: " + join_csv_tab_files_bash_command)
           subprocess.run(join_csv_tab_files_bash_command, shell=True, check=True, executable='/bin/bash')
        if (load_json == 'Y'):
           logging.info ("Executing json bash: " + create_json_tab_file_bash_command)
           subprocess.run(create_json_tab_file_bash_command, shell=True, check=True, executable='/bin/bash')
           logging.info ("Executing json join bash: " + join_json_tab_files_bash_command)
           subprocess.run(join_json_tab_files_bash_command, shell=True, check=True, executable='/bin/bash')
        if (load_parquet == 'Y'):
           logging.info ("Executing parq bash: " + create_parq_db_tab_file_bash_command)
           subprocess.run(create_parq_db_tab_file_bash_command, shell=True, check=True, executable='/bin/bash')
           logging.info ("Executing parquet join bash: " + join_parquet_tab_files_bash_command)
           subprocess.run(join_parquet_tab_files_bash_command, shell=True, check=True, executable='/bin/bash')
        # logging.info ("Executing join_file bash: " + join_tab_files_bash_command)
        # subprocess.run(join_tab_files_bash_command, shell=True, check=True, executable='/bin/bash')
        return(alldbtab)

    # Open filename created by the make_file_dbtab task containing the table names and return the content
    @task
    def make_tab_list(filename):
        # Open and read the file as a single buffer, then split sql commnds based on the ";" character, i.e. commands must be separated by ";"
        logging.info ("Opening file " + filename)
        try:
           with open(filename) as file:
              lines = file.readlines()
              lines = [line.rstrip() for line in lines]
           file.close()
           # os.remove(filename)
           logging.info ("File "+filename+" found, opened, read successfully.")
           return (lines)
        except Exception as ex:
           logging.error ("File error ", str (ex).split ("\n") [0])
           raise AirflowException


    # Based on the list of tables passed by the previous task and create the tables.
    # The tables can be csv (prefixed by +csv+), json (prefixed by +json+) or parquet (no +parquet+ prefix, but simply database and table name) .
    # Each file type has a different creation process and SQL code.
    @task
    def create_tables(arg):
        logging.info ("Creating table for record :"+arg)
        argstring = arg.split(' ')
        i = 1
        db=""
        tbl=""
        tbltype=""
        csvfilename = ""
        jsonfilename = ""
        for argstr in argstring:
           argstr = argstr.strip()
           logging.info ('Arg passed ' + str(i) + ': ' + argstr + ';')
           if (i == 1) :
               if (argstr == '+csv+'):
                  tbltype = 'csv'
                  db = csvdb
               elif (argstr == '+json+'):
                  tbltype = 'json'
                  db = jsondb
               else :
                  tbltype = 'parquet'
                  db = argstr
               i = i + 1
           elif (i == 2):
               if (tbltype == 'csv'):
                  csvfilename = argstr
                  tbl = argstr.split('.',1)[0]
                  db = csvdb
                  bucketfile = csv_subbucket + '/' + csvfilename
                  csvdelimiter = csv_delimiter(s3_bucket, csv_subbucket + '/' + csvfilename ) 
                  logging.info ('CSV File path :' + bucketfile)
                  logging.info ('CSV Delimiter :' + csvdelimiter)
               elif (tbltype == 'json'):
                  jsonfilename = argstr
                  tbl = argstr.split('.',1)[0]
                  db = jsondb
                  bucketfile = json_subbucket + '/' + jsonfilename
                  jsonfieldstr = json_fields(s3_bucket, json_subbucket + '/' + jsonfilename ) 
                  logging.info ('JSON File path :' + bucketfile)
                  logging.info ('JSON Fields String :' + jsonfieldstr)
               else :
                  tbl = argstr


        logging.info ("Table type :" + tbltype + " Table name: " + tbl + " Database: " + db)


 



        if (tbltype == 'parquet'):

           sqlstr_parq_ft = "drop FOREIGN TABLE " + db + "." + tbl + "_parq_ft; CREATE FOREIGN TABLE " + db + "." + tbl + "_parq_ft ,EXTERNAL SECURITY DEFINER TRUSTED " + auth_name + " USING ( LOCATION  ('" + s3_location_parq_ft + db + "/" + tbl + "/') STOREDAS  ('PARQUET') ) NO PRIMARY INDEX PARTITION BY COLUMN; select cast(count(*) as bigint) from " + db + "." + tbl + "_parq_ft;"

           logging.info ("Parquet foreign table string:" + sqlstr_parq_ft)


           sqlstr_parq_nosfs = "drop  TABLE " + db + "." + tbl + "_parq_nos; CREATE MULTISET TABLE " + db + "." + tbl + "_parq_nos, STORAGE = " + nos_storage + " as ( select * from antiselect ( on " + db + "." + tbl + "_parq_ft using exclude ('location')) as tbl) with data no primary index; select cast(count(*) as bigint) from " + db + "." + tbl + "_parq_nos; select cast(count(*) as bigint) from " + db + "." + tbl + "_parq_ft;"

           logging.info ("Parquet nosfs table string:" + sqlstr_parq_nosfs)

           
           parq_sqlstr_all = sqlstr_parq_ft + sqlstr_parq_nosfs

           execute_sql_commands(parq_sqlstr_all)


        elif (tbltype == 'csv'):
           sqlstr_csv_ft = 'drop FOREIGN TABLE ' + csvdb + '.' + tbl + '_csv_ft; CREATE FOREIGN TABLE ' + csvdb + '.' + tbl + '_csv_ft ,EXTERNAL SECURITY DEFINER TRUSTED ' + auth_name + ' USING ( LOCATION  (\'' + s3_location_csv_create + '/' + csvfilename +'\') ROWFORMAT  ('+'\'{"field_delimiter":"' + csvdelimiter + '","record_delimiter":"\\n","character_set":"LATIN"}\')  HEADER  (\'TRUE\')); select cast(count(*)  as bigint) from ' + csvdb + '.' + tbl + '_csv_ft;'

           sqlstr_csv_nosfs = "drop  TABLE " + csvdb + "." + tbl + "_csv_nos; CREATE MULTISET TABLE " + csvdb + "." + tbl + "_csv_nos, STORAGE = " + nos_storage + " as ( select * from antiselect ( on " + csvdb + "." + tbl + "_csv_ft using exclude ('location')) as tbl) with data no primary index; select cast(count(*) as bigint) from " + csvdb + "." + tbl + "_csv_nos; select cast(count(*) as bigint) from " + csvdb + "." + tbl + "_csv_ft;"

           logging.info ("Csv nosfs table string:" + sqlstr_csv_nosfs)

           csv_sqlstr_all = sqlstr_csv_ft + sqlstr_csv_nosfs

           # sqlcommands = csv_sqlstr_all.split(';')
           execute_sql_commands(csv_sqlstr_all)

        elif (tbltype == 'json'):

           sqlstr_json_ft = 'drop FOREIGN TABLE ' + jsondb + '.' + tbl + '_json_ft; CREATE FOREIGN TABLE ' + jsondb + '.' + tbl + '_json_ft ,EXTERNAL SECURITY DEFINER TRUSTED ' + auth_name + ' USING ( LOCATION  (\'' + s3_location_json_create + '/' + jsonfilename +'\')); select cast(count(*)  as bigint) from ' + jsondb + '.' + tbl + '_json_ft;'


           execute_sql_commands(sqlstr_json_ft)

           sqlstr_json_select = get_json_nos_select_comm(jsondb + '.' + tbl + '_json_ft')


           sqlstr_json_nosfs = "drop  TABLE " + jsondb + "." + tbl + "_json_nos; CREATE MULTISET TABLE " + jsondb + "." + tbl + "_json_nos, STORAGE = " + nos_storage + " as ( " + sqlstr_json_select  + " ) with data no primary index; select cast(count(*) as bigint) from " + jsondb + "." + tbl + "_json_nos; select cast(count(*) as bigint) from " + jsondb + "." + tbl + "_json_ft;"

           execute_sql_commands(sqlstr_json_nosfs)












    create_tables.expand(arg=make_tab_list(make_file_dbtab(create_db(make_file_db()))))


dag = taskflow()


