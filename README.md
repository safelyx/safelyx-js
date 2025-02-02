# Safelyx API

[![](https://github.com/safelyx/safelyx-js/workflows/Run%20Tests/badge.svg)](https://github.com/safelyx/safelyx-js/actions?workflow=Run+Tests) [![deno](https://shield.deno.dev/x/safelyx)](https://deno.land/x/safelyx) [![npm](https://img.shields.io/npm/v/@safelyx/api.svg)](https://www.npmjs.com/package/@safelyx/api) [![jsr](https://jsr.io/badges/@safelyx/api)](https://jsr.io/@safelyx/api)

> Safelyx API client

Safelyx API client for Deno, Node/NPM and browser. It has no dependencies.

You can find the API documentation at https://safelyx.com/safe-api.

### Some things to note:

1. It's simply making an HTTP request to the Safelyx API.

2. It provides types (and examples in JSDoc) for the results and for the parameters.

3. If the request to the API fails (HTTP error), it will throw an error, so you might want to wrap it in a `try`/`catch` block.

## Usage

It has a method per API endpoint.

### Deno

```ts
import safelyx from 'jsr:@safelyx/api@0.1.0'; // or import safelyx from 'https://deno.land/x/safelyx@0.1.0/mod.ts';

const checkResult = await safelyx.checkLink('https://example.com');

console.log(checkResult.result); // Outputs a safety score between 0 (unsafe) and 10 (safe). -1 if there was an error, -2 if there are no checks remaining.
```

### Node/NPM

```bash
npm install --save-exact @safelyx/api
```

```js
const safelyx = require('@safelyx/api'); // or import safelyx from '@safelyx/api';

const checkResult = await safelyx.checkLink('https://example.com');

console.log(checkResult.result); // Outputs a safety score between 0 (unsafe) and 10 (safe). -1 if there was an error, -2 if there are no checks remaining.
```

## Development

Requires `deno`.

```bash
make format
make test
```

## Publishing

After committing and pushing with a new version in `deno.json`, just run `make publish`.
