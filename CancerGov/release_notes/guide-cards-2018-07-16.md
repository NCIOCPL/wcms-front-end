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
Added '.card__view-more' class to CSS in order to target the last (find/view/learn more) item for scalability, rather than use the pseudo class ':last-child' 

Upon resizing the browser window up from the mobile (accordion) view, a div with a clearfix class is added that wraps around the ul of each card. A height of 100% is added to force this clearfix div to be same height as parent accordion in all breakpoints.

<a name="deploy"></a>
## Deployment
Upload all templates, js, and css. Republish CDE config.
No NCIAnalytics changes requested.

<a name="content-changes"></a>
## Content Changes
1. In Percussion, go to Homepage/Homepage Guide Cards and switch to the CancerGov community. 
2. Go the appropriate guide card content type (Content Block), revise, select Tools > Source Mode add the following to the last item of the list: 
 ```html   
 <li class="card__view-more"><a class="arrow-link" href="relative path here">link name here</a></li> 
 ```
in order to add the "view/find/learn more" link to the bottom of the list.



