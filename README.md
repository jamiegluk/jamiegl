# jamiegl.com

![GitHub package.json version](https://img.shields.io/github/package-json/v/jamiegluk/jamiegl?color=blue)
![GitHub publish Workflow Status](https://img.shields.io/github/workflow/status/jamiegluk/jamiegl/Publish%20Website?label=publish)
![Website](https://img.shields.io/website?url=https%3A%2F%2Fmemes.jamiegl.com%2Fkiwi%2F)

> Jamie Lievesley personal website at [jamiegl.com](https://jamiegl.com), [jamiegl.co.uk](https://jamiegl.co.uk) and [jamiegl.uk](https://jamiegl.uk).

**[Click to View Website Online](https://jamiegl.com)**.

**IMPORTANT: This project's code and content is old, from 2017, yet to be modernised; do not view this as an example of my current work.**

## Principles

- Accessible, ergonomic, aesthetic.
- Simple and straight to the point.
- Accurately represent Jamie Lievesley, including:
  - Profile links.
  - Bio.
  - Portfolio.
  - Contact details.
- [Material Design](https://material.io/).
- Responsive design.
- Works without JavaScript enabled, except extraneous cosmetic features.
- Source code is modern and to a high standard.
- Minimal build size.
- Runs on all modern browsers and some old ones too, since 2017:
  - Chrome.
  - Firefox.
  - Opera.
  - Edge (both Chromium and pre-Chromium).
  - IE 10 and 11.
  - Android: Chrome, Firefox, WebView.
  - iOS: Safari, Chrome.

## Installation

You need:

- [Node.js](https://nodejs.org) and NPM / `choco install nodejs`
- [Yarn](https://yarnpkg.com/) / `choco install yarn`

Initially build dependencies via this command in the project folder:

```
yarn install
```

## Usage

`yarn start`

- Build app once to `/dist/`
- App served @ `http://localhost:3000`

---

**All commands**

| Command         | Description                                               |
| --------------- | --------------------------------------------------------- |
| `yarn start`    | Build app to `/dist/` and serve @ `http://localhost:3000` |
| `yarn build`    | Build app to `/dist/`                                     |
| `yarn lint`     | Run Prettier linter                                       |
| `yarn lint:fix` | Run Prettier linter and fix issues                        |

## Known Issues

- Content represents Jamie Lievesley in 2017, rather than 2020.
- AJAX PHP files not included in repo.
- Uses outdated and inlined jQuery and normalize.css dependencies.
- Build process should be upgraded to use webpack.
- Code is not minified.
- > warning " > @prettier/plugin-php@0.14.0" has incorrect peer dependency "prettier@^1.15.0".

## Contributing

Not accepting pull requests. This is my personal website.

## Copyright & Licensing

© Copyright Jamie Lievesley 2020.  
Code licensed for use under Mozilla Public License Version 2.0.  
See [COPYRIGHT](COPYRIGHT.md), [LICENSE](LICENSE).
