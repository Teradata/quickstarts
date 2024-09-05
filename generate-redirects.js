const fs = require('fs');
const path = require('path');

// JSON data
const data = {
    "teradata-vantage-engine-architecture-and-concepts.html": "https://developers.teradata.com/quickstarts/introduction/teradata-vantage-engine-architecture-and-concepts/",
    "getting.started.vmware.html": "https://developers.teradata.com/quickstarts/get-access-to-vantage/on-your-local/getting-started-vmware/",
    "getting.started.vbox.html": "https://developers.teradata.com/quickstarts/get-access-to-vantage/on-your-local/getting-started-vbox/",
    "getting.started.utm.html": "https://developers.teradata.com/quickstarts/get-access-to-vantage/on-your-local/run-vantage-express-on-utm/",
    "run-vantage-express-on-aws.html": "https://developers.teradata.com/quickstarts/get-access-to-vantage/on-your-cloud-infrastructure/run-vantage-express-on-aws/",
    "vantage.express.gcp.html": "https://developers.teradata.com/quickstarts/get-access-to-vantage/on-your-cloud-infrastructure/vantage-express-gcp/",
    "run-vantage-express-on-microsoft-azure.html": "https://developers.teradata.com/quickstarts/get-access-to-vantage/on-your-cloud-infrastructure/run-vantage-express-on-microsoft-azure/",
    "getting-started-with-csae.html": "https://developers.teradata.com/quickstarts/get-access-to-vantage/clearscape-analytics-experience/getting-started-with-csae/",
    "install-teradata-studio-on-mac-m1-m2.html": "https://developers.teradata.com/quickstarts/connect-to-vantage/install-teradata-studio-on-mac-m1-m2/",
    "other-integrations/configure-a-teradata-vantage-connection-in-dbeaver.html": "https://developers.teradata.com/quickstarts/connect-to-vantage/configure-a-teradata-vantage-connection-in-dbeaver/",
    "odbc.ubuntu.html": "https://developers.teradata.com/quickstarts/connect-to-vantage/configure-odbc/ubuntu/",
    "nos.html": "https://developers.teradata.com/quickstarts/manage-data/nos/",
    "select-the-right-data-ingestion-tools-for-teradata-vantage.html": "https://developers.teradata.com/quickstarts/manage-data/select-the-right-data-ingestion-tools-for-teradata-vantage/",
    "airflow.html": "https://developers.teradata.com/quickstarts/manage-data/airflow/",
    "dbt.html": "https://developers.teradata.com/quickstarts/manage-data/dbt/",
    "advanced-dbt.html": "https://developers.teradata.com/quickstarts/manage-data/advanced-dbt/",
    "modelops/using-feast-feature-store-with-teradata-vantage.html": "https://developers.teradata.com/quickstarts/manage-data/using-feast-feature-store-with-teradata-vantage/",
    "other-integrations/getting.started.dbt-feast-teradata-pipeline.html": "https://developers.teradata.com/quickstarts/manage-data/getting-started-dbt-feast-teradata-pipeline/",
    "elt/use-airbyte-to-load-data-from-external-sources-to-teradata-vantage.html": "https://developers.teradata.com/quickstarts/quickstarts/manage-data/use-airbyte-to-load-data-from-external-sources-to-teradata-vantage/",
    "elt/terraform-airbyte-provider.html": "https://developers.teradata.com/quickstarts/manage-data/terraform-airbyte-provider/",
    "elt/transforming-external-data-loaded-via-airbyte-in-teradata-vantage-using-dbt.html": "https://developers.teradata.com/quickstarts/quickstarts/manage-data/transforming-external-data-loaded-via-airbyte-in-teradata-vantage-using-dbt/",
    "tools-and-utilities/run-bulkloads-efficiently-with-teradata-parallel-transporter.html": "https://developers.teradata.com/quickstarts/quickstarts/manage-data/run-bulkloads-efficiently-with-teradata-parallel-transporter/",
    "create-parquet-files-in-object-storage.html": "https://developers.teradata.com/quickstarts/manage-data/create-parquet-files-in-object-storage/",
    "other-integrations/execute-airflow-workflows-that-use-dbt-with-teradata-vantage.html": "https://developers.teradata.com/quickstarts/manage-data/execute-airflow-workflows-that-use-dbt-with-teradata-vantage/",
    "cloud-guides/integrate-teradata-vantage-to-salesforce-using-amazon-appflow.html": "https://developers.teradata.com/quickstarts/manage-data/integrate-teradata-vantage-to-salesforce-using-amazon-appflow/",
    "segment.html": "https://developers.teradata.com/quickstarts/manage-data/segment/",
    "cloud-guides/connect-azure-data-share-to-teradata-vantage.html": "https://developers.teradata.com/quickstarts/manage-data/connect-azure-data-share-to-teradata-vantage/",
    "cloud-guides/integrate-teradata-vantage-with-google-cloud-data-catalog.html": "https://developers.teradata.com/quickstarts/manage-data/integrate-teradata-vantage-with-google-cloud-data-catalog/",
    "other-integrations/configure-a-teradata-vantage-connection-in-datahub.html": "https://developers.teradata.com/quickstarts/manage-data/configure-a-teradata-vantage-connection-in-datahub/",
    "jdbc.html": "https://developers.teradata.com/quickstarts/create-applications/jdbc/",
    "teradatasql.html": "https://developers.teradata.com/quickstarts/create-applications/teradatasql/",
    "mule.jdbc.example.html": "https://developers.teradata.com/quickstarts/create-applications/mule-dbc-example/",
    "query-service/send-queries-using-rest-api.html": "https://developers.teradata.com/quickstarts/create-applications/send-queries-using-rest-api/",
    "jupyter.html": "https://developers.teradata.com/quickstarts/analyze-data/jupyter/",
    "local.jupyter.hub.html": "https://developers.teradata.com/quickstarts/analyze-data/local-jupyter-hub/",
    "ml.html": "https://developers.teradata.com/quickstarts/analyze-data/ml/",
    "sto.html": "https://developers.teradata.com/quickstarts/analyze-data/sto/",
    "perform-time-series-analysis-using-teradata-vantage.html": "https://developers.teradata.com/quickstarts/analyze-data/perform-time-series-analysis-using-teradata-vantage/",
    "modelops/deploy-and-monitor-machine-learning-models-with-teradata-modelops-and-byom.html": "https://developers.teradata.com/quickstarts/analyze-data/deploy-and-monitor-machine-learning-models-with-teradata-modelops-and-byom/",
    "modelops/deploy-and-monitor-machine-learning-models-with-teradata-modelops-and-git.html": "https://developers.teradata.com/quickstarts/analyze-data/deploy-and-monitor-machine-learning-models-with-teradata-modelops-and-git/",
    "modelops/execute-airflow-workflows-with-clearscape-analytics-modelops-model-factory-solution.html": "https://developers.teradata.com/quickstarts/quickstarts/analyze-data/execute-airflow-workflows-with-clearscape-analytics-modelops-model-factory-solution/",
    "cloud-guides/sagemaker-with-teradata-vantage.html": "https://developers.teradata.com/quickstarts/analyze-data/sagemaker-with-teradata-vantage/",
    "cloud-guides/use-teradata-vantage-with-azure-machine-learning-studio.html": "https://developers.teradata.com/quickstarts/analyze-data/use-teradata-vantage-with-azure-machine-learning-studio/",
    "cloud-guides/integrate-teradata-jupyter-extensions-with-google-vertex-ai.html": "https://developers.teradata.com/quickstarts/analyze-data/integrate-teradata-jupyter-extensions-with-google-vertex-ai/",
    "cloud-guides/integrate-teradata-jupyter-extensions-with-sagemaker.html": "https://developers.teradata.com/quickstarts/analyze-data/integrate-teradata-jupyter-extensions-with-sagemaker/",
    "business-intelligence/create-stunning-visualizations-in-power-bi-using-data-from-teradata-vantage.html": "https://developers.teradata.com/quickstarts/quickstarts/analyze-data/create-stunning-visualizations-in-power-bi-using-data-from-teradata-vantage/",
    "other-integrations/integrate-teradata-vantage-with-knime.html": "https://developers.teradata.com/quickstarts/analyze-data/integrate-teradata-vantage-with-knime/",
    "getting-started-with-vantagecloud-lake.html": "https://developers.teradata.com/quickstarts/vantagecloud-lake/getting-started-with-vantagecloud-lake/",
    "vantagecloud-lake/vantagecloud-lake-demo-jupyter-docker.html": "https://developers.teradata.com/quickstarts/vantagecloud-lake/vantagecloud-lake-demo-jupyter-docker/",
    "vantagecloud-lake/vantagecloud-lake-demos-visual-studio-code.html": "https://developers.teradata.com/quickstarts/vantagecloud-lake/vantagecloud-lake-demos-visual-studio-code/",
    "vantagecloud-lake/vantagecloud-lake-demo-jupyter-sagemaker.html": "https://developers.teradata.com/quickstarts/vantagecloud-lake/vantagecloud-lake-demo-jupyter-sagemaker/",
    "vantagecloud-lake/vantagecloud-lake-demo-jupyter-google-cloud-vertex-ai.html": "https://developers.teradata.com/quickstarts/vantagecloud-lake/vantagecloud-lake-demo-jupyter-google-cloud-vertex-ai/",
    "vantagecloud-lake/vantagecloud-lake-demo-jupyter-azure.html": "https://developers.teradata.com/quickstarts/vantagecloud-lake/vantagecloud-lake-demo-jupyter-azure/"
};

// Template generator function
function generateHTML(url) {
  return `<!DOCTYPE html>
<meta charset="utf-8">
<link rel="canonical" href="${url}">
<script>location="${url}"</script>
<meta http-equiv="refresh" content="0; url=${url}">
<meta name="robots" content="noindex">
<title>Redirect Notice</title>
<h1>Redirect Notice</h1>
<p>The page you requested has been relocated to <a href="${url}">${url}</a>.</p>`;
}

// Directory where the files will be saved
const outputDir = path.join(__dirname, 'static');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Loop through the JSON data
Object.keys(data).forEach(fileName => {
  const url = data[fileName];
  const htmlContent = generateHTML(url);
  
  // Write the HTML content to a file
  const filePath = path.join(outputDir, fileName);
  fs.writeFileSync(filePath, htmlContent, { recursive: true, encoding: 'utf-8' });
  
  console.log(`File created: ${filePath}`);
});
