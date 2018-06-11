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
            'es': url => `mailto:?subject=Información del portal de Internet del Instituto Nacional del Cáncer&body=Encontré esta información en cancer.gov/espanol y quiero compartirla contigo: ${ url } \n\n El sitio web del Instituto Nacional del Cáncer (NCI), www.cancer.gov/espanol, provee información precisa, al día y completa de la dependencia principal del gobierno de EE. UU. sobre investigación de cáncer. Si tiene preguntas o necesita más información, le invitamos a que se comunique en español con el servicio de mensajería instantánea LiveHelp del NCI en https://livehelp-es.cancer.gov, o llame el Centro de Contacto del NCI al 1-800-422-6237 (1-800-4-CANCER) sin cargos en los Estados Unidos.`,
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