iframe = document.createElement('IFRAME');
iframe.style.width = '260px';
iframe.style.height = '340px';
iframe.frameBorder= '0';
iframe.src = "https://www.cancer.gov/widgets/TermDictionaryWidgetEnglish";
iframe.id = 'NCITermDictionaryWidgetContainerEnglish';

document.write('<div id="NCITermDictionaryWidgetEnglish"></div>');
document.getElementById('NCITermDictionaryWidgetEnglish').appendChild(iframe);
