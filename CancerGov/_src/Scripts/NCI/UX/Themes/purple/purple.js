console.log("This file should only be loaded for NCI Connect");
import './purple.scss';

const onDOMContentLoaded = () => {
  console.log("DOMContentLoaded triggered");
}

document.addEventListener('DOMContentLoaded',onDOMContentLoaded);