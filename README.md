# Epsilo-Font-end

[![Stack Overflow](https://img.shields.io/badge/Stack%20Overflow-ASK%20NOW-FE7A16.svg?logo=stackoverflow&logoColor=white)](https://stackoverflow.com/questions)
<a href="https://www.npmjs.org/package/react-native">
<img src="https://badge.fury.io/js/react-native.svg" alt="Current npm package version." />
</a>
## [ReactJS]

## Getting started

To get the frontend running locally:

- Clone this repo
- `cd sms-fontend`
- `npm install` to install all req'd dependencies.

## Run Project

- `npm start` to start the local server (this project uses create-react-app).

#### Support by [Material-UI](https://material-ui.com/).

<img width="100" src="https://material-ui.com/static/logo_raw.svg"/>

## If not run try install packge Material-UI

###### Core

- `npm install @material-ui/core` or use `yarn add @material-ui/core` to install package.

###### Icon

- `npm install @material-ui/icons` or use `yarn add @material-ui/icons` to install package.

## Run Project

- `npm start` to start the local server (this project uses create-react-app).

## Project structure

This project structure is by no means "**THE**" perfect project structure. It's just the one which is currently making more sense to me than any other else, after several tries. Long story short: I divide my apps by scenes, subdivided into "modules" that can use that scene's `components` (ie: `src > app > Auth > SignIn > component`). That's it. Give it a try, you might be surprised how intuitive it could be. Anyhow: feel free to modify this structure and even send some PRs if you find a way to improve it! Btw, you'll also notice that given on the branch you're, the structure isn't always the same: I took whatever makes more sense to me given the context (mainly the navigation library used).

```
...
src
├── Assest
│   └── xxx.png
│   └── xxx.png
├── Auth
│   └── author.js
│   └── index.js
├── Component
│   └── Alert
│   │   └── alert.js
│   └── Breadcrumb
│   │   └── Breadcrumb.js
│   │   └── Breadcrumbdetail.js
│   └── Users
│   │      └── Sim
│   │      └── Users
│   │      └── Url
│   │      └── Channel
│   │      └── Shops
│   │      └── Country
│   └── ...
│       └── ...      
├── Module
|   └── module_sim 
|   └── module_shop
├── Page
│   ├── Login
|   |   └── Login.js
|   └── Sim
|   |   └── Sim.js
|   |   └── Detail.js
|   └── Users
|   |   └── Users.js
|   |   └── UserDetail.js
│   └── Url
|   |   └── Url.js
|   └── Channel
|   |   └── Channel.js
|   |   └── ChannelDetail.js
|   └── Shops
|   |   └── Shops.js
|   |   └── ShopsDetail.js
|   └── Country
|   |   └── Country.js
|   |   └── CountryDetail.js
├── Regex
│   └── to_slug.js
├── Serviece
│   └── Serviece.js
├── AxiosServer.js
└── App.js
...
```
