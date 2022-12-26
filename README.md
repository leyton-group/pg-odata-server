# Odata Postgres Example

Odata PostgreSQL Server example.

## Technical details of this example

### Setting up the database

You have to create the database manually using this command after connecting to the default database:

```SQL
CREATE DATABASE db_name;
```

### Setting up the connection

You may customize the db connection options by editing [.env](http://gitlab.leyton.fr/salesforce/ODATA/-/blob/server/.env#L4-L8).

By default, these are the options:

```txt
# DATABASE
DB_USERNAME='postgres'
DB_PASSWORD='root'
DB_HOST='localhost'
DB_PORT=5433
DB_DATABASE='db_name'
```

### Setting up app connection port

By default, the app will listen on `port` `3003`.

You may customize the server port options by editing [.env](http://gitlab.leyton.fr/salesforce/ODATA/-/blob/server/.env#L1-L2).

By default, these are the options:

```txt
PORT=3003
```

### Building the application

```sh
npm run build
```

### Starting the application

* Development :

```sh
npm run dev
```

* Production :

```sh
npm start
```

### Creating sample data

After starting the application it's will generate the sample [datasets](http://gitlab.leyton.fr/salesforce/ODATA/-/blob/server/src/server.ts#L13-L35).
