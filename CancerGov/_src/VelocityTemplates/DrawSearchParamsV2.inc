
#macro(DrawOneSearchParam $label $field)
    #if($SearchResults.Parameters.IsFieldSet($field) == true)
        #set($value = $SearchResults.Parameters.GetFieldAsString($field))
        <tr>
            <td>$label</td>
            <td>$value</td>
        </tr>
    #end
#end

##macro(DrawSearchParamInner $SearchResults)

###end

## Gigantic macro used to draw "you searched for" labels on results page
## TODO: clean up, separate into baked .inc file, reuse on view page?
#macro(DrawSearchParamsV2 $SearchResults)

    ## Test for empty search

    ## If there is at least one parameter, we need to draw the table
    #if($SearchResults.Parameters.IsEmpty() != true)
        <table>
            <tr>
                <th>Field</th>
                <th>Criteria</th>
            </tr>
            
            #DrawOneSearchParam("Primary Type/Condition" "MainType")
            #DrawOneSearchParam("Subtype" "SubTypes")
            #DrawOneSearchParam("Stage" "Stages")
            #DrawOneSearchParam("Side Effects / Biomarkers / Participant Attributes" "Findings")
            #DrawOneSearchParam("Age" "Age")
            #DrawOneSearchParam("Keywords/Phrases" "Phrase")
            <tr><td>Location</td><td>Is Weird</td></tr>
            #DrawOneSearchParam("Trial Type" "TrialTypes")
            #DrawOneSearchParam("Drug" "Drugs")
            #DrawOneSearchParam("Other Treatements" "OtherTreatments")
            #DrawOneSearchParam("Trial Phase" "TrialPhases")
            #DrawOneSearchParam("Trial ID" "TrialIDs")
            #DrawOneSearchParam("Trial Investigators" "Investigator")
            #DrawOneSearchParam("Lead Organization" "LeadOrg")

        </table>
    #end

#end##