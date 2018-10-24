import initializeR4R from 'r4r-app';
import 'r4r-app/build/static/css/main.css';
import initializeCancerGov from './config';

const homeRedirects = ["/research/resources/biospecimens-video",  "/research/resources/biospecimens-video/",
                "/research/resources/conducting", "/research/resources/conducting/", 
                "/research/resources/data-catalog", "/research/resources/data-catalog/",
                "/research/resources/statistical-tools", "/research/resources/statistical-tools/",
                "/research/resources/terminology", "/research/resources/terminology/",
                "/research/resources/terminology/fmt", "/research/resources/terminology/fmt/",
                "/research/resources/terminology/ncidictionaries", "/research/resources/terminology/ncidictionaries/"];

const path = window.location.pathname;

function needsRedirect() {
    let redirect = false;

    if(homeRedirects.indexOf(path) > -1)
    {
        redirect = redirectUrl("/research/resources");
    }

    switch (path) {
        // Resource 230 is CDISC Terminology
        case "/research/resources/terminology/cdisc":
            redirect = redirectUrl("/research/resources/resource/230");
            break;
        case "/research/resources/terminology/cdisc/":
            redirect = redirectUrl("/research/resources/resource/230");
            break;
    
        // Resource 196 is FDA Terminology
        case "/research/resources/terminology/fda":
            redirect = redirectUrl("/research/resources/resource/196");
            break;
        case "/research/resources/terminology/fda/":
            redirect = redirectUrl("/research/resources/resource/196");
            break;
        
        // Resource 236 is NCPDP Terminology
        case "/research/resources/terminology/ncpdp":
            redirect = redirectUrl("/research/resources/resource/236");
            break;
        case "/research/resources/terminology/ncpdp/":
            redirect = redirectUrl("/research/resources/resource/236");
            break;
    
        // Resource 237 is Pediatric Terminology
        case "/research/resources/terminology/pediatric":
            redirect = redirectUrl("/research/resources/resource/237");
            break;
        case "/research/resources/terminology/pediatric/":
            redirect = redirectUrl("/research/resources/resource/237");
            break;

        default:
            break;
    }

    return redirect;
}

function redirectUrl(url)
{
    console.log("In redirectUrl() with " + url);
    window.location.replace(url);
    return true;
}

const onDOMContentLoaded = () => {
    // React Helmet is removing all elements with data-react-helmet="true" on the page except the ones it directly controls. This is a big
    // issue. This code adds it only to the elements we want to control manually to avoid that issue.
    const elementSelectors = [
        ['name', 'description'],
        ['property', 'og:title'],
        ['property', 'og:description'],
        ['property', 'og:url'],
    ];
    const elementsUsedByR4R = elementSelectors.map(el => {
        return document.querySelector(`meta[${el[0]}="${el[1]}"]`);
    })
    elementsUsedByR4R.forEach(el => {
        // Some elements are originated by react-helmet after this script runs and will be null
        if(el){
            el.setAttribute('data-react-helmet', "true");
        }
    })

    initializeCancerGov(initializeR4R);
}

if (!needsRedirect()) {
    document.addEventListener('DOMContentLoaded', onDOMContentLoaded);
}