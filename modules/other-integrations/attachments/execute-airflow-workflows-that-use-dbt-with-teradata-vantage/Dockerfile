FROM apache/airflow:2.3.2

USER root

RUN sudo apt update && \
    sudo apt-get install -y git 


USER airflow

RUN pip install sqlalchemy && \
    pip install sqlalchemy-teradata && \
    pip install teradatasql && \
    pip install teradatasqlalchemy && \
    pip install dbt-teradata && \
    pip install boto3 && \
    pip install ijson && \
    pip install --no-cache-dir awscli
