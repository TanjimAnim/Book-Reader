## Book Reader

A full stack app where user can create account, store info about books.
features

- signup, signin
- create,read,update, delete books
- list a book as favorite

## Technology used

Client side -

1. ReactJS
2. ChakraUI (component library)

Database -

1. PostgreSQL

Server side-

1. NodeJS
2. ExpressJS

## How to install

- go to server folder
- type command `docker-compose up` to run postgres database
- using PGAdmin/CLI run the files in migrations, those are scripts of replicating the database
- change current directory to server, run command `npm i` to install the dependencies. Then type `npx nodemon` to start the server
- change current directory to client. run command `npm i` to install the dependencies of Frontend side. Then type `npm start` to start the react app.
