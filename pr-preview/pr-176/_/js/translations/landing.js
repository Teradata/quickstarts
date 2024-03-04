window.onload = function() {
    var language = getLanguage();
    var translation = translations(language);
    
    document.getElementById("header").textContent = translation.header;
    document.getElementById("description").textContent = translation.description;
    document.getElementById("callToAaction1").textContent = translation.callToAaction1;
    document.getElementById("callToAaction2").textContent = translation.callToAaction2;
    document.getElementById("alternateAction1").textContent = translation.alternateAction1;
    document.getElementById("alternateAction2").textContent = translation.alternateAction2;
//    document.getElementById("search").placeholder = translation.placeholder;
    document.getElementById("sectionTitle1").textContent = translation.sectionTitle1;
    document.getElementById("sectionTitle2").textContent = translation.sectionTitle2;

    var numberOfLinks = 23;

    for (var i = 1; i <= numberOfLinks; i++) {
      // Obtener el enlace actual
      var currentLink = document.getElementById(`link${i}`);
      
      // Asignar el enlace
      currentLink.href = translation[`link${i}`];
      currentLink.title = translation[`title${i}`];
      
      // Obtener los elementos internos del enlace
      var titleElement = document.getElementById(`title${i}`);
      var contentElement = document.getElementById(`content${i}`);
      var tagElement = document.getElementById(`tag${i}`);
      
      // Asignar los textos internos
      titleElement.textContent = translation[`title${i}`];
      contentElement.textContent = translation[`content${i}`];
      
      if (i >= 10) {
        tagElement.textContent = translation.sectionTitle2;
      } else {
        tagElement.textContent = translation.tag1;
      }
    }

   
    document.getElementById("wait10").style.display = 'none';


  };

function translations(language) {
    var translation = {
      'ja': {
        header: 'スタートガイド',
        description: 'Teradata Vantage をすぐに使いこなすことができるように、機能について学習し、一般的なタスクの解決策を見つけ、サンプルコードを参照します。',
        callToAaction1: 'ClearScape を試す',
        callToAaction2: '参照する',
        alternateAction1: '既存の顧客またはパートナーですか?',
        alternateAction2: 'のコースを探索してください。',
        placeholder: 'スタートガイドを検索',
        sectionTitle1: 'チュートリアル',
        title1: '',
        content1: '',
        title2: '',
        content2: '',
        title2: '',
        content2: '',
        title3: '',
        content3: '',
        title4: '',
        content4: '',
        title5: '',
        content5: '',
        title6: '',
        content6: '',
        title7: '',
        content7: '',
        title8: '',
        content9: '',
        sectionTitle2: 'ハウツー',
        tag1: 'チュートリアル',
      },
      'es': {
        header: 'Empezar',
        description: 'Ponte al tanto de Teradata Vantage. Conoce sus características. Descubre cómo resolver tareas comunes. Explora ejemplos de código fuente.',
        callToAaction1: 'Prueba ClearScape',
        callToAaction2: 'Explora',
        alternateAction1: '¿Cliente o socio existente? Descubre cursos en',
        alternateAction2: 'Teradata University.',
        placeholder: 'Buscar',
        sectionTitle1: 'Tutoriales',
        link1: 'https://quickstarts.teradata.com/nos.html',
        title1: 'Consultar datos en almacenamiento de objetos',
        content1: 'Aprende a analizar datos almacenados en almacenamiento de objetos usando SQL.',
        link2: 'https://quickstarts.teradata.com/ml.html',
        title2: 'Entrena modelos ML utilizando SQL',
        content2: 'Desarrolla modelos de machine learning usando solo SQL, sin necesidad de programación ni trasladar datos.',
        link3:'https://quickstarts.teradata.com/dbt.html',
        title3: 'Utilice dbt con Teradata Vantage',
        content3: 'Aprenda cómo utilizar dbt, una herramienta líder de ELT, con Teradata Vantage.',
        link4:'https://quickstarts.teradata.com/sto.html',
        title4: 'Execute scripts en Teradata Vantage.',
        content4: 'Añade lógica a tus datos. Aprovecha la capacidad y escalabilidad de Teradata para trabajar con datos a través de aplicaciones y scripts.',
        link5:'https://quickstarts.teradata.com/tools-and-utilities/run-bulkloads-efficiently-with-teradata-parallel-transporter.html',
        title5: 'Realizar cargas masivas eficientemente',
        content5: 'Explora herramientas como Teradata Parallel Transporter para cargar cantidades masivas de datos en Teradata Vantage.',
        link6:'https://quickstarts.teradata.com/perform-time-series-analysis-using-teradata-vantage.html',
        title6: 'Realiza análisis de series temporales',
        content6: 'Aprende a realizar análisis de series temporales en Teradata Vantage.',
        link7:'https://quickstarts.teradata.com/create-parquet-files-in-object-storage.html',
        title7: 'Crea archivos Parquet en el almacenamiento de objetos.',
        content7: 'Descubre cómo generar archivos Parquet en el almacenamiento de objetos, llenos de datos provenientes de Teradata Vantage.',
        link8:'https://quickstarts.teradata.com/modelops/deploy-and-monitor-machine-learning-models-with-teradata-modelops-and-byom.html',
        title8: 'ModelOps - Importa y despliega tu primer modelo BYOM',
        content8: 'Aprende cómo importar y desplegar un modelo BYOM (Bring Your Own Model) en Vantage para acelerar la operacionalización y monitorear eficientemente el despliegue.',
        link9:'https://quickstarts.teradata.com/modelops/deploy-and-monitor-machine-learning-models-with-teradata-modelops-and-git.html',
        title9: 'ModelOps -  Importa y despliega tu primer modelo GIT',
        content9: 'Aprende cómo preparar plantillas de código y desplegar un modelo tipo GIT en Teradata Vantage para acelerar la operacionalización y monitorear eficientemente el despliegue.',
        sectionTitle2: 'Guías',
        link10:'https://quickstarts.teradata.com/jdbc.html',
        title10: 'Conexión a Teradata Vantage usando JDBC',
        content10: 'Descubre cómo conectarte a Teradata Vantage utilizando una aplicación Java de muestra que utiliza JDBC.',
        link11:'https://quickstarts.teradata.com/jupyter.html',
        title11: 'Utiliza Teradata Vantage desde Jupyter notebook',
        content11: 'Aprende a utilizar Jupyter notebook para realizar ciencia de datos con Teradata Vantage.',
        link12:'https://quickstarts.teradata.com/local.jupyter.hub.html',
        title12: 'Implementación de extensiones Teradata Jupyter en JupyterHub',
        content12: 'Sigue las instrucciones para implementar extensiones Jupyter de Teradata en tu propia instancia de JupyterHub.',
        link13:'https://quickstarts.teradata.com/cloud-guides/integrate-teradata-jupyter-extensions-with-google-vertex-ai.html',
        title13: 'Integra Teradata Jupyter con Google Vertex AI',
        content13: 'Utiliza Vertex AI Workbench para alojar Jupyterlab notebook con extensiones de Teradata Jupyter.',
        title14: 'https://quickstarts.teradata.com/mule.jdbc.example.html',
        content14: 'Consulta Teradata Vantage desde un servicio de Mulesoft',
        title14: 'Este tutorial muestra cómo ejecutar consultas en Teradata Vantage utilizando un servicio REST creado en Mulesoft.',
        link15: 'https://quickstarts.teradata.com/odbc.ubuntu.html',
        title15: 'Configuración de ODBC en Ubuntu',
        content15: 'Sigue instrucciones paso a paso para obtener una configuración de ODBC de Teradata Vantage funcional en Ubuntu.',
        link16: 'https://quickstarts.teradata.com/segment.html',
        title16: 'Almacenamiento de eventos de Twilio Segment',
        content16: 'Clona y ejecuta un proyecto de muestra que escucha los eventos de Twilio Segment y los almacena en Teradata Vantage.',
        link17: 'https://quickstarts.teradata.com/cloud-guides/sagemaker-with-teradata-vantage.html',
        title17: 'Uso de AWS SageMaker con Teradata Vantage',
        content17: 'En este detallado tutorial aprenderás a exportar datos desde Teradata Vantage para entrenar un modelo en AWS SageMaker.',
        link18: 'https://quickstarts.teradata.com/cloud-guides/integrate-teradata-vantage-to-salesforce-using-amazon-appflow.html',
        title18: 'Integración de Teradata Vantage con Salesforce utilizando Amazon AppFlow',
        content18: 'Replica datos entre Teradata Vantage y Salesforce utilizando Amazon AppFlow y S3.',
        link19: 'https://quickstarts.teradata.com/cloud-guides/connect-azure-data-share-to-teradata-vantage.html',
        title19: 'Conexión de Azure Data Share a Teradata Vantage',
        content19: 'Comparte datos en Teradata Vantage utilizando Azure Data Share.',
        link20: 'https://quickstarts.teradata.com/cloud-guides/integrate-teradata-vantage-with-google-cloud-data-catalog.html',
        title20: 'Integración de Teradata Vantage con Google Cloud Data Catalog',
        content20: 'Transfiere tus metadatos de Teradata Vantage a Google Cloud Data Catalog y explora datos sobre datos en una única herramienta.',
        link21: 'https://quickstarts.teradata.com/cloud-guides/use-teradata-vantage-with-azure-machine-learning-studio.html',
        title21: 'Uso de Teradata Vantage con Azure Machine Learning Studio',
        content21: 'Utiliza datos almacenados en Teradata Vantage para alimentar un modelo de aprendizaje automático desarrollado en Azure Machine Learning Studio.',
        link22: 'https://quickstarts.teradata.com/other-integrations/integrate-teradata-vantage-with-knime.html',
        title22: 'Integración de Teradata Vantage con KNIME Analytics Platform',
        content22: 'Utiliza KNIME Analytics Platform para analizar datos en Teradata Vantage.',
        link23: 'https://quickstarts.teradata.com/other-integrations/configure-a-teradata-vantage-connection-in-dbeaver.html',
        title23: 'Configuración de una conexión a Teradata Vantage en DBeaver',
        content23: 'Utiliza DBeaver SQL IDE para trabajar con datos en Teradata Vantage.',
        tag1: 'Tutorial',
      },
      'default': {
        header: 'Getting Started',
        description: 'Get up to speed with Teradata Vantage. Learn about its features. Find solutions for common tasks. Explore sample source code.',
        callToAaction1: 'Try ClearScape',
        callToAaction2: 'Browse',
        alternateAction1: 'Existing customer or partner? Explore courses at',
        alternateAction2: 'Teradata University.',
        placeholder: 'Search Getting Started',
        sectionTitle1: 'Tutorials',
        title1: '',
        content1: '',
        title2: '',
        content2: '',
        title2: '',
        content2: '',
        title3: '',
        content3: '',
        title4: '',
        content4: '',
        title5: '',
        content5: '',
        title6: '',
        content6: '',
        title7: '',
        content7: '',
        title8: '',
        content9: '',
        sectionTitle2: 'How-tos',
        tag1: 'Tutorial',
      }
    };
  
    return translation[language] || translation['default'];
  }


  function getLanguage() {
    var path = document.location.href;
    var matchResult = path.match(/\/(es|ja)\//);
    var language;

    if (matchResult) {
      language = matchResult[1];
    } else {
      language = 'en';
    }
    return language;
  }