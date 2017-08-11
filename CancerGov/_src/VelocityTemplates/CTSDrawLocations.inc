###############################
## Draws a Single Location Item
#macro(DrawLocationV2 $loc $showStatus $showCityState)
<div itemprop="location" itemscope="" itemtype="http://schema.org/Place">
  <strong itemprop="name">$loc.Name</strong>
  #if($showStatus)
  <br>Status: $SearchResults.TrialTools.GetFormattedString($loc.RecruitmentStatus)##
  #end
  #if($showCityState)##
  <br>
  <span itemprop="address" itemscope="" itemtype="http://schema.org/PostalAddress">
    <meta itemprop="addressCountry" content="$loc.Country" />
    <span itemprop="addressLocality">$loc.City</span>##
#if (!$Tools.IsNullOrWhitespace($loc.StateOrProvince))##
, <span itemprop="addressRegion">$loc.StateOrProvince</span>
#end##
#end##
#if (!$Tools.IsNullOrWhitespace($loc.ContactName))##
<br>Contact: $loc.ContactName
#else
<br>Name Not Available
#end
#if (!$Tools.IsNullOrWhitespace($loc.ContactPhone))##
<br>Phone: $loc.ContactPhone
#end
#if (!$Tools.IsNullOrWhitespace($loc.ContactEmail))
Email: <a href="mailto:$loc.ContactEmail">$loc.ContactEmail</a>
#end
  </span>
</div>
#end

############
## Macro to draw study sites for use with the UX filtering.
#macro(DrawSitesForUXFilter $sites)
  #set ($sortedLocations = $SearchResults.TrialTools.GetSortedSites($sites))
  #set ($allLocations = $SearchResults.TrialTools.GetGroupedSites($sortedLocations)) 

  ## Groups should be U.S.A., Canada, or Other
  #foreach($group in $allLocations)
  #each
    <div data-basiccts-countrygroup="$group.key">
      #foreach($subgroup in $group.value)
      #each
        <div data-basiccts-psunitgroup="$subgroup.key">
          <h3>$subgroup.key</h3>
            #foreach($citygroup in $subgroup.value)
            #each
              <h5 class="locationCity">$citygroup.key</h5>

              #foreach($loc in $citygroup.value)
              #each
                #DrawLocationV2($loc true false)
              #end                
            #end            
        </div>
      #end
    </div>
  #end
#end

#############
## Macro to draw study sites for use by "Locations Near You" and The Print version
#macro(DrawSitesForNormal $sites $showStatus)
  #set ($sortedLocations = $SearchResults.TrialTools.GetSortedSites($sites))
  #set ($allLocations = $SearchResults.TrialTools.GetGroupedSites($sortedLocations)) 

  ## Groups should be U.S.A., Canada, or Other
  #foreach($group in $allLocations)
  #each
    <h3 class="locationCountryLabel">$group.key</h3>
    #foreach($subgroup in $group.value)
    #each      
      <h4>$subgroup.key</h4>
        #foreach($citygroup in $subgroup.value)
        #each
          <h5 class="locationCity">$citygroup.key</h5>
            #foreach($loc in $citygroup.value)
            #each
              <div class="locationBlock">
                #DrawLocationV2($loc $showStatus false)
              </div>
            #end          
        #end                  
    #end
  #end
#end
