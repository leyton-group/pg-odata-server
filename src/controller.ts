import { createQuery } from "odata-v4-pg";
import { odata, ODataController, ODataQuery } from "ts-odata-v4-server";
import { Category, Product } from "./model";
import connect from "./utils/connect";
import convertResults from "./utils/convertResults";

// Product controller
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
                                     WHERE "id" = $${
                                       sqlQuery.parameters.length + 1
                                     } AND
                                           (${sqlQuery.where})`,
      [...sqlQuery.parameters, key]
    );
    return convertResults(rows)[0];
  }
}

// Category Controller
export class CategoriesController extends ODataController {
  /**
   *  Get All categories
   * @param query
   * @returns
   */
  @odata.GET
  async select(@odata.query query: ODataQuery): Promise<Category[]> {
    const db = await connect();
    const sqlQuery = createQuery(query);
    const { rows } = await db.query(
      sqlQuery.from('"Categories"'),
      sqlQuery.parameters
    );
    return convertResults(rows);
  }

  /**
   *  Get one category by id
   * @param key
   * @param query
   * @returns
   */
  @odata.GET
  async selectOne(
    @odata.key key: number,
    @odata.query query: ODataQuery
  ): Promise<Category> {
    const db = await connect();
    const sqlQuery = createQuery(query);
    const { rows } = await db.query(
      `SELECT ${sqlQuery.select} FROM "Categories"
                                   WHERE "id" = $${
                                     sqlQuery.parameters.length + 1
                                   } AND
                                         (${sqlQuery.where})`,
      [...sqlQuery.parameters, key]
    );
    return convertResults(rows)[0];
  }

  /**
   * Get Category products
   * @param category
   * @param query
   * @returns
   */
  @odata.GET("Products")
  async getProducts(
    @odata.result category: Category,
    @odata.query query: ODataQuery
  ): Promise<Product[]> {
    const db = await connect();
    const sqlQuery = createQuery(query);
    const { rows } = await db.query(
      `SELECT ${sqlQuery.select} FROM "Products"
                                   WHERE "CategoryId" = $${
                                     sqlQuery.parameters.length + 1
                                   } AND
                                         (${sqlQuery.where})`,
      [...sqlQuery.parameters, category.id]
    );
    return convertResults(rows);
  }

  /**
   * Get one production for one category
   * @param key
   * @param category
   * @param query
   * @returns
   */
  @odata.GET("Products")
  async getProduct(
    @odata.key key: number,
    @odata.result category: Category,
    @odata.query query: ODataQuery
  ): Promise<Product> {
    const db = await connect();
    const sqlQuery = createQuery(query);
    const { rows } = await db.query(
      `SELECT ${sqlQuery.select} FROM "Products"
                                   WHERE "Id" = $${
                                     sqlQuery.parameters.length + 1
                                   } AND
                                         "CategoryId" = $${
                                           sqlQuery.parameters.length + 2
                                         } AND
                                         (${sqlQuery.where})`,
      [...sqlQuery.parameters, key, category.id]
    );
    return convertResults(rows)[0];
  }
}
