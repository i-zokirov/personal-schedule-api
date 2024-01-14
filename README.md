## Completed Tasks

- [x] Typescript use
- [x] NestJS framework
- [x] TypeORM
- [x] PostgreSQL
- [x] JWT Authentication with User entity
- [x] Swagger API documentation
- [x] Cache
- [x] GraphQL
- [x] Websocket integration with real-time event data
- [x] CRUD operations on Location, Event entities
- [x] User sign up and login process

## Design Decisions

- Authentication: used JWT authentication with User entity.
- Database: used PostgreSQL with TypeORM.
- Cache: used CACHE_MANAGER for its simplicity and ease of use for the scope of this project (no need for a more complex solution like Redis, however it can be implemented as future improvement).
- User sign up and login process is implemented with HTTP requests, CRUD operations on Location and Event entities are implemented with GraphQL. Websocket integration is implemented with Events module in order to update all event participants when event details change.
- Additional Connect entity is created to store user connections for websocket integration.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## License

Nest is [MIT licensed](LICENSE).
