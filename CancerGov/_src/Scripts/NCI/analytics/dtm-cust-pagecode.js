/**
  This is the code block used under the "CUstomize Page Code" header in Adobe DTM. 
  To update:
	1. Login to dtm.adobe.com and go to the machine
	2. Click on the gear for the "Adobe Analytics" tool
	3. Expand "Customize Page Code" 
	4. Click "Open Editor" and paste this code into the body
	5. Check the "After UI settings" radio button
 */

// *** Original DTM test snippet ***// 
// Get our custom s object from the analytics data element
waData = waData || document.getElementById('wa-data-element');

// Set s object pageload values and global variables based on the data element
s.channel = waData.dataset.channel;
s.events = waData.dataset.events;
s.prop10 = document.title;

// Dynamically props/eVars and values to the 's' object
for(dataAttr in waData.dataset) {
	if(dataAttr.includes('prop') || dataAttr.includes('evar'))
	{
		var pevKey = dataAttr.replace('v', 'V'); 
		var pevValue = waData.dataset[dataAttr].replace(/(^'+|'+$)/mg, '');
		s[pevKey] = pevValue;
	}
}
