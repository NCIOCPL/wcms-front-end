// Add logic to look for this variable first
waData = document.getElementById('wa-data-element');

s.channel = waData.dataset.channel;
s.events = waData.dataset.events;
propsArr = waData.dataset.props.split(';');
evarsArr = waData.dataset.evars.split(';');

// Dynamically add eVars and values to the 's' object
for(var i = 0; i < propsArr.length; i++) {
	myProp = propsArr[i].split('=');
	this.s[myProp[0]] = myProp[1].replace(/(^'+|'+$)/mg, '');
}




/*
<!-- ***** NCI Web Analytics - DO NOT ALTER ***** -->
<div id="wa-data-element" data-suites="nciglobal,ncienterprise" data-channel="NCI Homepage" data-pagename="" data-pagetype="" data-events="event1" data-props="prop3='/';prop6='Comprehensive Cancer Information';prop8='english';prop10=document.title;prop25='01/01/1980';prop44='NCI Homepage';" data-evars="evar44='NCI Homepage';" style="display:none;" />
*/



/*

var waData = document.getElementById('wa-data-element');

propsArr = waData.dataset.props.split(';');
evarsArr = waData.dataset.evars.split(';');
// TODO: add logic to set events, props, evars


// Dynamically add eVars and values to the 's' object
for(var i = 0; i < propsArr.length; i++) {
	myProp = propsArr[i].split('=');
	console.log("debug");
	console.log(myProp[1].replace(/(^'+|'+$)/mg, ''));

}
*/