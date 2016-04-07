define(function(require) {
	var $ = require('jquery');

	(function() {
		$('#mega-nav a')
			.filter(function() { return $(this).closest('.mobile-item').length === 0; })
			.on('click', function(event) {
				var $this = $(this);
				var tree = [];
				var treeParents = $this.parent('li').parents('li');
				tree.push($this[0]);
				if (treeParents.children('a').length > 0) {
					tree.push(treeParents.children('a')[0]);
				}
				if (treeParents.children('div').children('a').length > 0) {
					tree.push(treeParents.children('div').children('a')[0]);
				}

				NCIAnalytics.MegaMenuClick(this, tree);
			});

		var menuRevealed;
		var megaNav = $("#mega-nav");
		var mobileMenuBar = $(".mobile-menu-bar");
		megaNav.on('mouseenter','.nav-item',function(e){
			window.clearTimeout(menuRevealed);
			if(mobileMenuBar.is(":hidden")) {
				menuRevealed = window.setTimeout(function () {
					var menuText = $('#mega-nav a.open').text();
					NCIAnalytics.MegaMenuDesktopReveal(this, menuText);
				}, 1000);
			}
		}).on('click','button.toggle',function(){
			var $this = $(this),
				isExpanded = $this.attr('aria-expanded')==='true';
				linkText = $this.prev().text()
			;
			NCIAnalytics.MegaMenuMobileAccordionClick(this, isExpanded, linkText);
		}).on('click','.lvl-1 a, .mobile-item a',function(e){

			if(mobileMenuBar.is(":visible")){
				//e.preventDefault();
				var $this = $(this),
					url = 'www.cancer.gov' + location.pathname.toLowerCase(),
					linkText = $this.text(),
					linkUrl = $this.attr('href'),
					root = $this.closest(".lvl-1"),
					heading = $.trim(root.children(":first").find('a').text()),
					parent = $this.closest(".lvl-2"),
					subHeading = parent[0] && parent.children(":first").find('a').get(0) !== this?$.trim(parent.children(":first").find('a').text()):heading
				;

				//console.log("url: " + url + "\nlinkText: " + linkText  + "\nlinkUrl: " + linkUrl + "\nheading: " + heading + "\nsubHeading: " + subHeading);
				NCIAnalytics.MegaMenuMobileLinkClick(this, url, linkText, linkUrl, heading, subHeading);
			}
		});

		mobileMenuBar.on('click','.nav-header',function(){
			var isVisible = false;
			if($('#mega-nav > .nav-menu').attr('aria-hidden') === 'false'){
				isVisible = true;
			}
			if(isVisible){
				NCIAnalytics.MegaMenuMobileReveal(this);
			}
		});




		$('.utility a').each(function(i, el) {
			$(el).on('click', function(event) {
				var $this = $(this);
				var linkText = $this.text();

				NCIAnalytics.UtilityBarClick(this, linkText);
			});
		});

		$('.nci-logo')
			.on('click', function(event) {
				NCIAnalytics.LogoClick(this)
			});

		$('.feature-primary .feature-card').each(function(i, el) {
			$(el).on('click', 'a', function(event) {
				var $this = $(this);
				var cardTitle = $this.children('h3').text();
				var linkText = $this.children('h3').text();
				var container = 'Feature';
				var containerIndex = i + 1;

				NCIAnalytics.CardClick(this, cardTitle, linkText, container, containerIndex);
			});
		});

		$('.feature-secondary .feature-card').each(function(i, el) {
			$(el).on('click', 'a', function(event) {
				var $this = $(this);
				var cardTitle = $this.children('h3').text();
				var linkText = $this.children('h3').text();
				var container = 'SecondaryFeature';
				var containerIndex = i + 1;

				NCIAnalytics.CardClick(this, cardTitle, linkText, container, containerIndex);
			});
		});

		$('.guide-card .card').each(function(i, el) {
			$(el).on('click', 'a', function(event) {
				var $this = $(this);
				var cardTitle = $(el).children('h2').text();
				var linkText = $this.text();
				var container = 'Guide';
				var containerIndex = i + 1;

				NCIAnalytics.CardClick(this, cardTitle, linkText, container, containerIndex);
			});
		});

		$('.multimedia .card').each(function(i, el) {
			$(el).on('click', 'a', function(event) {
				var $this = $(this);
				var cardTitle = $this.children('h3').text();
				var linkText = $this.children('h3').text();
				var container = 'Multimedia';
				var containerIndex = i + 1;

				NCIAnalytics.CardClick(this, cardTitle, linkText, container, containerIndex);
			});
		});

		$('.card-thumbnail .card-thumbnail-image').each(function(i, el) {
			$(el).on('click', 'a', function(event) {
				var $this = $(this);
				var cardTitle = $this.closest('a').attr('data-title');
				var linkText = 'Image';
				var container = 'Thumbnail';
				var containerIndex = i + 1;
		 
				NCIAnalytics.CardClick(this, cardTitle, linkText, container, containerIndex);
			});
		}); 

		$('.card-thumbnail .card-thumbnail-text').each(function(i, el) {
			$(el).on('click', 'a', function(event) {
				var $this = $(this);
				var cardTitle = $this.closest('h3').find('a:first').text();
				var linkText = $this.closest('h3').find('a:first').text();
				var container = 'Thumbnail';
				var containerIndex = i + 1;
		 
				NCIAnalytics.CardClick(this, cardTitle, linkText, container, containerIndex);
			});
		}); 
		
		$('.cthp-card-container .cthpCard').each(function(i, el) {
			$(el).on('click', 'a', function(event) {
				var $this = $(this);
				var cardTitle = $this.closest('.cthpCard').find('h3:first').text();
				var linkText = $this.text();
				var container = 'CTHP';
				var containerIndex = i + 1;

				NCIAnalytics.CardClick(this, cardTitle, linkText, container, containerIndex);
			});
		});
		
		// Track clicks on on Topic Page Featured Card
		$('.topic-feature .feature-card').each(function(i, el) {
			$(el).on('click', 'a', function(event) {
				var $this = $(this);
				var cardTitle = $this.children('h3').text();
				var linkText = $this.children('h3').text();
				var container = 'SlottedTopicCard';
				var containerIndex = i + 1;
		 
				NCIAnalytics.CardClick(this, cardTitle, linkText, container, containerIndex);
			});
		});

		function treeText(obj){
			var str = "",depth = 0;
			$(obj.get().slice(0,-1).reverse()).each(function(i,el){
				if(str == "") {
					str = $(el).find("a:first").text();
				} else {
					str += ">" + $(el).find("a:first").text();
				}
				depth=i;
			});
			return {string:str,depth:depth};
		}

		$("#nvcgSlSectionNav a").on("click",function(event){
			//event.preventDefault(); //uncomment when testing link clicks
			var $this = $(this),
				url = 'www.cancer.gov' + location.pathname.toLowerCase(),
				root = $this.closest(".level-0"),
				heading = $.trim(root.children(":first").text()),
				parent = root.find(".level-1").is(".has-children")?treeText($this.parents("li")).string:"",
				linkText = $this.text(),
				depth = treeText($this.parents("li")).depth
			;
			//console.log("url: " + url + "\nheading: " + heading  + "\nparent: " + parent + "\nlinkText: " + linkText + "\ndepth: " + depth);
			NCIAnalytics.SectionLinkClick(this,url,heading,linkText,depth,parent);
		});
		//analytics for components generated by JavaScript
		$(window).load(function(){
			$("#nvcgSlSectionNav button.toggle").on("click",function(event){

				var $this = $(this),
					url = 'www.cancer.gov' + location.pathname.toLowerCase(),
					root = $this.closest(".level-0"),
					heading = $.trim(root.children(":first").text()),
					parent = treeText($this.parents("li")).string,
					isExpanded = $this.attr("aria-expanded") == "true"
				;

				//console.log("url: " + url + "\nisExpanded: " + isExpanded  + "\nheading: " + heading  + "\nparent: " + parent + "\nevent: " + event.type);
				NCIAnalytics.SectionAccordionClick(this,url,isExpanded,heading,parent);
			});
			$(".back-to-top").one("reveal",function(e){
				NCIAnalytics.BackToTopReveal(this,true);

			}).on("click",function(e){
				var UtilityBar = $("#nvcgSlUtilityBar").is(":visible");
				NCIAnalytics.BackToTopClick(this,UtilityBar);
			});
		});
	})();


	// AddThis overrides the 'onclick' event handlers, so re-bind analytics after AddThis loads.
	(function() {
		$('.add_this_btn').each(function() {
			var thisBtn = this;
			var $this = $(this);
			$this.parent().on('click', $this, function(e) {
				NCIAnalytics.BookmarkShareClick(thisBtn);
			});
		});
	})();
});
