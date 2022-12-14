# express-mvc-advanced

Sample NodeJS Express app with advanced architecture:

- MVC structure
- three-tier architecture
  - app tier - MVC controllers
  - service tier - services with business logic
  - data tier - multiple repositories implementation (MSSQL and MySQL)
- classes and interfaces
- async/await sql operations
- global error handling
- async error handling
- multiple database support
- using sql parameters
- .env configuration

## .env content

```

PORT=8080

#MsSql
DB_TYPE=MsSql
DB_SERVER=localhost
DB_NAME=my_db
DB_USER=my_user
DB_PASSWORD=my_pass

#MySql
# DB_TYPE=MySql
# DB_SERVER=localhost
# DB_NAME=my_db
# DB_USER=my_user
# DB_PASSWORD=my_pass

```

## Basic commands:

Use `npm run dev` to run app in dev (nodemon) mode.

Use `npm run test` to build and run from dist folder.

