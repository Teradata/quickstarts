const fs = require("fs");
const path = require("path");

const newBaseUrl = "https://developers.teradata.com";
// JSON data
const data = {
  "index.html": "/quickstarts/",
  "teradata-vantage-engine-architecture-and-concepts.html": "/quickstarts/introduction/teradata-vantage-engine-architecture-and-concepts/",
  "getting.started.vmware.html": "/quickstarts/get-access-to-vantage/on-your-local/getting-started-vmware/",
  "getting.started.vbox.html": "/quickstarts/get-access-to-vantage/on-your-local/getting-started-vbox/",
  "getting.started.utm.html": "/quickstarts/get-access-to-vantage/on-your-local/run-vantage-express-on-utm/",
  "run-vantage-express-on-aws.html": "/quickstarts/get-access-to-vantage/on-your-cloud-infrastructure/run-vantage-express-on-aws/",
  "vantage.express.gcp.html": "/quickstarts/get-access-to-vantage/on-your-cloud-infrastructure/vantage-express-gcp/",
  "run-vantage-express-on-microsoft-azure.html": "/quickstarts/get-access-to-vantage/on-your-cloud-infrastructure/run-vantage-express-on-microsoft-azure/",
  "getting-started-with-csae.html": "/quickstarts/get-access-to-vantage/clearscape-analytics-experience/getting-started-with-csae/",
  "install-teradata-studio-on-mac-m1-m2.html": "/quickstarts/connect-to-vantage/install-teradata-studio-on-mac-m1-m2/",
  "other-integrations/configure-a-teradata-vantage-connection-in-dbeaver.html": "/quickstarts/connect-to-vantage/configure-a-teradata-vantage-connection-in-dbeaver/",
  "odbc.ubuntu.html": "/quickstarts/connect-to-vantage/configure-odbc/ubuntu/",
  "nos.html": "/quickstarts/manage-data/nos/",
  "select-the-right-data-ingestion-tools-for-teradata-vantage.html": "/quickstarts/manage-data/select-the-right-data-ingestion-tools-for-teradata-vantage/",
  "airflow.html": "/quickstarts/manage-data/airflow/",
  "other-integrations/execute-dbt-teradata-transformations-in-airflow-with-cosmos.html" : "/quickstarts/manage-data/execute-dbt-teradata-transformations-in-airflow-with-cosmos/",
  "airflow/airflow-azure-to-teradata-transfer-operator-doc.html": "/quickstarts/manage-data/airflow-azure-to-teradata-transfer-operator-doc/",
  "dbt.html": "/quickstarts/manage-data/dbt/",
  "advanced-dbt.html": "/quickstarts/manage-data/advanced-dbt/",
  "modelops/using-feast-feature-store-with-teradata-vantage.html":
    "/quickstarts/manage-data/using-feast-feature-store-with-teradata-vantage/",
  "other-integrations/getting.started.dbt-feast-teradata-pipeline.html":
    "/quickstarts/manage-data/getting-started-dbt-feast-teradata-pipeline/",
  "elt/use-airbyte-to-load-data-from-external-sources-to-teradata-vantage.html":
    "/quickstarts/manage-data/use-airbyte-to-load-data-from-external-sources-to-teradata-vantage/",
  "elt/terraform-airbyte-provider.html":
    "/quickstarts/manage-data/terraform-airbyte-provider/",
  "elt/transforming-external-data-loaded-via-airbyte-in-teradata-vantage-using-dbt.html":
    "/quickstarts/manage-data/transforming-external-data-loaded-via-airbyte-in-teradata-vantage-using-dbt/",
  "tools-and-utilities/run-bulkloads-efficiently-with-teradata-parallel-transporter.html":
    "/quickstarts/manage-data/run-bulkloads-efficiently-with-teradata-parallel-transporter/",
  "create-parquet-files-in-object-storage.html":
    "/quickstarts/manage-data/create-parquet-files-in-object-storage/",
  "other-integrations/execute-airflow-workflows-that-use-dbt-with-teradata-vantage.html":
    "/quickstarts/manage-data/execute-airflow-workflows-that-use-dbt-with-teradata-vantage/",
  "cloud-guides/integrate-teradata-vantage-to-salesforce-using-amazon-appflow.html":
    "/quickstarts/manage-data/integrate-teradata-vantage-to-salesforce-using-amazon-appflow/",
  "segment.html": "/quickstarts/manage-data/segment/",
  "cloud-guides/connect-azure-data-share-to-teradata-vantage.html":
    "/quickstarts/manage-data/connect-azure-data-share-to-teradata-vantage/",
  "cloud-guides/integrate-teradata-vantage-with-google-cloud-data-catalog.html":
    "/quickstarts/manage-data/integrate-teradata-vantage-with-google-cloud-data-catalog/",
  "other-integrations/configure-a-teradata-vantage-connection-in-datahub.html":
    "/quickstarts/manage-data/configure-a-teradata-vantage-connection-in-datahub/",
  "jdbc.html": "/quickstarts/create-applications/jdbc/",
  "teradatasql.html": "/quickstarts/create-applications/teradatasql/",
  "mule.jdbc.example.html":
    "/quickstarts/create-applications/mule-dbc-example/",
  "query-service/send-queries-using-rest-api.html":
    "/quickstarts/create-applications/send-queries-using-rest-api/",
  "jupyter.html": "/quickstarts/analyze-data/jupyter/",
  "local.jupyter.hub.html": "/quickstarts/analyze-data/local-jupyter-hub/",
  "ml.html": "/quickstarts/analyze-data/ml/",
  "sto.html": "/quickstarts/analyze-data/sto/",
  "perform-time-series-analysis-using-teradata-vantage.html":
    "/quickstarts/analyze-data/perform-time-series-analysis-using-teradata-vantage/",
  "modelops/deploy-and-monitor-machine-learning-models-with-teradata-modelops-and-byom.html":
    "/quickstarts/analyze-data/deploy-and-monitor-machine-learning-models-with-teradata-modelops-and-byom/",
  "modelops/deploy-and-monitor-machine-learning-models-with-teradata-modelops-and-git.html":
    "/quickstarts/analyze-data/deploy-and-monitor-machine-learning-models-with-teradata-modelops-and-git/",
  "modelops/execute-airflow-workflows-with-clearscape-analytics-modelops-model-factory-solution.html":
    "/quickstarts/analyze-data/execute-airflow-workflows-with-clearscape-analytics-modelops-model-factory-solution/",
  "cloud-guides/sagemaker-with-teradata-vantage.html":
    "/quickstarts/analyze-data/sagemaker-with-teradata-vantage/",
  "cloud-guides/use-teradata-vantage-with-azure-machine-learning-studio.html":
    "/quickstarts/analyze-data/use-teradata-vantage-with-azure-machine-learning-studio/",
  "cloud-guides/integrate-teradata-jupyter-extensions-with-google-vertex-ai.html":
    "/quickstarts/analyze-data/integrate-teradata-jupyter-extensions-with-google-vertex-ai/",
  "cloud-guides/integrate-teradata-jupyter-extensions-with-sagemaker.html":
    "/quickstarts/analyze-data/integrate-teradata-jupyter-extensions-with-sagemaker/",
  "business-intelligence/create-stunning-visualizations-in-power-bi-using-data-from-teradata-vantage.html":
    "/quickstarts/analyze-data/create-stunning-visualizations-in-power-bi-using-data-from-teradata-vantage/",
  "other-integrations/integrate-teradata-vantage-with-knime.html":
    "/quickstarts/analyze-data/integrate-teradata-vantage-with-knime/",
  "getting-started-with-vantagecloud-lake.html":
    "/quickstarts/vantagecloud-lake/getting-started-with-vantagecloud-lake/",
  "vantagecloud-lake/vantagecloud-lake-demo-jupyter-docker.html":
    "/quickstarts/vantagecloud-lake/vantagecloud-lake-demo-jupyter-docker/",
  "vantagecloud-lake/vantagecloud-lake-demos-visual-studio-code.html":
    "/quickstarts/vantagecloud-lake/vantagecloud-lake-demos-visual-studio-code/",
  "vantagecloud-lake/vantagecloud-lake-demo-jupyter-sagemaker.html":
    "/quickstarts/vantagecloud-lake/vantagecloud-lake-demo-jupyter-sagemaker/",
  "vantagecloud-lake/vantagecloud-lake-demo-jupyter-google-cloud-vertex-ai.html":
    "/quickstarts/vantagecloud-lake/vantagecloud-lake-demo-jupyter-google-cloud-vertex-ai/",
  "vantagecloud-lake/vantagecloud-lake-demo-jupyter-azure.html":
    "/quickstarts/vantagecloud-lake/vantagecloud-lake-demo-jupyter-azure/",
    "vantagecloud-lake/vantagecloud-lake-compute-cluster-airflow.html":"/quickstarts/vantagecloud-lake/vantagecloud-lake-compute-cluster-airflow/",
    "airflow/airflow.html": "/quickstarts/manage-data/airflow/",
  // AI Unlimited redirects
  "ai-unlimited/ai-unlimited-aws-permissions-policies.html": "/ai-unlimited/install-ai-unlimited/",
  "ai-unlimited/ai-unlimited-magic-reference.html": "/ai-unlimited/explore-and-analyze-data/magic-commands/",
  "ai-unlimited/deploy-ai-unlimited-aws-cloudformation.html": "/ai-unlimited/install-ai-unlimited/deploy-manager-aws-console/",
  "ai-unlimited/deploy-ai-unlimited-awscli-cloudformation.html": "/ai-unlimited/install-ai-unlimited/",
  "ai-unlimited/getting-started-with-ai-unlimited.html": "/ai-unlimited/install-ai-unlimited/",
  "ai-unlimited/install-ai-unlimited-interface-docker.html": "/ai-unlimited/install-ai-unlimited/",
  "ai-unlimited/install-ai-unlimited-workspaces-docker.html": "/ai-unlimited/resources/quickstart/run-ai-unlimited-jupyterlab-docker/",
  "ai-unlimited/running-sample-ai-unlimited-workload.html": "/ai-unlimited/install-ai-unlimited/", 
  "ai-unlimited/using-ai-unlimited-workspace-cli.html": "/ai-unlimited/install-ai-unlimited/",
  
  "mule-teradata-connector/release-notes.html" : "/quickstarts/create-applications/mule-teradata-connector-release-notes/",
  "fastload.html": "/",
  "jupyter-demos/index.html": "/",
  "mule-teradata-connector/examples-configuration.html": "/quickstarts/create-applications/examples-configuration/",
  "mule-teradata-connector/index.html": "/quickstarts/create-applications/teradata-connector-mule4/",
  "explain-plan.html": "/",
  "regulus/install-regulus-docker-image.html": "/",
  "geojson-to-vantage.html": "/quickstarts/analyze-data/geojson-to-vantage/",
  "jupyter-demos/gcp-vertex-ai-pipelines-vantage-byom-housing-example.html":  "/",
  "cloud-guides/ingest-catalog-data-teradata-s3-with-glue.html":"/quickstarts/manage-data/ingest-catalog-data-teradata-s3-with-glue/",
  "/other/getting.started.intro.html": "/",
  "mule-teradata-connector/reference.html": "/quickstarts/create-applications/examples-configuration/",
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

function createRedirects(lang = "") {
  // Directory where the files will be saved
  const outputDir = path.join(__dirname, "static" + (lang ? `/${lang}` : ""));
 
  console.log(`Creating redirects in: ${outputDir}`);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  // Loop through the JSON data
  Object.keys(data).forEach((fileName) => {
    const url = data[fileName];
    const fileDir = fileName.split("/").slice(0, -1).join("/");
    const file = fileName.split("/").pop();

    console.log(`output: ${outputDir}/${fileDir}`);
    console.log(`exists ${fs.existsSync(`${outputDir}/${fileDir}`)}`);

    if (!fs.existsSync(`${outputDir}/${fileDir}`)) {
      fs.mkdirSync(`${outputDir}/${fileDir}`);
      console.log(`Directory created: ${outputDir}/${fileDir}`);
    }

    const htmlContent = generateHTML(
      `${newBaseUrl}${lang ? `/${lang}` : ""}${url}`
    );

    // Write the HTML content to a file
    const filePath = path.join(`${outputDir}/${fileDir}`, file);
    console.log(`Writing to file: ${filePath}`);
    fs.writeFileSync(filePath, htmlContent, {
      recursive: true,
      encoding: "utf-8",
    });
    console.log(`File created: ${filePath}`);
  });
}

createRedirects(); // Call the function to create redirects
createRedirects("ja"); // Call the function to create redirects for Japanese
createRedirects("es"); // Call the function to create redirects for Spanish
