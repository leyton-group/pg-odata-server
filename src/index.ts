import { Server } from "./server";
import Schema = require("./utils/schema");
require("dotenv").config();

// Start ODATA server
const port = parseInt(process.env.PORT, 10) || 3003;
Server.$metadata(Schema);
export default Server.create("/odata", port).addListener("listening", () => {
  console.log(`Odata server listening on port ${port} 🚀`);
});
// Init test data
Server.execute("/initDb", "POST");
