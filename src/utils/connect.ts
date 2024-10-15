import * as pg from "pg";

let db: pg.Client | null = null;
pg.types.setTypeParser(1082, function(stringValue) {
  return stringValue;  //1082 for date type
});

function promisify(client) {
  return new Proxy(client, {
    get(target, name) {
      if (name !== "query") return target[name];

      return function (...args) {
        return new Promise((resolve, reject) => {
          target.query(...args, (err, result) => {
            if (err) return reject(err);
            resolve(result);
          });
        });
      };
    },
  });
}

export default async function (): Promise<pg.Client> {
  if (db) return db;
  const pool = new pg.Pool({
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: +process.env.DB_PORT,
    host: process.env.DB_HOST,
    parseInputDatesAsUTC: true
  });
  return new Promise<pg.Client>((resolve: Function, reject: Function) => {
    pool.connect((err, client) => {
      if (err) return reject(err);
      db = promisify(client);
      resolve(db);
    });
  });
}
