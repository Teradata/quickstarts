from datetime import datetime, timedelta
from airflow import DAG
from airflow.models import Variable
from airflow.operators.python_operator import PythonOperator, BranchPythonOperator
from airflow.operators.bash_operator  import BashOperator
import pendulum
import teradatasql
import logging
import getpass
import urllib.parse
import sqlalchemy
from sqlalchemy import exc
from sqlalchemy.dialects import registry


db_user = 'airflowtest'
db_password = 'abcd'
db_IP_address = '44.236.48.243'
SQL_string_cleanup = 'drop table employee;drop table organization'

SQL_string_create_employee = 'create table employee (employee_id integer, name varchar(40), emp_position varchar(40), salary integer, organization_id integer);insert into employee (1,\'John Smith\',\'Engineer\',80000,1);insert into employee (2,\'Jennifer Jones\',\'Account Manager\',100000,2);insert into employee (3,\'William Bowman\',\'Product Manager\',90000,3);insert into employee (1,\'Meghan Stein\',\'Project Manager\',75000,1);'

SQL_string_create_organization = 'create table organization (organization_id integer, organization_name varchar(40), organization_status varchar(10)); insert into organization (1,\'Engineering\',\'Active\');insert into organization (2,\'Sales\',\'Active\');insert into organization (3,\'Marketing\',\'Active\');insert into organization (4,\'Engineering-Old\',\'Inactive\')'

SQL_string_select = 'select avg(employee.salary),organization.organization_name from employee,organization where employee.organization_id=organization.organization_id and organization.organization_status=\'Active\' group by organization.organization_name'



#Execute an SQL statements in a string format; The string can contain one or more SQL commands separated by ";"

def executeSQLString(db_user, db_password, db_IP_address, SQL_string):



    # all SQL commands (split by ';')
    sqlCommands = SQL_string.split(';')

    # create database connection
    try:
       registry.register("teradatasql", "teradatasqlalchemy.dialect", "TeradataDialect")
       enginedbc = sqlalchemy.create_engine('teradatasql://'+db_IP_address+'/?user='+db_user+'&password='+db_password, connect_args={'sslmode': "DISABLE"})
       conn = enginedbc.connect()
       logging.info ("Database connection with "+db_IP_address+" established successfully.")
    except Exception as ex:
       logging.error(str(ex))



    # Execute every command from the input file
    for command in sqlCommands:
        # This will skip and report errors
        # For example, if the tables do not yet exist, this will skip over
        # the DROP TABLE commands
        # Check if sql command empty
        if not command.strip():
           continue
        sqlresp=''
        try:
           logging.info("Executing command : "+command.strip('\n'))
           sqlresp=conn.execute(command)
           for row in sqlresp:
              logging.info(row)
              # for key, value in row.items():
               #   logging.info(str(key) + ' : ' + str(value))

        except exc.SQLAlchemyError as e:
            logging.warn(type(e))
            complete_err = str(e.orig.args)
            # ignore table does not exist, object does not exist, database already exists errors, storage does not exist, view does not exist;
            # add any errors that you want to be ignored
            if (("[Error 3802]" in complete_err) or ("[Error 3807]" in complete_err) or ("[Error 6938]" in complete_err) or ("[Error 5612]" in complete_err) or ("[Error 4836]" in complete_err) or ("[Error 3706]" in complete_err)):
               logging.warn("Ignoring error "+complete_err.partition('\\n')[0])
            else:
               logging.error("Terminating execution because of error "+complete_err.partition('\\n')[0])
               raise

    conn.close


def _cleanup():
    try:
       logging.info ("Calling execute SQL string.")
       executeSQLString(db_user, db_password, db_IP_address, SQL_string_cleanup)
       logging.info ("Completed execute SQL files.")
    except Exception as ex:
       logging.error(str(ex))

def _create_employee():
    try:
       logging.info ("Calling execute SQL string.")
       executeSQLString(db_user, db_password, db_IP_address, SQL_string_create_employee)
       logging.info ("Completed execute SQL files.")
    except Exception as ex:
       logging.error(str(ex))

def _create_organization():
    try:
       logging.info ("Calling execute SQL string.")
       executeSQLString(db_user, db_password, db_IP_address, SQL_string_create_organization)
       logging.info ("Completed execute SQL files.")
    except Exception as ex:
       logging.error(str(ex))

def _run_query():
    try:
       logging.info ("Calling execute SQL string.")
       executeSQLString(db_user, db_password, db_IP_address, SQL_string_select)
       logging.info ("Completed execute SQL files.")
    except Exception as ex:
       logging.error(str(ex))



with DAG("db_test_example", start_date=pendulum.datetime(2021, 1, 1, tz="UTC"),
    schedule_interval=None, catchup=False) as dag:


        cleanup = PythonOperator(
            task_id="cleanup",
            python_callable=_cleanup,
            depends_on_past=False
        )

        create_employee = PythonOperator(
            task_id="create_employee",
            python_callable=_create_employee,
            depends_on_past=False
        )

        create_organization = PythonOperator(
            task_id="create_organization",
            python_callable=_create_organization,
            depends_on_past=False
        )

        run_query = PythonOperator(
            task_id="run_query",
            python_callable=_run_query,
            depends_on_past=False
        )








cleanup >> [create_employee, create_organization] >> run_query



