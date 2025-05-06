function switchLanguage(lan) {
    let path, page, indexFile, file, newUrl, salida;
    path = document.location.href;
    page = path.split("/");

    let aiUnlimited = "ai-unlimited";
    let bi = "business-intelligence";
    let cloudGuides = "cloud-guides";
    let elt = "elt";
    let jupyterDemos = "jupyter-demos";
    let modelOps = "modelops";
    let muleTeradataCon = "mule-teradata-connector";
    let otherIntegrations = "other-integrations";
    let queryService = "query-service";
    let toolsUtilities = "tools-and-utilities";
    let vantagecloudLake = "vantagecloud-lake";
    
    if(page[page.length-1]==="" || page[page.length-1]==="index.html" || page[page.length-1]==="#" || page[page.length-1]==="index.html#") {
      if(page[page.length-2] === "ja") {
        if (lan === 'en'){
          indexFile = page.lastIndexOf(page[page.length-2]);
          page.splice(indexFile, 1, '');
        }
        if (lan === 'es'){
          indexFile = page.lastIndexOf(page[page.length-2]);
          page.splice(indexFile, 1, 'es');
        }
      }else if(page[page.length-2] === "es") {
        if (lan === 'en'){
          indexFile = page.lastIndexOf(page[page.length-2]);
          page.splice(indexFile, 1, '');
        }
        if (lan === 'ja'){
          indexFile = page.lastIndexOf(page[page.length-2]);
          page.splice(indexFile, 1, 'ja');
        }
      }
      else{
        indexFile = page.lastIndexOf(page[page.length-1]);
        page.splice(indexFile, 1, lan);
      }
    } else {
      if(lan === "en") {
        indexFile = page.lastIndexOf(page[page.length-3]);
        if (page[page.length-2] === "general"){
          file = page[page.length-1]
        } else {
          file = page[page.length-2] +"/"+ page[page.length-1];
        }
        page.splice(indexFile, indexFile+1, file);
      } else {
        if(page[page.length-3] === "es" || page[page.length-3] === "ja" ){
          page[page.length-3] = lan;  
        } else {
          if(page[page.length-3] !== "en"){
            if(page[page.length-2] === aiUnlimited || page[page.length-2] === bi || 
               page[page.length-2] === cloudGuides || page[page.length-2] === elt || 
               page[page.length-2] === jupyterDemos || page[page.length-2] === modelOps ||
               page[page.length-2] === muleTeradataCon || page[page.length-2] === otherIntegrations ||
               page[page.length-2] === queryService || page[page.length-2] === toolsUtilities || page[page.length-2] === vantagecloudLake ){
              file = page[page.length-2]
              indexFile = page.lastIndexOf(file);
              newUrl = lan + "/"+page[page.length-2]+"/" + page[page.length-1]; 
              page.splice(indexFile, 2, newUrl)
            } else {
              file = page[page.length-1]
              indexFile = page.lastIndexOf(file);
              newUrl = lan + "/general/" + page[page.length-1]; 
              page.splice(indexFile, 1, newUrl)
            }
          }
        }
      }     
    }     

    salida = page.join('/');

    window.location.href = String(salida); 
  }
  /* 
  When the user clicks on the button, 
  toggle between hiding and showing the dropdown content 
  */
  function langOptions() {
    document.getElementById("myDropdown").classList.toggle("show");
    var languageSelector = document.querySelector('.td-language-selector');
    languageSelector.classList.toggle('active');
  }

  // Close the dropdown if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.td-language-selector__toggle')) {
      var dropdowns = document.getElementsByClassName("dropdown-content1");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
          var dropdownIcon = openDropdown.previousElementSibling.querySelector(".fa-xs");
          dropdownIcon.classList.add("fa-chevron-down"); // Ensure the icon is reset to the down-chevron class
          dropdownIcon.classList.remove("fa-chevron-up"); // Remove the up-chevron class if present
        }
      }
    }
  }
