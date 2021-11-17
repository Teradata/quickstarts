# Teradata Vantage Getting Started Guides

Quickstarts for learning the Teradata Vantage database. The documents use the AsciiDoc format. The website is built with Antora. 

Contributions are welcome :). See below how to build the documentation website locally.
## Building documentation locally

There are two ways to build documentation locally:
1. Run Antora in Docker - this method is quick to setup but the build process takes longer. It's best for occasional contributors.
2. Install all tools directly on your machine - this method takes longer to setup but builds are much faster. Use it if you intend to contribute on ongoing basis.

### Build using Docker

1. Clone the repo:
    ```
    git clone git@github.com:Teradata/quickstarts.git
    ```
1.  Change dir to quickstarts:
    ```
    cd quickstarts
    ```
1. Run build by mapping the document directory to the container:
    ```
    ./build-docker
    ```
1. The resulting website files will be saved in `./build/site` directory. Open the directory in your browser to browse your local copy of the website.

### Build directly on your machine

> :info: These instructions are for MacOS. Adjust the instructions for your operating system. 

1. Install Node.js:
    ```
    brew install nodejs
    ```
1. Clone the repo:
    ```
    git clone git@github.com:Teradata/quickstarts.git
    ```
1. Change dir to quickstarts:
    ```
    cd quickstarts
    ```
1. Install dependencies:
    ```
    npm i
    ```
1. Build the website:
    ```
    ./buildw
    ```
1. The resulting website files will be saved in `./build/site` directory. Open the directory in your browser to browse your local copy of the website.
