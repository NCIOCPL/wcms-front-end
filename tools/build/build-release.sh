#!/bin/sh

# Coordinates the build of the front-end code and subsequent upload to GitHub
# This script is added to /content-build by the Docker build process.

# GH_ORGANIZATION_NAME - The GitHub organization (or username) the repository belongs to. 
# GH_REPO_NAME - The repository being built.
# BUILD_TAG - Label to use for tagging the build.
# GITHUB_TOKEN - Github access token for creating releases and uploading build artifacts.

npm install
if [ $? != 0 ]; then echo "npm install failed."; exit 1; fi

grunt build:prod
if [ $? != 0 ]; then echo "Build failed."; exit 1; fi

cd _dist
zip -r wcms-front-end.zip *

# Clean up old version (if any exists) and create new release.
#RUN github-release delete --user ${GH_ORGANIZATION_NAME} --repo wcms-front-end --tag ${BUILD_TAG} || echo Nothing to delete.
#RUN github-release release --user ${GH_ORGANIZATION_NAME} --repo ${GH_REPO_NAME} --tag ${BUILD_TAG} --name ${BUILD_TAG}

