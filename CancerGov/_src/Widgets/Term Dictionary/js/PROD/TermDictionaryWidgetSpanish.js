iframe = document.createElement('IFRAME');
iframe.style.width = '260px';
iframe.style.height = '340px';
iframe.frameBorder= '0';
iframe.src = "http://www.cancer.gov/widgets/TermDictionaryWidgetSpanish";
iframe.id = 'NCITermDictionaryWidgetContainerSpanish';

document.write('<div id="NCITermDictionaryWidgetSpanish"></div>');
document.getElementById('NCITermDictionaryWidgetSpanish').appendChild(iframe);