## Steps for DTM deployment
1. Login to the Adobe DTM site and go to the desired machine.
2. Click on the gear for the **Adobe Analytics** tool.
3. Update AppMeasurement core:
   1. Expand **Library Management**.
   2. Set the following fields:
      - **Page code is already present** checkbox: unchecked
      - **Page Top** radio button: selected
      - **Custom** radio button: selected
      - **Set report suites using custom code** checkbox: checked
      - **Code Hosted** dropdown: in DTM
      - **Tracker Variable Name:** __s__
   3. Click **Open Editor**, paste the contents of **_AppMeasurement.js_** into the body, and save.
      - _Note: this still contains the shim for creating a global 's' variable_
4. Update AppMeasurement customized code:
   1. Expand **Customize Page Code**.
   2. Select the **After UI Settings...** radio button.
   3. Click **Open Editor**, paste the contents of **_AppMeasurement.custom.js_** into the body, and save.
5. Click on the machine name, then select the **Rules** tab.
6. Select **Page Load Rules** in the left nav.
7. Click the Edit link for **Web Analytics Library**.
   1. Expand **Conditions**.
      - Set **Trigger rule** dropdown to "Top of Page".
   2. Expand **Javascript / Third Party Tags**.
   3. Find and edit **nci-analytics-functions.html**.
      1. Set the following fields:
         - **Tag name:** nci-analytics-functions.html
         - **Type:** Sequential HTML
      2. Copy and paste the contents of **_nci-analytics-functions.js_** into the body and save.
         - _Note_: verify that the JavaScript is surrounded by opening and closing <script> tags.
   4. Find and edit **wa-cancergov-pre.html**.
      1. Set the following fields:
         - **Tag name:** wa-cancergov-pre.html
         - **Type:** Sequential HTML
      2. Copy and paste the contents of **_wa-cancergov-pre.js_** into the body and save.
         - _Note_: verify that the JavaScript is surrounded by opening and closing <script> tags.
8. Approve and publish the content.

## Getting the latest version of AppMeasurement
AppMeasurmeent for JavaScript is a new library that provides the same core functionality of s_code.js. The latest version can be downloaded from the Adobe Marketing dashboard or retrieved directly from the Adobe DTM UI.
### Option 1
1. Login to the Adobe Analytics site.
2. In the top nav bar, go to **Admin -> Code Manager**
3. Click on the **Javascript (new)** resource to download the zip file. 
4. Extract the zip file and copy the contents of AppMeasurement.js. 
### Option 2 
1. Login to the Adobe DTM site and go to the desired machine.
2. Click on the gear for the **Adobe Analytics** tool.
3. Expand **Library Management**.
4. Select the **Managed by Adobe** radio button.
   - Select the desired library from the dropdown.
   - Click the **Save Changes** button. 
5. Re-open the Adobe Analytics tool and expand Library Management. 
6. Select the **Custom** radio button. 
7. Click the **Open Editor** button; the editor will now contain only the managed AppMeasurement JavaScript. 