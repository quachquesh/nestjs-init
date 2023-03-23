## Installation

```bash
$ npm install
```

### Database postgres

```bash
# db migrate
npx prisma migrate dev

# db seed
# admin | 123456
npx prisma db seed


# run studio
npx prisma studio

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

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Generating a new resource

```bash
nest g resource [name] --no-spec
```
