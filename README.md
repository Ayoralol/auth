# Nest mikro-orm starter

This repository is an opinionated, pre configured Nest app using Mikro Orm version 6. Support for migrations, seeding, and use of environment variables is already built in.

## **NOTE**

This app was built in February 2024, you may need to update versions in `package.json`

## Getting started

1. Clone the repository
2. Create a `.env` file and copy the contents of .env.example over
3. Replace relevant environment variables
4. (Optional) if using a package manager other than npm, delete pack-lock.json

## Installation

```bash
$ npm install
```

## Remove git folder

```bash
rm -rf .git
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Migrations

```bash
# create initial migration
$ npx mikro-orm migration:create --initial

# create additional migration
$ npx mikro-orm migration:create

# move to latest migration
$ npm mikro-orm migration:up

# fresh migration and seed database
$ npx mikro-orm migration:fresh --seed
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
