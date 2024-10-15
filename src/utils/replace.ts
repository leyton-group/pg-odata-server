import * as pg from "pg";
import insert from "./insert";

export default async function (
  db: pg.Client,
  tableName: string,
  id: number,
  item: any
) {
  await db.query(`DELETE FROM "${tableName}" WHERE "Id" = $1`, [id]);
  return insert(db, tableName, [Object.assign({}, item, { Id: id })]);
}
