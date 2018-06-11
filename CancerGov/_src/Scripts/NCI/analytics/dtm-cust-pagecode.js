/* SiteCatalyst code version: H.26.2
Copyright 1996-2015 Adobe, Inc. All Rights Reserved
More info available at http://www.omniture.com */
/* NCI Web Analytics Program - for information or support email: NCIOCEWebAnalytics@mail.nih.gov */

/************************** CONFIG SECTION **************************/
/* Config Section Version - SHARED_2015-09-16 */
/* Specify the life time of the cookie in seconds, or */
/* set to "Session" to turn off persistent cookies.   */
s.cookieLifetime="";
/* Conversion Config */
s.currencyCode="USD";
/* Language Config */
s.charSet="UTF-8";
/* Link Tracking Config */
s.trackDownloadLinks=true;
s.trackExternalLinks=true;
s.trackInlineStats=true;
s.linkDownloadFileTypes="avi,doc,docx,epub,exe,gif,jpg,ics,mobi,mov,mp3,mpg,pdf,png,ppt,pptx,rss,wav,wmv,xls,xlsx,xml,zip";
s.linkInternalFilters="javascript:,cancer.gov";
s.linkLeaveQueryString=false;
s.linkTrackVars="None";
s.linkTrackEvents="None";
s.useForcedLinkTracking=true
s.forcedLinkTrackingTimeout=750

//time parting configuration 
//US
s._tpDST = {
2012:'3/11,11/4',
2013:'3/10,11/3',
2014:'3/9,11/2',
2015:'3/8,11/1',
2016:'3/13,11/6',
2017:'3/12,11/5',
2018:'3/11,11/4',
2019:'3/10,11/3'}

//set the font size variable
s.prop42="Normal";

// Domain override
var localPageName = location.hostname.toLowerCase() + location.pathname.toLowerCase();

if (typeof pageNameOverride!="undefined")
    localPageName = pageNameOverride;

if (typeof linkInternalFiltersOverride!="undefined")
    s.linkInternalFilters=linkInternalFiltersOverride;  
    
var canonicalLink = null;
var links = document.getElementsByTagName("link");
for (var i = 0; i < links.length; i++) {
    if( links[i].getAttribute("rel") == "canonical")
    {
        canonicalLink = links[i].href;
        break;
    }
}
if(canonicalLink)
{
    canonicalLink = canonicalLink.toLowerCase();

    // Remove http
    if(canonicalLink.indexOf("http://") >= 0)
      canonicalLink = canonicalLink.substring(canonicalLink.indexOf("http://")+7);

    // Remove https
    if(canonicalLink.indexOf("https://") >= 0)
      canonicalLink = canonicalLink.substring(canonicalLink.indexOf("https://")+8);

    // Remove query parameters
    if(canonicalLink.indexOf("?") > 0)
      canonicalLink = canonicalLink.substring(0, canonicalLink.indexOf("?"));

    localPageName = canonicalLink;
}

// Determine if patient or healthprofessional version
// set prop7 and eVar7 to version and add value to 
// addToLocalPageName
var version = semphonicGetQueryParm('version');
var addToLocalPageName = "";
var omversion = "";
if(localPageName.indexOf("patient") >= 0 )
{
    omversion = "patient";
}
else if(localPageName.indexOf("healthprofessional") >= 0 )
{
    omversion = "healthprofessional";
}
else
{
    if (version) 
    {
        if( version.toLowerCase() == "patient"  
            || version == "patients"
            || version == "0" )
        {
            omversion = "patient";
            addToLocalPageName = CommaList(addToLocalPageName,"Patient");
        }
        else if( version.toLowerCase() == "healthprofessional" 
            || version.toLowerCase() == "healthprofessionals"
            || version == "1" )
        {
            omversion = "healthprofessional";
            addToLocalPageName = CommaList(addToLocalPageName,"HealthProfessional");
        }
    }
}
s.prop7=s.eVar7=omversion;

// if dictionary, define addToLocalPageName
if(localPageName.indexOf("dictionaries") > 0 || 
   localPageName.indexOf("diccionario")> 0)
{
    if (caseInsensitiveGetQueryParm('expand'))
        addToLocalPageName = CommaList(addToLocalPageName,'AlphaNumericBrowse');
    else if (localPageName.indexOf("/def/") >= 0 )
        addToLocalPageName = CommaList(addToLocalPageName,'Definition');
}

// retain page query parameter value
var pageNum = caseInsensitiveGetQueryParm('page');
if (pageNum)
    addToLocalPageName = CommaList(addToLocalPageName,"Page " + pageNum.toString());

// add any additional information to localPageName and
// set pageName and eVar1 to localPageName
if(addToLocalPageName.length > 0)
    localPageName += " - " + addToLocalPageName;
s.pageName=s.eVar1=localPageName;

var fullURL = document.URL;
if(fullURL.length > 100)
{
    s.prop1 = fullURL.substring(0,100);
    s.prop2 = fullURL.substring(100);
}
else
    s.prop1 = fullURL;

// Set prop8 and eVar3 to "english" unless "espanol" is in the url 
// or "lang=spanish" or "language=spanish" query parameters exist
var language = "english";
if(localPageName.indexOf("espanol") >= 0) 
    language = "spanish";
if(caseInsensitiveGetQueryParm('lang')=='spanish')
    language = "spanish";
if(caseInsensitiveGetQueryParm('language')=='spanish')
    language = "spanish";
s.prop8=s.eVar2=language;

// Set prop26 to Time Stamp format: <year>|<month>|<day>|<hour>
var now = new Date();
s.prop26 = now.getFullYear() + "|" + (now.getMonth() + 1) + "|" + now.getDate() + "|" + now.getHours();

/* Plugin Config */
s.usePlugins=true

/* Add calls to plugins here */
function s_doPlugins(s) {

    /* Set prop15 to either 'protoclsearchid' or 'PrintID' (depends on the page being loaded) */
	if(s.prop15 == null && s.eVar15 == null) 
    {
        s.prop15=s.eVar15= s.getQueryParam('protocolsearchid') ? s.getQueryParam('protocolsearchid') : s.getQueryParam('PrintID');
    }

    /* Set the campagin value if there are any matching queries in the URL*/
    var sCampaign;
    var hasUtm = false;
    var utmArr = ['utm_source','utm_medium','utm_campaign','utm_term','utm_content'];
    var utmJoin  = [];
    sCampaign = s.getQueryParam('cid');
    if (!sCampaign) {
        sCampaign = s.getQueryParam('gclid');
        if (!sCampaign) {
            for (i = 0; i < utmArr.length; i++) {
                val = s.getQueryParam(utmArr[i]); 
                if(val) {
                    hasUtm = true;
                }
                else {
                    val = '_';
                }
                utmJoin.push(val);
            }
            if(hasUtm) {
                sCampaign = utmJoin.join('|');
            }
        }
    }

    // retrieve urs values
    if(typeof NCIAnalytics !== 'undefined') {
    	if(typeof NCIAnalytics.urs !== 'undefined') {
			window.urs = NCIAnalytics.urs.get({
				campaign: sCampaign,
				referrer: document.referrer
			});
			// console.info('urs', JSON.stringify(window.urs, null, 2));    

			s.eVar54 = urs.value;
			s.prop51 = (s.eVar54) ? 'D=v54' : '';
			s.eVar55 = urs.seoKeyword;
			s.eVar56 = urs.ppcKeyword;
			s.eVar57 = urs.stacked;
		}
    }

    s.eVar35 = sCampaign;
    s.campaign = s.getValOnce(sCampaign,'s_campaign',30);

    /* Force Custom Variables to Lower Case */
    //s.prop6 = makeLowerCase(s.prop6);
    s.prop7 = makeLowerCase(s.prop7);
    s.eVar7= makeLowerCase(s.eVar7);
    //s.prop10 = makeLowerCase(s.prop10);
    s.prop14 = makeLowerCase(s.prop14);
    s.eVar14= makeLowerCase(s.eVar14);
    s.prop17 = makeLowerCase(s.prop17);
    s.eVar17= makeLowerCase(s.eVar17);
    s.prop18 = makeLowerCase(s.prop18);
    s.eVar18= makeLowerCase(s.eVar18);
    s.prop19 = makeLowerCase(s.prop19);
    s.eVar19 = makeLowerCase(s.eVar19);
    s.prop20 = makeLowerCase(s.prop20);
    s.eVar20 = makeLowerCase(s.eVar20);
    s.prop21 = makeLowerCase(s.prop21);
    s.eVar21 = makeLowerCase(s.eVar21);
    s.prop22 = makeLowerCase(s.prop22);
    s.eVar23 = makeLowerCase(s.eVar23);
    s.eVar24 = makeLowerCase(s.eVar24);
//////////
// SOCIAL
//////////
    s.socialPlatforms('eVar74');

    s.maxDelay='1000';  //max time to wait for 3rd party api response in milliseconds
    s.loadModule("Integrate")
    s.Integrate.onLoad=function(s,m){
        s.socialAuthors();
        //add other integration module dependent functions here
    };

    /* Previous Page */
    s.prop61 = s.getPreviousValue(s.pageName, 'gpv_pn', "");
    //s.prop61=s.getPreviousValue(s.pageName,'gpv_pn','event1');

    // Set the variables for the time parting ('n' for northern hemisphere, '-5" for EST) and set to prop29 for time parting
    var tp = s.getTimeParting('n','-5');
    s.prop29 = tp;

    // Set prop64 for percent page viewed - if 0, then set to 'zero'
    s.prop64=s.getPercentPageViewed();
    s.prop64=(s.prop64=="0") ? "zero" : s.prop64;

    // Set prop65 to get the initial load time of the page (for use in the page load speed plugin)
    var loadTime = s_getLoadTime();
    s.prop65 = loadTime;
    if(s.events && s.events.length > 0){
        s.events += ",";
    }
    if(s.events == null)
        s.events = '';
    s.events += ["event47=" +  loadTime];
}
s.doPlugins=s_doPlugins 

/* Functions */
function CommaList(commaList, addValue)
{
    if (commaList.length > 0)
        return commaList + ", " + addValue;
    else 
        return addValue;
}

function makeLowerCase(value)
{
    if(value == null || typeof(value) == 'undefined' )
        return value;
    else     
        return value.toLowerCase();
}

function caseInsensitiveGetQueryParm(qp)
{
    var fullurl = location.search.toLowerCase();
    var cipos = fullurl.indexOf(qp + "=");
    if (cipos == -1)
        return null;
    cipos += qp.length+1;
    if (cipos >= fullurl.length)
        return null;
    var ciendPos1 = fullurl.indexOf("&", cipos);
    var ciendPos2 = fullurl.indexOf("#", cipos);
    if (ciendPos1 < 0 && ciendPos2 < 0)
    {
        return unescape(fullurl.substring(cipos));
    }
    var ciendPos = ciendPos1;
    if (ciendPos < 0 || (ciendPos2 >= 0 && ciendPos2 < ciendPos1))
        ciendPos = ciendPos2;

    return unescape(fullurl.substring(cipos, ciendPos));
}

function semphonicGetQueryParm(qp)
{
    var pos = document.URL.indexOf(qp + "=");
    if (pos == -1)
        return null;
    pos += qp.length+1;
    if (pos >= document.URL.length)
        return null;
    var endPos1 = document.URL.indexOf("&", pos);
    var endPos2 = document.URL.indexOf("#", pos);
    if (endPos1 < 0 && endPos2 < 0)
    {
        return unescape(document.URL.substring(pos));
    }
    var endPos = endPos1;
    if (endPos < 0 || (endPos2 >= 0 && endPos2 < endPos1))
        endPos = endPos2;

    return unescape(document.URL.substring(pos, endPos));
}

/** Custom Plugin: Dynamically Create s.hier variable*/
function set_hier1() {
    h1 = new String(document.location.host + document.location.pathname);
    if (h1.charAt(h1.length - 1) == "/") {
        var temp = new String();
        for (var i = 0; i < h1.length - 1; i++) {
            temp += h1.charAt(i);
        }
        h1 = temp;
    }
    var intMatch = h1.indexOf("/");
    while (intMatch != -1) {
        h1 = h1.replace("/", "|");
        intMatch = h1.indexOf("/");
    }
    return h1;
}

/* Dynamically Capture Hierarchy Variable via Custom Plugin */
s.hier1 = set_hier1();

/* Track scroll percentage of previous page / percent visible on current page */
if(typeof NCIAnalytics !== 'undefined') {
    if(typeof NCIAnalytics.cookieRead === 'function') {
        s.prop48=NCIAnalytics.cookieRead("nci_scroll");
    }
}

/* Set eVar for browser width on page load */
s.eVar5 = getViewPort(); 
 
/* Set a name for the view port based on the current screen size */
function getViewPort() {
    var screen = '';
    if(window.innerWidth)
    {
        if (window.innerWidth > 1440) { screen = "Extra wide"; }
        else if (window.innerWidth > 1024) { screen = "Desktop"; }
        else if (window.innerWidth > 640) { screen = "Tablet"; }
        else { screen = "Mobile"; }
    }
    return screen;
}


/************************** PLUGINS SECTION *************************/
/* You may insert any plugins you wish to use here.                 */
/*
 * Plugin: getQueryParam 2.3
 */
s.getQueryParam=new Function("p","d","u",""
+"var s=this,v='',i,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.locati"
+"on);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0?p"
+".length:i;t=s.p_gpv(p.substring(0,i),u+'');if(t){t=t.indexOf('#')>-"
+"1?t.substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substring(i="
+"=p.length?i:i+1)}return v");
s.p_gpv=new Function("k","u",""
+"var s=this,v='',i=u.indexOf('?'),q;if(k&&i>-1){q=u.substring(i+1);v"
+"=s.pt(q,'&','p_gvf',k)}return v");
s.p_gvf=new Function("t","k",""
+"if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T"
+"rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s."
+"epa(v)}return ''");
/*
 * Plugin: getValOnce_v1.0
 */
s.getValOnce=new Function("v","c","e",""
+"var s=this,a=new Date,v=v?v:v='',c=c?c:c='s_gvo',e=e?e:0,k=s.c_r(c"
+");if(v){a.setTime(a.getTime()+e*86400000);s.c_w(c,v,e?a:0);}return"
+" v==k?'':v");

/*
 * Copyright 2011-2013 Adobe Systems, Inc.
 * s_getLoadTime v1.36 - Get page load time in units of 1/10 seconds
 */
function s_getLoadTime()
{
    if(!window.s_loadT)
    {
        var b=new Date().getTime(),o=window.performance?performance.timing:0,a=o?o.requestStart:window.inHeadTS||0;s_loadT=a?Math.round((b-a)/100):''
    }
    return s_loadT
}

/*
 * Plugin: getTimeParting 3.4
 */
s.getTimeParting=new Function("h","z",""
+"var s=this,od;od=new Date('1/1/2000');if(od.getDay()!=6||od.getMont"
+"h()!=0){return'Data Not Available';}else{var H,M,D,U,ds,de,tm,da=['"
+"Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturda"
+"y'],d=new Date();z=z?z:0;z=parseFloat(z);if(s._tpDST){var dso=s._tp"
+"DST[d.getFullYear()].split(/,/);ds=new Date(dso[0]+'/'+d.getFullYea"
+"r());de=new Date(dso[1]+'/'+d.getFullYear());if(h=='n'&&d>ds&&d<de)"
+"{z=z+1;}else if(h=='s'&&(d>de||d<ds)){z=z+1;}}d=d.getTime()+(d.getT"
+"imezoneOffset()*60000);d=new Date(d+(3600000*z));H=d.getHours();M=d"
+".getMinutes();M=(M<10)?'0'+M:M;D=d.getDay();U=' AM';if(H>=12){U=' P"
+"M';H=H-12;}if(H==0){H=12;}D=da[D];tm=H+':'+M+U;return(tm+'|'+D);}");

/*
* Plugin: getPercentPageViewed v1.x
* This code has been modified from the original version distributed
* by Omniture and will not be supported by Omniture in any way
*/
s.getPercentPageViewed=new Function("",""
+"var s=this;if(typeof(s.linkType)=='undefined'||s.linkType=='e'){var"
+" v=s.c_r('s_ppv');s.c_w('s_ppv',0);return v;}");
s.getPPVCalc=new Function("",""
+"var dh=Math.max(Math.max(s.d.body.scrollHeight,s.d.documentElement."
+"scrollHeight),Math.max(s.d.body.offsetHeight,s.d.documentElement.of"
+"fsetHeight),Math.max(s.d.body.clientHeight,s.d.documentElement.clie"
+"ntHeight)),vph=s.d.clientHeight||Math.min(s.d.documentElement.clien"
+"tHeight,s.d.body.clientHeight),st=s.wd.pageYOffset||(s.wd.document."
+"documentElement.scrollTop||s.wd.document.body.scrollTop),vh=st+vph,"
+"pv=Math.round(vh/dh*100),cv=s.c_r('s_ppv'),cpi=cv.indexOf('|'),cpv="
+"'',ps='';if(cpi!=-1){cpv=cv.substring(0,cpi);ps=parseInt(cv.substri"
+"ng(cpi+1));}else{cpv=ps=0;}if(pv<=100){if(pv>parseInt(cpv)){ps=pv-M"
+"ath.round(vph/dh*100);s.c_w('s_ppv',pv+'|'+ps);}}else{s.c_w('s_ppv'"
+",'');}");
s.getPPVSetup=new Function("",""
+"var s=this;if(s.wd.addEventListener){s.wd.addEventListener('load',s"
+".getPPVCalc,false);s.wd.addEventListener('scroll',s.getPPVCalc,fals"
+"e);s.wd.addEventListener('resize',s.getPPVCalc,false);}else if(s.wd"
+".attachEvent){s.wd.attachEvent('onload',s.getPPVCalc);s.wd.attachEv"
+"ent('onscroll',s.getPPVCalc);s.wd.attachEvent('onresize',s.getPPVCa"
+"lc);}");
s.getPPVSetup();

/******************************
 * Plugin: socialPlatforms v1.0
 ******************************/
s.socialPlatforms=new Function("a",""
+"var s=this,g,K,D,E,F;g=s.referrer?s.referrer:document.referrer;g=g."
+"toLowerCase();K=s.split(s.socPlatList,'|');for(i=0;i<K.length;i++){"
+"D=s.split(K[i],'>');if(g.indexOf(D[0])!=-1){if(a){s[a]=D[1];}}}");

s.socPlatList="facebook.com>Facebook|twitter.com>Twitter|t.co/>Twitter|youtube.com>Youtube|clipmarks.com>Clipmarks|dailymotion.com>Dailymotion|delicious.com>Delicious|digg.com>Digg|diigo.com>Diigo|flickr.com>Flickr|flixster.com>Flixster|fotolog.com>Fotolog|friendfeed.com>FriendFeed|google.com/buzz>Google Buzz|buzz.googleapis.com>Google Buzz|plus.google.com>Google+|hulu.com>Hulu|identi.ca>identi.ca|ilike.com>iLike|intensedebate.com>IntenseDebate|myspace.com>MySpace|newsgator.com>Newsgator|photobucket.com>Photobucket|plurk.com>Plurk|slideshare.net>SlideShare|smugmug.com>SmugMug|stumbleupon.com>StumbleUpon|tumblr.com>Tumblr|vimeo.com>Vimeo|wordpress.com>WordPress|xanga.com>Xanga|metacafe.com>Metacafe|";

/********************  
 * socialAuthors v1.3
 ********************/
s.socialAuthors=new Function("",""
+"var s=this,g,tco;g=s.referrer?s.referrer:document.referrer;if(g.ind"
+"exOf('t.co/')!=-1){s.tco=escape(s.split(g,'/')[3]);s.Integrate.add("
+"'SocialAuthor');s.Integrate.SocialAuthor.tEvar='eVar75';s.Integrate"
+".SocialAuthor.get('search.twitter.com/search.json?var=[VAR]&"
+"callback=s.twitterSearch&q=http%3A%2F%2Ft.co%2F'+s.tco);s.Integrate"
+".SocialAuthor.delay();s.Integrate.SocialAuthor.setVars=function(s,p"
+"){s[p.tEvar]=s.user;}}");
s.twitterSearch=new Function("obj",""
+"var s=this,txt,txtRT,txtEnd,txtAuthor;txt=obj.results[0].text;txtRT"
+"=txt.indexOf('RT @');if(txtRT!=-1){txtEnd=txt.indexOf(' ',txtRT+4);"
+"txtAuthor=txt.substring(txtRT+4,txtEnd);s.user=txtAuthor.replace(':"
+"','');}else{s.user=obj.results[0].from_user;}s.Integrate.SocialAuth"
+"or.ready();");

/********************
/* Module: Integrate 
/********************/
s.m_Integrate_c="var m=s.m_i('Integrate');m.add=function(n,o){var m=this,p;if(!o)o='s_Integrate_'+n;if(!s.wd[o])s.wd[o]=new Object;m[n]=new Object;p=m[n];p._n=n;p._m=m;p._c=0;p._d=0;p.disable=0;p.get"
+"=m.get;p.delay=m.delay;p.ready=m.ready;p.beacon=m.beacon;p.script=m.script;m.l[m.l.length]=n};m._g=function(t){var m=this,s=m.s,i,p,f=(t?'use':'set')+'Vars',tcf;for(i=0;i<m.l.length;i++){p=m[m.l[i]"
+"];if(p&&!p.disable&&p[f]){if(s.apv>=5&&(!s.isopera||s.apv>=7)){tcf=new Function('s','p','f','var e;try{p[f](s,p)}catch(e){}');tcf(s,p,f)}else p[f](s,p)}}};m._t=function(){this._g(1)};m._fu=function"
+"(p,u){var m=this,s=m.s,x,v,tm=new Date;if(u.toLowerCase().substring(0,4) != 'http')u='http://'+u;if(s.ssl)u=s.rep(u,'http:','https:');p.RAND=Math&&Math.random?Math.floor(Math.random()*1000000000000"
+"0):tm.getTime();p.RAND+=Math.floor(tm.getTime()/10800000)%10;for(x in p)if(x&&x.substring(0,1)!='_'&&(!Object||!Object.prototype||!Object.prototype[x])){v=''+p[x];if(v==p[x]||parseFloat(v)==p[x])u="
+"s.rep(u,'['+x+']',s.rep(escape(v),'+','%2B'))}return u};m.get=function(u,v){var p=this,m=p._m;if(!p.disable){if(!v)v='s_'+m._in+'_Integrate_'+p._n+'_get_'+p._c;p._c++;p.VAR=v;p._d++;m.s.loadModule("
+"'Integrate:'+v,m._fu(p,u),0,1,p._n)}};m.delay=function(){var p=this;if(p._d<=0)p._d=1};m.ready=function(){var p=this,m=p._m;p._d=0;if(!p.disable)m.s.dlt()};m._d=function(){var m=this,i,p;for(i=0;i<"
+"m.l.length;i++){p=m[m.l[i]];if(p&&!p.disable&&p._d>0)return 1}return 0};m._x=function(d,n){var p=this[n],x;if(!p.disable){for(x in d)if(x&&(!Object||!Object.prototype||!Object.prototype[x]))p[x]=d["
+"x];p._d--}};m.beacon=function(u){var p=this,m=p._m,s=m.s,imn='s_i_'+m._in+'_Integrate_'+p._n+'_'+p._c,im;if(!p.disable&&s.d.images&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){p._c++;i"
+"m=s.wd[imn]=new Image;im.src=m._fu(p,u)}};m.script=function(u){var p=this,m=p._m;if(!p.disable)m.s.loadModule(0,m._fu(p,u),0,1)};m.l=new Array;if(m.onLoad)m.onLoad(s,m)";
s.m_i("Integrate");


//append list
s.apl=new Function("L","v","d","u","var s=this,m=0;if(!L)L='';if(u){var i,n,a=s.split(L,d);for(i=0;i<a.length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCase()));}}if(!m)L=L?L+d+v:v;return L");

// split v1.5
s.split=new Function("l","d","var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x++]=l.substring(0,i);l=l.substring(i+d.length);}return a");

// ver. 1.0 - s.join(v,p)| v - Array | p - formatting parameters (front,back,delim,wrap)
s.join=new Function("v","p","var s=this;var f,b,d,w;if(p){f=p.front?p.front:'';b=p.back?p.back:'';d=p.delim?p.delim:'';w=p.wrap?p.wrap:'';}var str='';for(var x=0;x<v.length;x++){if(typeof(v[x])=='object' )str+=s.join( v[x],p);else str+=w+v[x]+w;if(x<v.length-1)str+=d;}return f+str+b;");


/* WARNING: Changing any of the below variables will cause drastic
changes to how your visitor data is collected.  Changes should only be
made when instructed to do so by your account manager.*/
s.visitorNamespace="nci";

// Send tagging requests to correct server based on protocol
if(document.URL.indexOf("https://") >= 0)
    s.trackingServer="nci.122.2o7.net";
else
    s.trackingServer="metrics.cancer.gov";
    s.dc="122";


/*
* Plugin: getPreviousValue_v1.0 - return previous value of designated
*   variable (requires split utility)
*/
s.getPreviousValue = new Function("v", "c", "el", ""
+ "var s=this,t=new Date,i,j,r='';t.setTime(t.getTime()+1800000);if(el"
+ "){if(s.events){i=s.split(el,',');j=s.split(s.events,',');for(x in i"
+ "){for(y in j){if(i[x]==j[y]){if(s.c_r(c)) r=s.c_r(c);v?s.c_w(c,v,t)"
+ ":s.c_w(c,'no value',t);return r}}}}}else{if(s.c_r(c)) r=s.c_r(c);v?"
+ "s.c_w(c,v,t):s.c_w(c,'no value',t);return r}");



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
