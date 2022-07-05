# Sample Typescript + Express.js + Zod validation

This is a very minimal setup with Typescript, Express.js and Zod, to demonstrate how we can use validation in our requests.

## Usage

1. Install everything: `npm install`
2. Setup basic `.env` file: `echo PORT=3000 > .env`
3. Start the app: `npm start`

Here are the endpoints and routes available for this app:

- `GET /errors/not-found` - returns a 404
- `GET /errors/async-example` - calls an async function that throws an exception
- `GET /errors/server-unavailable` - returns a 500
- `POST /users/function` - example of validation with Zod using a function
- `POST /users/middleware` - example of validation with Zod using middleware

## Dev environment setup

Previously I used `ts-node-dev`, however that tool is unreliable. There are many different ways of setting up a Typescript node project that reloads on change, as described in the StackOverflow answer [How to watch and reload TS Node when Typescript files change](https://stackoverflow.com/questions/37979489/how-to-watch-and-reload-ts-node-when-typescript-files-change), and in the end I went with `swc` + `ts-node` + `nodemon`, which was setup like this:

1. Install `nodemon`: `npm install --save-dev nodemon`
2. Install `ts-node` and `swc`: `npm install --save-dev ts-node @swc/core @swc/helpers regenerator-runtime`
3. Add `swc` to `tsconfig.json`:

```
{
  "compilerOptions": {
    ...
  },
  "ts-node": {
    "swc": true
  }
}
```

4. Run with `nodemon`: `nodemon --watch src src/index.ts`
