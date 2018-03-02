import { getNodeArray } from 'Utilities//domManipulation'
import './index.scss'

const dropdownInjector = () => {
    const allHooks = getNodeArray('.cthp-card-container .cardBody .more-info');
    const filteredHooks = allHooks.filter((container, idx) => {
        const list = container.querySelector('ul');
        const links = list.children;
        if(links.length > 1) {
            const title = container.querySelector('h5'); // To be used for replaceChild
            container.classList.add('cthp-dropdown'); // Inserting the primary CSS container class hook

            const input = document.createElement('input');
            input.type = 'checkbox';
            input.id = `checkbox_toggle${idx}`;

            const label = document.createElement('label');
            label.htmlFor = `checkbox_toggle${idx}`;
            label.innerText = 'View More Information';

            // container.replaceChild(label, title);
            container.insertBefore(label, title);
            container.insertBefore(input, label);
            return true;
        }
    })
}

export default dropdownInjector;
