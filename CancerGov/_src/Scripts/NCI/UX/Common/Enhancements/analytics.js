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
