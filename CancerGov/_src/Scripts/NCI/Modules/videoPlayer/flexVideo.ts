import { 
	checkNodeAncestryForClass, 
	getNodeArray,
	keyHandler 
} from '../../Utilities';

// Triggered by 'click' listener on preview thumbnail
const injectIFrame = (videoHook, videoId, videoTitle) => {
	
	// Any language except for Spanish will default to English.
	const pageLang = document.documentElement.lang || 'en';
	const hl = pageLang === 'es' ? '&hl=es' : '&hl=en';
	
	const videoSource = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0${hl}&showinfo=1&autoplay=1`;
	
	const videoTextTitle = pageLang === 'en' ? 'Youtube embedded video:' : 'Video insertado desde YouTube:';
	const videoText = `${videoTextTitle} ${videoSource}`;
	
	const iFrame = document.createElement('iframe');
	iFrame.setAttribute('frameborder', '0');
	iFrame.setAttribute('allowFullscreen', '');
	iFrame.setAttribute('src', videoSource);
	iFrame.setAttribute('title', videoTitle);
	iFrame.setAttribute('alt', videoTitle);
	videoHook.innerHTML = ''; // Wipe out Play button and Thumbnail and Title
	videoHook.appendChild(iFrame);
	iFrame.focus();
};

const injectPreviewContents = parent => {
	const { videoId, videoTitle } = parent.dataset;
	
	// Create preview container ################
	const container = document.createElement('div');
	container.classList.add('video-preview--container');
	container.setAttribute("tabIndex", "0");

	// Create Thumbnail Element ################
	// At the moment, we are using hqdefault as a more likely catchall, there are multiple
	// thumbnail sizes but not all are always available. A future 
	// improvement would be gracefully degrading in the event of a 404 if the requested 
	// thumbnail type wasn't found (this means potentially saving 5-15kb at the cost of
	// one or two more HTTP requests)
	const thumbnailSource = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
	const thumbnail = new Image();
	thumbnail.src = thumbnailSource;
	thumbnail.classList.add('video-preview--preview-img');
	container.appendChild(thumbnail);
	
	// Create Play Button Element #############
	// This is used for styling the thumbnail to look like a youtube video preclick
	// SVG paths and transitions are taken directly from youtube embeds for consistency
	const playButtonCont = document.createElement('div');
	const playButtonHTML = `
	<svg height="100%" version="1.1" viewBox="0 0 68 48" width="100%">
		<path class="play-button--bg" d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#212121" fill-opacity="0.8"></path>
		<path d="M 45,24 27,14 27,34" fill="#fff"></path>
	</svg>
	`;
	playButtonCont.innerHTML = playButtonHTML;
	playButtonCont.classList.add('video-preview--play-button');
	container.appendChild(playButtonCont);

	// Create Title Overlay ###################
	const titleOverlay = document.createElement('p');
	const titleText = document.createTextNode(videoTitle);
	titleOverlay.appendChild(titleText);
	container.appendChild(titleOverlay);

	// Add to DOM #############
	parent.appendChild(container);
	// On click the preview elements will be deleted and replaced with iFrame generated by youtube API
	const injectCB = () => injectIFrame(parent, videoId, videoTitle);
	const injectCBOnKeypress = keyHandler({
		fn: injectCB, 
		keys:['Enter', ' ']
	});
	parent.addEventListener('click', injectCB, false);
	parent.addEventListener('keydown', injectCBOnKeypress, false);
};

// Inject custom video previews into any video hooks that are not a part of a carousel
const renderPreviewThumbnails = () => {
	const videoHooks = getNodeArray('.flex-video');

	// Filter out any videos that are children of a carousel to avoid overwriting carousel injection points
	const filteredHooks = videoHooks.filter(hook => !checkNodeAncestryForClass(hook, 'yt-carousel'));
	filteredHooks.forEach(hook => injectPreviewContents(hook));
};

let isRendered = false;

export const init = () => {
	if (!isRendered) {
		renderPreviewThumbnails();
		isRendered = true;
	}
}
