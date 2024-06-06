window.addEventListener('load', function() {
    var folder = window.location.pathname.split("/");
    console.log(folder[folder.length-2]);

    if (folder[folder.length-2] === 'ai-unlimited') {
        var metaTag = document.createElement('meta');
        metaTag.setAttribute('http-equiv', 'refresh');
        metaTag.setAttribute('content', '5;url=https://teradata.github.io/ai-unlimited-docs/docs/install-ai-unlimited/');
        document.head.appendChild(metaTag);
        
        window.location.href = 'https://teradata.github.io/ai-unlimited-docs/docs/install-ai-unlimited/';
    }
});