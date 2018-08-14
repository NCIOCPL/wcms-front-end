# Cancer.gov Front End Queue

## Table of contents

- [Quick start](#quick-start)
- [Proxy tiers](#tiers)
- [Mock views](#mock-views)
- [Release notes](#release-notes)
- [Bugs and feature requests](#bugs-and-feature-requests)


## Quick start

- Clone the repo: `git clone https://github.com/NCIOCPL/wcms-front-end.git`
- Install [Node Version Manager (NVM)](https://github.com/creationix/nvm) for Mac or [NVM Windows](https://github.com/coreybutler/nvm-windows) for Windows
- Install the latest LTS (Long Term Support) version of node using nvm `nvm install 8 --lts`
- On Mac set the default version using `nvm alias default 8.9.4`
- Install the Grunt CLI tools as a global using `npm install grunt-cli -g`
- Path into `{GIT REPO LOCATION}/wcms-front-end/CancerGov`. This is the project root
- Run `npm install` to set up the project. This will generate a `node_modules` folder
- You're ready for development. Run `grunt build-watch:prod` to start a proxy or select a different dev tier


## Proxy tiers

By default, any proxy server you start will run from port 3000.

- default - www-blue-dev.cancer.gov
- `prod` - www.cancer.gov
- `preview` - preview.cancer.gov
- `dev` - www-blue-dev.cancer.gov
- `red` - www-red-dev.cancer.gov
- `blue` - www-blue-dev.cancer.gov
- `pink` - www-pink-dev.cancer.gov
- `qa` - www-qa.cancer.gov
- `dt` - www-dt-qa.cancer.gov
- `preview-qa` - preview-qa.cancer.gov
- `stage` - www-stage.cancer.gov
- `training` - www-training.cancer.gov


## Mock views
While running a proxy server you are able to create and test mock html files. This is a good way to test markup changes without having to create content items or update template files in Percussion. Any files you'd like to mock should be placed in the `/server/mock_views` folder. Files are accessible at `localhost:3000/mock/{file name excluding extension}`

## Release notes
Release notes are created for each front-end release and keep in the [/release_notes](https://github.com/NCIOCPL/wcms-front-end/tree/master/CancerGov/release_notes) directory. The release notes include deployment steps and manual content changes as well.

## Bugs and feature requests
JIRA: [WCMS Front End Queue Board](https://tracker.nci.nih.gov/secure/RapidBoard.jspa?rapidView=344)