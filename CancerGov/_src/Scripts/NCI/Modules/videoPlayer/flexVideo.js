define(function(require) {

    var $ = require('jquery');

    var _initialized = false;

    function _initialize() {
      $('.flex-video').each(function() {
				var $this = $(this);
				var lang = $('html').attr('lang') || 'en';
				var contentLanguage = document.documentElement.lang;
				var hl = '&hl=en';
				if(contentLanguage.indexOf('es') > -1){
					hl = '&hl=es';
				}

				var videoSrc = '//www.youtube-nocookie.com/embed/',
					videoLinkSrc = 'https://www.youtube.com/',
					videoId = '',
					videoTitle = '',
					videoOptions = '?wmode=opaque&rel=0' + hl,
					videoType = '';

				if($this.hasClass('playlist')) {
					videoType = 'playlist';
					videoTitle = $this.attr('data-playlist-title');
					videoId = 'videoseries';
					videoOptions = videoOptions +
						'&list=' + $this.attr('data-playlist-id');
					videoLinkSrc = videoLinkSrc + 'playlist?list=' + videoId;
				} else {
					videoType = 'video';
					videoTitle = $this.attr('data-video-title');
					videoId = $this.attr('data-video-id');
					videoOptions = videoOptions +
						'';
					videoLinkSrc = videoLinkSrc + 'watch?v=' + videoId;
				}
				videoSrc = videoSrc + videoId + videoOptions;
				var videoText = {
					video: {
						en: 'Youtube embedded video: ' + videoLinkSrc,
						es: 'Video insertado desde YouTube: ' + videoLinkSrc
					},
					playlist: {
						en: 'Youtube embedded video playlist: ' + videoLinkSrc,
						es: 'Lista de reproducci&oacute;n insertada desde YouTube: ' + videoLinkSrc
					}
				};
				$this.append(
					$(document.createElement('iframe'))
						.attr('width', '560')
						.attr('height', '315')
						.attr('src', videoSrc)
						.attr('frameborder', '0')
						.attr('allowFullScreen', '')
						.attr('title', videoTitle)
						.attr('alt', videoTitle)
						.text(videoText[videoType][lang])
				);
			});
	}

	const injectIFrame = (videoHook, videoId, videoTitle) => {
		
		const pageLang = document.documentElement.lang || 'en'
		
		const hl = pageLang === 'es' ? '&hl=es' : '&hl=en'
		const videoSource = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0${hl}&showinfo=1&autoplay=1`
		
		const videoTextTitle = pageLang === 'en' ? 'Youtube embedded video:' : 'Video insertado desde YouTube:'
		const videoText = `${videoTextTitle} ${videoSource}`
		
		const iFrame = document.createElement('iframe')
		iFrame.setAttribute('frameborder', '0')
		iFrame.setAttribute('allowFullscreen', '')
		iFrame.setAttribute('src', videoSource)
		iFrame.setAttribute('title', videoTitle)
		iFrame.setAttribute('alt', videoTitle)
		videoHook.innerHTML = '' // Wipe out Play button and Thumbnail
		videoHook.appendChild(iFrame)

		const iFrameDocument = iFrame.contentWindow.document
		const iFrameTitle = iFrameDocument.createTextNode(videoText)
		iFrameDocument.appendChild(iFrameTitle)
	}
	
	const _newInitialize = () => {
		const videoHooksNodeList = document.querySelectorAll('.flex-video')
		const videoHooks = Array.from(videoHooksNodeList)
		videoHooks.forEach(hook => {
			// Create preview container
			const container = document.createElement('div')
			container.classList.add('video-preview--container')

			// Create Thumbnail Element
			const thumbnailSource = "https://img.youtube.com/vi/"+ hook.dataset.videoId + "/sddefault.jpg"
			const thumbnail = new Image()
			thumbnail.src = thumbnailSource
			thumbnail.classList.add('video-preview--preview-img')
			container.appendChild(thumbnail)
			
			// Create Play Button Element
			// This is used for styling the thumbnail to look like a youtube video preclick
			const playButton = document.createElement('div')
			playButton.classList.add('video-preview--play-button')
			container.appendChild(playButton)

			// Create Title Overlay
			const videoTitle = hook.dataset.videoTitle
			const titleOverlay = document.createElement('p')
			const titleText = document.createTextNode(videoTitle)
			titleOverlay.appendChild(titleText)
			container.appendChild(titleOverlay)

			// Add to DOM
			hook.appendChild(container)

			hook.addEventListener('click', () => injectIFrame(hook, hook.dataset.videoId, videoTitle))
		})

	}

    /**
     * Exposed functions of this module.
     */
    return {
        init: function () {
            if (!_initialized) {
				// _initialize();
				_newInitialize();
            }
        }
    };

});
