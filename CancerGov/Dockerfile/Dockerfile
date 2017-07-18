# Dockerfile for building the CancerGov front-end files.
# Assumes the context directory to be the top-level CancerGov directory.

FROM node:6


# Install ZIP and the github-release tool, storing it in /usr/local/bin
RUN apt-get -y update \
    && apt-get -y install zip \
    && curl -SL https://github.com/aktau/github-release/releases/download/v0.7.2/linux-amd64-github-release.tar.bz2 --output /tmp/github-release.tar.bz2 \
    && tar xvjf /tmp/github-release.tar.bz2 --strip-components=3 -C /usr/local/bin \
    && rm /tmp/github-release.tar.bz2

# Install the global grunt executable.
RUN npm install -g grunt


# Copy in the source files.
WORKDIR /content-build
ADD CancerGov /content-build
ADD tools/build/build-release.sh /content-build

# Create non-root user
RUN useradd --no-log-init --create-home builduser \
    && chown --recursive builduser:builduser /content-build \
    && chmod u+x build-release.sh
USER builduser


# Run the build as the default action.
CMD npm run-script build-release