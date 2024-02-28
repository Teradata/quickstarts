window.onload = function() {
  showDisclaimer();
};

function openMTD() {
  document.getElementById("mtModal").style.display = "block";
}

function closeMTD() {
  document.getElementById("mtModal").style.display = "none";
}

function hideDisclaimer() {
  document.getElementById('disclaimer').style.display = 'none';
}

function showDisclaimer() {
  var text, info, mtTitle, mtContent, exitButton;
  switch(language){
    case 'ja':
        text = 'このウェブサイトは機械支援翻訳 (MAT) を使用しています。';
        info = 'もっと学ぶ';
        mtTitle = '機械支援翻訳';
        mtContent = '英語以外の言語への資料の機械支援による翻訳は、英語を読まないユーザーの便宜を図るためのものであり、法的拘束力はありません。 本情報に依存している人は、自己のリスクでそうすることを認識して下さい。 自動翻訳は完璧なものではなく、人間の翻訳者に代わるものではありません。 Teradataは、提供される機械支援による翻訳の正確性について、いかなる保証や保険も持ち得ません。 Teradataは一切の責任を負わず、そのような翻訳を使用した結果生じる可能性のあるいかなる損害または問題についても責任を負わないものとします。 ユーザーは英語のコンテンツを併用して使用して下さい。';
        exitButton = '閉じる';
        break;
    case 'es':
        text = 'Este sitio web usa traducción asistida por ordenador (Machine-Assisted Translation, MAT).';
        info = 'Más información';
        mtTitle = 'Traducción asistida por máquina';
        mtContent = 'El objetivo de las traducciones asistidas por máquina de cualquier material a idiomas distintos del inglés es únicamente para la comodidad de los usuarios que no leen el inglés y no son legalmente vinculantes. Toda persona que se base en dicha información lo hace bajo su propio riesgo. Ninguna traducción automatizada es perfecta ni está destinada a reemplazar a los traductores humanos. Teradata no hace promesas ni otorga garantías en cuanto a la exactitud de las traducciones asistidas por máquina proporcionadas. Teradata no acepta ninguna responsabilidad ni será responsable de ningún daño o problema que pueda resultar del uso de dichas traducciones. Se recuerda a los usuarios que utilicen los contenidos en inglés.';
        exitButton = 'Cerrar';
        break;
    default:
        text = '', info = '', mtTitle = '', mtContent = '', exitButton = '';
  }

  var div2 = document.getElementById("message");
  div2.textContent = text;
  var div3 = document.getElementById("info");
  div3.textContent = info;
  var header = document.getElementById("header");
  header.textContent = mtTitle;
  var tContent = document.getElementById("content");
  tContent.textContent = mtContent;
  var btnClose = document.getElementById("close");
  btnClose.textContent = exitButton;
}

