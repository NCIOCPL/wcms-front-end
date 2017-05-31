# Dockerfile for building the CancerGov front-end files.
# Assumes the context directory to be the top-level CancerGov directory.

FROM node:6


# Sleight-of-hand to re-use the intermediate layer for the npm install.
# The npm install command only needs to run if package.json has changed.
# This avoids re-running it when only the files being built are modified.
# See http://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/
RUN mkdir /tmp/content-build
ADD package.json /tmp/content-build
RUN cd /tmp/content-build && npm install


# Copy in the source files.
WORKDIR /content-build
ADD . /content-build

# Copy the results of the npm install step above
RUN cp -a /tmp/content-build/node_modules /content-build

# Cacheable installation for the global grunt executable.
RUN npm install -g grunt

# Do the build
RUN grunt build 