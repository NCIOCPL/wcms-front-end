@echo off

echo Running Tests

set CASPER_PATH=%~dp0node_modules\casperjs
set CASPER_BIN=%CASPER_PATH%\bin\
set PHANTOMJS=%~dp0node_modules\phantomjs-prebuilt\lib\phantom\bin\phantomjs.exe


SET argA=default for A
SET argB=default for B
SET server=dev
SET file=XXX

:loop
IF [%1] == [] GOTO continue 
IF [%1] == [/h] GOTO help 
IF [%1] == [/B] GOTO baseline 
IF [%1] == [/b] GOTO baseline 
IF [%1] == [/F] GOTO filecheck 
IF [%1] == [/f] ( 
    GOTO filecheck 
) ELSE (
   ECHO 
   ECHO Invalid option!
   ECHO
   GOTO help
)

echo "DADA"
echo "DUDU"
echo %~dp0

@echo on
REM Option /b or option for a single file
REM =====================================
:baseline
echo Running baseline tests on production server
echo Testing single file: %~n2
SET server=prod

IF EXIST "tests\%~n2.js" (
   SET file=%~n2.js
) ELSE ( 
   IF EXIST "tests\%~n2" SET file=%~n2
)
echo file name: %file%
echo file name: tests\%file%
IF NOT EXIST "tests\%file%" (
   ECHO Test file doesn't exists: %~n2
   GOTO help
)
GOTO run

REM Option /f or no option
REM ======================
:filecheck
echo Running diff tests on development server
echo Testing single file: %~n2

IF EXIST "tests\%~n2.js" (
   SET file=%~n2.js
) ELSE IF EXIST "tests\%~n2" (
   SET file=%~n2
)
echo file name: %file%
echo file name: tests\%file%
IF NOT EXIST "tests\%file%" (
   ECHO Test file doesn't exists: %~n2
   GOTO help
)
GOTO run

REM Option to display Help
REM ======================
:help
ECHO  
ECHO Options: /h  show this message
ECHO          /b  filename create baseline for filename
ECHO              without filename create baseline for all tests
ECHO          /f  filename create diff for filename
ECHO              without option create diff for all tests
ECHO " "
GOTO continue

:run
ECHO PHANTOMJS %CASPER_BIN%bootstrap.js --casper-path=%CASPER_PATH% --cli test tests/%file% --includes=initialize.js,visualTest.js --post=cleanup.js --server=%server%

ECHO %PHANTOMJS%
call "%PHANTOMJS%" "%CASPER_BIN%bootstrap.js" --casper-path="%CASPER_PATH%" --cli test tests/%1 --includes=initialize.js,visualTest.js --post=cleanup.js


:continue
echo Done.
