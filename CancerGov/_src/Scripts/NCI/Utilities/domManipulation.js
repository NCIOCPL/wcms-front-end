/**
 * Starting at a given DOM node, crawl upwards through the tree until a parent element containing
 * a provided class is found. Returns true if classname is found on any DOM node higher in the tree than
 * the provided node.
 * A DNA test for DOM Nodes if you will.
 * 
 * @param {node} node 
 * @param {string} className - classname only, do not use '.' selector
 * @return {boolean}
 */
export const checkNodeAncestryForClass = (node, className) => {
	let hasAncestor = false;

	while(node && node.parentNode) {
		if(node.classList.contains(className)) {
			hasAncestor = true;
			break;
		}
		node = node.parentNode;
	}
	
	return hasAncestor;
};


/**
 * Return an array of nodes that match a given selector string starting from a given node
 * in the DOM tree.
 * 
 * DOM Querying typically returns nodelists not true arrays. We want to always get an array 
 * back from querySelectorAll for easy reasoning.
 * 
 * @param {string} selector 
 * @param {node} [node=document] 
 * @returns {node[]}
 */
export const getNodeArray = (selector, node = document) => {
    const nodeList = node.querySelectorAll(selector);
    return nodeList ? Array.from(nodeList) : []
};


/**
 * @param {String} html - represents any number of sibling elements
 * @return {Array}
 */
export const createFragment = html => {
    const template = document.createElement('div');
    template.innerHTML = html;
    return Array.from(template.childNodes);
};

/**
 * @param {Array<node>} nodes - list of elements to append
 * @param {node} parent - target container
 * @return {node}
 */
export const appendNodes = (nodes, parent) => nodes.map(node => parent.appendChild(node));

/**
 * Given an array of arrays containing meta property attribute names and the corresponding value, will 
 * return an object with the property names as keys and the metatags content as values
 * 
 * Example metaTags = [
    ['property', 'og:url'],
    ['property', 'og:title'], 
    ['property', 'og:description'],
    ['name', 'twitter:card']
]
 *returns { 'og:url': 'XXXX', 'og:description': 'XXXX'}
 *  
 * @param {Array[]} metaTags Array of arrays of propertyType & propertyName pairs for metatags
 * @param {Object} document Document (or document.documentElement for quicker searching) explicit for testing without DOM
 * @return {Object}
 */
export const getMetaData = (metaTags, document) => {
	try {
		const metaData = metaTags.reduce((acc, [propType, propName]) => {
			const metaTag = document.querySelector(`meta[${propType}="${propName}"]`);
			if(metaTag) {
				acc[propName] = metaTag.getAttribute('content');
			}
			return acc;
		}, {})
		return metaData;
	}
	catch(err) {
		// Until we start doing proper error handling, this will serve as a placeholder (BB 3/2018)
		return console.log(err);
	}
}

/**
 * TODO: Extend with extra checks, this is very specific to CGOV.
 * @param {HTMLElement} [document=window.document]
 * @return {string}
 */
export const getDocumentLanguage = (document = window.document) => {
	return document.querySelector('meta[name="content-language"]').getAttribute('content');
}

/**
 * Retrieve the canonical URL from the document head
 * 
 * @param {HTMLElement} [document=window.document]
 * @return {string}
 */
export const getCanonicalURL = (document = window.document) => document.querySelector("link[rel='canonical']").href;

/**
 * Retrieve the URL from the document metadata og:url property
 * 
 * @param {HTMLElement} [document=window.document]
 * @return {string}
 */
export const getMetaURL = document => document.querySelector("meta[property='og:url']").getAttribute('content');

/**
 * On Some pages, the Page Options block is manually moved around the DOM based on the window width.
 * Using matchMedia keeps the JS in sync with the CSS in a way that window.width does not.
 */
export const pageOptionsTransporter = () => {
	// Page Options is manually moved on resize. Ugh.
	const mediaQueryListener = window.matchMedia('(max-width: 1024px)');
	const mqEventHandler = e => {
		if(e.matches){
			$("#PageOptionsControl1").appendTo("#blogPageOptionsInnerContainer");
		}
		else {
			$("#PageOptionsControl1").appendTo("#blogPageOptionsOuterContainer");
		}
	}
	mediaQueryListener.addListener(mqEventHandler)
	// Initialize page options block in correct page location on load 
	// mediaQueryListeners don't automatically handle load events (they are for resizes primarily)
	// so we need to manually invoke the handler. mediaQueryListener has a property .matches
	// at all times which matches the event.matches property as well, so the callback works the same.
	mqEventHandler(mediaQueryListener)

}
/**
 * Wrap each element in a nodeList with a new element
 * 
 * @param {string} tag - type of element tag to be created
 * @param {Object} attributes - attributes to be added to the newly created wrapping element
 * @return {node}
 */
export const createEl = (tag, attributes = {}) => {
	// create the element
	let element = document.createElement(String(tag));

	// for each attribute
	for (const [attr, val] of Object.entries(attributes)) {
		// assign the attribute, prefixing capital letters with dashes 
		element.setAttribute(attr.replace(/[A-Z]/g, '-$&'), val);
	}

	return element;
}

/**
 * Wrap each element in a nodeList with a new element. Intended to replace jQuery.wrap()
 * 
 * @param {string} query - CSS3 selector
 * @param {string} tag - type of element tag to be created
 * @param {Object} attributes - attributes to be added to the newly created wrapping element
 */
export const wrap = (query, tag, attributes) => {

  document.querySelectorAll( query ).forEach( elem => {
		const wrapEl = createEl(tag,attributes);

    elem.parentElement.insertBefore(wrapEl, elem);
    wrapEl.appendChild(elem);
  });
};

/**
 * Wrap all elements in a nodeList with a new element, grouping all the nodeList elements together as siblings. Intended to replace jQuery.wrapAll()
 * 
 * @param {string} query - CSS3 selector
 * @param {string} tag - type of element tag to be created
 * @param {Object} attributes - attributes to be added to the newly created wrapping element
 */
export const wrapAll = (query, tag, attributes) => {
	const wrapEl = createEl(tag,attributes);
	const nodeList = document.querySelectorAll( query );

	nodeList[0].parentElement.insertBefore(wrapEl, nodeList[0]);

  nodeList.forEach( elem => {
    wrapEl.appendChild(elem);
  });
};

// Fetch jQuery specific data on a DOM node, to be used by getData()
export const expando = (item) => Object.keys(item).filter(key => key.match(/^jQuery/)).map(key => item[key]);

// Get data from a DOM node that was stored using jQuery.data() method
export const getData = (item, name) => {
	const data = expando(item).map(el => el[convertToCamel(name)]);
	if(data[0]){
		return data[0]
	}
};

// convert camelCase to camel-case
export const convertToKebab = (string) => string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

// conver camel-case to camelCase or CamelCase if pascal = true
export const convertToCamel = (string, pascal = false) => {
	const converter = (matches) => matches[1].toUpperCase();
	let result = string.replace(/(\-\w)/g, converter);

	if ( pascal === true ) {
		result = result.charAt(0).toUpperCase() + result.slice(1);
	}

	return result;
}

// autodetect case conversion
export const caseConverter = (string, pascal = false) => {
	if (string.match(/(\-\w)/)) {
    return convertToCamel(string, pascal)
  } else if (string.match(/([a-z])([A-Z])/g)) {
    return convertToKebab(string)
  } else {
    return string;
  }
} 
