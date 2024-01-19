function switchLanguage(lan) {
//    alert(lan);
    let path, page, indexFile, file, newUrl, salida;
    path = document.location.href;
    alert('Original Path: ' + path);
    page = path.split('/').filter(Boolean);
    alert('page: '+page);
    let aiUnlimited = "ai-unlimited";
    let bi = "business-intelligence";
    alert('Components: ' + JSON.stringify(page));
    alert(page[page.length-1]);
    if(page[page.length-1]==="" || page[page.length-1]==="index.html" || page[page.length-1]==="#" || page[page.length-1]==="index.html#") {
      if(page[page.length-2] !== "ja") {
        indexFile = page.lastIndexOf(page[page.length-1]);
        page.splice(indexFile, 1, lan);
      } else {
        indexFile = page.lastIndexOf(page[page.length-2]);
        page.splice(indexFile, 1, '');
      }
      alert('indexFile: '+indexFile);
    } else {
      if(lan === "en") {
        indexFile = page.lastIndexOf(page[page.length-3]);
        alert('indexFile: ' +indexFile);
        if (page[page.length-2] === "general"){
          file = page[page.length-1]
          alert('file: ' +file);
        } else {
          file = page[page.length-2] +"/"+ page[page.length-1];
          alert('file: ' +file);
        }
        page.splice(indexFile, indexFile+1, file);
      } else {
        if(page[page.length-3] === "es" || page[page.length-3] === "ja" ){
          page[page.length-3] = lan;  
          alert('newUrl: ' + page[page.length-3]);
        } else {
          if(page[page.length-3] !== "en"){
            if(page[page.length-2] === aiUnlimited || page[page.length-2] === bi){
              file = page[page.length-2]
              indexFile = page.lastIndexOf(file);
              newUrl = lan + "/"+page[page.length-2]+"/" + page[page.length-1]; 
              alert('newUrl ja: ' +newUrl);
              page.splice(indexFile, 2, newUrl)
            } else {
              file = page[page.length-1]
              indexFile = page.lastIndexOf(file);
              newUrl = lan + "/general/" + page[page.length-1]; 
              alert('newUrl en: ' +newUrl);
            //  newUrl = lan +"/" + page[page.length-1]; 
              page.splice(indexFile, 1, newUrl)
            }
          }
        }
      }     
    }     
    salida = page.join('/');
    
    
    alert('Final URL: ' + salida);
    window.location.href = salida; 

  }
  /* 
  When the user clicks on the button, 
  toggle between hiding and showing the dropdown content 
  */
  function langOptions() {
    document.getElementById("myDropdown").classList.toggle("show");
    const dropdownIcon = document.getElementById("dropdownIcon");
    dropdownIcon.classList.toggle("fa-chevron-up"); // Toggle the up-chevron class
    dropdownIcon.classList.toggle("fa-chevron-down"); // Toggle the down-chevron class
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
