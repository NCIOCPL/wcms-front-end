import initializeR4R from 'r4r-app';
import 'r4r-app/build/static/css/main.css';
import initializeCancerGov from './config';

const path = window.location.pathname;

function needsRedirect() {
    let redirect = false;

    switch (path) {
        // Redirect to home
        case "/research/resources/biospecimens-video":
            redirect = redirectUrl("/research/resources");
            break;
        case "/research/resources/biospecimens-video/":
        redirect = redirectUrl("/research/resources");
            break;

        // Redirect to clinical research tools category
        case "/research/resources/conducting":
            redirect = redirectUrl("/research/resources/search?from=0&toolTypes=clinical_research_tools");
            break;
        case "/research/resources/conducting/":
        redirect = redirectUrl("/research/resources/search?from=0&toolTypes=clinical_research_tools");
            break;
    
        // Redirect to datasets & databases category
        case "/research/resources/data-catalog":
            redirect = redirectUrl("/research/resources/search?from=0&toolTypes=datasets_databases");
            break;
        case "/research/resources/data-catalog/":
        redirect = redirectUrl("/research/resources/search?from=0&toolTypes=datasets_databases");
            break;
        
        // Redirect to statistical tools category
        case "/research/resources/statistical-tools":
            redirect = redirectUrl("/research/resources/search?from=0&researchAreas=cancer_statistics");
            break;
        case "/research/resources/statistical-tools/":
        redirect = redirectUrl("/research/resources/search?from=0&researchAreas=cancer_statistics");
            break;
        
        default:
            break;
    }

    return redirect;
}

function redirectUrl(url)
{
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