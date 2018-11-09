# DTM Analytics Relase

Deployed 2018-11-07

Added JavaScript files for Adobe DTM Analytics implementation and moved legacy WCMS static.cancer.gov analytics files.

## Summary
### [OCEPROJECT-4575]
- Added **AppMeasurement.js** (replaces core s_code)
  - Added s_account shim to AppMeasurement.js
- Added **AppMeasurement.custom.js** (replaces custom s_code logic)
  - Built logic to pull variables from metadata
  - Removed non-working plugins and modules for now
  - Updated custom s.getPPVSetup() plugin
  - Changed setPropsAndEvars() to setNumberedVars() for more general use
- Created **wa-cancergov-pre.js** (replaces wa_wcms_pre.js) 
  - Built logic to pull variables from metadata
- Created **nci-analytics-functions.js** (replaces NCIAnalyticsFunctinos) 
  - Removed jQuery calls
  - Removed BulletinSearch / legacy CTSearch
  - Added check for s_gi function
- Added AdobeDTMControl to all CDE templates
- Updated analytics HTML on BasicCTSPrintResults2.vm velocity macro
- Moved legacy analytics files into /NCI_OLD/analytics folder (wa_wcms_pre.js, NCIAnalyticsFunctions.js, s_code.js, README.md)
- Updated Readmes, comments, deployment instructions
- Post-merge cleanup
- Updated uglify outputs for DTM analytics files

### [WCMSFEQ-1209]
- Added DTM rule to fire off s.tl() for Basic CTS search form display

### [WCMSFEQ-1210], [WCMSFEQ-1211]
- Fixed logic for creating the s.events String value

## New components
- **AppMeasurement.js & AppMeasurement.custom.js** - DTM equivalent of s_code.js
- **nci-analytics-functions.js** - DTM equivalent of NCIAnalyticsFunctions.js
- **wa-cancergov-pre.js** - DTM equivalent of wa_wcms_pre.js

## Changed components
- **TemplateEnding.inc, TemplateIntro.inc** - Added DTM and new Analytics Data controls - affects CDE Templates 
- **s_code.js, NCIAnalyticsFunctions.js, wa_wcms_pre.js** - Moved into NCI_OLD folder
- **BasicCTSPrintResultsv2.vm** - Removed hardcoded JS; added DTM tag and metadata
- **Gruntifle.js, uglify.js** - Added task to convert AppMeasurement*.js files to HTMLs 
- Added release notes

## Deployment
- Deployment steps: _see DTM Analytics Deployment Steps_ in Collaborate wiki
