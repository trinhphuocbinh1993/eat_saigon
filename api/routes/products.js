const pool = require('../config/database');
const moment = require('moment');
const cookieParser = require('cookie-parser')
const path = require('path');
const express = require('express');
const router = express.Router();


/* GET PRODUCT LIST. */
router.get('/list', function(req, res){
  let sql = "SELECT * FROM product"
  pool.query(sql, function(error, results){
    console.log()
    if (error) throw error; // not connected!
    if (results.length > 0) {
      res.json({ 
        results })
    }
    else {
      res.status(500).send({ message: "No product found!" })
    }
  })
})

/* Create product page. */
router.post('/create', function(req, res, next){
  console.log(req.body,"test o day")
  let userid = req.body.userid
  let name = req.body.name
  let description = req.body.description
  let detail = req.body.detail
  let price = req.body.price
  let category = req.body.category
  let created = new Date()
  let createdtrans = moment(created, 'DD/MM/YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
  let status = req.body.status // not tick on checkbox. if not tick, database is 1. that mean you sell it. if 0, this mean you dont want to sell it 

  let data = [userid, name, description, detail, price, createdtrans, status, category]
  console.log(data)
  let sql = "INSERT INTO product(userid, name, description, detail, price, created, status, category) VALUES ('" + userid + "','" + name + "', '" + description + "', '" + detail + "', '" + price + "', '" + createdtrans + "', " + status + ", '" + category + "')"



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
  res.send({status:'done'})
})

module.exports = router;