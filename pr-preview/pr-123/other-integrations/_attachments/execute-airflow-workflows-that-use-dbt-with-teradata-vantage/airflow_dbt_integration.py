from airflow import DAG
from airflow.operators.python import PythonOperator, BranchPythonOperator
from airflow.operators.bash import BashOperator
from airflow.operators.dummy_operator import DummyOperator
from datetime import datetime


default_args = {
    'owner': 'airflow',
    'depends_on_past': False,
    'start_date': datetime(2020,8,1),
    'retries': 0
}

with DAG('airflow_dbt_integration', default_args=default_args, schedule_interval='@once') as dag:
    task_1 = BashOperator(
        task_id='dbt_debug',
        bash_command='cd /opt/airflow && rm -f logs/dbt.log && dbt debug',
        dag=dag
    )

    task_2 = BashOperator(
        task_id='dbt_seed',
        bash_command='cd /opt/airflow && dbt seed',
        dag=dag
    )

    task_3 = BashOperator(
        task_id='dbt_run',
        bash_command='cd /opt/airflow && dbt run',
        dag=dag
    )

    task_4 = BashOperator(
        task_id='dbt_test',
        bash_command='cd /opt/airflow && dbt test',
        dag=dag
    )

    task_5 = BashOperator(
        task_id='dbt_docs_generate',
        bash_command='cd /opt/airflow && dbt docs generate',
        dag=dag
    )


    task_1 >> task_2 >> task_3 >> task_4 >> task_5 # Define dependencies
