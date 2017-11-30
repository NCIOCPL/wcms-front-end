#!/bin/sh

# Required Enviroment Variables
# GH_ORGANIZATION_NAME - The GitHub organization (or username) the repository belongs to. 
# GH_REPO_NAME - The repository being built.
# GITHUB_TOKEN - Github access token for creating releases and uploading build artifacts.
# GH_USER - GitHub login of the build user.
# GH_PASSWORD - Github password for the build user.
# GIT_COMMIT - sha-1 has of the commit being built.
# BRANCH_NAME - Name of the branch being built. This will also be used for tagging the build.
# RELEASE_LABEL - label to append to the branch when creating a realeases and tags. 


if [ -z "$GH_ORGANIZATION_NAME" ]; then echo GH_ORGANIZATION_NAME not set; exit 1; fi
if [ -z "$GH_REPO_NAME" ]; then echo GH_REPO_NAME not set; exit 1; fi
if [ -z "$GITHUB_TOKEN" ]; then echo GITHUB_TOKEN not set; exit 1; fi
if [ -z "$GH_USER" ]; then echo GH_USER not set; exit 1; fi
if [ -z "$GH_PASSWORD" ]; then echo GH_PASSWORD not set; exit 1; fi
if [ -z "$GIT_COMMIT" ]; then echo GH_PASSWORD not set; exit 1; fi
if [ -z "$BRANCH_NAME" ]; then echo BRANCH_NAME not set; exit 1; fi
if [ -z "$RELEASE_LABEL" ]; then echo RELEASE_LABEL not set; exit 1; fi

export SCRIPT_PATH="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
export PROJECT_HOME="$(cd $SCRIPT_PATH/../.. && pwd)"

echo Starting build

# Fail the build immediately if master has commits which aren't already in the branch.
COUNT=`git rev-list --left-only --count origin/master...$GIT_COMMIT`
if [ $? != 0 ]; then echo Git failure; exit 1; fi
if [ $COUNT -ne 0 ]; then echo Error: master is $COUNT commits ahead of $BRANCH_NAME.; exit 1; fi

# Get the old image ID so we can delete it after a successful build and not have
# a bunch of old images laying around.
export OLD_IMAGE=$(docker images --quiet wcms-front-end-builder:$BRANCH_NAME)

docker build --file CancerGov/Dockerfile/Dockerfile --tag wcms-front-end-builder:$BRANCH_NAME .
if [ $? != 0 ]; then echo "Docker build failed."; exit 1; fi

# Load the SSH key into an environment variable.
export SSH_KEY=`cat "${SSH_KEY_FILE}"`

docker run --tty --rm \
    --env GH_ORGANIZATION_NAME="${GH_ORGANIZATION_NAME}" \
    --env GH_REPO_NAME="${GH_REPO_NAME}" \
    --env BRANCH_NAME="${BRANCH_NAME}" \
    --env GITHUB_TOKEN="${GITHUB_TOKEN}" \
    --env RELEASE_LABEL="${RELEASE_LABEL}" \
    --env GH_USER="${GH_USER}" \
    --env GH_PASSWORD="${GH_PASSWORD}" \
    wcms-front-end-builder:$BRANCH_NAME
if [ $? != 0 ]; then echo "Failed to build ${BRANCH_NAME}."; exit 1; fi

# Clean up the old build image
if [ -n "$OLD_IMAGE" ]; then docker rmi $OLD_IMAGE; fi
