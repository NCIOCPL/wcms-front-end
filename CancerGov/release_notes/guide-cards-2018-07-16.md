#Guide-Cards-2018-07-16: Changes to the Homepage Gards [WCMSFEQ-1028]

# Table of Contents
1. [Summary](#summary)
2. [Deployment Steps](#deploy)
3. [Content Changes](#content-changes)

<a name="summary"></a>
## Summary
Minor release that changes the appearance of the first two guide cards on the homepage only.  
1. Removed light blue background color from the first guide card on the homepage (to match the other two guide cards).
2. Bottom align the "view more" links in all three cards.  
3. Updated color of the arrow for the "view more" links to use the dark blue chevron.

#### Note: 
Upon resizing the browser window up from the mobile (accordion) view, a div with a clearfix class is added that wraps around the ul of each card. A height of 100% is added to force this clearfix div to be same height as parent accordion in all breakpoints.

<a name="deploy"></a>
## Deployment
Upload all templates, js, and css. Republish CDE config.
No NCIAnalytics changes requested.

<a name="content-changes"></a>
## Content Changes
1. Go to Homepage/Homepage Guide Cards and switch to the CancerGov community. 
2. Edit the Home Page Guide Cards (Card Container) Content Type, and change name of "Resources For" guide card to "Cancer Research Resources".
3. Add the link "Find more research resources" and corresponding url to the last item of the list in new "Cancer Research Resources" guide card, and "Learn more about cancer" to the last item of the "About Cancer".


