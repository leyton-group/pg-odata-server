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

You may customize the server port options by editing [.env](https://github.com/leyton-group/pg-odata-server/blob/develop/.env#L1-L2).

By default, these are the options:

```txt
PORT=3003
```

### Building the application

```sh
npm run build
```

### Starting the application

- Development :

```sh
npm run dev
```

- Production :

```sh
npm start
```

### Creating sample data

After starting the application you can generate the sample data by submitting localhost:3003/initDb.

### Adding new models/controllers

You can create and expose new tables through Odata protocole using the instructions given on [ts-odata-v4-server](https://github.com/leyton-group/ts-odata-v4-server) project readme.

## Example server

- Server file :

```typescript
@odata.controller(ProductsController, true)
export class Server extends ODataServer {}
```

- Controller file :

```typescript
export class ProductsController extends ODataController {
  /**
   *  Get All products
   * @param query
   * @returns products
   */
  @odata.GET
  async select(@odata.query $query: ODataQuery): Promise<Product[]> {
    const db = await connect();
    const query = createQuery($query);
    const { rows } = await db.query(query.from('"Products"'), query.parameters);
    return convertResults(rows);
  }

  /**
   *  Get one product by id
   * @param key
   * @param query
   * @returns
   */
  @odata.GET
  async selectOne(
    @odata.key key: number,
    @odata.query query: ODataQuery
  ): Promise<Product> {
    const db = await connect();
    const sqlQuery = createQuery(query);
    const { rows } = await db.query(
      `SELECT ${sqlQuery.select} FROM "Products"
                                     WHERE "Id" = $${
                                       sqlQuery.parameters.length + 1
                                     } AND
                                           (${sqlQuery.where})`,
      [...sqlQuery.parameters, key]
    );
    return convertResults(rows)[0];
  }
}
```

- Index file :

```typescript
import { Server } from "./server";
require("dotenv").config();

// Setup metadata schema
Server.$metadata(your_schema_file);
// Start ODATA server
const port = parseInt(process.env.PORT, 10) || 3003;
Server.create("/odata", port).addListener("listening", () => {
  console.log(`Odata server listening on port ${port} 🚀`);
});
```

### Response example

**Path :** `http://localhost:3003/odata/Categories`

**Method :** `GET`

```json
{
  "@odata.context": "http://localhost:3003/odata/$metadata#Categories",
  "value": [
    {
      "Id": 1,
      "Name": "Beverages",
      "Description": "Soft drinks"
    },
    {
      "Id": 2,
      "Name": "Grains/Cereals",
      "Description": "Breads"
    },
    {
      "Id": 3,
      "Name": "Meat/Poultry",
      "Description": "Prepared meats"
    },
    {
      "Id": 4,
      "Name": "Produce",
      "Description": "Dried fruit and bean curd"
    },
    {
      "Id": 5,
      "Name": "Seafood",
      "Description": "Seaweed and fish"
    },
    {
      "Id": 6,
      "Name": "Condiments",
      "Description": "Sweet and savory sauces"
    },
    {
      "Id": 7,
      "Name": "Dairy Products",
      "Description": "Cheeses"
    },
    {
      "Id": 8,
      "Name": "Confections",
      "Description": "Desserts"
    }
  ]
}
```
