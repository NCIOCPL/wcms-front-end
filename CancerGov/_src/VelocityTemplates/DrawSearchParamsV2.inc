## Draws a single set of criteria
#macro(DrawOneSearchParam $label $field)
    #if($SearchResults.Parameters.IsFieldSet($field) == true)
        #set($value = $SearchResults.Parameters.GetFieldAsString($field))
        #DrawOneSearchParamRow($label $value)
    #end
#end

#macro(DrawOneSearchParamRow $label $value)
    <tr>
        <td class="hdrlft"><strong>${label}:</strong></td>
        <td>$value</td>
    </tr>
#end


#macro(DrawLocationSearchParam)
    #set($locParam = $SearchResults.Parameters.LocationParams)

    #if($SearchResults.Parameters.Location == "Hospital")
        #if($locParam.IsFieldSet("Hospital") == true)
            #set($value = $locParam.GetFieldAsString("Hospital"))
            #DrawOneSearchParamRow("At Hospital/Institution" $value)
        #end
    #elseif($SearchResults.Parameters.Location == "CountryCityState")
        #if($locParam.IsFieldSet("City") == true)
            #set($value = $locParam.GetFieldAsString("City"))
            #DrawOneSearchParamRow("City" $value)
        #end
        #if($locParam.IsFieldSet("State") == true)
            #set($value = $locParam.GetFieldAsString("State"))
            #DrawOneSearchParamRow("State" $value)
        #end
        #if($locParam.IsFieldSet("Country") == true)
            #set($value = $locParam.GetFieldAsString("Country"))
            #DrawOneSearchParamRow("Country" $value)
        #end
    #elseif($SearchResults.Parameters.Location == "Zip")
        #set($zip = $locParam.GetFieldAsString("ZipCode"))
        #set($zipProx = $locParam.GetFieldAsString("ZipRadius"))
        #set($value = "within $zipProx miles of $zip")
        #DrawOneSearchParamRow("Near ZIP Code" $value)
    #elseif($SearchResults.Parameters.Location == "AtNIH")
        #DrawOneSearchParamRow("At NIH" 'Only show trials at the NIH Clinical Center (Bethesda, Md.)')
    #end
#end

## Gigantic macro used to draw "you searched for" labels on results page
## TODO: clean up, separate into baked .inc file, reuse on view page?
#macro(DrawSearchParamsV2 $SearchResults)

    ## If there is at least one parameter, we need to draw the table
    #if($SearchResults.Parameters.IsEmpty() != true)
    <div class="search-criteria-box">
      <label for="ctscl">Hide Search Criteria</label>
		  <input name="one" id="ctscl" type="checkbox">

      <div class="clinicaltrials-results-criteria-display cts-hide">
        <table class="complex-table">
            <thead>
                <tr>
                    <th colspan="2" class="">Your Search Criteria</th>
                </tr>
                <tr>
                    <th class="hdrlft">Category:</th>
                    <th class="">Your Selection:</th>
                </tr>
            </thead>
            <tbody>
                #DrawOneSearchParam("Primary Type/Condition" "MainType")
                #DrawOneSearchParam("Subtype" "SubTypes")
                #DrawOneSearchParam("Stage" "Stages")
                #DrawOneSearchParam("Side Effects / Biomarkers / Participant Attributes" "Findings")
                #DrawOneSearchParam("Age" "Age")
                #DrawOneSearchParam("Keywords/Phrases" "Phrase")
                ##We need to add IsFieldSet checks that delve into the location parameters
                ##in order to handle these.
                #DrawLocationSearchParam()
                #DrawOneSearchParam("Trial Type" "TrialTypes")
                #DrawOneSearchParam("Drug" "Drugs")
                #DrawOneSearchParam("Other Treatements" "OtherTreatments")
                #DrawOneSearchParam("Trial Phase" "TrialPhases")
                #DrawOneSearchParam("Trial ID" "TrialIDs")
                #DrawOneSearchParam("Trial Investigators" "Investigator")
                #DrawOneSearchParam("Lead Organization" "LeadOrg")
            </tbody>
        </table>
      </div>
    </div>
    #end

#end##
