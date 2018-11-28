# wa-engagement
Deployed 2018-06-25
Add engagement tracking to analytics. 

## Summary

Added the engagement tracking plugin provided by Evolytics to our Adobe Analytics implementation. 

The plugin, which lives in the s_code file, sets a cookie and tracks the amount of time a user interacts with a page (e.g. mousing over or scrollling). When an analytics click or load event is triggered, the cookie is tracked as a rounded 10-second value, then reset. 

## Affected components

- s_code.js
  - Minified the provided code and added to the plugins section
- NCIAnalyticsFunctions.js
  - Added engagement logic to ClickParams() 
  
## Deployment

Uploaded the following to static.cancer.gov: 
- WCMS/NCIAnalyticsFunctions.js
- WCMS/s_code.js