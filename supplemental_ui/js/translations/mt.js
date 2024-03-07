window.onload = function() {
  showDisclaimer(language);
};

function openMTD() {
  document.getElementById('overlay').style.display = 'block';
  document.getElementById('mtModal').style.display = 'block';
}

function closeMTD() {
  document.getElementById('overlay').style.display = 'none';
  document.getElementById("mtModal").style.display = "none";
}

function hideDisclaimer() {
  document.getElementById('disclaimer').style.display = 'none';
}

function translateDisclaimer(language) {
  var translations = {
    'ja': {
      text: 'このウェブサイトは機械支援翻訳 (MAT) を使用しています。',
      info: 'もっと学ぶ',
      mtTitle: '機械支援翻訳',
      mtContent: '英語以外の言語への資料の機械支援による翻訳は、英語を読まないユーザーの便宜を図るためのものであり、法的拘束力はありません。 本情報に依存している人は、自己のリスクでそうすることを認識して下さい。 自動翻訳は完璧なものではなく、人間の翻訳者に代わるものではありません。 Teradataは、提供される機械支援による翻訳の正確性について、いかなる保証や保険も持ち得ません。 Teradataは一切の責任を負わず、そのような翻訳を使用した結果生じる可能性のあるいかなる損害または問題についても責任を負わないものとします。 ユーザーは英語のコンテンツを併用して使用して下さい。',
      exitButton: '閉じる'
    },
    'es': {
      text: 'Este sitio web usa traducción asistida por ordenador (Machine-Assisted Translation, MAT).',
      info: 'Más información',
      mtTitle: 'Traducción asistida por máquina',
      mtContent: 'El objetivo de las traducciones asistidas por máquina de cualquier material a idiomas distintos del inglés es únicamente para la comodidad de los usuarios que no leen el inglés y no son legalmente vinculantes. Toda persona que se base en dicha información lo hace bajo su propio riesgo. Ninguna traducción automatizada es perfecta ni está destinada a reemplazar a los traductores humanos. Teradata no hace promesas ni otorga garantías en cuanto a la exactitud de las traducciones asistidas por máquina proporcionadas. Teradata no acepta ninguna responsabilidad ni será responsable de ningún daño o problema que pueda resultar del uso de dichas traducciones. Se recuerda a los usuarios que utilicen los contenidos en inglés.',
      exitButton: 'Cerrar'
    },
    'default': {
      text: 'This website uses Machine-Assisted Translation (MAT)',
      info: 'Learn more',
      mtTitle: 'Machine-Assisted Translation (MAT)',
      mtContent: 'Machine-assisted translations of any materials into languages other than English are intended solely as a convenience to the non-English-reading users and are not legally binding. Anybody relying on such information does so at his or her own risk. No automated translation is perfect nor is it intended to replace human translators. Teradata does not make any promises, assurances, or guarantees as to the accuracy of the machine-assisted translations provided. Teradata accepts no responsibility and shall not be liable for any damage or issues that may result from using such translations. Users are reminded to use the English contents.',
      exitButton: 'Close'
    }
  };

  return translations[language] || translations['default'];
}

function showDisclaimer(language) {
  var translation = translateDisclaimer(language);

  document.getElementById("message").textContent = translation.text;
  document.getElementById("info").textContent = translation.info;
  document.getElementById("header").textContent = translation.mtTitle;
  document.getElementById("content").textContent = translation.mtContent;
  document.getElementById("close").textContent = translation.exitButton;
}