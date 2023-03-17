# readme.gen

[![Netlify Status](https://api.netlify.com/api/v1/badges/50e0e7fa-aff2-4f72-a2d1-afaa28225bb9/deploy-status)](https://app.netlify.com/sites/readme-gen/deploys)

readme.gen is a clone of readme.so

An online markdown editor to create README files.

This website was build only for practice purpose.

Cloned webapp: [readme.gen](https://readme-gen.netlify.app)

Original webapp: [readme.so](https://readme.so/editor)

## Table of contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Built with](#built-with)
- [Setup and installation](#setup-and-installation)
- [Inspiration](#inspiration)
- [License](#license)

## Features

- Light/dark mode toggle
- Live preview of your markdown content
- Choose from a list of sections to add to your readme
- Add a code/link/template from quick template tool
- Edit the contents of each section
- Change order of each of your sections
- Copy your readme content to your clipboard

## Screenshots

Readme-gen markdown editor page:
<img src="https://raw.githubusercontent.com/ksaswin/Readme-gen/master/src/assets/images/readme-light.png" width="80%"/>

## Built with

- [Vite](https://vitejs.dev/)
- [Vue.js](https://vuejs.org/)
- [Typescript](https://www.typescriptlang.org/)
- HTML5
- CSS3
- [Docker](https://www.docker.com/)

Vue libraries

- [marked](https://www.npmjs.com/package/marked)
- [@meforma/vue-copy-to-clipboard](https://github.com/MeForma/vue-copy-to-clipboard)

## Setup and installation

Clone the repository

```shell
git clone https://github.com/ksaswin/Readme-gen.git
cd Readme-gen
```

Install dependencies

```shell
npm install
```

Compiles and hot-reloads for development

```shell
npm run dev
```

Then, navigate to `locahost:5173`.

Run using docker:

```shell
docker build -t readme-ui .
docker run --rm -it -p 8080:5173 -v ${PWD}:/app --name ReadmeUI readme-ui
```

Now, the dev server will be hosted on your machine's IP address. You can view this from `http://ip_address:8080`.

Lint checks:

```shell
npm run lint
```

Build command:

```shell
npm run build
```

Customize configuration

See [Configuration Reference](https://vitejs.dev/config/).

## Inspiration

As mentioned in the introduction, this project is based on an existing app created by [Katherine Peterson](https://github.com/octokatherine).

I used [readme.so](https://readme.so/) to create README files for all my projects. After I learnt the basics of VueJs, I thought this could be the perfect project to recreate/clone, since I personally enjoy using it so much.

## License

[MIT](https://github.com/ksaswin/Readme-gen/blob/master/LICENSE.md)

This readme was created using [readme.gen](https://github.com/ksaswin/Readme-gen) ;)
