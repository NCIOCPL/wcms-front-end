iframe = document.createElement('IFRAME');
iframe.style.width = '100%';
iframe.style.height = '475px';
iframe.frameBorder= '0';
iframe.src = "https://www-blue-dev.cancer.gov/widgets/TermDictionaryWidgetSpanish";
iframe.id = 'NCITermDictionaryWidgetContainerSpanish';
iframe.title = 'NCI - Diccionario de téminos de cáncer';

document.write('<div id="NCITermDictionaryWidgetSpanish"></div>');
document.getElementById('NCITermDictionaryWidgetSpanish').appendChild(iframe);