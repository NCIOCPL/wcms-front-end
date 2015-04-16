(function() {
	var loadVideos = function() {
		/*** BEGIN video embedding
		 * This enables the embedding of YouTube videos and playlists as iframes.
		 ***/
	  var lang = document.querySelector('html').getAttribute('lang') || document.querySelector('meta[name="content-language"]').getAttribute('content') || 'en';
	  var videos = document.querySelectorAll('.flex-video');

	  for(var i = 0; i < videos.length; i++) {
	    var video = videos[i];
	    var videoSrc = '//www.youtube-nocookie.com/embed/',
	      videoLinkSrc = 'https://www.youtube.com/',
	      videoId = '',
	      videoTitle = '',
	      videoOptions = '?wmode=opaque&rel=0',
	      videoType = '';

	    if(video.className.match(/ ?playlist ?/)) {
	      videoType = 'playlist';
	      videoTitle = video.getAttribute('data-playlist-title');
	      videoId = 'videoseries';
	      videoOptions = videoOptions +
	        '&list=' + video.getAttribute('data-playlist-id');
	      videoLinkSrc = videoLinkSrc + 'playlist?list=' + videoId;
	    } else {
	      videoType = 'video';
	      videoTitle = video.getAttribute('data-video-title');
	      videoId = video.getAttribute('data-video-id');
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
	    var iframe = document.createElement('iframe');
	    iframe.setAttribute('width', '560');
	    iframe.setAttribute('height', '315');
	    iframe.setAttribute('src', videoSrc);
	    iframe.setAttribute('frameborder', '0');
	    iframe.setAttribute('allowFullScreen', '');
	    iframe.setAttribute('title', videoTitle);
	    iframe.setAttribute('alt', videoTitle);
	    iframe.textContent = videoText[videoType][lang];

	    video.appendChild(iframe);
	  }
		/*** END video embedding ***/
	};

	if (jQuery) {
		jQuery(document).ready(loadVideos);

	// Standards-based browsers support DOMContentLoaded
	} else if ( document.addEventListener ) {
		// Use the handy event callback
		document.addEventListener( "DOMContentLoaded", loadVideos, false );

		// A fallback to window.onload, that will always work
		window.addEventListener( "load", loadVideos, false );

	// If IE event model is used
	} else {
		// Ensure firing before onload, maybe late but safe also for iframes
		document.attachEvent( "onreadystatechange", loadVideos );

		// A fallback to window.onload, that will always work
		window.attachEvent( "onload", loadVideos );
	}
})();
