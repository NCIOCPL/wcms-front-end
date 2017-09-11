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
RUN npm install -g grunt --color=false --loglevel=warn --progress=false

# Create non-root user
RUN useradd --no-log-init --create-home builduser

# Copy configuration files.
ADD tools/config/git/.gitconfig /home/builduser

# Create working directory for building.
WORKDIR /content-build

# Copy the source file tree.
ADD . /content-build

# Make build files accessible to the build user.
RUN chown --recursive builduser:builduser /content-build \
    && chown builduser:builduser /home/builduser/.gitconfig

# Switch to builduser
USER builduser

# Run the build as the default action.
WORKDIR /content-build/CancerGov
CMD npm run-script build-release