define(function(require) {
    require('jquery');
	var breakpoints = require('Common/Enhancements/NCI.breakpoints');

    var LIMIT = 100,
		checkedTrials = JSON.parse(sessionStorage.getItem('totalChecked')) || [],
		totalChecked = checkedTrials.length,
		checkedPages = JSON.parse(sessionStorage.getItem('checkedPages')) || [],
		selectAllChecked = sessionStorage.getItem('hasSelectAll') || false
    ;

    //extend jQuery UI dialog
    $.widget( "ui.ctsDialog", $.ui.dialog, {
        options: {
            clickOutside: true,
            titleBar: false,
            closeBtn: true,
            responsive: true
        },
        open: function(){
            var self = this;

            this._super();

            if(this.options.clickOutside) {
                $('.ui-widget-overlay').addClass('clickable').on('click', function (evt) {
                    self.close();
                });
            }

            // make resizable
            if(this.options.responsive === true) {
                this._resize();
                $(window).on("resize.ui-dialog orientationchange.ui-dialog", function () {
                    self._resize();
                });
            }
        },
        close: function(){
            if(this.options.responsive === true) {
                $(window).off("resize.ui-dialog orientationchange.ui-dialog");
            }
            this._super();
        },
        _create: function(evt, ui){

            this._super();
            this.uiDialog.css({'max-width':this.options.maxWidth});

        },
        _createTitlebar: function(){
            if(!this.options.titleBar) {
                this.uiDialogTitlebarClose = $("<button type='button' class='ui-dialog-close'></button>")
                    .button({
                        label: this.options.closeText,
                        icons: {
                            primary: "ui-icon-closethick"
                        },
                        text: false
                    })
                    .prependTo(this.uiDialog);

                this._on(this.uiDialogTitlebarClose, {
                    click: function (event) {
                        event.preventDefault();
                        this.close(event);
                    }
                });
                if(!this.options.closeBtn) {
                    this.uiDialogTitlebarClose.hide();
                }
            } else {
                this._super();
            }
        },
        _resize: function () {
            var elem = this.element,
                oWidth = elem.parent().outerWidth(),
                wWidth = $(window).width(),
                setWidth = Math.min(wWidth * this.options.scaleW, oWidth);

            elem.ctsDialog("option", "width", setWidth).parent().css("max-width", setWidth);
            elem.ctsDialog("option", "position", { my: "center", at: "center", of: window });
        }
    });


    function _initialize() {

        // insert checkboxes next to each result
        $(".clinical-trial-individual-result")
            .prepend(function(){
                var nciid = this.attributes['data-nciid'].value;

                // check if this item is already in storage
                var checked = checkedTrials.indexOf(nciid) > -1?'checked':'';

                // create a checkbox for this individual result
                return '<div class="cts-checkbox checkbox"><input id="' + nciid + '" type="checkbox" '+ checked +' /><label for="' + nciid + '"></label></div>'

            })
            .find('label').on('click',function(e){ // checkbox click event

                // UpdateCheckedTrialsList will return false if totalChecked is past the LIMIT
                var check = UpdateCheckedTrialsList(this.attributes['for'].value, this.previousElementSibling.checked);

                if(!check) e.preventDefault(); // this will prevent the checkbox from being checked

            })
            .prev().on('change',function(){
                // see if all checkboxes on the page are checked
                areAllChecked();
            });

        // cache the checkboxes for later
        $checkboxes = $('.cts-checkbox input');

        // duplicate footer pagination
        var $topPager = $(".ct-listing-pager").clone();

        // create Select All and Print Selected controls and markup
        var $topSelect = $('<div class="selections-area">' +
                '<span class="checkbox cts-results-select-all">' +
                    '<input id="checkAllTop" type="checkbox" />' +
                    '<label for="checkAllTop"><strong>Select All on Page</strong></label>' +
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
		
		// insert lower controls after delighters
        $lowerControl.insertAfter('.delighter-rail');
		
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
                        $this.next().click();
                    } else {
                        // we're over the limit, but we send one more click anyway to propagate the modal show event
                        $this.next().click();
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
                    $this.next().click();
                }
            });
        });

        $(".printSelected").on('click', function(event){
            // TODO: disable form submit until success or failure
			
			// Attempt to add current page to checkedPages if print is selected
			var pageNum = $(".cts-results-top-control .pager-current").text();
			UpdateCheckedPagesList(pageNum, $(".cts-results-container input:checked").length);

            if(checkedTrials.length > 0) {
				var modal = triggerModal('redirect');
				
				// Set up query parameters for ajax call
				var postUrl = "/CTS.Print/GenCache",
                    params = {
					t: getParameterByName('t', window.location.href),
					z: getParameterByName('z', window.location.href),
					a: getParameterByName('a', window.location.href),
					q: getParameterByName('q', window.location.href),
					ct: getParameterByName('ct', window.location.href),
					g: getParameterByName('g', window.location.href),
					zp: getParameterByName('zp', window.location.href)
				};
				// Delete empty query params
				for(var key in params) {
					if (isEmpty(params[key])) {
						delete params[key];
					}
				}
				
				var urlParams = $.param(params);
				if(urlParams.length > 0) {
					postUrl += '?' + urlParams;
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

        if (isChecked) { // Uncheck it
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
					// Analytics call for max selected reached
					var $this = $(this);
					NCIAnalytics.CTSResultsMaxSelectedClick($this);
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
        if ($(".cts-results-container input:checked").length === 10) {
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
            hasCloseButton = true;

        if (type == 'limit') {
        	modal = $("#modal-limit")[0]?$("#modal-limit"):$('<div id="modal-limit"><i class="warning" aria-hidden="true"></i><p>You have reached the ' + LIMIT + ' trial maximum of clinical trials that can be printed at one time.</p><p>You can print the current selection and then return to your search results to select more trials to print.</p></div>');
        } else if (type == 'none_selected') {
            modal = $("#modal-none")[0]?$("#modal-none"):$('<div id="modal-none"><i class="warning" aria-hidden="true"></i><p>You have not selected any trials. Please select at least one trial to print.</p></div>');
        } else if (type == 'redirect') {
            modal = $("#modal-redirect")[0]?$("#modal-redirect"):$('<div id="modal-redirect"><div class="spinner"><div class="dot1"></div><div class="dot2"></div></div><p>You will automatically be directed to your print results in just a moment...</p></div>');
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
                }

            });
		}

		// open the modal
        modal.ctsDialog('open');

        return modal;
    }
	
	function moveLowerControl() {
		var width = window.innerWidth || $(window).width();
		if (width < breakpoints.large) {
			console.log("below desktop breakpoint");
			$('.delighter-rail').before($('.cts-results-lower-control'));
		}
		else {
			$('.delighter-rail').after($('.cts-results-lower-control'));
		}
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
