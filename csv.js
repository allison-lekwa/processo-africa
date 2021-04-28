
const fastcsv = require("fast-csv");
const fs = require("fs");
const ws = fs.createWriteStream('admin');
const Pool = require("pg").Pool;

const client = new Pool({
  host: "localhost",
  user: "postgres",
  database: "processo",
  password: "postgres",
  port: 5432
});

const tableName = "admin";

client.connect((err, client, done) => {
    if (err) throw err;

    const sqlQuery = `SELECT * FROM ${tableName}`

    client.query(sqlQuery, (err, res) => {
        if (err) {
            console.log("client.query()", err.stack)
            }
        if (res) {

            const jsonData = JSON.parse(JSON.stringify(res.rows));
            console.log("\njsonData:", jsonData)

            fastcsv
            // write the JSON data as a CSV file
            .write(jsonData, { headers: true })

            // log message when finished
            .on("finish", function() {
                console.log(`Postgres table ${tableName} exported to CSV file successfully.`);
            })
            // pipe the CSV data through the writestream
            .pipe(ws)
        }
        // callback for finishing the CSV creation
        done(console.log('Creating CSV from client.query() data'))
    })
});
//MySQL_18

module.exports = client;
