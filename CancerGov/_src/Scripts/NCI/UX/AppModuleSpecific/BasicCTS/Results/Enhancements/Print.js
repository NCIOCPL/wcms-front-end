define(function(require) {
    var $ = require('jquery');
	var $trialsOnPage = [];
	var $checkedTrials = [];
	
	//UPDATE to set equal to session storage value of total checked trials
	var numCheckedTrials = 0;
    
	function _initialize() {
		$(".clinical-trial-individual-result").each(function(index) {
			var $nciid = $(this).attr("data-nciid");
			$trialsOnPage.push($nciid);
			
			var $resultCheckbox = $("<div class=\"cts-checkbox checkbox\"><div>");
			$resultCheckbox.append("<input id=\"" + $nciid + "\" type=\"checkbox\">");
			$resultCheckbox.append("<label for=\"" + $nciid + "\"></label>");
			
			$(this).before($resultCheckbox);

			CreateCheckboxMirror("#" + $nciid, "#mirror" + $nciid);
		});
		
		$resultsTopControl = $("<div class=\"cts-basic-results-top-control\"></div>");
		$resultsTopControl.append($(".pagination").clone().addClass("top-pager"));
		$(".cts-results-title").after($resultsTopControl);
		
		var $topSelections = $("<div class=\"top-selections-area\">");
		var $topCheckbox = $("<span class=\"checkbox ct-results-select-all\"></span>");
		$topCheckbox.append("<input id=\"checkAllTop\" name=\"checkAllTop\" type=\"checkbox\">");
		$topCheckbox.append("<label for=\"checkAllTop\"><strong>Select All on Page</strong></label>");
		$topSelections.append($topCheckbox);
		
		CreateCheckboxMirror("#checkAllTop", "#mirrorcheckAllTop");
		
		var $topPrint = $("<input type=\"submit\" name=\"topPrintButton\" value=\"Print Selected\" id=\"topPrintButton\" class=\"action button\" alternatetext=\"Print Selected\">");
		$topSelections.append($topPrint);
		$(".top-pager").after($topSelections);
		
		$(".ct-results-lower-control.basic .pagination").addClass("lower-pager");
		
		var $lowerSelections = $("<div class=\"lower-selections-area\">");
		var $lowerCheckbox = $("<span class=\"checkbox ct-results-select-all\"></span>");
		$lowerCheckbox.append("<input id=\"checkAllLower\" name=\"checkAllLower\" type=\"checkbox\">");
		$lowerCheckbox.append("<label for=\"checkAllLower\"><strong>Select All on Page</strong></label>");
		$lowerSelections.append($lowerCheckbox);
		CreateCheckboxMirror("#checkAllLower", "#mirrorcheckAllLower");
		
		$lowerPrint = $("<input type=\"submit\" name=\"lowerPrintButton\" value=\"Print Selected\" id=\"lowerPrintButton\" class=\"action button\" alternatetext=\"Print Selected\">");
		$lowerSelections.append($lowerPrint);
		$(".lower-pager").before($lowerSelections);
		
		$("#checkAllTop").click(function() {
			var isChecked = this.checked;
			$.each($trialsOnPage, function(index, value){
				$("#" + value).prop('checked', isChecked);
				$("#checkAllLower").prop('checked', isChecked);
				UpdateCheckboxReflection("#" + value, "#mirror" + value);
				// UpdateCheckboxReflection("#checkAllLower", "#mirrorcheckAllLower");
			});
		});
		
		$("#checkAllLower").click(function() {
			var isChecked = this.checked;
			$.each($trialsOnPage, function(index, value){
				$("#" + value).prop('checked', isChecked);
				$("#checkAllTop").prop('checked', isChecked);
				UpdateCheckboxReflection("#" + value, "#mirror" + value);
				// UpdateCheckboxReflection("#checkAllTop", "#mirrorcheckAllTop");
			});
		});
		
		$("#topPrintButton, #lowerPrintButton").click(function (){
		   console.log("Attempting to print trials " + JSON.stringify({ TrialIDs: $checkedTrials}));
		   $.ajax({
			  type: "POST",
			  url: "/CTS.Print/GenCache",
			  data: JSON.stringify({TrialIDs: $checkedTrials}),
			  dataType: "json",
			  jsonp: false,
			  success: function(response) {
			    console.log("Success, return is: " + response.printID);
				window.location="/CTS.Print/Display?printid=" + response.printID;
			  },
			  error:function(jqXHR, textStatus, errorThrown){
				console.log("Error occurred " + errorThrown + "; text status: " + textStatus);
			  }
			}); 
		});
	}
	
	function CreateCheckboxMirror(boxA, boxB) {
		$(boxA).click(function(event) {
			UpdateCheckboxReflection(boxA, boxB);
		});
	
		$(boxB).click(function(event) {
			UpdateCheckboxReflection(boxB, boxA);
		});
	}

    function UpdateCheckboxReflection(src, mirror) {
		var sourceBox = $(src);
		var mirrorBox = $(mirror);
		mirrorBox.prop('checked', sourceBox.prop('checked'));
		if(src != "#checkAllTop" && src != "#checkAllLower") {
			UpdateCheckedTrialsList(src, sourceBox.prop('checked'));
		}
	}
	
	function UpdateCheckedTrialsList(src, isChecked) {
		//TODO: add logic to replace $checkedTrials with object from session storage
		
		var trial = src.replace("#", "");

		if (isChecked) {
			if ($.inArray(trial, $checkedTrials) == -1) {
				$checkedTrials.push(trial);
				numCheckedTrials++;
			}
		}
		else if(!isChecked) {
			if ($.inArray(trial, $checkedTrials) != -1) {
				var index = $checkedTrials.indexOf(trial);
				$checkedTrials.splice(index, 1);
				numCheckedTrials = numCheckedTrials - 1;
			}
		}
		
		// TODO: add logic to put new $checkedTrials and $numCheckedTrials into session storage
		// console.log("Number of checked trials: " + numCheckedTrials);
		console.log(JSON.stringify({ TrialIDs: $checkedTrials}));
		
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
