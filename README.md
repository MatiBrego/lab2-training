## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```
## Configuration
1. Add a `.env` with appropriate `DATABASE_URL` (See [Prisma Doc](https://www.prisma.io/docs/concepts/database-connectors/postgresql)) and `TOKEN_SECRET` (Can be anything) envirnoment variables.

2. Run docker compose up to launch the db.

3. Run `npm run prisma:db:deploy` to migrate the schema to the db.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
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

## License

Nest is [MIT licensed](LICENSE).
