import { Edm, odata, ODataServer } from "ts-odata-v4-server";
import categories from "./categories";
import products from "./products";
import connect from "./utils/connect";
import insert from "./utils/insert";
import {ProductsController,CategoriesController} from "./controller";

@odata.namespace("OData-Server")
@odata.controller(ProductsController, true)
@odata.controller(CategoriesController, true)

export class Server extends ODataServer {
  // Action to be moved into example directory
  @Edm.ActionImport
  async initDb() {
    const db = await connect();
    await db.query(`DROP TABLE IF EXISTS "Categories", "Products"`);

    await db.query(`CREATE TABLE "Categories" (
							"id" SERIAL PRIMARY KEY,
							"Name" VARCHAR(32),
							"Description" VARCHAR(25)
						);`);

    await db.query(`CREATE TABLE "Products" (
							"id" SERIAL PRIMARY KEY,
							"Name" VARCHAR(32),
							"QuantityPerUnit" VARCHAR(20),
							"UnitPrice" NUMERIC(5,2),
							"CategoryId" INT,
							"Discontinued" BOOLEAN
						);`);

    await insert(db, "Categories", categories);

    await insert(db, "Products", products);
  }
}
