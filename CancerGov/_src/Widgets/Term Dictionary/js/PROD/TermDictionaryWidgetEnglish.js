﻿iframe = document.createElement('IFRAME');
iframe.style.width = '100%';
iframe.style.height = '340px';
iframe.frameBorder= '0';
iframe.src = "https://www.cancer.gov/widgets/TermDictionaryWidgetEnglish";
iframe.id = 'NCITermDictionaryWidgetContainerEnglish';
iframe.title = 'NCI - Dictionary of Cancer Terms';
iframe.title = document.URL;
iframe.name = document.URL;
document.write('<div id="NCITermDictionaryWidgetEnglish"></div>');
document.getElementById('NCITermDictionaryWidgetEnglish').appendChild(iframe);