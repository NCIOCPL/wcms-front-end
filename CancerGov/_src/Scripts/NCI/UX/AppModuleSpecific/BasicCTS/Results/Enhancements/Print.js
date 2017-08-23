define(function(require) {
    require('jquery');
    require('../Plugins/Widgets/jquery.ui.ctsDialog'); //Pulled out print interstitial dialog into its own file.
	var breakpoints = require('Modules/NCI.config').breakpoints;
	var browser = require('Modules/utility/browserDetect');

    var LIMIT = 100,
		checkedTrials = JSON.parse(sessionStorage.getItem('totalChecked')) || [],
		totalChecked = checkedTrials.length,
		checkedPages = JSON.parse(sessionStorage.getItem('checkedPages')) || [],
		selectAllChecked = sessionStorage.getItem('hasSelectAll') || false
    ;

    function _initialize() {

        //TODO: This should be turned into a Typescript class, and we should add things like $('.cts-results-container')
        //to the class instance so we are not calling the selector all over the place.

        //TODO: Turn a lot of the HTML into a handlebars template so we can extract it from the actual code.

        // insert checkboxes next to each result
        $(".clinical-trial-individual-result")
            .prepend(function(){
                var nciid = this.attributes['data-nciid'].value;

                // check if this item is already in storage
                var checked = checkedTrials.indexOf(nciid) > -1?'checked':'';

                // create a checkbox for this individual result
                return '<div class="cts-checkbox checkbox"><input id="' + nciid + '" type="checkbox" '+ checked +' /><label for="' + nciid + '" tabindex="0"><span class="ui-helper-hidden-accessible">select for printing</span></label></div>'

            })
            .find('input').on('click',function(e){ // checkbox click event

                // UpdateCheckedTrialsList will return false if totalChecked is past the LIMIT
                var check = UpdateCheckedTrialsList(this.id, this.checked);

                if(!check) {
                    e.preventDefault(); // this will prevent the checkbox from being checked
                }

            })
            .on('change',function(){
                // see if all checkboxes on the page are checked
                areAllChecked();
            })
        ;

        // cache the checkboxes for later
        $checkboxes = $('.cts-checkbox input');

        // duplicate footer pagination
        var $topPager = $(".ct-listing-pager").clone();

        // create Select All and Print Selected controls and markup
        var $topSelect = $('<div class="selections-area">' +
                '<span class="checkbox cts-results-select-all">' +
                    '<input id="checkAllTop" type="checkbox" />' +
                    '<label for="checkAllTop" tabindex="0"><strong>Select All on Page</strong></label>' +
                '</span>' +
                '<input class="action button printSelected" type="submit" name="printButton" value="Print Selected" />' +
            '</div>');

        // put pagination and 'select all' in a wrapper for top control
        var $topControl = $('<div class="cts-results-top-control" />').append($topPager,$topSelect);

        // insert top controls after the title
        $(".cts-results-title").after($topControl);

        // create the lower control
        var $lowerControl = $('<div class="row medium-12 columns cts-results-lower-control" />');

        // insert lower pager into bottom controls
        $lowerControl.prepend($topSelect.clone())
            .find("#checkAllTop").attr('id','checkAllLower') // update the checkbox id
            .next().attr('for','checkAllLower'); //update the for attribute
		
		if($(".clinical-trial-individual-result").length > 0) {
			// insert lower controls after delighters
			$lowerControl.insertAfter('.delighter-rail');
		}
		
		// move pager to inside lower control
		$lowerControl.append($('.cts-results-container').next('.ct-listing-pager'));

		// move lower control responsively
		$(window).on('resize', function() {
			moveLowerControl();
		});
		// move lower control according to initial browser size
		moveLowerControl();
		
        // check if all checkboxes are checked - if so check Select All as well
        areAllChecked();


        // check all checkbox click event
        $("#checkAllTop, #checkAllLower").on('click',function(){
            var $this = $(this);
            var isChecked = this.checked;

            // toggle the duplicate selectAll checkbox at the top or bottom of the page
            if ($this.is("#checkAllTop")) {
                $("#checkAllLower").prop("checked",isChecked);
            } else {
                $("#checkAllTop").prop("checked",isChecked);
            }

            // loop through all item checkboxes
            $('.cts-results-container').find('input').each(function(){
                var $this = $(this);

                // if this checkbox is not checked and the 'select all' IS checked then...
                if (!$this.is(':checked') && isChecked) {
                    // if we're still below the limit

                    if(totalChecked < (LIMIT) ) {
                        // check the box by triggering click - this will update the totalChecked and sessionStorage
                        $this.click();
                    } else {
                        // we're over the limit, but we send one more click anyway to propagate the modal show event
                        $this.click();
                        //triggerModal('limit');

                        // uncheck 'select all' boxes since operation was unsuccessful
                        $("#checkAllTop, #checkAllLower").prop("checked",false);

                        // exit the loop
                        return false
                    }
                }
                // else if the checkbox is checked and the 'select all' IS NOT checked
                else if ($this.is(':checked') && !isChecked){
                    // uncheck the item by triggering click - this will update totalChecked and sessionStorage
                    $this.click();
                }
            });
        });

        // send keyboard events to input
        $('.checkbox label').on('keypress',function(e){
            if(e.which == 13 || e.which == 32){
                e.preventDefault();
                $(this).prev().click();
            }
        });

        $(".printSelected").on('click', function(event){
            // TODO: disable form submit until success or failure
			
			// Attempt to add current page to checkedPages if print is selected
			var pageNum = $(".cts-results-top-control .pager-current").text();
            if(pageNum == "")
				pageNum = "1";
			UpdateCheckedPagesList(pageNum, $(".cts-results-container input:checked").length);

            if(checkedTrials.length > 0) {
				var modal = triggerModal('redirect');

				// Set up query parameters for ajax call
				var postUrl = "/CTS.Print/GenCache";
				
                //Extract the searchparams that the template outputs.
                var searchParams = $(".cts-results-container").data("cts-printparams");
                if (searchParams && searchParams != "") {
                    //Chop off the first ? if we have params.  This should happen as we 
                    //are outputting them in the template.
                    if (searchParams[0] == "?") searchParams = searchParams.slice(1);

                    //Now add the search params to the URL
                    postUrl += '?' + searchParams;
                }
								
				$.ajax({
					type: "POST",
					url: postUrl,
					data: JSON.stringify({ TrialIDs: checkedTrials}),
					dataType: "json",
					jsonp: false,
					success: function(response) {
						modal.ctsDialog('close');
						window.location="/CTS.Print/Display?printid=" + response.printID;
					},
					error:function(jqXHR, textStatus, errorThrown){
						modal.ctsDialog('close');
						console.log("Error occurred " + errorThrown + "; text status: " + textStatus);
					}
				});
			}
			else {
                triggerModal('none_selected');
                var $this = $(this);
                doResultsErrorAnalytics($this, window.location.href, 'noneselected');
			}
        });
		
		// Updated checkedPages whenever a pager link is clicked
		$(".pager-link").on('click', function(event) {
			var page = $(".cts-results-top-control .pager-current").text();
			UpdateCheckedPagesList(page, $(".cts-results-container input:checked").length);
		});
    }

	function isEmpty(value) {
		return value == null || value == '';
	}
	
    function UpdateCheckedTrialsList(src, isChecked) {
        // remove id symbol just in case
        var trial = src.replace("#", "");

        if (!isChecked) { // Uncheck it
            if (checkedTrials.indexOf(trial) > -1) {
                var index = checkedTrials.indexOf(trial);
                checkedTrials.splice(index, 1);
                totalChecked--;
            }
        }
        else { // Check it
            // Check if we've hit the limit - if so trigger warning modal
			if(totalChecked >= LIMIT){
				triggerModal('limit');
				return false;
			}
			
            else if ($.inArray(trial, checkedTrials) == -1) {
                checkedTrials.push(trial);
                totalChecked++;
				
				if(totalChecked >= LIMIT) {
                    var $this = $(this);
                    doResultsErrorAnalytics($this, window.location.href, 'maxselectionreached');
				}
            }
        }

        // update the session storage
        sessionStorage.setItem('totalChecked',JSON.stringify(checkedTrials));

        return true;
    }

	function UpdateCheckedPagesList(page, numTrialsChecked) {
		if (numTrialsChecked > 0) {
			// Page has trials checked
			if ($.inArray(page, checkedPages) == -1) {
				// Page isn't in checkedPages array, so add it
				checkedPages.push(page);
			}
		}
		else if (numTrialsChecked == 0) {
			// Page has no checked trials
			if ($.inArray(page, checkedPages) > -1) {
				// Page is in checkedPages array, remove it
                var index = checkedPages.indexOf(page);
                checkedPages.splice(index, 1);
            }
		}
		
		// update session storage for all pages that have checked items for analytics
		sessionStorage.setItem('checkedPages', JSON.stringify(checkedPages));
	}

    function areAllChecked() {
        var resultsOnPage = $(".clinical-trial-individual-result").length;
        if ($(".cts-results-container input:checked").length === resultsOnPage) {
            // all are checked
            $("#checkAllTop, #checkAllLower").prop("checked",true);
			selectAllChecked = true;
			sessionStorage.setItem('hasSelectAll', selectAllChecked);
        }  else {
            // not all are checked
            $("#checkAllTop, #checkAllLower").prop("checked",false);
			selectAllChecked = false;
			sessionStorage.setItem('hasSelectAll', selectAllChecked);
        }
    }
	
	function getParameterByName(name, url) { 
		if (!url) { 
		  url = window.location.href; 
		} 
		name = name.replace(/[\[\]]/g, "\\$&"); 
		var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), 
			results = regex.exec(url); 
		if (!results) return ''; 
		if (!results[2]) return ''; 
		return decodeURIComponent(results[2].replace(/\+/g, " ")); 
	}

    function triggerModal(type){
		var modal,
            hasCloseButton = true,
            thisBrowser = browser.getBrowser();

        if (type == 'limit') {
        	modal = $("#modal-limit")[0]?$("#modal-limit"):$('<div id="modal-limit"><i class="warning" aria-hidden="true"></i><p>You have selected the maximum number of clinical trials (' + LIMIT + ') that can be printed at one time.</p><p>Print your current selection and then return to your search results to select more trials to print.</p></div>');
        } else if (type == 'none_selected') {
            modal = $("#modal-none")[0]?$("#modal-none"):$('<div id="modal-none"><i class="warning" aria-hidden="true"></i><p>You have not selected any trials. Please select at least one trial to print.</p></div>');
        } else if (type == 'redirect') {
            modal = $("#modal-redirect")[0]?$("#modal-redirect"):$('<div id="modal-redirect"><div class="spinkit spinner"><div class="dot1"></div><div class="dot2"></div></div><p>You will automatically be directed to your print results in just a moment...</p></div>');
            hasCloseButton = false;
		}

        // create modal if it's not in the DOM yet
        if(!modal.context){
            modal.ctsDialog({
                dialogClass: 'cts-dialog',
                closeBtn: hasCloseButton,
                clickOutside: hasCloseButton,
                closeText: "hide",
                autoOpen: false,
                modal: true,
                resizable: false,
                draggable: false,
                width: '90%',
                maxWidth: 450,
                show: { effect: "puff",percent:50, duration: 250 },
                hide: { effect: "puff",percent:50, duration: 250 },
                create: function(evt) {

                    if($(this).ctsDialog("option","closeBtn")) {
                        var $this = $(this).parent();
                        var $closeBtn = $this.find('.ui-dialog-close');
                        var $bottomBtn = $closeBtn.clone(true).addClass('btn-close-bottom');

                        $closeBtn.addClass('btn-close-top');
                        $this.append($bottomBtn);
                    }

                    // Explorer is having trouble applying nested CSS3 animations, remove one and add it back on open
                    if (type == 'redirect' && (thisBrowser == "MS Edge" || thisBrowser == "Explorer")) {
                        $(this).find(".spinner").removeClass("spinner");
                    }

                },
                open: function(evt) {

                    // Explorer is having trouble applying nested CSS3 animations, remove one and add it back on open
                    if (type == 'redirect' && (thisBrowser == "MS Edge" || thisBrowser == "Explorer")) {
                        $(this).find(".spinkit").addClass("spinner");
                    }
                },
                close: function(evt) {
                    // Explorer is having trouble applying nested CSS3 animations, remove one and add it back on open
                    if (type == 'redirect' && (thisBrowser == "MS Edge" || thisBrowser == "Explorer")) {
                        $(this).find(".spinkit").removeClass("spinner");
                    }
                }

            });
		}

		// open the modal
        modal.ctsDialog('open');

        return modal;
    }
	
	function moveLowerControl() {
		var width = window.innerWidth || $(window).width();
		if (width <= breakpoints.large) {
			$('.delighter-rail').before($('.cts-results-lower-control'));
		}
		else {
			$('.delighter-rail').after($('.cts-results-lower-control'));
		}
    }
    
    /**
     * Do analytics calls for print results
     * @param {any} sender 
     * @param {any} url 
     * @param {any} text 
     */
    function doResultsErrorAnalytics(sender, url, text) {
        // TODO: Add as data.
        // Determine originating search form for analytics
        var rl = getParameterByName('rl', url);
        var searchForm = "clinicaltrials_basic";
        if(rl == 2){
            searchForm = "clinicaltrials_advanced";
        }

        NCIAnalytics.CTSResultsSelectedErrorClick(sender, searchForm, text);
    }    

    /**
     * Identifies if this enhancement has been initialized or not.
     * @type {Boolean}
     */
    var initialized = false;

    /**
     * Exposed functions available to this module.
     */
    return {
        init: function() {
            if (initialized) {
                return;
            }

            _initialize();
            initialized = true;
        }
    };
});
