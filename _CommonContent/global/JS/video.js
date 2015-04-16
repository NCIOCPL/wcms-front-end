jQuery(document).ready(function() {
	/*** BEGIN video embedding
	 * This enables the embedding of YouTube videos and playlists as iframes.
	 ***/
	(function($) {
		$('.flex-video').each(function() {
			var $this = $(this);
			var lang = $('html').attr('lang') || $('meta[name="content-language"]').attr('content') || 'en';

			var videoSrc = '//www.youtube-nocookie.com/embed/',
				videoLinkSrc = 'https://www.youtube.com/',
				videoId = '',
				videoTitle = '',
				videoOptions = '?wmode=opaque&rel=0',
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
	})(jQuery);
	/*** END video embedding ***/
});