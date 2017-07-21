## Gigantic macro used to draw "you searched for" labels on results page
## TODO: clean up, separate into baked .inc file, reuse on view page?
#macro(DrawSearchParamsV2 $SearchResults)
    #set($plist = $Tools.CreateEmptyStringList())
    
    #if(!$Tools.IsNullOrWhitespace($SearchResults.Control.GetCancerType()))
        $plist.Add("type")
    #end

    #if(!$Tools.IsNullOrWhitespace($SearchResults.Control.GetPhrase()))
        $plist.Add("phrase")
    #end

    #if($SearchResults.Control.SearchParams.CancerSubtype != "")
        $plist.Add("subtype")
    #end

    #if($SearchResults.Control.SearchParams.CancerStage != "")
        $plist.Add("stage")
    #end

    #if($SearchResults.Control.SearchParams.CancerFindings != "")
        $plist.Add("findings")
    #end
        
    #if($SearchResults.Control.HasZip())
        $plist.Add("zip")
    #end

    #if($SearchResults.Control.SearchParams.Age > 0)
        $plist.Add("age")
    #end

    #if(($SearchResults.Control.Gender == "Female") || ($SearchResults.Control.Gender == "Male"))
        $plist.Add("gender")
    #end
    
    #if($SearchResults.Control.SearchParams.Country != "")
        $plist.Add("country")
    #end
        
    #if($SearchResults.Control.SearchParams.City != "")
        $plist.Add("city")
    #end
    
    #if($SearchResults.Control.SearchParams.State != "")
        $plist.Add("state")
    #end

    #if($SearchResults.Control.SearchParams.HospitalOrInstitution != "")
        $plist.Add("hospital or institution")
    #end

    #if($SearchResults.Control.SearchParams.AtNIH_IsSet)
        $plist.Add("at nih")
    #end

    #if($SearchResults.Control.SearchParams.TrialType != "")
        $plist.Add("trial type")
    #end

    #if($SearchResults.Control.SearchParams.DrugIDsString != "")
        $plist.Add("drug id")
    #end

    #if($SearchResults.Control.SearchParams.DrugName != "")
        $plist.Add("drug name")
    #end
    
    #if($SearchResults.Control.SearchParams.TreatmentInterventionCodeString != "")
        $plist.Add("treatment intervention code")
    #end

    #if($SearchResults.Control.SearchParams.TreatmentInterventionTerm != "")
        $plist.Add("treatment intervention term")
    #end
    
    #if($SearchResults.Control.SearchParams.TrialPhase != "")
        $plist.Add("trial phase")
    #end

    #if($SearchResults.Control.SearchParams.NewTrialsOnly_IsSet)
        $plist.Add("new trials only")
    #end

    #if($SearchResults.Control.SearchParams.PrincipalInvestigator != "")
        $plist.Add("principal investigator")
    #end
    
    #if($SearchResults.Control.SearchParams.LeadOrganization != "")
        $plist.Add("lead organization")
    #end

    #foreach($param in $plist)##
        #each
            #if($param == "type")##
                Type/Condition: "<span data-basiccts-searchparam='t'>$SearchResults.Control.GetCancerType()</span>"##
                
            #elseif($param == "phrase")##
                #if($SearchResults.Control.HasBrokenCTSearchParam())##
                    Type/Condition: "<span data-basiccts-searchparam='q'>$Tools.Replace($SearchResults.Control.GetPhrase(), '"', '')</span>"##
                #else##
                    Keyword: "<span data-basiccts-searchparam='q'>$Tools.Replace($SearchResults.Control.GetPhrase(), '"', '')</span>"##
                #end##

            #elseif($param == "subtype")##
                Subtype: "<span data-basiccts-searchparam='st'>$SearchResults.Control.SearchParams.CancerSubtype</span>"##

            #elseif($param == "stage")##
                Stage: "<span data-basiccts-searchparam='stg'>$SearchResults.Control.SearchParams.CancerStage</span>"##
                
            #elseif($param == "findings")##
                Findings: "<span data-basiccts-searchparam='fin'>$SearchResults.Control.SearchParams.CancerFindings</span>"##
 
            #elseif($param == "zip")##
                within $SearchResults.Control.SearchParams.ZipRadius miles of ZIP: "<span data-basiccts-searchparam='z'>$SearchResults.Control.SearchParams.ZipLookup.PostalCode_ZIP</span>"##

            #elseif($param == "age")##
                Age: "<span data-basiccts-searchparam='a'>$SearchResults.Control.SearchParams.Age</span>"##

            #elseif($param == "gender")##
                Gender: "<span data-basiccts-searchparam='g'>$SearchResults.Control.SearchParams.Gender</span>"##
                
            #elseif($param == "country")##
                Country: $SearchResults.Control.SearchParams.Country##
                
            #elseif($param == "city")##
                City: $SearchResults.Control.SearchParams.City##

            #elseif($param == "state")##
                State: $SearchResults.Control.SearchParams.State##
                
            #elseif($param == "hospital or institution")##
                Hospital/Institution: $SearchResults.Control.SearchParams.HospitalOrInstitution##
                
            #elseif($param == "at nih")##
                At NIH: $SearchResults.Control.SearchParams.AtNIH##

            #elseif($param == "trial type")##
                Trial Type: $SearchResults.Control.SearchParams.TrialType##

            #elseif($param == "drug id")##
                Drug ID: $SearchResults.Control.SearchParams.DrugIDsString##

            #elseif($param == "drug name")##
                Drug Name: $SearchResults.Control.SearchParams.DrugName##

            #elseif($param == "treatment intervention code")##
                Treatment/Intervention Code: $SearchResults.Control.SearchParams.TreatmentInterventionCodeString##

            #elseif($param == "treatment intervention term")##
                Treatment/Intervention Term: $SearchResults.Control.SearchParams.TreatmentInterventionTerm##

            #elseif($param == "trial phase")##
                Trial Phase: $SearchResults.Control.SearchParams.TrialPhase##

            #elseif($param == "new trials only")##
                New Trials Only: $SearchResults.Control.SearchParams.NewTrialsOnly##

            #elseif($param == "principal investigator")##
                Principal Investigator: $SearchResults.Control.SearchParams.PrincipalInvestigator##

            #elseif($param == "lead organization")##
                Lead Organization: $SearchResults.Control.SearchParams.LeadOrganization##

            #else##
                ## do nothing
            #end##
        ## end 'each'
        #between
           , ##
        ## end 'between'
    #end##
#end##