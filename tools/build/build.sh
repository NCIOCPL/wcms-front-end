#!/bin/sh

# Required Enviroment Variables
# GH_ORGANIZATION_NAME - The GitHub organization (or username) the repository belongs to. 
# GH_REPO_NAME - The repository being built.
# BUILD_TAG - Label to use for tagging the build.
# GITHUB_TOKEN - Github access token for creating releases and uploading build artifacts.


# Build arguments are *NOT* recommended as a way to pass secrets (e.g. GITHUB_TOKEN), because
# they can be revealed by using the `docker history` command to inspect their values.
# Unfortunately, as Docker doesn't present a mechanism for passing secrets securely, it
# instead becomes necessary to refrain from sharing the image.

if [ -z "$GH_ORGANIZATION_NAME" ]; then echo GH_ORGANIZATION_NAME not set; exit 1; fi
if [ -z "$GH_REPO_NAME" ]; then echo GH_REPO_NAME not set; exit 1; fi
if [ -z "$BUILD_TAG" ]; then echo BUILD_TAG not set; exit 1; fi
if [ -z "$GITHUB_TOKEN" ]; then echo GITHUB_TOKEN not set; exit 1; fi

export SCRIPT_PATH="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
export PROJECT_HOME="$(cd $SCRIPT_PATH/../.. && pwd)"

pushd CancerGov
echo Starting build
#export IMAGE_ID=$(docker build --file Dockerfile/Dockerfile . --quiet)
docker build --file Dockerfile/Dockerfile . \
            --build-arg GH_ORGANIZATION_NAME=$GH_ORGANIZATION_NAME \
            --build-arg GH_REPO_NAME=$GH_REPO_NAME \
            --build-arg BUILD_TAG=$BUILD_TAG \
            --build-arg GITHUB_TOKEN=$GITHUB_TOKEN
if [ $? != 0 ]; then echo "Docker build failed."; exit 1; fi

# Delete the image. The artifacts are uploaded as part of the build process.
#docker rmi $IMAGE_ID
