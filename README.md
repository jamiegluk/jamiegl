# ![Logo](src/img/logo_circle_24.png) JamieGL.com

[![GitHub package.json version](https://img.shields.io/github/package-json/v/jamiegluk/jamiegl?color=blue)](https://github.com/jamiegluk/jamiegl/releases)
[![GitHub lint Workflow Status](https://img.shields.io/github/workflow/status/jamiegluk/jamiegl/Lint?label=lint)](https://github.com/jamiegluk/jamiegl/actions?query=workflow%3A%22Lint%22)
[![GitHub build Workflow Status](https://img.shields.io/github/workflow/status/jamiegluk/jamiegl/Build?label=build)](https://github.com/jamiegluk/jamiegl/actions?query=workflow%3A%22Build%22)
[![GitHub publish Workflow Status](https://img.shields.io/github/workflow/status/jamiegluk/jamiegl/Publish?label=publish)](https://github.com/jamiegluk/jamiegl/actions?query=workflow%3A%22Publish%22)
[![Website](https://img.shields.io/website?url=https%3A%2F%2Fjamiegl.com)](https://jamiegl.com)

> Jamie Lievesley personal website at [jamiegl.com](https://jamiegl.com), [jamiegl.co.uk](https://jamiegl.co.uk) and [jamiegl.uk](http://jamiegl.uk).

**[Click to View Website Online](https://jamiegl.com)**.

## IMPORTANT

**This project's code is old, from 2017, yet to be modernised; do not view this as an example of my current work.**

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
  - Safari.
  - Android: Chrome, Firefox, WebView.
  - iOS: Safari, Chrome.

## Installation

You need:

- [Node.js](https://nodejs.org) / `choco install nodejs`
- [Yarn](https://yarnpkg.com/) / `choco install yarn`

Initially build dependencies via this command in the project folder:

```
yarn install
```

## Usage

`yarn start`

- Build app once to `/dist/`
- App served @ `http://localhost:1234`

---

### All commands

| Command                 | Description                                                                       |
| ----------------------- | --------------------------------------------------------------------------------- |
| `yarn start`            | Build app as dev to `/dist/` and serve @ `http://localhost:1234`                  |
| `yarn build`            | Build production app to `/dist/`                                                  |
| `yarn lint`             | Run Prettier linter                                                               |
| `yarn lint:fix`         | Run Prettier linter and fix issues                                                |
|                         |
| `yarn clean`            | Runs all clean commands below                                                     |
| `yarn clean:dist`       | Removes _dist_ folder and its contents                                            |
| `yarn clean:cache`      | Removes Parcel _.cache_ folder and its contents                                   |
| `yarn build:parcel`     | Just builds Parcel (no post-build commands)                                       |
| `gen-ftp-include`       | Auto-generates the _.git-ftp-include_ file from Parcel mappings                   |
| `gen-ftp-include:maybe` | Runs gen-ftp-include only if the _dist/parcel-manifest.json_ mappings file exists |

---

### Variables

Override environmental variables in dotenv files:  
'_[.env](.env)_' and '_[.env.development](.env.development)_'

By creating local override files:  
'**_.env.local_**' and '**_.env.development.local_**'

These are excluded from commit by the gitignore.

## Known Issues

- \*.php and .htaccess files not included in repo.
- .htaccess redirects not replicated in express.js test server.
- Uses outdated and inlined jQuery and normalize.css dependencies.
- Uses outdated and manually included "Firefox super responsive scroll" and "Stickyfill" dependencies.
- Does not use TypeScript, SASS.
- > warning " > @prettier/plugin-php@0.14.0" has incorrect peer dependency "prettier@^1.15.0".
- jamiegl.uk domain does not support HTTPS.

## Contributing

Not accepting pull requests. This is my personal website.

## Copyright & Licensing

© Copyright Jamie Lievesley 2020.  
Code licensed for use under Mozilla Public License Version 2.0.  
See [COPYRIGHT](COPYRIGHT.md), [LICENSE](LICENSE).
