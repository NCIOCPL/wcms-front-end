// global
var oga_pattern = /grants\-training\/grants/gi,
    cct_pattern = /grants\-training\/training/gi,
    pdq_pattern = /pdq/gi;

var NCIAnalytics = {

    displayAlerts: false,
    stringDelimiter: '|',
    fieldDelimiter: '~',

    /**
     * Determines site section based on page path; Returns empty string if no match is found; Used as c66 prefix
     * @author Evolytics <nci@evolytics.com>
     * @since 2016-08-08
     * @param {string=} pagePathOverride - Optional override to use in place of document.location.pathname
     * @returns {string}
     */
    siteSection: (function(pagePathOverride) {
        var path = pagePathOverride || document.location.pathname;

        if(oga_pattern.test(path)) { return('oga'); }
        if(cct_pattern.test(path)) { return('cct'); }
        if(pdq_pattern.test(path)) { return('pdq'); }

        return('');

    })(),

    SelectedTextList: function(listId, delimiter) {
        var checked = $("#" + listId + " input:checked"); // get all checked inputs under the given id

        if (checked.length > 0) {
            return (
                checked.siblings("label")  // find all adjacent labels
                    .map(function() {
                        return $(this).text();  // return the text of each label
                    })
                    .get()  // get as JS array
                    .join(delimiter));  // join array with delimiter
        }

        return "";
    },

    SelectedOptionList: function(listId, delimiter) {
        var selected = $("#" + listId + " option:selected"); // get all selected options under the given id

        if (selected.length > 0) {
            return (
                selected.map(function() {
                        return this.text;  // return the text of each option
                    })
                    .get()  // get as JS array
                    .join(delimiter));  // join array with delimiter
        }

        return "";
    },

    SelectedDeleteList: function(listId, delimiter) {
        var buttons = $("#" + listId + " li:visible button"); // find all visible buttons under the given id

        if (buttons.length > 0) {
            return (
                buttons.map(function() {
                        return this.nextSibling.nodeValue;  // the following node should be the text; return it
                    })
                    .get()  // get as JS array
                    .join(delimiter));  // join array with delimiter
        }

        return "";
    },

    ClickParams: function(sender, reportSuites, linkType, linkName) {
        /*
         The facility for defining report suites by the parameter reportSuites
         has been discontinued - now report suites are defined in the s_account variable
         set in the Omniture s_code.js file.  The supporting code for the parameter method
         has been retained in case the requirements change.
         */
        this.sender = sender;
        //this.ReportSuites = reportSuites;
        this.ReportSuites = s_account;
        this.LinkType = linkType;
        this.LinkName = linkName;
        this.Props = {};
        this.Evars = {};
        this.Events = {};
        this.EventsWithIncrementors = {};

        this.LogToOmniture = function() {
            var local_s = s_gi(this.ReportSuites);
            local_s.linkTrackVars = '';

            // add language prop8 - Warning: adding prop8 to individual onclick functions will cause duplication
            local_s['prop8'] = s.prop8;
            local_s.linkTrackVars += 'channel,';
            local_s.linkTrackVars += 'prop8';

            for (var i in this.Props) {
                local_s['prop' + i] = this.Props[i];

                if (local_s.linkTrackVars.length > 0)
                    local_s.linkTrackVars += ',';

                local_s.linkTrackVars += 'prop' + i;
            }

            // add link page prop (prop67) to all link tracking calls when not already present; existing values are given preference
            if(!this.Props[67]) {

                local_s['prop67'] = s.pageName;

                if (local_s.linkTrackVars.length > 0)
                  local_s.linkTrackVars += ',';
                
                local_s.linkTrackVars += 'prop67';
            }

            // add link.href value (prop4) to all link tracking calls when not already present; existing values are given preference
            if(!this.Props[4]) {
                local_s['prop4'] = sender.getAttribute ? sender.getAttribute("href"): null;

                if (local_s.linkTrackVars.length > 0)
                  local_s.linkTrackVars += ',';
                
                local_s.linkTrackVars += 'prop4';
            }

            // add language eVar2 - Warning: adding eVar2 to individual onclick functions will cause duplication
            local_s['eVar2'] = s.eVar2;
            if (local_s.linkTrackVars.length > 0)
                local_s.linkTrackVars += ',';
            local_s.linkTrackVars += 'eVar2';

            for (var i in this.Evars) {
                local_s['eVar' + i] = this.Evars[i];

                if (local_s.linkTrackVars.length > 0)
                    local_s.linkTrackVars += ',';

                local_s.linkTrackVars += 'eVar' + i;
            }

            if (this.Events.length > 0) {
                var eventsString = '';
                if (local_s.linkTrackVars.length > 0)
                    local_s.linkTrackVars += ',';
                local_s.linkTrackVars += 'events';

                for (var i = 0; i < this.Events.length; i++) {
                    if (eventsString.length > 0)
                        eventsString += ',';

                    eventsString += 'event' + this.Events[i];
                }
                local_s.linkTrackEvents = eventsString;
                local_s.events = eventsString;
            }

            // provide support for events including values (event999=4) or serial ids (event999:abc123)
            if (this.EventsWithIncrementors.length > 0) {
                var eventNum = '',
                    eventsString = '',
                    cleanEventsString = '';
                if (local_s.linkTrackVars.length > 0 && local_s.linkTrackVars.indexOf('events') < 0)
                    local_s.linkTrackVars += ',';
                local_s.linkTrackVars += 'events';

                for (var i = 0; i < this.EventsWithIncrementors.length; i++) {
                    if (eventsString.length > 0)
                        eventsString += ',';

                    eventNum = 'event' + this.EventsWithIncrementors[i];
                    eventsString += eventNum;

                    cleanEventsString = eventNum.split(':');
                    cleanEventsString = cleanEventsString[0].split('=');
                    cleanEventsString = cleanEventsString[0];

                }
                local_s.linkTrackEvents = (local_s.linkTrackEvents) ? local_s.linkTrackEvents + ',' + cleanEventsString : cleanEventsString;
                local_s.events = (local_s.events) ? local_s.events + ',' + eventsString : eventsString;;
            }

            local_s.tl(sender, this.LinkType, this.LinkName);

            //Clear events and all props and eVars set in this click event image request
            local_s.events = '';
            for (var i in this.Props) {
                local_s['prop' + i] = '';
            }
            for (var i in this.Evars) {
                local_s['eVar' + i] = '';
            }

            if (NCIAnalytics.displayAlerts) {
                var alertString =
                    'ScriptBuilder:\n' +
                    'local_s.linkTrackVars=' + local_s.linkTrackVars;
                if (local_s.linkTrackEvents != 'None')
                    alertString += '\nlocal_s.linkTrackEvents=' + local_s.linkTrackEvents;

                if (local_s.linkTrackVars.length > 0) {
                    var linkTrackVarArray = local_s.linkTrackVars.split(',');
                    for (var i = 0; i < linkTrackVarArray.length; i++) {
                        if (linkTrackVarArray[i] != 'events') {
                            alertString += '\nlocal_s.' + linkTrackVarArray[i];
                            alertString += '=' + local_s[linkTrackVarArray[i]];
                        }
                    }
                }
                alertString += '\nReport Suites=' + this.ReportSuites;
                alertString += '\nLink Type=' + this.LinkType;
                alertString += '\nLink Name=' + this.LinkName;
                alert(alertString);
            }
        }
    },

    //*********************** onclick functions ************************************************************
    SiteWideSearch: function(sender) {
        var searchType = 'sitewide';
        var keyword = ' ';
        if (document.getElementById('swKeyword') && document.getElementById('swKeyword').value)
        {
            keyword = document.getElementById('swKeyword').value;
        }
        if (document.getElementById('swKeywordQuery') && document.getElementById('swKeywordQuery').value)
        {
            keyword = document.getElementById('swKeywordQuery').value;
        }
        if (s.prop8.toLowerCase() == 'spanish')
            searchType += '_spanish';

        clickParams = new NCIAnalytics.ClickParams(sender,
            'nciglobal', 'o', 'SiteWideSearch');
        clickParams.Props = {
            11: searchType,
            14: keyword
        };
        clickParams.Evars = {
            11: searchType,
            13: '+1',
            14: keyword
        };
        clickParams.Events = [2];
        clickParams.LogToOmniture();
    },

    //******************************************************************************************************
    SiteWideSearchResultsSearch: function(sender, keyWordTextBoxID, searchRadioButtonsID) {
        var keyword = document.getElementById(keyWordTextBoxID).value;
        var e = document.getElementsByName(searchRadioButtonsID);

        for (var i = 0; i < e.length; i++) {
            if (e[i].checked) {
                if (e[i].value == 2) {
                    var searchType = 'sitewide_bottom_withinresults';
                    break;
                }
                else {
                    var searchType = 'sitewide_bottom_new';
                    break;
                }
            }
        }

        if (s.prop8.toLowerCase() == 'spanish')
            searchType += '_spanish';

        // the Omniture s_code file generates 'class does not support Automation' errors on the
        // dataSrc, dataFld, and dataFormatAs properties the 'SEARCH' Image button = therefore reference to
        // the control is being set to null instead of sender
        clickParams = new NCIAnalytics.ClickParams(this,
            'nciglobal', 'o', 'SiteWideSearchResultsSearch');
        clickParams.Props = {
            11: searchType,
            14: keyword
        };
        clickParams.Evars = {
            11: searchType,
            13: '+1',
            14: keyword
        };
        clickParams.Events = [2];
        clickParams.LogToOmniture();
    },

    //******************************************************************************************************
    SiteWideSearchResults: function(sender, isBestBet, resultIndex) {
        var searchModule = (isBestBet) ? 'best_bets' : 'generic';

        clickParams = new NCIAnalytics.ClickParams(sender,
            'nciglobal', 'o', 'SiteWideSearchResults');
        clickParams.Props = {
            12: searchModule,
            13: resultIndex
        };
        clickParams.Evars = {
            12: searchModule
        };
        clickParams.LogToOmniture();
    },

    //******************************************************************************************************
    CTSearch: function(webAnalyticsOptions) {
        var searchType = 'clinicaltrials';
        var location = '';
        var treatmentType = '';
        var statusPhase = '';
        var trialIdSponsor = '';
        var trialType = '';
        var phaseList = '';
        var sponsor = '';
        var keyword = '';

        var cancerTypeCondition = $('#' + ids.cancerType + " option:selected").text();

        //Location
        switch($("#" + ids.locationSelector).val()) {
            case "all": location = "all locations"; break;

            case "zip": location = "Near Zip Code"; break;

            case "city": location = "In City/State/Country"; break;

            case "hospital": location = "At Hospital/Institution"; break;

            case "nih": // - At NIH
                if ($("#" + ids.nihOnly)[0].checked)
                    location = 'At NIH Only Bethesda, Md';
                else
                    location = 'At NIH';
                break;
        }

        // Trial Phase
        // - Phase
        if ($("#" + ids.trialPhase_1)[0].checked || $("#" + ids.trialPhase_2)[0].checked || $("#" + ids.trialPhase_3)[0].checked || $("#" + ids.trialPhase_4)[0].checked) {
            phaseList = 'Trial Phase';
        }

        statusPhase += phaseList + NCIAnalytics.fieldDelimiter;
        // - New Trial
        if ($("#" + ids.newOnly)[0].checked) {
            item = $('trialStatusTable').select("label[for=newOnly]");
            statusPhase += 'New Trials';
        }

        // Trial / Treatment Type
        trialType = NCIAnalytics.SelectedTextList(
            webAnalyticsOptions.typeOfTrialControlID,
            NCIAnalytics.stringDelimiter);
        if ((trialType != '') && (trialType != 'All'))
            treatmentType += 'Type of Trial';
        treatmentType += NCIAnalytics.fieldDelimiter;
        if (NCIAnalytics.SelectedDeleteList(
                webAnalyticsOptions.drugControlID,
                NCIAnalytics.stringDelimiter) != '')
            treatmentType += 'Drug';
        treatmentType += NCIAnalytics.fieldDelimiter;
        if (NCIAnalytics.SelectedDeleteList(
                webAnalyticsOptions.treatnentInterventionControlID,
                NCIAnalytics.stringDelimiter) != '')
            treatmentType += 'Treatment/Intervention';

        // Trial ID
        if ($("#" + ids.protocolID).val() != '')
            trialIdSponsor += 'Protocol ID';
        trialIdSponsor += NCIAnalytics.fieldDelimiter;
        if (NCIAnalytics.SelectedDeleteList(
                webAnalyticsOptions.trialInvestigatorsControlID,
                NCIAnalytics.stringDelimiter) != '')
            trialIdSponsor += 'Trial Investigators';
        trialIdSponsor += NCIAnalytics.fieldDelimiter;
        if (NCIAnalytics.SelectedDeleteList(
                webAnalyticsOptions.leadOrganizationCooperativeGroupControlID,
                NCIAnalytics.stringDelimiter) != '')
            trialIdSponsor += 'Lead Organization';

        //if ($("#" + ids.txtKeywords_state).val() == 'valid')
        if ($("#" + ids.txtKeywords).val())
            keyword = $("#" + ids.txtKeywords).val();

        clickParams = new NCIAnalytics.ClickParams(this,
            'nciglobal,nciclinicaltrials', 'o', 'CTSearch');
        clickParams.Props = {
            11: searchType,
            17: cancerTypeCondition,
            18: location,
            19: treatmentType,
            20: statusPhase,
            21: trialIdSponsor,
            22: keyword
        };
        clickParams.Evars = {
            11: searchType,
            13: '+1',
            17: cancerTypeCondition,
            18: location,
            19: treatmentType,
            20: statusPhase,
            21: trialIdSponsor
        };
        clickParams.Events = [2];
        clickParams.LogToOmniture();
    },

    //******************************************************************************************************
    CTSearchResults: function(sender, resultIndex) {

        clickParams = new NCIAnalytics.ClickParams(sender,
            'nciglobal,nciclinicaltrials', 'o', 'CTSearchResults');
        clickParams.Props = {
            13: resultIndex
        };
        clickParams.LogToOmniture();
    },

    //******************************************************************************************************
    TermsDictionarySearch: function(sender, isSpanish) {
        //var prop24Contents = (document.getElementById('radioStarts').checked) ? 'starts with' : 'contains';
        var prop24Contents = ($("#" + ids.radioStarts)[0].checked) ? 'starts with' : 'contains';
        NCIAnalytics.TermsDictionarySearchCore(sender,
            $("#" + ids.AutoComplete1).val(),
            prop24Contents,
            'TermsDictionarySearch',
            isSpanish);
    },

    //******************************************************************************************************
    GeneticsDictionarySearch: function(sender, searchString, isStartsWith) {
        var prop24Contents = (isStartsWith) ? 'starts with' : 'contains';

        clickParams = new NCIAnalytics.ClickParams(sender,
            '', 'o', 'GeneticsDictionarySearch');
        clickParams.Props = {
            11: 'dictionary_genetics',
            22: searchString,
            24: prop24Contents
        };
        clickParams.Evars = {
            11: 'dictionary_genetics',
            13: '+1',
            26: prop24Contents
        };
        clickParams.Events = [2];
        clickParams.LogToOmniture();
    },

    //Created this function to be consistent with the Term Dictionary search.
    //Since, we are not sure if the doc sites are using this function; Dion recommend I leave
    //the original function GeneticsDictionarySearch alone.
    //******************************************************************************************************
    GeneticsDictionarySearchNew: function(sender) {

        var prop24Contents = ($("#" + ids.radioStarts)[0].checked) ? 'starts with' : 'contains';

        clickParams = new NCIAnalytics.ClickParams(sender,
            '', 'o', 'GeneticsDictionarySearch');
        clickParams.Props = {
            11: 'dictionary_genetics',
            22: $("#" + ids.AutoComplete1).val(),
            24: prop24Contents
        };
        clickParams.Evars = {
            11: 'dictionary_genetics',
            13: '+1',
            26: prop24Contents
        };
        clickParams.Events = [2];
        clickParams.LogToOmniture();

    },

    //******************************************************************************************************
    GeneticsDictionarySearchAlphaList: function(sender, value) {

        clickParams = new NCIAnalytics.ClickParams(sender,
            '', 'o', 'GeneticsDictionarySearchAlphaList');
        clickParams.Props = {
            11: 'dictionary_genetics',
            22: value,
            24: 'starts with'
        };
        clickParams.Evars = {
            11: 'dictionary_genetics',
            13: '+1',
            26: 'starts with'
        };
        clickParams.Events = [2];
        clickParams.LogToOmniture();
    },

    //******************************************************************************************************
    GeneticsDictionaryResults: function(sender, resultIndex) {

        clickParams = new NCIAnalytics.ClickParams(sender,
            '', 'o', 'GeneticsDictionaryResults');
        clickParams.Props = {
            13: resultIndex
        };
        clickParams.LogToOmniture();
    },

    //******************************************************************************************************
    TermsDictionarySearchAlphaList: function(sender, value) {

        NCIAnalytics.TermsDictionarySearchCore(sender,
            value,
            'starts with',
            'TermsDictionarySearchAlphaList',
            false);
    },

    //******************************************************************************************************
    TermsDictionarySearchAlphaListSpanish: function(sender, value) {

        NCIAnalytics.TermsDictionarySearchCore(sender,
            value,
            'starts with',
            'TermsDictionarySearchAlphaList',
            true);
    },

    //******************************************************************************************************
    TermsDictionarySearchCore: function(sender, value, prop24Contents, linkName, isSpanish) {

        if (isSpanish)
            var searchType = 'diccionario';
        else
            var searchType = 'dictionary_terms';

        clickParams = new NCIAnalytics.ClickParams(sender,
            'nciglobal', 'o', linkName);
        clickParams.Props = {
            11: searchType,
            22: value,
            24: prop24Contents
        };
        clickParams.Evars = {
            11: searchType,
            13: '+1',
            26: prop24Contents
        };
        clickParams.Events = [2];
        clickParams.LogToOmniture();
    },

    //******************************************************************************************************
    TermsDictionaryResults: function(sender, resultIndex) {

        clickParams = new NCIAnalytics.ClickParams(sender,
            'nciglobal', 'o', 'TermsDictionaryResults');
        clickParams.Props = {
            13: resultIndex
        };
        clickParams.LogToOmniture();
    },

    //******************************************************************************************************
    DrugDictionarySearch: function(sender) {
        var prop24Contents = ($("#" + ids.radioStarts)[0].checked) ? 'starts with' : 'contains';

        NCIAnalytics.DrugDictionarySearchCore(sender,
            $("#" + ids.AutoComplete1).val(),
            prop24Contents,
            'DrugDictionarySearch');
    },

    //******************************************************************************************************
    DrugDictionarySearchAlphaList: function(sender, value) {

        NCIAnalytics.DrugDictionarySearchCore(sender,
            value,
            'starts with',
            'DrugDictionarySearchAlphaList');
    },

    //******************************************************************************************************
    DrugDictionarySearchCore: function(sender, value, prop24Contents, linkName) {
        var searchType = 'dictionary_drugs';

        clickParams = new NCIAnalytics.ClickParams(sender,
            'nciglobal,ncidrugdictionary', 'o', linkName);
        clickParams.Props = {
            11: searchType,
            22: value,
            24: prop24Contents
        };
        clickParams.Evars = {
            11: searchType,
            13: '+1',
            26: prop24Contents
        };
        clickParams.Events = [2];
        clickParams.LogToOmniture();
    },

    //******************************************************************************************************
    DrugDictionaryResults: function(sender, resultIndex) {

        clickParams = new NCIAnalytics.ClickParams(sender,
            'nciglobal,ncidrugdictionary', 'o', 'DrugDictionaryResults');
        clickParams.Props = {
            13: resultIndex
        };
        clickParams.LogToOmniture();
    },

    //******************************************************************************************************
    FeaturedClinicalTrialSearch: function(sender) {
        var searchType = 'clinicaltrials_featured';
        var keyword = document.getElementById('keyword').value;

        clickParams = new NCIAnalytics.ClickParams(sender,
            'nciglobal', 'o', 'FeaturedClinicalTrialSearch');
        clickParams.Props = {
            11: searchType,
            22: keyword
        };
        clickParams.Evars = {
            11: searchType,
            13: '+1'
        };
        clickParams.Events = [2];
        clickParams.LogToOmniture();
    },

    //******************************************************************************************************
    BulletinSearch: function(sender, bulletinSearchType) {
        var keyword = document.getElementById('cbkeyword').value;
        var searchType = 'bulletin';

        if (bulletinSearchType == 1) { // Search by keyword and date range
            var startDate = document.getElementById('startMonth').options[document.getElementById('startMonth').selectedIndex].text.replace(/^\s+|\s+$/g, '') + ' '
                + document.getElementById('startYear').value;
            var endDate = document.getElementById('endMonth').options[document.getElementById('endMonth').selectedIndex].text + ' '
                + document.getElementById('endYear').value;
            NCIAnalytics.KeywordDateRangeSearch(sender, searchType, keyword, startDate, endDate);
        }
        else {  // Search by Keyword
            clickParams = new NCIAnalytics.ClickParams(sender,
                'nciglobal', 'o', 'KeywordSearch');
            clickParams.Props = {
                11: searchType,
                22: keyword
            };
            clickParams.Evars = {
                11: searchType,
                13: '+1'
            };
            clickParams.Events = [2];
            clickParams.LogToOmniture();
        }
    },

    //******************************************************************************************************
    NewsSearch: function(sender, searchType) {
        var keyword = document.getElementById('keyword').value;
        var startDate = document.getElementById('startMonth').options[document.getElementById('startMonth').selectedIndex].text.replace(/^\s+|\s+$/g, '') + ' '
            + document.getElementById('startYear').value;
        var endDate = document.getElementById('endMonth').options[document.getElementById('endMonth').selectedIndex].text + ' '
            + document.getElementById('endYear').value;

        NCIAnalytics.KeywordDateRangeSearch(sender, searchType, keyword, startDate, endDate);
    },

    //******************************************************************************************************
    GeneticServicesDirectorySearch: function(sender) {
        var searchType = 'genetics';
        var typeOfCancer = '';
        var familyCancerSyndrome = '';
        var city = $("#" + ids.txtCity).val();
        var state = '';
        var country = '';
        var lastName = $("#" + ids.txtLastName).val();
        var searchCriteria = '';
        var specialty = '';
        var selected = '';
        var list;

        //get Type(s) of Cancer
        typeOfCancer = NCIAnalytics.SelectedOptionList(ids.selCancerType,
            NCIAnalytics.stringDelimiter);

        // get Family Cancer Syndrome
        familyCancerSyndrome = NCIAnalytics.SelectedOptionList(ids.selCancerFamily,
            NCIAnalytics.stringDelimiter);

        //get State(s)
        state = NCIAnalytics.SelectedOptionList(ids.selState,
            NCIAnalytics.stringDelimiter);

        //get Country(ies)
        country = NCIAnalytics.SelectedOptionList(ids.selCountry,
            NCIAnalytics.stringDelimiter);

        searchCriteria =
            [typeOfCancer, familyCancerSyndrome, city, state, country, lastName]
                .join(NCIAnalytics.fieldDelimiter);
        specialty = [typeOfCancer, familyCancerSyndrome].join(NCIAnalytics.fieldDelimiter);

        clickParams = new NCIAnalytics.ClickParams(sender,
            'nciglobal', 'o', 'GeneticServicesDirectorySearch');
        clickParams.Props = {
            11: searchType,
            22: searchCriteria,
            23: specialty
        };
        clickParams.Evars = {
            11: searchType,
            13: '+1',
            25: specialty
        };
        clickParams.Events = [2];
        clickParams.LogToOmniture();
    },

    //******************************************************************************************************
    KeywordDateRangeSearch: function(sender, searchType, keyword, startDate, endDate) {

        clickParams = new NCIAnalytics.ClickParams(sender,
            'nciglobal', 'o', 'KeywordDateRangeSearch');
        clickParams.Props = {
            11: searchType,
            22: keyword
        };
        clickParams.Evars = {
            11: searchType,
            23: startDate,
            24: endDate,
            13: '+1'
        };
        clickParams.Events = [2];
        clickParams.LogToOmniture();
    },

    //******************************************************************************************************
    KeywordSearch: function(sender, searchType) {
        var keyword = document.getElementById('keyword').value;

        clickParams = new NCIAnalytics.ClickParams(sender,
            'nciglobal', 'o', 'KeywordSearch');
        clickParams.Props = {
            11: searchType,
            22: keyword
        };
        clickParams.Evars = {
            11: searchType,
            13: '+1'
        };
        clickParams.Events = [2];
        clickParams.LogToOmniture();
    },

    //******************************************************************************************************
    SearchResults: function(sender, resultIndex) {

        clickParams = new NCIAnalytics.ClickParams(sender,
            'nciglobal', 'o', 'SearchResults');
        clickParams.Props = {
            13: resultIndex
        };
        clickParams.LogToOmniture();
    },

    //******************************************************************************************************
    PDFLink: function(sender) {

        clickParams = new NCIAnalytics.ClickParams(sender,
            'nciglobal', 'd', 'PDFLink');
        clickParams.Evars = {
            30: '+1'
        };
        clickParams.Events = [6];
        clickParams.LogToOmniture();
    },

    //******************************************************************************************************

    DownloadKindleClick: function(sender) {

        clickParams = new NCIAnalytics.ClickParams(sender,
            'nciglobal', 'd', 'DownloadKindleClick');
        clickParams.Evars = {
            30: '+1'
        };
        clickParams.Events = [22];
        clickParams.LogToOmniture();
    },

    //******************************************************************************************************

    DownloadOtherEReaderClick: function(sender) {

        clickParams = new NCIAnalytics.ClickParams(sender,
            'nciglobal', 'd', 'DownloadOtherEReaderClick');
        clickParams.Evars = {
            30: '+1'
        };
        clickParams.Events = [23];
        clickParams.LogToOmniture();
    },


    //******************************************************************************************************
    eMailLink: function(sender) {

        clickParams = new NCIAnalytics.ClickParams(sender,
            'nciglobal', 'o', 'eMailLink');

        clickParams.Props = {
            43: 'Email',
            66: ((NCIAnalytics.siteSection) ? NCIAnalytics.siteSection + '_' : '') + 'email'
        };

        clickParams.Events = [17];
        clickParams.LogToOmniture();
    },

    //******************************************************************************************************
    HelpLink: function(sender) {

        clickParams = new NCIAnalytics.ClickParams(sender,
            'nciglobal', 'o', 'HelpLink');
        clickParams.Events = [5];
        clickParams.LogToOmniture();
    },

    //******************************************************************************************************
    PrintLink: function(sender) {

        clickParams = new NCIAnalytics.ClickParams(sender,
            'nciglobal', 'o', 'PrintLink');

        clickParams.Props = {
            43: 'Print',
            66: ((NCIAnalytics.siteSection) ? NCIAnalytics.siteSection + '_' : '') + 'print'
        };

        clickParams.Events = [17];
        clickParams.LogToOmniture();
    },

    //******************************************************************************************************
    SendToPrinterLink: function(sender) {

        clickParams = new NCIAnalytics.ClickParams(sender,
            'nciglobal', 'o', 'SendToPrinterLink');
        clickParams.Events = [14];
        clickParams.LogToOmniture();
    },
    //******************************************************************************************************
    HeaderLink: function(sender, headerName) {

        clickParams = new NCIAnalytics.ClickParams(sender,
            'nciglobal', 'o', 'HeaderLink-' + headerName);
        clickParams.Props = {
            36: headerName
        };
        clickParams.Evars = {
            36: headerName
        };
        clickParams.Events = [16];
        clickParams.LogToOmniture();
    },
    //******************************************************************************************************
    FooterLink: function(sender, footerName) {

        clickParams = new NCIAnalytics.ClickParams(sender,
            'nciglobal', 'o', 'FooterLink-' + footerName);
        clickParams.Props = {
            36: footerName
        };
        clickParams.Evars = {
            36: footerName
        };
        clickParams.Events = [16];
        clickParams.LogToOmniture();
    },

    //******************************************************************************************************
    RightNavLink: function(sender, label) {

        clickParams = new NCIAnalytics.ClickParams(sender,
            'nciglobal', 'o', 'RightNavLink-');

        clickParams.Props = {
            27: sender.innerHTML, // Right Navigation Section Clicked c27
            66: ((NCIAnalytics.siteSection) ? NCIAnalytics.siteSection + '_' : '') + sender.innerHTML.toLowerCase()
        };

        // // scroll tracking - specific to pdq content where page updates, but does not reload
        // if (NCIAnalytics.siteSection === 'pdq') {


        //     // reset scroll info for next section    
        //     var scrollInfo = NCIAnalytics.getScrollDetails({
        //         source: 'RightNavLink', // optional; identifies where getScrollInfo call origniated

        //         reset: true, // clears history, treating the dynamic content as a brand new page load
        //         pageOverride: s.pageName + '/' + sender.innerHTML.toLowerCase().replace(/\s/gi,'-')

        //     });

        //     // include 'maxScrollPercentage' info in call to adobe
        //     clickParams.Props["48"] = scrollInfo.previousPageMaxVerticalTrackingString;

        //     /** Due to the way the PDQ pages behave when calling the RightNavLink() method, */
        //     /** we are unable to accurately identify the percent of page visible above the fold */
        //     /** in time to include in this call */
        //     // include 'percentAboveFold' info in call to adobe
        //     clickParams.Props["47"] = scrollInfo.percentAboveFoldAtLoadTrackingString;

        // }

        clickParams.Evars = {
            49: sender.innerHTML // Right Navigation Section Clicked v49 | visit | recent
        };

        clickParams.Events = [8];
        clickParams.LogToOmniture();
    },
	
    //******************************************************************************************************
    BulletinSubscription: function(sender) {

        clickParams = new NCIAnalytics.ClickParams(sender,
            'nciglobal', 'o', 'BulletinSubscription');
        clickParams.Events = [9];
        clickParams.LogToOmniture();
    },

    //******************************************************************************************************
    GenericLinkTrack: function(sender, label) {

        clickParams = new NCIAnalytics.ClickParams(sender,
            'nciglobal', 'o', 'GenericLinkTrack');
        clickParams.Props = {
            4: sender.href,
            5: sender.innerHTML,
            28: label
        };
        clickParams.LogToOmniture();
    },

    //******************************************************************************************************
    LinkTracking: function(toLink, fromLink, label) {

        clickParams = new NCIAnalytics.ClickParams(this,
            'nciglobal', 'o', 'LinkTracking');
        clickParams.Props = {
            4: toLink,
            5: fromLink + NCIAnalytics.stringDelimiter + toLink
        };
        clickParams.LogToOmniture();
    },

    //******************************************************************************************************
    CustomLink: function(sender, linkName) {

        clickParams = new NCIAnalytics.ClickParams(sender,
            'nciglobal', 'o', linkName);
        clickParams.LogToOmniture();
    },

    //******************************************************************************************************
    /**
     * Generic / global link tracking method
     * @param {object} payload
     * @param {object=} [payload.sender=true] - html element clicked, defaults to Boolean true
     * @param {string} payload.label - text of link clicked
     * @param {string} payload.eventList - used to specify adobe success events
     * @param {string} payload.timeToClickLink - time (in seconds) elapsed from page load to first link clicked
     * @example NCIAnalytics.GlobalLinkTrack({sender:this, label:jQuery(this).text(), siteSection: 'oga', eventList: 'ogapreaward'});
     */
    GlobalLinkTrack: function(payload) {
      var events = '', eventsWithIncrementors = '', // placeholder for success events, if needed
        sender = payload.sender || true, // default to Boolean true if no object passed
        label = payload.label || '',
        section = this.siteSection || '';
      
      if(payload.eventList) {
        switch(payload.eventList.toLowerCase()) {
          case 'ogapreaward':   events = [101]; break;
          case 'ogareceiving':  events = [102]; break;
          case 'ogacloseout':   events = [103]; break;
          case 'cctappdownload':events = [104]; break;
          case 'ccthowtoapply': events = [105]; break;
          case 'timetoclick':   eventsWithIncrementors = (payload.timeToClickLink) ? ['106=' + payload.timeToClickLink] : ''; break;
        }
      }

      var clickParams = new NCIAnalytics.ClickParams(sender, 'nciglobal', 'o', 'GlobalLinkTrack');
	  var pageDetail = NCIAnalytics.buildPageDetail() || '';
      clickParams.Props = {
          28: s.pageName + pageDetail,	  
          47: payload.percentAboveFoldAtLoadTrackingString || '',
          48: payload.previousPageMaxVerticalTrackingString || '',
          66: ((section) ? section + '_' : '') + label.toLowerCase()
      };
      clickParams.Events = events;
      clickParams.EventsWithIncrementors = eventsWithIncrementors;
      clickParams.LogToOmniture();
    },

    //******************************************************************************************************
    BookmarkShareClick: function(sender) {

        clickParams = new NCIAnalytics.ClickParams(sender,
            'nciglobal', 'o', 'BookmarkShareClick');

        var linkText = (sender.title) ? sender.title : jQuery(sender).find("a").attr("title");

        clickParams.Props = {
            43: sender.title,
            66: ((NCIAnalytics.siteSection) ? NCIAnalytics.siteSection + '_' : '') + 'social-share_' + linkText.toLowerCase()
        };

        clickParams.Events = [17];
        clickParams.LogToOmniture();
    },

    //******************************************************************************************************
    MegaMenuClick: function(sender, tree) {
        clickParams = new NCIAnalytics.ClickParams(sender,
            'nciglobal', 'o', 'MegaMenuClick');

        var pageName = sender.ownerDocument.location.hostname + sender.ownerDocument.location.pathname; // this is the URL
        if (typeof pageNameOverride !== 'undefined')
            localPageName = pageNameOverride;

        /*
         * tree.length == 1 : section/tab level
         * tree.length == 2 : subsection level
         * tree.length == 3 : link level
         */

        if (typeof tree[1] === 'undefined') {
            clickParams.Props = {
                53: tree[0].text,
                54: tree[0].text,
                55: tree[0].text,
                56: pageName
            };
            clickParams.Evars = {
                53: tree[0].text
            };
        }

        if (typeof tree[1] !== 'undefined') {
            // click was sub-section or link-level
            clickParams.Props = {
                53: tree[1].text,
                54: tree[0].text,
                55: tree[0].text,
                56: pageName
            };
            clickParams.Evars = {
                53: tree[1].text
            };
        }

        if (typeof tree[2] !== 'undefined') {
            // click was link-level
            clickParams.Props = {
                53: tree[2].text,
                54: tree[1].text,
                55: tree[0].text,
                56: pageName
            };
            clickParams.Evars = {
                53: tree[2].text
            };
        }

        clickParams.Events = [26];
        clickParams.LogToOmniture();
    },

    //******************************************************************************************************
    MegaMenuDesktopReveal: function(sender, menuText) {
        clickParams = new NCIAnalytics.ClickParams(sender, 'nciglobal', 'o', 'MegaMenuDesktopReveal');

        clickParams.Events = [28];
        clickParams.Evars = {
            52: menuText,
            43: "Mega Menu"
        };
        clickParams.Props = {
            52: menuText
        };
        clickParams.LogToOmniture();
    },


    //******************************************************************************************************
    MegaMenuMobileReveal: function(sender) {
        clickParams = new NCIAnalytics.ClickParams(sender, 'nciglobal', 'o', 'MegaMenuMobileReveal');

        clickParams.Events = [28];
        clickParams.Evars = {
            43: "Hamburger Menu"
        };
        clickParams.LogToOmniture();
    },


    //******************************************************************************************************
    MegaMenuMobileAccordionClick: function(sender, isExpanded, tree) {
        var state = isExpanded?"Expand":"Collapse";

        clickParams = new NCIAnalytics.ClickParams(sender, 'nciglobal', 'o', 'MegaMenuMobileAccordionClick');

        clickParams.Events = isExpanded?[34]:[35];
        clickParams.Props = {
            73: state + "|" + tree
        };
        clickParams.LogToOmniture();
    },


    //******************************************************************************************************
    MegaMenuMobileLinkClick: function(sender, url, linkText, linkUrl, heading, subHeading) {
        clickParams = new NCIAnalytics.ClickParams(sender, 'nciglobal', 'o', 'MegaMenuMobileLinkClick');

        clickParams.Events = [26];
        clickParams.Evars = {
            53: heading
        };
        clickParams.Props = {
            53: heading,
            54: subHeading,
            55: linkText,
            56: url
        };
        clickParams.LogToOmniture();
    },

    //******************************************************************************************************
    LogoClick: function(sender) {
        clickParams = new NCIAnalytics.ClickParams(sender,
            'nciglobal', 'o', 'Logolick');

        var pageName = sender.ownerDocument.location.hostname + sender.ownerDocument.location.pathname; // this is the URL
        if (typeof pageNameOverride !== 'undefined')
            localPageName = pageNameOverride;

        clickParams.Props = {
            53: 'NCI Logo',
            56: pageName
        };

        clickParams.Evars = {
            53: 'NCI Logo'
        };

        clickParams.Events = [26];
        clickParams.LogToOmniture();
    },

    //******************************************************************************************************
    UtilityBarClick: function(sender, linkText) {
        clickParams = new NCIAnalytics.ClickParams(sender,
            'nciglobal', 'o', 'UtilityBarDictionaryClick');

        var pageName = sender.ownerDocument.location.hostname + sender.ownerDocument.location.pathname; // this is the URL
        if (typeof pageNameOverride !== 'undefined')
            localPageName = pageNameOverride;

        clickParams.Props = {
            36: linkText,
            53: linkText,
            56: pageName
        };

        clickParams.Evars = {
            36: linkText,
            53: linkText
        };

        clickParams.Events = [16];
        clickParams.LogToOmniture();
    },

    //******************************************************************************************************
    CardClick: function(sender, cardTitle, linkText, container, containerIndex) {
        clickParams = new NCIAnalytics.ClickParams(sender,
            'nciglobal', 'o', 'FeatureCardClick');

        var pageName = sender.ownerDocument.location.hostname + sender.ownerDocument.location.pathname; // this is the URL
        if (typeof pageNameOverride !== 'undefined')
            localPageName = pageNameOverride;

        var position = container + ":" + containerIndex;

        clickParams.Props = {
            57: cardTitle,
            58: linkText,
            59: position,
            60: pageName
        };

        clickParams.Events = [27];
        clickParams.LogToOmniture();
    },

    //******************************************************************************************************
    TimelyContentZoneTab: function(sender, tabTitle) {
        clickParams = new NCIAnalytics.ClickParams(sender,
            'nciglobal', 'o', 'TimelyContentZoneTab');
        clickParams.Props = {
            37: tabTitle
        };
        clickParams.Evars = {
            37: tabTitle
        };
        clickParams.LogToOmniture();
    },

    //******************************************************************************************************
    TimelyContentZoneLink: function(e, panelTitle) {
        var targ;
        if (!e) var e = window.event;
        if (e.target) targ = e.target;
        else if (e.srcElement) targ = e.srcElement;
        if (targ.nodeType == 3) // defeat Safari bug
            targ = targ.parentNode;

        if (targ.nodeName == 'IMG')
            targ = targ.parentNode;

        if (targ.nodeName == 'EM')
            targ = targ.parentNode;

        if (targ.nodeName == 'A') {
            var linkText = "";
            var isTag = false;

            clickParams = new NCIAnalytics.ClickParams(this,
                'nciglobal', 'o', 'TimelyContentZoneLink');

            for (i = 0; i < targ.innerHTML.length; i++) {
                if (targ.innerHTML.charAt(i) == "<")
                    isTag = true;

                if (!isTag)
                    linkText = linkText + targ.innerHTML.charAt(i);

                if (targ.innerHTML.charAt(i) == ">")
                    isTag = false;

            }

            var prefixCheck = targ.innerHTML.toLowerCase();
            if (prefixCheck.search("video_icon.jpg") > -1)
                linkText = "Video: " + linkText;
            else if (prefixCheck.search("audio_icon.jpg") > -1)
                linkText = "Audio: " + linkText;

            clickParams.Props = {
                38: linkText,
                39: targ.href,
                40: panelTitle
            };
            clickParams.Evars = {
                38: linkText,
                39: targ.href,
                40: panelTitle
            };
            clickParams.LogToOmniture();
        }
    },

    //******************************************************************************************************
    QuestionsAboutCancerFooter: function(sender) {

        clickParams = new NCIAnalytics.ClickParams(sender,
            'nciglobal', 'o', 'QuestionsAboutCancerFooter');
        clickParams.Events = [5];
        clickParams.LogToOmniture();
    },

    //******************************************************************************************************
    QuestionsAboutCancerHeader: function(sender) {

        clickParams = new NCIAnalytics.ClickParams(sender,
            'nciglobal', 'o', 'QuestionsAboutCancerHeader');
        clickParams.Events = [18];
        clickParams.LogToOmniture();
    },

    //******************************************************************************************************
    FindCancerTypeBox: function(sender) {

        clickParams = new NCIAnalytics.ClickParams(sender,
            'nciglobal', 'o', 'FindCancerTypeBox');
        clickParams.Events = [19];
        clickParams.LogToOmniture();
    },

    //******************************************************************************************************
    TileCarousel: function(sender, tileTitle, tileURL) {
        clickParams = new NCIAnalytics.ClickParams(sender,
            'nciglobal', 'o', 'TileCarousel');
        clickParams.Props = {
            41: tileTitle,
            42: tileURL
        };
        clickParams.Evars = {
            41: tileTitle,
            42: tileURL
        };
        clickParams.Events = [20];
        clickParams.LogToOmniture();
    },

    //******************************************************************************************************
    LinkTrackTagBuilder: function(e) {

        if (e.button == 0) {  // Left mouse button pressed
            var linkElement = NCIAnalytics.GetElement(NCIAnalytics.GetEventTarget(e), 'A');

            if (linkElement != null &&
                linkElement.href != null &&
                linkElement.href != '' &&
                (linkElement.onclick == null ||
                linkElement.onclick.toString().indexOf('NCIAnalytics') == -1)) {

                NCIAnalytics.LinkTracking(NCIAnalytics.DissectLink(linkElement.href), location.pathname);
            }
        }
    },

    //******************************************************************************************************
    DissectLink: function(theLink) {

        if (theLink.indexOf('clickpassthrough') != -1) {
            var theLinkBreakout = theLink.split('&');
            for (var i = 0; i < theLinkBreakout.length; i++) {
                if (theLinkBreakout[i].indexOf('redirectUrl') != -1) {
                    return unescape(theLinkBreakout[i].substring(12));
                    break;
                }
            }
        }
        else {
            var theLinkBreakout = theLink.split('//');
            if (theLinkBreakout.length > 1)
                return theLinkBreakout[1];
            else
                return theLink;
        }
    },

    //******************************************************************************************************
    GetElement: function(startingNode, elementType) {

        try {

            var currentNode = startingNode;

            while (currentNode != null && currentNode.tagName != 'BODY') {
                if (currentNode.tagName == elementType) {
                    return currentNode;
                    break;
                }
                else {
                    currentNode = currentNode.parentNode;
                }
            }
        } catch (err) { }

    },

    //******************************************************************************************************
    GetEventTarget: function(e) {
        var target = (e.target) ? e.target : e.srcElement;

        if (target != null) {
            if (target.nodeType == 3)
                target = target.parentNode;
        }
        return target;
    },

    //******************************************************************************************************
    Resize: function(sender, viewPort) {
        var width = 'ResizedTo' + viewPort;
        clickParams = new NCIAnalytics.ClickParams(sender, 'nciglobal', 'o', width);
        clickParams.Evars = {
            5: viewPort
        };
        clickParams.Events = [7];
        clickParams.LogToOmniture();
    },


    //******************************************************************************************************
    OnThisPageClick: function(sender, linkText, pageName) {
        clickParams = new NCIAnalytics.ClickParams(sender, 'nciglobal', 'o', 'OnThisPageClick');
        linkText = "OnThisPage_" + linkText;
        clickParams.Props = {
            66: linkText,
            67: pageName
        };
        clickParams.Events = [29];

        // account for cct 'how to apply' success event
        if(linkText.search(/^how\sto\sapply/gi) > -1) {
            clickParams.Events.push(105);
        }

        clickParams.LogToOmniture();
    },

    //******************************************************************************************************
    BackToTopReveal: function(sender, reveal) {
        clickParams = new NCIAnalytics.ClickParams(sender, 'nciglobal', 'o', 'BackToTopReveal');

        clickParams.Events = [20];
        clickParams.LogToOmniture();
    },

    //******************************************************************************************************
    BackToTopClick: function(sender, isUtilityBarVisible) {
        clickParams = new NCIAnalytics.ClickParams(sender, 'nciglobal', 'o', 'BackToTopClick');

        clickParams.Events = [21];
        clickParams.Props = {
            50: isUtilityBarVisible?"UtilityBarShowing":"UtilityBarHidden"
        };
        clickParams.LogToOmniture();
    },

    //******************************************************************************************************
    SectionMenuButtonClick: function(sender, heading) {
        clickParams = new NCIAnalytics.ClickParams(sender, 'nciglobal', 'o', 'SectionMenuButtonClick');

        clickParams.Events = [30];
        clickParams.Evars = {
            43: "Section Menu",
            45: heading
        };
        clickParams.LogToOmniture();
    },

    //******************************************************************************************************
    SectionAccordionClick: function(sender, url, isExpanded, heading, parent) {
        var state = isExpanded?"Expand":"Collapse";
        clickParams = new NCIAnalytics.ClickParams(sender, 'nciglobal', 'o', 'SectionAccordionClick');

        clickParams.Events = isExpanded?[31]:[32];
        clickParams.Evars = {
            43: "Section Menu",
            45: heading
        };
        clickParams.Props = {
            68: state + "|" + parent,
            66: ((NCIAnalytics.siteSection) ? NCIAnalytics.siteSection + '_' : '') + state.toLowerCase() + "|" + parent.toLowerCase()
        };
        clickParams.LogToOmniture();
    },

    //******************************************************************************************************
    SectionLinkClick: function(sender, url, heading, linkText, depth) {
        clickParams = new NCIAnalytics.ClickParams(sender, 'nciglobal', 'o', 'SectionLinkClick');

        clickParams.Events = [33];

        // account for cct 'how to apply' success event
        if(linkText.search(/^how\sto\sapply/gi) > -1) {
            clickParams.Events.push(105);
        }

        clickParams.Evars = {
            43: "Section Menu",
            45: heading
        };
        clickParams.Props = {
            66: ((NCIAnalytics.siteSection) ? NCIAnalytics.siteSection + '_' : '') + linkText.toLowerCase(),
            69: heading,
            70: linkText,
            71: depth,
            72: url
        };
        clickParams.LogToOmniture();
    },

    //******************************************************************************************************
    fontResizer: function(sender, fontSize, onload) {
        clickParams = new NCIAnalytics.ClickParams(sender, 'nciglobal', 'o', 'fontResizer');

        if(!onload){
            clickParams.Events = [36];
        }
        clickParams.Props = {
            42: fontSize,
            66: ((NCIAnalytics.siteSection) ? NCIAnalytics.siteSection + '_' : '') + 'font-resize_' + ((fontSize) ? fontSize.toLowerCase() : '')
        };
        clickParams.LogToOmniture();
    },

    /******************************************************************************************************
    * General accordion click tracking
    * sender - the element responsible for this event.
    * accordionId - identifier for the whole accordion 
	* sectionId - identifier for the clicked accordion section
	* name - readable accordion section name
	* action - expand or collapse
	*/
    AccordionClick: function(sender, accordionId, sectionId, name, action) {
        clickParams = new NCIAnalytics.ClickParams(this, 'nciglobal', 'o', 'LinkTracking');

        var accordionInfo = accordionId;
        if(sectionId) accordionInfo += ('|' + sectionId);
        if(name) accordionInfo += ('|' + name);
        if(action) accordionInfo += ('|' + action);
        clickParams.Props = {
            41: accordionInfo
        };
        clickParams.LogToOmniture();
    },

    // Home Page Delighter Click
    // sender - the element responsible for this event.
    // type - the delighter type.
    // value - pageName
    HomePageDelighterClick: function(sender, type, value) {
        if( type === 'hp_find'){
            clickParams = new NCIAnalytics.ClickParams(sender, 'nciglobal', 'o', 'HomePageFindDelighter');
            clickParams.Props = {
                5 : 'hp_find ct delighter|' + value
            };
            clickParams.LogToOmniture();
        }
    },

	// Record that an item in the delighter rail was clicked.
	// sender - the element responsible for this event.
	// type - the delighter type.
	RecordDelighterRailClick: function(sender, type) {
		var pageName = s.pageName;
		if( type === 'livehelp'){
			clickParams = new NCIAnalytics.ClickParams(sender, 'nciglobal', 'o', 'DelighterLiveChat');
			clickParams.Props = {
				5 : 'rrail_chat with us|' + pageName
			};
			clickParams.LogToOmniture();
		}
	},

	// Record that the proactive chat prompt was displayed.
	// sender - the element responsible for this event.
	RecordProactiveChatPromptDisplay: function(sender){
		var pageName = s.pageName;
		clickParams = new NCIAnalytics.ClickParams(sender, 'nciglobal', 'o', 'ProactiveChat');
		clickParams.Props = {
			5 : 'livehelp_proactive chat - display|' + pageName
		};
		clickParams.Events = [45];
		clickParams.LogToOmniture();
	},

	// Record that the proactive "Chat Now" button was clicked.
	// sender - the element responsible for this event.
	RecordProactiveChatPromptClick: function(sender){
		var pageName = s.pageName;
		clickParams = new NCIAnalytics.ClickParams(sender, 'nciglobal', 'o', 'ProactiveChat');
		clickParams.Props = {
			5 : 'livehelp_proactive chat - launch|' + pageName
		};
		clickParams.Events = [44];
		clickParams.LogToOmniture();
	},

	// Record that the proactive chat prompt was dismissed.
	// sender - the element responsible for this event.
	RecordProactiveChatPromptDismissal: function(sender){
		var pageName = s.pageName;
		clickParams = new NCIAnalytics.ClickParams(sender, 'nciglobal', 'o', 'ProactiveChat');
		clickParams.Props = {
			5 : 'livehelp_proactive chat - dismiss|' + pageName
		};
		clickParams.Events = [43];
		clickParams.LogToOmniture();
	},
	
	/******************************************************************************************************
	* Track clicks on CTS feedback form
	* sender - the element responsible for this event.
	*/	
	FeedbackFormClick: function(sender, value){
		var pageName = s.pageName;
		clickParams = new NCIAnalytics.ClickParams(sender, 'nciglobal', 'o', 'FeedbackForm');
		clickParams.Props = {
			5 : value + '|' + pageName
		};
		clickParams.LogToOmniture();
	},
	
    /******************************************************************************************************
	* Track link clicks on CTS pages
	* sender - the element responsible for this event.
	* type - info about which component is being tracked
	* value - pagename 
	*/
	SimpleCTSLink: function(sender, type, value) {
		clickParams = new NCIAnalytics.ClickParams(sender, 'nciglobal', 'o', 'CTSLink');
		clickParams.Props = {
			5: type + '|' + value
		};
		clickParams.LogToOmniture();
	},

    /******************************************************************************************************
	* Track search result click on CTS Results page
	* sender - the element responsible for this event
	* rank - the position of the selected item on a given page
	*/
	CTSResultsClick: function(sender, rank) {
		clickParams = new NCIAnalytics.ClickParams(sender, 'nciglobal', 'o', 'CTSLink');
		clickParams.Events = [42];
		clickParams.Props = {
			12: 'clinicaltrials_basic',
			13: rank
		};
		clickParams.Evars = {
			12: 'clinicaltrials_basic'
		};
		clickParams.LogToOmniture();
	},
    //******************************************************************************************************
    /* SPLF_Hier1: function() {
     // URL structure
     // element 0 = blank
     // element 1 = "Cancertopics"
     // element 2 = "types"
     // element 3 = type of cancer
     // element 4 = Patient/Health Professional
     // element 5 = topic
     // element 6 = sub-topic

     delimiter = "|";
     pathArray = window.location.pathname.split('/');
     out = "[" + pathArray.length.toString() + "] ";
     for (i = 0; i < pathArray.length; i++)
     out = out + " - (" + i.toString() + ") " + pathArray[i];
     //alert(out);
     s.hier1 = s.channel;
     if (pathArray.length >= 4) {
     if (pathArray[1].toLowerCase() == "cancertopics") {
     if (pathArray[2].toLowerCase() == "types") {
     s.prop30 = pathArray[3];
     s.hier1 += delimiter + s.prop30;
     if (pathArray.length >= 5) {
     s.prop43 = pathArray[4];
     s.hier1 += delimiter + s.prop43;
     if (pathArray.length >= 6) {
     s.prop44 = pathArray[5];
     s.hier1 += delimiter + s.prop44;
     if (pathArray.length >= 7) {
     s.prop45 = pathArray[6];
     s.hier1 += delimiter + s.prop45;
     }
     }
     }
     }
     }
     }
     },
     */

    SPLF_Lang: function() {
        //alert('Lang');
    },
    //******************************************************************************************************
    VideoSplashImageClick: function(sender, video, pageName) {
        clickParams = new NCIAnalytics.ClickParams(sender, 'nciglobal', 'o', 'OnThisPageClick');

        clickParams.Props = {
            66: "VideoStart_" + video,
            67: pageName
        };
        clickParams.Events = [51];
        clickParams.LogToOmniture();
    },
    //******************************************************************************************************
    BRPiconClick: function(sender, file, pageName) {
        clickParams = new NCIAnalytics.ClickParams(sender, 'nciglobal', 'o', 'OnThisPageClick');

        clickParams.Props = {
            66: "FileDownload_" + file,
            67: pageName
        };
        clickParams.Events = [52];
        clickParams.LogToOmniture();
    }
};

/* ********************************************************************** */
/* ********************************************************************** */
/* ********************************************************************** */
/* ********************************************************************** */
/* ********************************************************************** */

/**
 * defines page detail value, primary focus is pdq page sections as of initial logic
 * this logic should be part of the initial page load call (s.prop28)
 * @author Evolytics <nci@evolytics.com>
 * @since 2016-08-12
 */
NCIAnalytics.buildPageDetail = function() {
    var hash = document.location.hash,
        return_val = '';

    // find name of current pdq section
    hash = hash.replace(/#section\//g, '');
    if (hash) {
        return_val = jQuery("#" + hash + " h2").text().toLowerCase();
    }

    // add '/' as prefix, if return_val exists and '/' not already present
    if (return_val && return_val.indexOf('/') != 0) {
        return_val = '/' + return_val;
    }
    return (return_val);
};

/**
 * start page load timer for use with custom link tracking
 * @author Evolytics <nci@evolytics.com>
 * @since 2016-08-12
 */
jQuery().ready(function() {
    window.pageLoadedAtTime = new Date().getTime();
});

/**
 * dynamic link tracking for http://www.cancer.gov/grants-training
 * tracks clicks on all links to an oga or cct page, including time from page load to link click
 * @author Evolytics <nci@evolytics.com>
 * @since 2016-08-12
 */
if (document.location.pathname === '/grants-training/') {
    jQuery("#content").on('click', "a[href*='grants-training']", function() {
        var href = jQuery(this).attr('href'),
            linkText = jQuery(this).text().toLowerCase().substring(0, 89).trim(),
            linkClickedAtTime = new Date().getTime(),
            destinationSiteSection = '';

        // identify destination site section; used to determine whether or not to send a call
        if (oga_pattern.test(href)) {
            destinationSiteSection = 'oga';
        } else if (cct_pattern.test(href)) {
            destinationSiteSection = 'cct'
        }

        if (destinationSiteSection && window.pageLoadedAtTime) {
            NCIAnalytics.GlobalLinkTrack({
                sender: this,
                label: (destinationSiteSection) ? destinationSiteSection + '_' + linkText : linkText,
                timeToClickLink: Math.round((linkClickedAtTime - window.pageLoadedAtTime) / 1000), // calculate time to click
                eventList: 'timetoclick' // specify success event (event106)
            });
        }
    });
}

/***********************************************************************************************************
/**
 * Creates or updates specified cookie
 * @param {string} pv_cookieName - name of cookie to create/update
 * @param {string} pv_cookieValue - value to store in cookie
 * @param {string=} pv_expireDays - optional number of days to store cookie (defaults to session expiration)
 * @example this.cookieWrite('my_cookie', 'example', '10');
 */
NCIAnalytics.cookieWrite = function(pv_cookieName, pv_cookieValue, pv_expireDays) {
    var exdate = (pv_expireDays) ? new Date() : '';
    if (exdate) {
        exdate.setDate(exdate.getDate() + pv_expireDays || 0);
        exdate = exdate.toUTCString();
    }

    var h = window.location.hostname;
    h = h.split('.');
    h = h.splice(h.length - 2, 2); //grab lst 2 positions of hostname (ie//"example.com")
    h = h.join('.');

    var aryCookieCrumbs = [];
    aryCookieCrumbs.push(pv_cookieName + '=' + encodeURI(pv_cookieValue));
    aryCookieCrumbs.push('path=/');
    aryCookieCrumbs.push('domain=' + h);
    if (exdate) {
        aryCookieCrumbs.push('expires=' + exdate);
    }
    document.cookie = aryCookieCrumbs.join(';');
}

/**
 * Retrieve cookie value
 * @param {string} c_name - name of cookie to retrieve
 * @return {string} cookie value
 * @example this.getCookie('cookie_name'); => {string} cookie value
 */
NCIAnalytics.cookieRead = function(c_name) {
    if (document.cookie.length > 0) {
        var c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            var c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return decodeURI(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

/**
 * calculate visible page percentages on page load and max percent of previous page viewed based on scroll depth
 * @author Evolytics <nci@evolytics.com>
 * @since 2016-09-30
 * @returns {object}
 * @param {object} payload
 * @param {Boolean} payload.updateOnly - Restricts functionality when updating data; Typically only used with onscroll
 * @param {Boolean} payload.reset - Simulates a true page load/broswer referesh on SPA pages
 * @param {string} payload.source - Identifies location where call to getScrollDetails occurred 
 * @param {string} payload.pageOverride - Override value for last element of TrackingString properties
 * @requires jQuery
 * @requires s
 */
NCIAnalytics.getScrollDetails = function(payload) {
    var previousPageScroll = NCIAnalytics.previousPageMaxVerticalTrackingString || '',
        pageSection = '';//jQuery(".accordion").find("section.show h2").text(); // pdq page section (same as right rail menu links)
    page = s.pageName + ((pageSection) ? '/' + pageSection : '');

    if (payload) {
        // only grab the previousPageScroll value from cookie if NOT a scroll update
        if (payload.updateOnly != true) {
            previousPageScroll = NCIAnalytics.cookieRead('nci_scroll');
            NCIAnalytics.cookieWrite('nci_scroll', ''); // assume we only want to use the value once
        }

        // manual reset for pages that update length without a page load/refresh (simulate a new page load)
        if (payload.reset === true) {
            NCIAnalytics.maxVerticalScroll = 0;
            NCIAnalytics.maxPageHeight = 0;
            NCIAnalytics.scrollDetails_orig = "";
        }

        // allows for special handling based on where the getScrollDetails() call originates
        if (payload.source) {
            // console.info('source: ' + payload.source);
        }

        // allow for override of page property
        if (payload.pageOverride) {
            page = payload.pageOverride;
        }
    }

    page = page.replace(/www\.cancer\.gov/i, '').replace(/\s/gi, '-').toLowerCase();

    var maxVerticalScroll = NCIAnalytics.maxVerticalScroll || 0,
        maxPageHeight = NCIAnalytics.maxPageHeight || 0,
        viewportHeight = window.innerHeight,
        verticalScrollDistance = window.pageYOffset,
        fullPageHeight = (function() {
            var body = document.body,
                html = document.documentElement;

            var height = Math.max(body.scrollHeight, body.offsetHeight,
                html.clientHeight, html.scrollHeight, html.offsetHeight
            );
            return (height);
        })();

    // calculate max scroll distance, always choosing larger of current scroll distance and max distance already recorded
    NCIAnalytics.maxVerticalScroll = (verticalScrollDistance > maxVerticalScroll) ? verticalScrollDistance : maxVerticalScroll;
    NCIAnalytics.maxPageHeight = (fullPageHeight > maxPageHeight) ? fullPageHeight : maxPageHeight;

    // calculate percentages and total pixels viewed
    var totalPageViewed = NCIAnalytics.maxVerticalScroll + viewportHeight;
    percentAboveFoldAtLoad = Math.round(100 * (viewportHeight / fullPageHeight)),
        percentOfTotalPageViewed = Math.round(100 * (totalPageViewed / NCIAnalytics.maxPageHeight));

    // create object for packaging up the data
    function updateScrollDetails(pv_scrollObject) {
        var retVal = pv_scrollObject || {};

        // measurements
        retVal.viewportHeight = viewportHeight; // px
        retVal.fullPageHeight = fullPageHeight; // px
        retVal.verticalScrollDistance = verticalScrollDistance; // px
        retVal.maxVerticalScroll = NCIAnalytics.maxVerticalScroll; // px
        retVal.maxPageHeight = NCIAnalytics.maxPageHeight; // px
        retVal.totalPageViewed = totalPageViewed; // px

        // capture percentAboveFoldAtLoad and generate tracking string
        retVal.percentAboveFoldAtLoad = (percentAboveFoldAtLoad === Infinity) ? 100 : percentAboveFoldAtLoad;
        retVal.percentAboveFoldAtLoadTrackingString = retVal.percentAboveFoldAtLoad + 'pct|' +
            NCIAnalytics.maxPageHeight + 'px|' + page;

        // store percentOfTotalPageViewed in cookie for capture on next non-updateOnly page call (store in nci_scroll cookie)
        retVal.percentOfTotalPageViewed = (percentOfTotalPageViewed === Infinity) ? 100 : percentOfTotalPageViewed;
        retVal.previousPageMaxVerticalTrackingString = previousPageScroll;

        return (retVal);
    }

    NCIAnalytics.scrollDetails = updateScrollDetails();

    // set cookie for capture on next page (or next non-updateOnly call to this function)
    NCIAnalytics.cookieWrite('nci_scroll', NCIAnalytics.scrollDetails.percentOfTotalPageViewed + 'pct|' + NCIAnalytics.maxPageHeight + 'px|' + page);

    // preserve values captured first time function is called (on page load)
    if (!NCIAnalytics.scrollDetails_orig || NCIAnalytics.scrollDetails_orig == "") {
        NCIAnalytics.scrollDetails_orig = updateScrollDetails();
    }

    // send analytics call
    if(payload && payload.sendCall === true) {
        NCIAnalytics.GlobalLinkTrack({
            percentAboveFoldAtLoadTrackingString: NCIAnalytics.scrollDetails.percentAboveFoldAtLoadTrackingString,
            previousPageMaxVerticalTrackingString: NCIAnalytics.scrollDetails.previousPageMaxVerticalTrackingString
        })
    }

    // console.table(NCIAnalytics.scrollDetails);
    return (NCIAnalytics.scrollDetails);
};

/**
 * builds page detail-like string, including pageName and hash value
 * for pdq content, checks for section name in html based on provided hash/section id
 * @param {object} payload
 * @param {string} payload.hash
 * @param {string} payload.page
 * @returns {string}
 */
function buildPageOverride(payload) {
    var retVal = '',
        section = '',
        hash = payload.hash,
        page = payload.page;

    retVal = page || '';

    // clean up the hash, if needed
    hash = hash.replace(/^\#?section\//i, '');

    // get the page detail (section name) string
    section = NCIAnalytics.buildPageDetail();
    section = (section) ? section : hash; // default to hash value if nothing returns from buildPageDetail()
    section = section.replace(/^\//, '');
    
    // stitch it all together
    retVal += (section) ? '/' + section : '';

    return(retVal);
}

/**
 * watches for any change in value for specified variables
 * @param {object} payload
 * @param {string} payload.name - name of variable being monitored; stored in window scope as window[payload.name]
 * @param payload.value
 * @param {function} payload.callback - action to complete if variable value changes
 */
function changeMonitor(payload) {
  var variableName = payload.name,
      variableValue = payload.value;
  
  if(window[variableName] != variableValue) {
    // console.info('window["' + variableName + '"] has changed from ' + window[variableName] + ' to "' + variableValue + '"');

    if(payload.callback) {
      payload.callback();
    }
    window[variableName] = variableValue;                 
  }
}

/**
 * cross-browser eventListener logic
 * @author Evolytics <nci@evolytics.com>
 */
function attachEvents(payload) {
    var element = payload.element,
        event = payload.event,
        action = payload.action;

    if (element['addEventListener']) {
        element['addEventListener'](event, action);
    } else if (element['attachEvent']) {
        element['attachEvent']('on' + event, action);
    }
}

// trigger initial NCIAnalytics.getScrollDetails() call on window.load, but can be called inline, prior
// to calling adobe's s.t() method
attachEvents({
    element: window,
    event: 'load',
    action: function() {
        NCIAnalytics.getScrollDetails({
            source: 'window.load',
            pageOverride: buildPageOverride({page: s.pageName, hash: document.location.hash})
        });
    }
});

// on scroll, start timer. once scroll stops, run specified function...
var timer;
attachEvents({
    element: window,
    event: 'scroll',
    action: function() {
        clearTimeout(timer);
        timer = setTimeout(function() {
            NCIAnalytics.getScrollDetails({
                updateOnly: true,
                source: 'window.scroll',
                pageOverride: buildPageOverride({page: s.pageName, hash: document.location.hash})
            })
        }, 150);
    }
});

/**
 * monitor for changes in document.location.hash
 */  
attachEvents({
    element: window,
    event: 'hashchange',
    action: function() {
        changeMonitor({
            name: 'hash',
            value: document.location.hash,
            callback: function() {
                setTimeout(function() {
                    NCIAnalytics.getScrollDetails({
                        source: 'hashMonitor', // optional; identifies where getScrollInfo call origniated
                        reset: true, // clears history, treating the dynamic content as a brand new page load
                        sendCall: true, // sends link tracking call with scroll data
                        pageOverride: buildPageOverride({
                            page: s.pageName,
                            hash: document.location.hash
                        })
                    });
                }, 100); // wait 200ms after change; allows for page resizing and content updates to complete
            }
        });
    }
});