@echo off

set CASPER_PATH=%~dp0node_modules\casperjs
set CASPER_BIN=%CASPER_PATH%\bin\
set PHANTOMJS=%~dp0node_modules\phantomjs-prebuilt\lib\phantom\bin\phantomjs.exe

call "%PHANTOMJS%" "%CASPER_BIN%bootstrap.js" --casper-path="%CASPER_PATH%" --cli test tests/%1 --includes=initialize.js,visualTest.js --post=cleanup.js
