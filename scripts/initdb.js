// Variables environnement
require('dotenv').config({ path: '.env' })

const db = require("../db/db");
const fs = require('fs');


//Drop current database
console.log("Drop existing database.");

db
  .query("DROP DATABASE IF EXISTS "+process.env.POSTGRESQL_DATABASE+";")
  .then((res) => {
    console.log('Database successfully dropped');

    //Create tables
    const tables = fs.readFileSync("db/db.sql").toString();

    console.log("Tables creation.");

    db
      .query(tables)
      .then((res) => {
        console.log('Tables successfully created');

        //Create data
        const data = fs.readFileSync("db/enonces.sql").toString();

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

      })
      .catch((e) => {
        console.error(e.stack);
        process.exit();
      })

  })
  .catch((e) => {
    console.error(e.stack);
    process.exit();
  });
