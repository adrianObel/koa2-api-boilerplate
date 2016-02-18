#koa2-api-boilerplate
Boilerplate for building APIs with [koa2](https://github.com/koajs/koa/tree/v2.x) and mongodb.

This project covers basic necessities of most APIs.

* Authentication (passport & jwt)
* Database (mongoose)
* Testing (mocha)

##Requirements
* node __^4.0.0__
* npm __^3.0.0__

##Installation
```bash
git clone https://github.com/adrianObel/koa2-api-boilerplate.git
```

##Features
* [Koa](https://github.com/koajs/koa/tree/v2.x)
* [koa-router](https://github.com/alexmingoia/koa-router)
* [koa-bodyparser](https://github.com/koajs/bodyparser)
* [koa-generic-session](https://github.com/koajs/generic-session)
* [koa-logger](https://github.com/koajs/logger)
* [MongoDB](http://mongodb.org/)
* [Mongoose](http://mongoosejs.com/)
* [Passport](http://passportjs.org/)
* [Nodemon](http://nodemon.io/)
* [Mocha](https://mochajs.org/)
* [Babel](https://github.com/babel/babel)
* [ESLint](https://esling.ord)

##Structure
```
├── config                   # Server configuration settings
│   ├── server.js            # Bootstrapping and entry point
│   ├── config.js            # JSON dictionary for environment specific config
│   └── passport.js          # Passportjs config of strategies
├── src                      # Source code
│   ├── controllers          # Routes
│   ├── models               # Mongoose models
│   └── middleware           # Custom middleware
│       └── validators       # Validation middleware
└── test                     # Unit tests
```

##Usage
* `npm start` Start server on live mode
* `npm run dev` Start server on dev mode with nodemon
* `npm test` Run mocha tests

##License
MIT
