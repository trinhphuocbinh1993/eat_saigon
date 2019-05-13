const pool = require('../config/database');
const moment = require('moment');
const cookieParser = require('cookie-parser')
const path = require('path');
const express = require('express');
const router = express.Router();

/* Create product page. */
router.post('/create', function(req, res, next){
  let name = req.body.pro_name
  let description = req.body.pro_des
  let detail = req.body.pro_detail
  let price = req.body.pro_price
  let qty = req.body.pro_qty
  let category = req.body.pro_cate
  let created = new Date()
  let createdtrans = moment(created, 'DD/MM/YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
  let status = true // not tick on checkbox. if not tick, database is 1. that mean you sell it. if 0, this mean you dont want to sell it 
  if (req.body.pro_status) {
    if (req.body.pro_status === 'on')
      status = false;
  }

  console.log(status)
  let data = [name, description, detail, price, qty, createdtrans, status, category]
  console.log(data)
  let sql = "INSERT INTO product(name, description, detail, price, qty, created, status) VALUES ('" + name + "', '" + description + "', '" + detail + "', '" + price + "', '" + qty + "', '" + createdtrans + "', " + status + ")"



  pool.getConnection(function (err, connection) {
    if (err) throw err; // not connected!

    // Use the connection
    connection.query(sql, function (error, res) {
      console.log(res.affectedRows + " product inserted!")
      // When done with the connection, release it.
      connection.release();

      // Handle error after the release.
      if (error) throw error;

      // Don't use the connection here, it has been returned to the pool.
    });
  });
})


  
module.exports = router;