#!/bin/sh

# Required Enviroment Variables
# GH_ORGANIZATION_NAME - The GitHub organization (or username) the repository belongs to. 
# GH_REPO_NAME - The repository being built.
# BUILD_TAG - Label to use for tagging the build.
# GITHUB_TOKEN - Github access token for creating releases and uploading build artifacts.


if [ -z "$GH_ORGANIZATION_NAME" ]; then echo GH_ORGANIZATION_NAME not set; exit 1; fi
if [ -z "$GH_REPO_NAME" ]; then echo GH_REPO_NAME not set; exit 1; fi
if [ -z "$BUILD_TAG" ]; then echo BUILD_TAG not set; exit 1; fi
if [ -z "$GITHUB_TOKEN" ]; then echo GITHUB_TOKEN not set; exit 1; fi

export SCRIPT_PATH="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
export PROJECT_HOME="$(cd $SCRIPT_PATH/../.. && pwd)"

pushd CancerGov
echo Starting build
#export IMAGE_ID=$(docker build --file Dockerfile/Dockerfile . --quiet)
docker build --file Dockerfile/Dockerfile --tag wcms-front-end-builder:latest .
if [ $? != 0 ]; then echo "Docker build failed."; exit 1; fi


docker run --tty --rm  wcms-front-end-builder:latest

# This stuff goes in the script which docker-run executes.

# Clean up old version (if any exists) and create new release.
#RUN github-release delete --user blairlearn --repo wcms-front-end --tag ${BUILD_TAG} || echo Nothing to delete.
#RUN github-release release --user ${GH_ORGANIZATION_NAME} --repo ${GH_REPO_NAME} --tag ${BUILD_TAG} --name ${BUILD_TAG}

