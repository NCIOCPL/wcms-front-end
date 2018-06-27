## History
The files in the analytics directory were migrated from the WCMS directory in the [web-analytics](github.com/NCIOCPL/web-analytics)
repository.  An attempt was made to merge the files with history, (see [pull request 106](https://github.com/NCIOCPL/wcms-front-end/pull/106))
however the history is hidden.

## Steps for DTM deployment
1. Login to dtm.adobe.com and go to the desired machine.
2. Click on the gear for the **Adobe Analytics** tool.
3. Update AppMeasurement core:
   1. Expand **Library Management**.
   2. Set the following fields:
      - **Page code:** unchecked
      - **Page Bottom** radio button: selected
      - **Custom** radio button: selected
      - **Set report suites using custom code:** checked
      - **Code Hosted** dropdown: in DTM
      - **Tracker Variable Name:** 's'
   3. Click **Open Editor**, paste the contents of **_AppMeasurement.js_** into the body, and save.
      - _Note: this still contains the shim for creating a global 's' variable_
4. Update AppMeasurement customized code:
   1. Expand **Customize Page Code**.
   2. Select the **After UI Settings...** radio button.
   3. Click **Open Editor**, paste the contents of **_AppMeasurement.custom.js_** into the body, and save.
5. Click on the machine name, then select the **Rules** tab.
6. Select **Page Load Rules** in the left nav.
7. Update the nci-analytics-functions rule:
   1. Click the Edit link.
   2. Expand **Conditions**.
      - Set **Trigger rule** dropdown to "Top of Page".
   3. Expand **Javascript / Third Party Tags**.
   4. Under the **Non-Sequential** tab, click **NCIAnalyticsFunctions.js**.
   5. Set the following fields:
      - **Tag name:** NCIAnalyticsFunctions.js
      - **Type:** Non-Sequential Javacript
      - **Execute Globally:** checked
   6. Copy and paste the contents of **_NCIAnalyticsFunctions.js_** into the body and save.
8. Select **Page Load Rules** in the left nav.   
9. Update the wa-wcms-pre rule:
   1. Click the Edit link.
   2. Expand **Conditions**.
      - Set **Trigger rule** dropdown to "Top of Page".
   3. Expand **Javascript / Third Party Tags**.
   4. Under the **Non-Sequential** tab, click **wa_wcms_pre.js**.
   5. Set the following fields:
      - **Tag name:** wa_wcms_pre.js
      - **Type:** Non-Sequential Javacript
      - **Execute Globally:** checked
   6. Copy and paste the contents of **_wa_wcms_pre.js_** into the body and save. 