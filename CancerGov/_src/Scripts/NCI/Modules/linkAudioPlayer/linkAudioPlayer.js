import { getNodeArray } from 'Utilities/domManipulation';

// Safari only supports webkitAudioContext
const AudioContext = window.AudioContext || window.webkitAudioContext || false;

class AudioPlayer {
    constructor(){
        this.player = document.createElement("audio");
    }

    play(url){
        this.player.src = url;
        const playPromise = this.player.play();
        playPromise.catch(_ => {
            // Play was rejected (likely because of a permissions error in Safari or Mobile Chrome,
            // that does not allow autoplaying of audio/video elements (ie dynamically triggered))
            // First fallback workaround is to use an audio buffer.
            if(AudioContext){
                const context = new AudioContext();
                // TODO: either fetch polyfill for ie11 or vanilla XHR (axios is too heavy)
                fetch(url)
                    .then(response => response.arrayBuffer())
                    .then(arrayBuffer => context.decodeAudioData(
                        arrayBuffer, 
                        audioBuffer => { 
                            this.playBufferedAudio(audioBuffer, context);
                        }, 
                        err => {
                            console.log(err);
                        }
                    ))
            }
            else{
                // FML: Permission denied and no audio context
                // TODO: trigger underlying anchor link which should open
                // file in a new window or download it depending on
                // browser's native behavior.
            }
        })
    }

    playBufferedAudio(buffer, context){
        const playSound = context.createBufferSource();
        playSound.buffer = buffer;
        playSound.connect(context.destination);
        playSound.start(0);
    }

}

const handler = player => e => {
    // Disable the underlying anchor tag and retrieve it's stored reference to the mp3 file
    e.preventDefault();
    const audiolink = e.target.pathname;
    player.play(audiolink);
}

// This will allow an audiolink to be dynamically set up after the initial page load
export const attachHandler = (element, player) => {
    element.addEventListener('click', handler(player));
}

const attachHandlers = player => {
    // Audiofiles are generated on the backend as anchor tags with an mp3 file as a source
    const audiofiles = getNodeArray('.CDR_audiofile');
    audiofiles.forEach(audiofile => {
        attachHandler(audioFile, player);
    })
}

const initialize = () => {
    const player = new AudioPlayer();
    attachHandlers(player);

    // If another audiolink needs to be set up subsequent to page loads
    return player; 
}

export default initialize;