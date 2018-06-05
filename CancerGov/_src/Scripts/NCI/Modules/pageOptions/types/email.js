import {
    getMetaData,
    getURL,
    onClickAnalytics,
    getContent,
} from '../utilities';

const email = {
    hook: '.page-options--email a',
    textContent: {
        title: {
            'en': () => 'Email',
            'es': () => 'Enviar por correo electrónico',
        },
        href: {
            'en': url => `mailto:?subject=Information from the National Cancer Institute Web Site&body=I found this information on www.cancer.gov and I'd like to share it with you: ${ url } \n\n NCI's Web site, www.cancer.gov, contains comprehensive information about cancer causes and prevention, screening and diagnosis, treatment and survivorship; clinical trials; statistics; funding, training and employment opportunities; and the institute and its programs. You can also get cancer information online through the LiveHelp instant messaging service at http://livehelp.cancer.gov. If you live in the United States, you may call the NCI's Cancer Information Service toll-free at 1-800-4-CANCER (1-800-422-6237) for cancer information in English and Spanish.`,
            'es': url => `mailto:?subject=Donde Esta La Bibliotheca&body=I found this information on www.cancer.gov and I'd like to share it with you: ${ url } \n\n La arana discoteca`,
        }
    },
    initialize: language => settings => node => {
        const title = getContent(settings.textContent.title, language)();
        node.title = title;
        node.addEventListener('click', () => {
            const url = getURL(document);
            const href = getContent(settings.textContent.href, language)(url);
            const encodedHref = encodeURI(href);
            node.href = encodedHref;
            node.click();
        })
        return node;
    },
    initializeAnalytics: node => {
        const detail = {
            type: 'eMailLink',
        };
        node.addEventListener('click', onClickAnalytics({ node, detail }))
        return node;
    },
};

export default email;