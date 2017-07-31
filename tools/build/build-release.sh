#!/bin/sh

# Coordinates the build of the front-end code and subsequent upload to GitHub
# This script is added to /content-build by the Docker build process and is executed
# as the container's default action.

# GH_ORGANIZATION_NAME - The GitHub organization (or username) the repository belongs to. 
# GH_REPO_NAME - The repository being built.
# BRANCH_NAME - Name of the branch being built. This will also be used for tagging the build.
# GITHUB_TOKEN - Github access token for creating releases and uploading build artifacts.

if [ -z "$GH_ORGANIZATION_NAME" ]; then echo GH_ORGANIZATION_NAME not set; exit 1; fi
if [ -z "$GH_REPO_NAME" ]; then echo GH_REPO_NAME not set; exit 1; fi
if [ -z "$BRANCH_NAME" ]; then echo BRANCH_NAME not set; exit 1; fi
if [ -z "$GITHUB_TOKEN" ]; then echo GITHUB_TOKEN not set; exit 1; fi

npm install
if [ $? != 0 ]; then echo "npm install failed."; exit 1; fi

grunt build:prod
if [ $? != 0 ]; then echo "Build failed."; exit 1; fi

cd _dist
zip -r wcms-front-end.zip *

# Need the tag name to incorporate, but not be identical to, the branch name.
export TAG_NAME=${BRANCH_NAME}-latest

# Clean up old version (if any exists) and create new release.
github-release delete --user ${GH_ORGANIZATION_NAME} --repo wcms-front-end --tag ${TAG_NAME} || echo Nothing to delete.
github-release release --user ${GH_ORGANIZATION_NAME} --repo ${GH_REPO_NAME} --tag ${TAG_NAME} --name ${BRANCH_NAME} --pre-release
github-release upload --user ${GH_ORGANIZATION_NAME} --repo ${GH_REPO_NAME} --tag ${TAG_NAME} --name built-files.zip --file wcms-front-end.zip
