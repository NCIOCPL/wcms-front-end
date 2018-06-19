## History
The files in the analytics directory were migrated from the WCMS directory in the [web-analytics](github.com/NCIOCPL/web-analytics)
repository.  An attempt was made to merge the files with history, (see [pull request 106](https://github.com/NCIOCPL/wcms-front-end/pull/106))
however the history is hidden.

## Steps for DTM deployment
1. Login to dtm.adobe.com and go to the desired machine.
2. Click on the gear for the "Adobe Analytics" tool.
3. Update s_code:
   1. Expand "Library Management".
   2. Set the following fields:
      - "Page code is already present" = unchecked
      - "Page Bottom" radio button selected
      - "Custom" radio button selected
      - "Set report suites using custom code = checked
      - "Code Hosted" dropdown: in DTM
      - "Tracker Variable Name" = 's'
   3. Click "Open Editor", paste the contents of **dtm-s_code.js** code into the body, and save.
4. Update custom code:
   1. Expand "Customize Page Code".
   2. Select the "After UI Settings..." radio button.
   3. Click "Open Editor", paste the contents of **dtm-custom-code.js** code into the body, and save.


