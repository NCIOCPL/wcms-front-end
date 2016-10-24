/* this is the Google JSAPI Library, pulled here to be one consolidated file. More info: http://code.google.com/apis/ajax/documentation */
if (!window['google']) {
window['google'] = {};
}
if (!window['google']['loader']) {
window['google']['loader'] = {};
google.loader.ServiceBase = 'https://www.google.com/uds';
google.loader.GoogleApisBase = 'https://ajax.googleapis.com/ajax';
google.loader.ApiKey = 'notsupplied';
google.loader.KeyVerified = true;
google.loader.LoadFailure = false;
google.loader.Secure = false;
google.loader.ClientLocation = {"latitude":38.91,"longitude":-77.018,"address":{"city":"Washington","region":"DC","country":"USA","country_code":"US"}};
google.loader.AdditionalParams = '';
(function() {var e=true,f=null,h=false,i=encodeURIComponent,j=window,k=google,m=undefined,n=document;function o(a,b){return a.load=b}var p="push",q="length",r="prototype",s="setTimeout",t="replace",v="charAt",w="loader",x="substring",A="ServiceBase",B="name",C="getTime",D="toLowerCase";function E(a){if(a in F)return F[a];return F[a]=navigator.userAgent[D]().indexOf(a)!=-1}var F={};function G(a,b){var c=function(){};c.prototype=b[r];a.K=b[r];a.prototype=new c}
function H(a,b){var c=a.w||[];c=c.concat(Array[r].slice.call(arguments,2));if(typeof a.r!="undefined")b=a.r;if(typeof a.q!="undefined")a=a.q;var d=function(){var g=c.concat(Array[r].slice.call(arguments));return a.apply(b,g)};d.w=c;d.r=b;d.q=a;return d}function I(a){var b=new Error(a);b.toString=function(){return this.message};return b}function J(a,b){for(var c=a.split(/\./),d=j,g=0;g<c[q]-1;g++){d[c[g]]||(d[c[g]]={});d=d[c[g]]}d[c[c[q]-1]]=b}function K(a,b,c){a[b]=c}if(!L)var L=J;if(!aa)var aa=K;k[w].s={};L("google.loader.callbacks",k[w].s);var M={},N={};k[w].eval={};L("google.loader.eval",k[w].eval);
o(k,function(a,b,c){var d=M[":"+a];if(d){if(c&&!c.language&&c.locale)c.language=c.locale;if(c&&typeof c.callback=="string"){var g=c.callback;if(g.match(/^[[\]A-Za-z0-9._]+$/)){g=j.eval(g);c.callback=g}}var l=c&&c.callback!=f;if(l&&!d.p(b))throw I("Module: '"+a+"' must be loaded before DOM onLoad!");else if(l)d.k(b,c)?j[s](c.callback,0):d.load(b,c);else d.k(b,c)||d.load(b,c)}else throw I("Module: '"+a+"' not found!");});L("google.load",k.load);k.J=function(a,b){b?ba(a):O(j,"load",a)};
L("google.setOnLoadCallback",k.J);function O(a,b,c){if(a.addEventListener)a.addEventListener(b,c,h);else if(a.attachEvent)a.attachEvent("on"+b,c);else{var d=a["on"+b];a["on"+b]=d!=f?ca([c,d]):c}}function ca(a){return function(){for(var b=0;b<a[q];b++)a[b]()}}var P=[];
function ba(a){if(P[q]==0){O(j,"load",R);if(!E("msie")&&!(E("safari")||E("konqueror"))&&E("mozilla")||j.opera)j.addEventListener("DOMContentLoaded",R,h);else if(E("msie"))n.write("<script defer onreadystatechange='google.loader.domReady()' src=//:><\/script>");else(E("safari")||E("konqueror"))&&j[s](S,10)}P[p](a)}k[w].D=function(){var a=j.event.srcElement;if(a.readyState=="complete"){a.onreadystatechange=f;a.parentNode.removeChild(a);R()}};L("google.loader.domReady",k[w].D);var da={loaded:e,complete:e};
function S(){if(da[n.readyState])R();else P[q]>0&&j[s](S,10)}function R(){for(var a=0;a<P[q];a++)P[a]();P.length=0}
k[w].d=function(a,b,c){if(c){var d;if(a=="script"){d=n.createElement("script");d.type="text/javascript";d.src=b}else if(a=="css"){d=n.createElement("link");d.type="text/css";d.href=b;d.rel="stylesheet"}var g=n.getElementsByTagName("head")[0];g||(g=n.body.parentNode.appendChild(n.createElement("head")));g.appendChild(d)}else if(a=="script")n.write('<script src="'+b+'" type="text/javascript"><\/script>');else a=="css"&&n.write('<link href="'+b+'" type="text/css" rel="stylesheet"></link>')};
L("google.loader.writeLoadTag",k[w].d);k[w].G=function(a){N=a};L("google.loader.rfm",k[w].G);k[w].I=function(a){for(var b in a)if(typeof b=="string"&&b&&b[v](0)==":"&&!M[b])M[b]=new T(b[x](1),a[b])};L("google.loader.rpl",k[w].I);k[w].H=function(a){if((a=a.specs)&&a[q])for(var b=0;b<a[q];++b){var c=a[b];if(typeof c=="string")M[":"+c]=new U(c);else{var d=new V(c[B],c.baseSpec,c.customSpecs);M[":"+d[B]]=d}}};L("google.loader.rm",k[w].H);k[w].loaded=function(a){M[":"+a.module].i(a)};
L("google.loader.loaded",k[w].loaded);J("google_exportSymbol",J);J("google_exportProperty",K);function U(a){this.a=a;this.n={};this.b={};this.j=e;this.c=-1}
U[r].f=function(a,b){var c="";if(b!=m){if(b.language!=m)c+="&hl="+i(b.language);if(b.nocss!=m)c+="&output="+i("nocss="+b.nocss);if(b.nooldnames!=m)c+="&nooldnames="+i(b.nooldnames);if(b.packages!=m)c+="&packages="+i(b.packages);if(b.callback!=f)c+="&async=2";if(b.other_params!=m)c+="&"+b.other_params}if(!this.j){if(k[this.a]&&k[this.a].JSHash)c+="&sig="+i(k[this.a].JSHash);var d=[];for(var g in this.n)g[v](0)==":"&&d[p](g[x](1));for(g in this.b)g[v](0)==":"&&d[p](g[x](1));c+="&have="+i(d.join(","))}return k[w][A]+
"/?file="+this.a+"&v="+a+k[w].AdditionalParams+c};U[r].u=function(a){var b=f;if(a)b=a.packages;var c=f;if(b)if(typeof b=="string")c=[a.packages];else if(b[q]){c=[];for(var d=0;d<b[q];d++)typeof b[d]=="string"&&c[p](b[d][t](/^\s*|\s*$/,"")[D]())}c||(c=["default"]);var g=[];for(d=0;d<c[q];d++)this.n[":"+c[d]]||g[p](c[d]);return g};
o(U[r],function(a,b){var c=this.u(b),d=b&&b.callback!=f;if(d)var g=new W(b.callback);for(var l=[],u=c[q]-1;u>=0;u--){var y=c[u];d&&g.z(y);if(this.b[":"+y]){c.splice(u,1);d&&this.b[":"+y][p](g)}else l[p](y)}if(c[q]){if(b&&b.packages)b.packages=c.sort().join(",");if(!b&&N[":"+this.a]!=f&&N[":"+this.a].versions[":"+a]!=f&&!k[w].AdditionalParams&&this.j){var z=N[":"+this.a];k[this.a]=k[this.a]||{};for(var Q in z.properties)if(Q&&Q[v](0)==":")k[this.a][Q[x](1)]=z.properties[Q];k[w].d("script",k[w][A]+
z.path+z.js,d);z.css&&k[w].d("css",k[w][A]+z.path+z.css,d)}else if(!b||!b.autoloaded)k[w].d("script",this.f(a,b),d);if(this.j){this.j=h;this.c=(new Date)[C]();if(this.c%100!=1)this.c=-1}for(u=0;u<l[q];u++){y=l[u];this.b[":"+y]=[];d&&this.b[":"+y][p](g)}}});
U[r].i=function(a){if(this.c!=-1){X("al_"+this.a,"jl."+((new Date)[C]()-this.c),e);this.c=-1}for(var b=0;b<a.components[q];b++){this.n[":"+a.components[b]]=e;var c=this.b[":"+a.components[b]];if(c){for(var d=0;d<c[q];d++)c[d].C(a.components[b]);delete this.b[":"+a.components[b]]}}X("hl",this.a)};U[r].k=function(a,b){return this.u(b)[q]==0};U[r].p=function(){return e};function W(a){this.B=a;this.l={};this.o=0}W[r].z=function(a){this.o++;this.l[":"+a]=e};
W[r].C=function(a){if(this.l[":"+a]){this.l[":"+a]=h;this.o--;this.o==0&&j[s](this.B,0)}};function V(a,b,c){this.name=a;this.A=b;this.m=c;this.t=this.g=h;this.h=[];k[w].s[this[B]]=H(this.i,this)}G(V,U);o(V[r],function(a,b){var c=b&&b.callback!=f;if(c){this.h[p](b.callback);b.callback="google.loader.callbacks."+this[B]}else this.g=e;if(!b||!b.autoloaded)k[w].d("script",this.f(a,b),c);X("el",this[B])});V[r].k=function(a,b){return b&&b.callback!=f?this.t:this.g};V[r].i=function(){this.t=e;for(var a=0;a<this.h[q];a++)j[s](this.h[a],0);this.h=[]};
var Y=function(a,b){return a.string?i(a.string)+"="+i(b):a.regex?b[t](/(^.*$)/,a.regex):""};V[r].f=function(a,b){return this.F(this.v(a),a,b)};
V[r].F=function(a,b,c){var d="";if(a.key)d+="&"+Y(a.key,k[w].ApiKey);if(a.version)d+="&"+Y(a.version,b);var g=k[w].Secure&&a.ssl?a.ssl:a.uri;if(c!=f)for(var l in c)if(a.params[l])d+="&"+Y(a.params[l],c[l]);else if(l=="other_params")d+="&"+c[l];else if(l=="base_domain")g="http://"+c[l]+a.uri[x](a.uri.indexOf("/",7));k[this[B]]={};if(g.indexOf("?")==-1&&d)d="?"+d[x](1);return g+d};V[r].p=function(a){return this.v(a).deferred};
V[r].v=function(a){if(this.m)for(var b=0;b<this.m[q];++b){var c=this.m[b];if((new RegExp(c.pattern)).test(a))return c}return this.A};function T(a,b){this.a=a;this.e=b;this.g=h}G(T,U);o(T[r],function(a,b){this.g=e;k[w].d("script",this.f(a,b),h)});T[r].k=function(){return this.g};T[r].i=function(){};T[r].f=function(a,b){if(!this.e.versions[":"+a]){if(this.e.aliases){var c=this.e.aliases[":"+a];if(c)a=c}if(!this.e.versions[":"+a])throw I("Module: '"+this.a+"' with version '"+a+"' not found!");}var d=k[w].GoogleApisBase+"/libs/"+this.a+"/"+a+"/"+this.e.versions[":"+a][b&&b.uncompressed?"uncompressed":"compressed"];X("el",this.a);return d};
T[r].p=function(){return h};var ea=h,Z=[],fa=(new Date)[C](),X=function(a,b,c){if(!ea){O(j,"unload",ga);ea=e}if(c){if(!k[w].Secure&&(!k[w].Options||k[w].Options.csi===h)){a=a[D]()[t](/[^a-z0-9_.]+/g,"_");b=b[D]()[t](/[^a-z0-9_.]+/g,"_");var d="https://csi.gstatic.com/csi?s=uds&v=2&action="+i(a)+"&it="+i(b);j[s](H($,f,d),10000)}}else{Z[p]("r"+Z[q]+"="+i(a+(b?"|"+b:"")));j[s](ga,Z[q]>5?0:15000)}},ga=function(){if(Z[q]){$(k[w][A]+"/stats?"+Z.join("&")+"&nc="+(new Date)[C]()+"_"+((new Date)[C]()-fa));Z.length=0}},$=function(a){var b=
new Image,c=ha++;ia[c]=b;b.onload=b.onerror=function(){delete ia[c]};b.src=a;b=f},ia={},ha=0;J("google.loader.recordStat",X);J("google.loader.createImageForLogging",$);

}) ();google.loader.rm({"specs":["feeds",{"name":"books","baseSpec":{"uri":"https://books.google.com/books/api.js","ssl":null,"key":{"string":"key"},"version":{"string":"v"},"deferred":true,"params":{"callback":{"string":"callback"},"language":{"string":"hl"}}}},{"name":"friendconnect","baseSpec":{"uri":"https://www.google.com/friendconnect/script/friendconnect.js","ssl":null,"key":{"string":"key"},"version":{"string":"v"},"deferred":false,"params":{}}},"spreadsheets","gdata","visualization",{"name":"sharing","baseSpec":{"uri":"https://www.google.com/s2/sharing/js","ssl":null,"key":{"string":"key"},"version":{"string":"v"},"deferred":false,"params":{"language":{"string":"hl"}}}},"search",{"name":"maps","baseSpec":{"uri":"https://maps.google.com/maps?file\u003dgoogleapi","ssl":"https://maps-api-ssl.google.com/maps?file\u003dgoogleapi","key":{"string":"key"},"version":{"string":"v"},"deferred":true,"params":{"callback":{"regex":"callback\u003d$1\u0026async\u003d2"},"language":{"string":"hl"}}},"customSpecs":[{"uri":"https://maps.google.com/maps/api/js","ssl":null,"key":{"string":"key"},"version":{"string":"v"},"deferred":true,"params":{"callback":{"string":"callback"},"language":{"string":"hl"}},"pattern":"^(3|3..*)$"}]},"language","earth",{"name":"annotations","baseSpec":{"uri":"https://www.google.com/reviews/scripts/annotations_bootstrap.js","ssl":null,"key":{"string":"key"},"version":{"string":"v"},"deferred":true,"params":{"callback":{"string":"callback"},"language":{"string":"hl"},"country":{"string":"gl"}}}},"ads","elements"]});
google.loader.rfm({":feeds":{"versions":{":1":"1",":1.0":"1"},"path":"/api/feeds/1.0/8e09eed7fc0dd59c80503ea502548a85/","js":"default+en.I.js","css":"default.css","properties":{":JSHash":"8e09eed7fc0dd59c80503ea502548a85",":Version":"1.0"}},":search":{"versions":{":1":"1",":1.0":"1"},"path":"/api/search/1.0/d96605db404c4df12e9f4b815d8bf11e/","js":"default+en.I.js","css":"default.css","properties":{":JSHash":"d96605db404c4df12e9f4b815d8bf11e",":NoOldNames":false,":Version":"1.0"}},":language":{"versions":{":1":"1",":1.0":"1"},"path":"/api/language/1.0/1c7d3f9786a25ae9e8dfe368fb808a79/","js":"default+en.I.js","properties":{":JSHash":"1c7d3f9786a25ae9e8dfe368fb808a79",":Version":"1.0"}},":annotations":{"versions":{":1":"1",":1.0":"1"},"path":"/api/annotations/1.0/eed21f515e4557e7713a9eadbf24a941/","js":"default+en.I.js","properties":{":JSHash":"eed21f515e4557e7713a9eadbf24a941",":Version":"1.0"}},":earth":{"versions":{":1":"1",":1.0":"1"},"path":"/api/earth/1.0/2e6203e63ed613b9e55441aa9eb70e0a/","js":"default.I.js","properties":{":JSHash":"2e6203e63ed613b9e55441aa9eb70e0a",":Version":"1.0"}},":ads":{"versions":{":1":"1",":1.0":"1"},"path":"/api/ads/1.0/31f308c7bb13936126a472dbd588a671/","js":"default.I.js","properties":{":JSHash":"31f308c7bb13936126a472dbd588a671",":Version":"1.0"}}});
google.loader.rpl({":scriptaculous":{"versions":{":1.8.2":{"uncompressed":"scriptaculous.js","compressed":"scriptaculous.js"},":1.8.1":{"uncompressed":"scriptaculous.js","compressed":"scriptaculous.js"}},"aliases":{":1.8":"1.8.2",":1":"1.8.2"}},":yui":{"versions":{":2.6.0":{"uncompressed":"build/yuiloader/yuiloader.js","compressed":"build/yuiloader/yuiloader-min.js"},":2.7.0":{"uncompressed":"build/yuiloader/yuiloader.js","compressed":"build/yuiloader/yuiloader-min.js"}},"aliases":{":2":"2.7.0",":2.7":"2.7.0",":2.6":"2.6.0"}},":swfobject":{"versions":{":2.1":{"uncompressed":"swfobject_src.js","compressed":"swfobject.js"},":2.2":{"uncompressed":"swfobject_src.js","compressed":"swfobject.js"}},"aliases":{":2":"2.2"}},":ext-core":{"versions":{":3.0.0":{"uncompressed":"ext-core-debug.js","compressed":"ext-core.js"}},"aliases":{":3":"3.0.0",":3.0":"3.0.0"}},":mootools":{"versions":{":1.2.1":{"uncompressed":"mootools.js","compressed":"mootools-yui-compressed.js"},":1.2.2":{"uncompressed":"mootools.js","compressed":"mootools-yui-compressed.js"},":1.11":{"uncompressed":"mootools.js","compressed":"mootools-yui-compressed.js"}},"aliases":{":1":"1.11"}},":jqueryui":{"versions":{":1.7.2":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.6.0":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.7.0":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.7.1":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.5.3":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.5.2":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"}},"aliases":{":1.7":"1.7.2",":1":"1.7.2",":1.6":"1.6.0",":1.5":"1.5.3"}},":prototype":{"versions":{":1.6.0.2":{"uncompressed":"prototype.js","compressed":"prototype.js"},":1.6.0.3":{"uncompressed":"prototype.js","compressed":"prototype.js"}},"aliases":{":1":"1.6.0.3",":1.6":"1.6.0.3"}},":jquery":{"versions":{":1.2.3":{"uncompressed":"jquery.js","compressed":"jquery.min.js"},":1.3.1":{"uncompressed":"jquery.js","compressed":"jquery.min.js"},":1.3.0":{"uncompressed":"jquery.js","compressed":"jquery.min.js"},":1.3.2":{"uncompressed":"jquery.js","compressed":"jquery.min.js"},":1.2.6":{"uncompressed":"jquery.js","compressed":"jquery.min.js"}},"aliases":{":1":"1.3.2",":1.3":"1.3.2",":1.2":"1.2.6"}},":dojo":{"versions":{":1.2.3":{"uncompressed":"dojo/dojo.xd.js.uncompressed.js","compressed":"dojo/dojo.xd.js"},":1.3.1":{"uncompressed":"dojo/dojo.xd.js.uncompressed.js","compressed":"dojo/dojo.xd.js"},":1.1.1":{"uncompressed":"dojo/dojo.xd.js.uncompressed.js","compressed":"dojo/dojo.xd.js"},":1.3.0":{"uncompressed":"dojo/dojo.xd.js.uncompressed.js","compressed":"dojo/dojo.xd.js"},":1.2.0":{"uncompressed":"dojo/dojo.xd.js.uncompressed.js","compressed":"dojo/dojo.xd.js"}},"aliases":{":1":"1.3.1",":1.3":"1.3.1",":1.2":"1.2.3",":1.1":"1.1.1"}}});
}


  google.load("swfobject", "2.1");

//these functions are for the youtube player


function onYouTubePlayerReady(playerId) {
  ytplayer = document.getElementById("myytplayer");
  setInterval(updateytplayerInfo, 250);
  updateytplayerInfo();
  ytplayer.addEventListener("onStateChange", "onytplayerStateChange");
  ytplayer.addEventListener("onError", "onPlayerError");
}

 function onytplayerStateChange(newState) {
   setytplayerState(newState);
 }

 function onPlayerError(errorCode) {
   alert("An error occured: " + errorCode);
 }

 function updateytplayerInfo() {
   
 }

 // functions for the api calls
 function loadNewVideo(id, startSeconds) {
   if (ytplayer) {
     ytplayer.loadVideoById(id, parseInt(startSeconds));
   }
 }

 function cueNewVideo(id, startSeconds) {
   if (ytplayer) {
     ytplayer.cueVideoById(id, startSeconds);
   }
 }

 function play() {
   if (ytplayer) {
     ytplayer.playVideo();
   }
 }

 function pause() {
   if (ytplayer) {
     ytplayer.pauseVideo();
   }
 }

 function stop() {
   if (ytplayer) {
     ytplayer.stopVideo();
   }
 }

 function getPlayerState() {
   if (ytplayer) {
     return ytplayer.getPlayerState();
   }
 }

 function seekTo(seconds) {
   if (ytplayer) {
     ytplayer.seekTo(seconds, true);
   }
 }

 function getBytesLoaded() {
   if (ytplayer) {
     return ytplayer.getVideoBytesLoaded();
   }
 }

 function getBytesTotal() {
   if (ytplayer) {
     return ytplayer.getVideoBytesTotal();
   }
 }

 function getCurrentTime() {
   if (ytplayer) {
     return ytplayer.getCurrentTime();
   }
 }

 function getDuration() {
   if (ytplayer) {
     return ytplayer.getDuration();
   }
 }

 function getStartBytes() {
   if (ytplayer) {
     return ytplayer.getVideoStartBytes();
   }
 }

 function mute() {
   if (ytplayer) {
     ytplayer.mute();
   }
 }

 function unMute() {
   if (ytplayer) {
     ytplayer.unMute();
   }
 }
 
 function getEmbedCode() {
   alert(ytplayer.getVideoEmbedCode());
 }

 function getVideoUrl() {
   alert(ytplayer.getVideoUrl());
 }
 
 function setVolume(newVolume) {
   if (ytplayer) {
     ytplayer.setVolume(newVolume);
   }
 }

 function getVolume() {
   if (ytplayer) {
     return ytplayer.getVolume();
   }
 }

 function clearVideo() {
   if (ytplayer) {
     ytplayer.clearVideo();
   }
 }
