# @wayne-shih/OpenAPI-PDF-Generator
OpenAPI (/Swagger) to PDF generator

## Features
- Supports Swagger 2.0 and OpenAPI 3.0
- Generate PDF using Web-Component
- Works with any framework or with no framework
- Plenty of customizing options, including selection of brand colors
- Supported on Chrome, Edge, FireFox and Safari

## Documentation
This repo is a fork of [@mrin9/RapiPdf](https://github.com/mrin9/RapiPdf) with modifications on the PDF generation service. See the [RapiPdf site](https://mrin9.github.io/RapiPdf/) for more details on usage and examples.

## Build Process
We recommend `yarn` over `npm` as we use yarn [resolutions](https://yarnpkg.com/lang/en/docs/selective-version-resolutions/) to keep the bundle size smaller. As of this writing this feature is not supported in npm natively
```bash
# Clone / Download the project then
yarn install

# build will generate rapidoc-min.js, this is the only file you will need.
# use it in the script tag of your html <script type="text/javascript" src="rapidoc-min.js"></script></body>
yarn build

# for developement use yarn serve (this will start an webserver at port 8080, then navigate to localhost:8080)
yarn serve

# alternative to yarn serve: (this will start an webserver at port 8080 listening to all adapters)
yarn serve-everyone
```