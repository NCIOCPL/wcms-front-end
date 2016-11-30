#!/bin/bash

echo "Running Tests"

set -o errexit # Exit on error
CASPER_PATH='../node_modules/casperjs'
CASPER_BIN=$CASPER_PATH'/bin'
PHANTOMJS='../node_modules/phantomjs-prebuilt/lib/phantom/bin/phantomjs'
SERVER='dev'
FILE=''
while getopts "bf:" opt; do
  case $opt in
    b)
      echo "Running baseline tests on production server" >&2
      SERVER='prod'
      if [ ! -z "$2" ]; then
        FILE="$2"
      fi
      ;;
    f)
      echo "Testing single file: $OPTARG" >&2
      FILE=$OPTARG
      ;;
    \?)
      echo "Invalid option: -$OPTARG" >&2
      ;;
  esac
done

PHANTOMJS $CASPER_BIN'/bootstrap.js' --casper-path=$CASPER_PATH --cli test tests/$FILE --includes=initialize.js,visualTest.js --post=cleanup.js --server=$SERVER
