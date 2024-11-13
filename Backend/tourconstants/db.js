      var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "401269014",
  database: "tour"
});

// con.connect(function(err) {
//   if (err) console.log(err);
//   console.log("Connected to DB!");
// });

module.exports = con;          