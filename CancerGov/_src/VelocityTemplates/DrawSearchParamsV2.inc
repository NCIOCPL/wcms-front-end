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
    <label class="ctscb">Show Search Criteria</label>
    <div class="search-criteria-box">

      <div class="clinicaltrials-results-criteria-display">
        <table class="table no-auto-enlarge" style="width: 100%;">
            <tbody>
              <tr>
                  <td colspan="2" class="cts-schdr"><h3>Your Search Criteria</h3></td>
              </tr>
              <tr>
                  <td class="hdrlft"><h3>Category:</h3></td>
                  <td class="hdrrt"><h3>Your Selection:</h3></td>
              </tr>
                #DrawOneSearchParam("Primary Type/Condition" "MainType")
                #DrawOneSearchParam("Sub-type" "SubTypes")
                #DrawOneSearchParam("Stage" "Stages")
                #DrawOneSearchParam("Side Effects / Biomarkers / Participant Attributes" "Findings")
                #DrawOneSearchParam("Age" "Age")
                #DrawOneSearchParam("Keywords/Phrases" "Phrase")
                ##We need to add IsFieldSet checks that delve into the location parameters
                ##in order to handle these.
                #DrawLocationSearchParam()
                #DrawOneSearchParam("Trial Type" "TrialTypes")
                #DrawOneSearchParam("Drug/Drug Family" "Drugs")
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
