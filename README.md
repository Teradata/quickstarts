# Teradata Vantage Getting Started Guides

Tutorials for learning the Teradata Vantage database. The documents use the AsciiDoc format. The website is built with Antora. 

Contributions are welcome :). See below how to build the documentation website locally.

## Contributor's guide

### General information
* The documentation uses Asciidoc syntax. If you are not familiar with Asciidoc, please check this Asciidoc tutorial: https://asciidoctor.org/docs/asciidoc-writers-guide/. 

* We use this GitHub repository to track content. The `main` branch reflects the what's on the website. Each time a commit is made to `main` branch, a deployment is triggered that pushes the changes to GitHub Pages. It takes about 2 minutes for a commit to be deployed.

* Simple changes to content can be done through a pull request directly from GitHub's website. For large changes, e.g. more sophisticated reformatting or adding a new page, we recommend that you fork the repo, clone locally and follow instructions how to build the website locally.

* Each page corresponds to an asciidoc file in the repository. Pages are located in `modules/ROOT/pages` directory. Page files must have `.adoc` suffix.

* We use Antora to build the documentation website. This guide explains how to run Antora locally to test changes before submitting a pull request. To learn more about Antora see https://docs.antora.org/antora/3.0/.

### Modify an existing page

1. Go to the Quickstarts website and navigate to the page you want to edit.
2. Click on `Edit this page` link in the top-right corner. You will be taken to the corresponding file on GitHub.
3. Click on `Edit this file` icon, enter your modifications and submit as a pull request.

### Add a new page

1. Fork the repository and clone it locally.
2. Add a new file to `modules/ROOT/pages` directory. Give the file a meaningful but short name. The file needs to have `.adoc` extension. Use only lower-case letters. No spaces are allowed. If you want to use multiple words, use `.` as a separator, e.g. `getting.started.vmware.adoc`.
3. Add content to the file.
4. Add your new page to the left-hand side navigation by editing `modules/ROOT/nav.adoc` file. The file is a list of links. Make sure you think about where in the menu your target audience will be looking for your document.
5. Submit your changes as a pull request.

> :information_source: Sometimes pages include content from other files. It's done using `include::` directive, e.g. `include::partial$next.steps.adoc[]`. You will find these partials in `modules/ROOT/partials` directory.

### Add an image

Images are located in `modules/ROOT/images` directory. 

1. Add your image to the directory.
2. Use `image::` directive to insert an image on a page, e.g. `image::gettingstarteddemo.ipynb.png[GettingStartedDemo.ipynb screenshot, width=100%]`. Use `width=100%` for large images. Use `width=500` for smaller images. Always give an image an alternate name (`GettingStartedDemo.ipynb screenshot` in the example) to increase accessibility of the document.

### Add an attachment

Attachments are located in `modules/ROOT/attachments` directory. 

1. Add your attachment to the directory.
2. Use the regular `link:` directive to insert a link to the attachment. Use `{attachmentsdir}` to point to the attachments directory, e.g. `link:{attachmentsdir}/example.yaml[Download the YAML example]`.

### Change the look & feel of the website

The website follows the regular Antora supplemental UI solution for customizing the looks and feel. Directory `supplemental_ui` contains files that override the original Antora UI files. See Antora's UI documentation for details: https://docs.antora.org/antora-ui-default/.


### How to avoid duplicating content

Sometimes, you want to include the same content on multiple pages. Antora supports it using partials. Partials are Asciidoc snippets that reside in their own files in `modules/ROOT/pages/partials` directory. Any valid Asciidoc document is a valid partial.

1. Add an `.adoc` file to the `partials` directory.
2. Include the partial using `include::` directive, e.g. `include::partial$running.sample.queries.adoc[]`.

### Generate custom Google Analytics events

TODO: add content
### Build documentation locally

There are two ways to build documentation locally:
1. Build using Docker - this method is quick to setup but the build process takes longer. It's best for occasional contributors.
2. Build directly on your machine - this method takes longer to setup but builds are much faster. Use it if you intend to contribute on an ongoing basis.

#### Build using Docker

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
1. The resulting website files will be saved in `./build/site` directory. Open the directory in your browser to view your local copy of the website.

#### Build directly on your machine

##### Instructions for MacOS. 

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
1. The resulting website files will be saved in `./build/site` directory. Open the directory in your browser to view your local copy of the website.

##### Instructions for Windows. 

1. Install Node.js:
    * Follow the instructions on https://nodejs.org/en/download.

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
    $env:CI="true"; $env:FORCE_SHOW_EDIT_PAGE_LINK="true"; npx antora antora-playbook.yml
    ```
1. The resulting website files will be saved in `./build/site` directory. Open the directory in your browser to view your local copy of the website.

##### Serving Website Locally. 

1. You can install npm's http server for serving the website locally: 
    ```
    npm i -g http-server
    ```

1. After installing npm http-server you can serve locally with:
    ```
    http-server build/site -c-1
    ```