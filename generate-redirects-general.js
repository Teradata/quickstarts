const fs = require("fs");
const path = require("path");

const newBaseUrl = "https://developers.teradata.com";
// JSON data
const data = {
  "general/airflow.html": "/quickstarts/manage-data/airflow/",
  "general/teradata-vantage-engine-architecture-and-concepts.html": "/quickstarts/introduction/teradata-vantage-engine-architecture-and-concepts/",
  "general/getting.started.vmware.html": "/quickstarts/get-access-to-vantage/on-your-local/getting-started-vmware/",
  "general/getting.started.vbox.html": "/quickstarts/get-access-to-vantage/on-your-local/getting-started-vbox/",
  "general/getting.started.utm.html": "/quickstarts/get-access-to-vantage/on-your-local/run-vantage-express-on-utm/",
  "general/run-vantage-express-on-aws.html": "/quickstarts/get-access-to-vantage/on-your-cloud-infrastructure/run-vantage-express-on-aws/",
  "general/vantage.express.gcp.html": "/quickstarts/get-access-to-vantage/on-your-cloud-infrastructure/vantage-express-gcp/",
  "general/run-vantage-express-on-microsoft-azure.html": "/quickstarts/get-access-to-vantage/on-your-cloud-infrastructure/run-vantage-express-on-microsoft-azure/",
  "general/getting-started-with-csae.html": "/quickstarts/get-access-to-vantage/clearscape-analytics-experience/getting-started-with-csae/",
  "general/install-teradata-studio-on-mac-m1-m2.html": "/quickstarts/connect-to-vantage/install-teradata-studio-on-mac-m1-m2/",
  "general/odbc.ubuntu.html": "/quickstarts/connect-to-vantage/configure-odbc/ubuntu/",
  "general/nos.html": "/quickstarts/manage-data/nos/",
  "general/select-the-right-data-ingestion-tools-for-teradata-vantage.html": "/quickstarts/manage-data/select-the-right-data-ingestion-tools-for-teradata-vantage/",
  "general/dbt.html": "/quickstarts/manage-data/dbt/",
  "general/advanced-dbt.html": "/quickstarts/manage-data/advanced-dbt/",
  "general/create-parquet-files-in-object-storage.html":"/quickstarts/manage-data/create-parquet-files-in-object-storage/",
  "general/segment.html": "/quickstarts/manage-data/segment/",
  "general/jdbc.html": "/quickstarts/create-applications/jdbc/",
  "general/teradatasql.html": "/quickstarts/create-applications/teradatasql/",
  "general/mule.jdbc.example.html":"/quickstarts/create-applications/mule-dbc-example/",
  "general/jupyter.html": "/quickstarts/analyze-data/jupyter/",
  "general/local.jupyter.hub.html": "/quickstarts/analyze-data/local-jupyter-hub/",
  "general/ml.html": "/quickstarts/analyze-data/ml/",
  "general/sto.html": "/quickstarts/analyze-data/sto/",
  "general/perform-time-series-analysis-using-teradata-vantage.html": "/quickstarts/analyze-data/perform-time-series-analysis-using-teradata-vantage/",
  "general/getting-started-with-vantagecloud-lake.html": "/quickstarts/vantagecloud-lake/getting-started-with-vantagecloud-lake/",
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

//createRedirects(); // Call the function to create redirects
createRedirects("ja"); // Call the function to create redirects for Japanese
createRedirects("es"); // Call the function to create redirects for Spanish
