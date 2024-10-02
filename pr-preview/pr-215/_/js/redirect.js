window.addEventListener('load', function() {
    var currentUrl = window.location.href;
    console.log(currentUrl);
    if (currentUrl === 'https://quickstarts.teradata.com/pr-preview/pr-215/') {
        window.location.href = 'https://teradata.github.io/ai-unlimited-docs/pr-preview/pr-20/quickstarts/';
    } else {
        var folder = window.location.pathname.split("/");

        if (folder[folder.length-2] === 'ai-unlimited') {
            var metaTag = document.createElement('meta');
            metaTag.setAttribute('http-equiv', 'refresh');
            metaTag.setAttribute('content', '5;url=https://teradata.github.io/ai-unlimited-docs/docs/install-ai-unlimited/');
            document.head.appendChild(metaTag);
            
            window.location.href = 'https://teradata.github.io/ai-unlimited-docs/docs/install-ai-unlimited/';
        }
        
        const jsonLinks = `{
                "teradata-vantage-engine-architecture-and-concepts.html": "https://teradata.github.io/ai-unlimited-docs/pr-preview/pr-20/quickstarts/introduction/teradata-vantage-engine-architecture-and-concepts/",
                "getting.started.vmware.html": "https://teradata.github.io/ai-unlimited-docs/pr-preview/pr-20/quickstarts/get-access-to-vantage/on-your-local/getting-started-vmware/",
                "getting.started.vbox.html": "https://teradata.github.io/ai-unlimited-docs/pr-preview/pr-20/quickstarts/get-access-to-vantage/on-your-local/getting-started-vbox/",
                "getting.started.utm.html": "https://teradata.github.io/ai-unlimited-docs/pr-preview/pr-20/quickstarts/get-access-to-vantage/on-your-local/run-vantage-express-on-utm/",
                "run-vantage-express-on-aws.html": "https://teradata.github.io/ai-unlimited-docs/pr-preview/pr-20/quickstarts/get-access-to-vantage/on-your-cloud-infrastructure/run-vantage-express-on-aws/",
                "vantage.express.gcp.html": "https://teradata.github.io/ai-unlimited-docs/pr-preview/pr-20/quickstarts/get-access-to-vantage/on-your-cloud-infrastructure/vantage-express-gcp/",
                "run-vantage-express-on-microsoft-azure.html": "https://teradata.github.io/ai-unlimited-docs/pr-preview/pr-20/quickstarts/get-access-to-vantage/on-your-cloud-infrastructure/run-vantage-express-on-microsoft-azure/",
                "getting-started-with-csae.html": "https://teradata.github.io/ai-unlimited-docs/pr-preview/pr-20/quickstarts/get-access-to-vantage/clearscape-analytics-experience/getting-started-with-csae/",
                "install-teradata-studio-on-mac-m1-m2.html": "https://teradata.github.io/ai-unlimited-docs/pr-preview/pr-20/quickstarts/connect-to-vantage/install-teradata-studio-on-mac-m1-m2/",
                "other-integrations/configure-a-teradata-vantage-connection-in-dbeaver.html": "https://teradata.github.io/ai-unlimited-docs/pr-preview/pr-20/quickstarts/connect-to-vantage/configure-a-teradata-vantage-connection-in-dbeaver/",
                "odbc.ubuntu.html": "https://teradata.github.io/ai-unlimited-docs/pr-preview/pr-20/quickstarts/connect-to-vantage/configure-odbc/ubuntu/",
                "nos.html": "https://teradata.github.io/ai-unlimited-docs/pr-preview/pr-20/quickstarts/manage-data/nos/",
                "select-the-right-data-ingestion-tools-for-teradata-vantage.html": "https://teradata.github.io/ai-unlimited-docs/pr-preview/pr-20/quickstarts/manage-data/select-the-right-data-ingestion-tools-for-teradata-vantage/",
                "airflow.html": "https://teradata.github.io/ai-unlimited-docs/pr-preview/pr-20/quickstarts/manage-data/airflow/",
                "dbt.html": "https://teradata.github.io/ai-unlimited-docs/pr-preview/pr-20/quickstarts/manage-data/dbt/",
                "advanced-dbt.html": "https://teradata.github.io/ai-unlimited-docs/pr-preview/pr-20/quickstarts/manage-data/advanced-dbt/",
                "modelops/using-feast-feature-store-with-teradata-vantage.html": "https://teradata.github.io/ai-unlimited-docs/pr-preview/pr-20/quickstarts/manage-data/using-feast-feature-store-with-teradata-vantage/",
                "other-integrations/getting.started.dbt-feast-teradata-pipeline.html": "https://teradata.github.io/ai-unlimited-docs/pr-preview/pr-20/quickstarts/manage-data/getting-started-dbt-feast-teradata-pipeline/",
                "elt/use-airbyte-to-load-data-from-external-sources-to-teradata-vantage.html": "https://teradata.github.io/ai-unlimited-docs/pr-preview/pr-20/quickstarts/manage-data/use-airbyte-to-load-data-from-external-sources-to-teradata-vantage/",
                "elt/terraform-airbyte-provider.html": "https://teradata.github.io/ai-unlimited-docs/pr-preview/pr-20/quickstarts/manage-data/terraform-airbyte-provider/",
                "elt/transforming-external-data-loaded-via-airbyte-in-teradata-vantage-using-dbt.html": "https://teradata.github.io/ai-unlimited-docs/pr-preview/pr-20/quickstarts/manage-data/transforming-external-data-loaded-via-airbyte-in-teradata-vantage-using-dbt/",
                "tools-and-utilities/run-bulkloads-efficiently-with-teradata-parallel-transporter.html": "https://teradata.github.io/ai-unlimited-docs/pr-preview/pr-20/quickstarts/manage-data/run-bulkloads-efficiently-with-teradata-parallel-transporter/",
                "create-parquet-files-in-object-storage.html": "https://teradata.github.io/ai-unlimited-docs/pr-preview/pr-20/quickstarts/manage-data/create-parquet-files-in-object-storage/",
                "other-integrations/execute-airflow-workflows-that-use-dbt-with-teradata-vantage.html": "https://teradata.github.io/ai-unlimited-docs/pr-preview/pr-20/quickstarts/manage-data/execute-airflow-workflows-that-use-dbt-with-teradata-vantage/",
                "cloud-guides/integrate-teradata-vantage-to-salesforce-using-amazon-appflow.html": "https://teradata.github.io/ai-unlimited-docs/pr-preview/pr-20/quickstarts/manage-data/integrate-teradata-vantage-to-salesforce-using-amazon-appflow/",
                "segment.html": "https://teradata.github.io/ai-unlimited-docs/pr-preview/pr-20/quickstarts/manage-data/segment/",
                "cloud-guides/connect-azure-data-share-to-teradata-vantage.html": "https://teradata.github.io/ai-unlimited-docs/pr-preview/pr-20/quickstarts/manage-data/connect-azure-data-share-to-teradata-vantage/",
                "cloud-guides/integrate-teradata-vantage-with-google-cloud-data-catalog.html": "https://teradata.github.io/ai-unlimited-docs/pr-preview/pr-20/quickstarts/manage-data/integrate-teradata-vantage-with-google-cloud-data-catalog/",
                "other-integrations/configure-a-teradata-vantage-connection-in-datahub.html": "https://teradata.github.io/ai-unlimited-docs/pr-preview/pr-20/quickstarts/manage-data/configure-a-teradata-vantage-connection-in-datahub/",
                "jdbc.html": "https://teradata.github.io/ai-unlimited-docs/pr-preview/pr-20/quickstarts/create-applications/jdbc/",
                "teradatasql.html": "https://teradata.github.io/ai-unlimited-docs/pr-preview/pr-20/quickstarts/create-applications/teradatasql/",
                "mule.jdbc.example.html": "https://teradata.github.io/ai-unlimited-docs/pr-preview/pr-20/quickstarts/create-applications/mule-dbc-example/",
                "query-service/send-queries-using-rest-api.html": "https://teradata.github.io/ai-unlimited-docs/pr-preview/pr-20/quickstarts/create-applications/send-queries-using-rest-api/",
                "jupyter.html": "https://teradata.github.io/ai-unlimited-docs/pr-preview/pr-20/quickstarts/analyze-data/jupyter/",
                "local.jupyter.hub.html": "https://teradata.github.io/ai-unlimited-docs/pr-preview/pr-20/quickstarts/analyze-data/local-jupyter-hub/",
                "ml.html": "https://teradata.github.io/ai-unlimited-docs/pr-preview/pr-20/quickstarts/analyze-data/ml/",
                "sto.html": "https://teradata.github.io/ai-unlimited-docs/pr-preview/pr-20/quickstarts/analyze-data/sto/",
                "perform-time-series-analysis-using-teradata-vantage.html": "https://teradata.github.io/ai-unlimited-docs/pr-preview/pr-20/quickstarts/analyze-data/perform-time-series-analysis-using-teradata-vantage/",
                "modelops/deploy-and-monitor-machine-learning-models-with-teradata-modelops-and-byom.html": "https://teradata.github.io/ai-unlimited-docs/pr-preview/pr-20/quickstarts/analyze-data/deploy-and-monitor-machine-learning-models-with-teradata-modelops-and-byom/",
                "modelops/deploy-and-monitor-machine-learning-models-with-teradata-modelops-and-git.html": "https://teradata.github.io/ai-unlimited-docs/pr-preview/pr-20/quickstarts/analyze-data/deploy-and-monitor-machine-learning-models-with-teradata-modelops-and-git/",
                "modelops/execute-airflow-workflows-with-clearscape-analytics-modelops-model-factory-solution.html": "https://teradata.github.io/ai-unlimited-docs/pr-preview/pr-20/quickstarts/analyze-data/execute-airflow-workflows-with-clearscape-analytics-modelops-model-factory-solution/",
                "cloud-guides/sagemaker-with-teradata-vantage.html": "https://teradata.github.io/ai-unlimited-docs/pr-preview/pr-20/quickstarts/analyze-data/sagemaker-with-teradata-vantage/",
                "cloud-guides/use-teradata-vantage-with-azure-machine-learning-studio.html": "https://teradata.github.io/ai-unlimited-docs/pr-preview/pr-20/quickstarts/analyze-data/use-teradata-vantage-with-azure-machine-learning-studio/",
                "cloud-guides/integrate-teradata-jupyter-extensions-with-google-vertex-ai.html": "https://teradata.github.io/ai-unlimited-docs/pr-preview/pr-20/quickstarts/analyze-data/integrate-teradata-jupyter-extensions-with-google-vertex-ai/",
                "cloud-guides/integrate-teradata-jupyter-extensions-with-sagemaker.html": "https://teradata.github.io/ai-unlimited-docs/pr-preview/pr-20/quickstarts/analyze-data/integrate-teradata-jupyter-extensions-with-sagemaker/",
                "business-intelligence/create-stunning-visualizations-in-power-bi-using-data-from-teradata-vantage.html": "https://teradata.github.io/ai-unlimited-docs/pr-preview/pr-20/quickstarts/analyze-data/create-stunning-visualizations-in-power-bi-using-data-from-teradata-vantage/",
                "other-integrations/integrate-teradata-vantage-with-knime.html": "https://teradata.github.io/ai-unlimited-docs/pr-preview/pr-20/quickstarts/analyze-data/integrate-teradata-vantage-with-knime/",
                "getting-started-with-vantagecloud-lake.html": "https://teradata.github.io/ai-unlimited-docs/pr-preview/pr-20/quickstarts/vantagecloud-lake/getting-started-with-vantagecloud-lake/",
                "vantagecloud-lake/vantagecloud-lake-demo-jupyter-docker.html": "https://teradata.github.io/ai-unlimited-docs/pr-preview/pr-20/quickstarts/vantagecloud-lake/vantagecloud-lake-demo-jupyter-docker/",
                "vantagecloud-lake/vantagecloud-lake-demos-visual-studio-code.html": "https://teradata.github.io/ai-unlimited-docs/pr-preview/pr-20/quickstarts/vantagecloud-lake/vantagecloud-lake-demos-visual-studio-code/",
                "vantagecloud-lake/vantagecloud-lake-demo-jupyter-sagemaker.html": "https://teradata.github.io/ai-unlimited-docs/pr-preview/pr-20/quickstarts/vantagecloud-lake/vantagecloud-lake-demo-jupyter-sagemaker/",
                "vantagecloud-lake/vantagecloud-lake-demo-jupyter-google-cloud-vertex-ai.html": "https://teradata.github.io/ai-unlimited-docs/pr-preview/pr-20/quickstarts/vantagecloud-lake/vantagecloud-lake-demo-jupyter-google-cloud-vertex-ai/",
                "vantagecloud-lake/vantagecloud-lake-demo-jupyter-azure.html": "https://teradata.github.io/ai-unlimited-docs/pr-preview/pr-20/quickstarts/vantagecloud-lake/vantagecloud-lake-demo-jupyter-azure/"
            }`;
          
        console.log(folder[folder.length-1]);
        const jsonObject = JSON.parse(jsonLinks);
        const matchingKey = Object.keys(jsonObject).find(key => key.includes(folder[folder.length-1]));

        //console.log("matchingKey:"+matchingKey);
        //if (matchingKey) {
        //    console.log(`Key: ${matchingKey}`);
        //    console.log(`URL: ${jsonObject[matchingKey]}`);
         //   window.location.href = jsonObject[matchingKey];
       // }
       console.log("matchingKey:"+matchingKey);
       if (matchingKey) {
           console.log(`Key: ${matchingKey}`);
           console.log(`URL: ${jsonObject[matchingKey]}`);
           var metaTag = document.createElement('meta');
           metaTag.setAttribute('http-equiv', 'refresh');
           metaTag.setAttribute('content', `0;url=${jsonObject[matchingKey]}`);
           document.head.appendChild(metaTag);
       }
   }
});