import * as CONFIG from 'Modules/NCI.config';
import $script from 'scriptjs';
import popupFunctions from 'Common/Enhancements/popup_functions';
import linkAudioPlayer from 'Modules/linkAudioPlayer/linkAudioPlayer'; // TODO: This will be redundant once jQuery is added back into popups.

// Loading Noto Sans font for popups
window.WebFontConfig = {
    google: {
        families: ['Noto Sans', 'Noto Sans:bold']
    }
};

(function(d) {
    var wf = d.createElement('script'), s = d.scripts[0];
    wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js';
    wf.async = true;
    s.parentNode.insertBefore(wf, s);
})(document);


$script([CONFIG.CDN.jquery, CONFIG.CDN.jplayer], function(){
    popupFunctions();

    // TODO: OCT 2018: State of the Union
    // Currently, Popups do not get jquery loaded up in advance of Common.js, so the audioLinkPlayer initialization fails (along with most calls
    // in Common.js). Until jquery is added into the head of Popups, a second call will be made here.
    linkAudioPlayer();
});
