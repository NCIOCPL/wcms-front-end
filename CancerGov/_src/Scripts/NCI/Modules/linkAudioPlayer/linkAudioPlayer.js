import { getNodeArray } from 'Utilities/domManipulation';

/**
 * LINK AUDIO PLAYER
 * Audio files are currently included by the CDE as anchor tags with an MP3 as the source. In the past we 
 * used a library, jPlayer, to extend the anchor tags functionality and have Flash as a fallback for older browsers.
 * No longer needing to support pre audio element browsers, we can do this natively, but there are a few hoops to jump through.
 */

class AudioPlayer {
    constructor(){
        this.player = document.createElement("audio");
    }

    play(url){
        this.player.src = url;
        const playPromise = this.player.play();

        // IE11 supports HTML5 audio but does not return a promise, unlike other browsers.
        if(playPromise !== undefined){
            playPromise.then(() => console.log('Playing audio')) // TODO: Remove
            playPromise.catch(_ => {
                // Play was rejected (likely because of a permissions error in Safari or Mobile Chrome,
                // that does not allow autoplaying of audio/video elements (ie dynamically triggered))
                // First fallback workaround is to use an audio buffer.

                // Safari only supports webkitAudioContext, so we need to 'polyfill'
                const AudioContext = window.AudioContext || window.webkitAudioContext || false;
                
                if(AudioContext){
                    const context = new AudioContext();

                    const playAudioBuffer = audioBuffer => {
                        console.log('Playing buffered audio') //TODO: Remove
                        const playSound = context.createBufferSource();
                        playSound.buffer = audioBuffer;
                        playSound.connect(context.destination);
                        playSound.start(0);
                    }

                    const handleDecodeAudioDataFailure = err => console.log(err)
                    
                    // We don't need to polyfill fetch (thank goodness) because IE11 does support HTML5 audio without
                    // permissions issues, unlike Safari.
                    fetch(url)
                        .then(response => response.arrayBuffer())
                        .then(arrayBuffer => context.decodeAudioData(arrayBuffer, playAudioBuffer, handleDecodeAudioDataFailure))
                }
                else{
                    // FML: Permission denied and no audio context, but promises are supported -- what kind of browser are you in?
                    // If we need to support browsers (mobile?) that will reach this sad path, we can
                    // manually trigger the original anchor link (there are a variety of ways to work around the preventDefault).
                }
            })
        }
    }
}

const handler = player => e => {
    // Disable the underlying anchor tag and retrieve it's stored reference to the mp3 file
    e.preventDefault();
    const audiolink = e.target.pathname;
    player.play(audiolink);
}

const AUDIO_FILE_DATA_ATTRIBUTE = "data-NCI-link-audio-file";

// Event listeners are not a simple matter to catalog, so we use a data-attribute to self-identify audiolinks that have already received player callbacks
export const checkForAudioHandlerFlag = element => {
    return element.hasAttribute(AUDIO_FILE_DATA_ATTRIBUTE);
}

export const attachHandlerFlag = element => {
    element.setAttribute(AUDIO_FILE_DATA_ATTRIBUTE, "");
}

// This will allow an audiolink to be dynamically set up after the initial page load
export const attachHandler = (element, player) => {
    element.addEventListener('click', handler(player));
}

const attachHandlers = (selector, player) => {
    // Audiofiles are generated on the backend as anchor tags with an mp3 file as a source
    const audiofiles = getNodeArray(selector);
    audiofiles.forEach(audiofile => {
        const hasHandlerAlready = checkForAudioHandlerFlag(audiofile);
        if(!hasHandlerAlready){
            attachHandlerFlag(audiofile)
            attachHandler(audiofile, player);
        }
    })
}

const initialize = (selector = '.CDR_audiofile') => {
    console.log('Initializing AudioPlayer') // TODO: Remove 
    const player = new AudioPlayer();
    attachHandlers(selector, player);

    // If another audiolink needs to be set up subsequent to page loads by the same module this audio player can be reused. 
    return player; 

    // TODO: OR Could attach a global listener at this point that subsequent library could broadcast to
    // TODO: OR set up a mutation listener instead of needing to be called manually when new elements are added. Future changes.
}

export default initialize;