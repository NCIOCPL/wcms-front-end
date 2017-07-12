#!/bin/sh

export SCRIPT_PATH="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
export PROJECT_HOME="$(cd $SCRIPT_PATH/../.. && pwd)"

echo $SCRIPT_PATH
echo $PROJECT_HOME

pushd CancerGov
docker build --file Dockerfile/Dockerfile .
if [ $? != 0 ]; then echo "Docker build failed."; exit 1; fi

pwd