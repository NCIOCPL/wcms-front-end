#!/bin/bash

echo "Running Tests"

set -o errexit # Exit on error

# Defining text for help message to be displayed
# ----------------------------------------------
usage="$(basename "$0") [-h] [-b [filename] | -f filename]

where:
    -h  show this help message
    -b  run Phantom to create a baseline for all files (default: www.cancer.gov)
    -f  run Phantom for a single file and compare to baseline (default: localhost)
    no option
        run Phantom for all files and compare to baseline
"

# Setting up variables
# --------------------
CASPER_PATH='../node_modules/casperjs'
CASPER_BIN=$CASPER_PATH'/bin'
PHANTOMJS='../node_modules/phantomjs-prebuilt/lib/phantom/bin/phantomjs'
SERVER='dev'
FILE=''

# Inspecting the command line variables passed
# --------------------------------------------
while getopts "bf:h" opt; do
  case "$opt" in
    h)
      echo "$usage"
      exit
      ;;
    b)
      echo "Running baseline tests on production server" >&2
      SERVER='prod'
      if [ ! -z "$2" ]; then
        # Allow test to be specified without extension
        if [ -a "$2" ]; then
           FILE="$2"
        else
           FILE="$2.js"
        fi
      fi
      ;;
    f)
      echo "Testing single file: $OPTARG" >&2
        # Allow test to be specified without extension
        if [ -a "tests/$OPTARG" ]; then
           FILE="$OPTARG"
        else
           FILE="$OPTARG.js"
        fi
      ;;
    \?)
      echo "Invalid option: -$OPTARG" >&2
      ;;
  esac
done

PHANTOMJS $CASPER_BIN'/bootstrap.js' --casper-path=$CASPER_PATH --cli test tests/$FILE --includes=initialize.js,visualTest.js --post=cleanup.js --server=$SERVER
