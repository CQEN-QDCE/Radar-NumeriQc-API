// Variables environnement
require('dotenv').config({ path: '.env' })

const db = require("../db/db");
const fs = require('fs');

//Create data
const data = fs.readFileSync("./postgresql/populate_tables.sql").toString();

console.log("Data insertion.");

db
  .query(data)
  .then((res) => {
    console.log('Data successfully created');
    process.exit();
  })
  .catch((e) => {
    console.error(e.stack);
    process.exit();
  })