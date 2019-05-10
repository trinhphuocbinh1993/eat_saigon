let mysql = require('mysql');

let pool = mysql.createPool({
    connectionLimit : 10,
    host: "demo.dinh.it",
    user: "demodinh_eatsg",
    database: "demodinh_eatsaigon",
    password: 'tunalastic',
    port: 3306,
})

module.exports = pool