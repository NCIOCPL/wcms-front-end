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
    const nodeList = node.querySelectorAll(selector)
    return nodeList ? Array.from(nodeList) : []
}