// *** Original DTM test snippet ***// 
// Get our custom s object from the analytics data element
waData = waData || document.getElementById('wa-data-element');
var MAX_CUSTOMVAR_LEN = 100;

// Set s object pageload values and global variables based on the data element
s.channel = waData.dataset.channel;
s.events = waData.dataset.events;
s.prop10 = document.title;

// TODO: set other params
// TODO: build our array out of available events, not a fixed length
// Dynamically add eVars and values to the 's' object
for(var i = 1; i <= MAX_CUSTOMVAR_LEN; i++) {
	if(waData.dataset['prop' + i]) {
		s['prop' + i] = waData.dataset['prop' + i].replace(/(^'+|'+$)/mg, '');
	}
}

for(var i = 1; i <= MAX_CUSTOMVAR_LEN; i++) {
	if(waData.dataset['evar' + i]) {
		s['eVar' + i] = waData.dataset['evar' + i].replace(/(^'+|'+$)/mg, '');
	}
}
