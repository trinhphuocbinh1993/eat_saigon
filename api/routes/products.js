const pool = require('../config/database');
const moment = require('moment');
const express = require('express');
const router = express.Router();


/* GET PRODUCT LIST. */
router.get('/list', function (req, res) {
  let sql = "SELECT * FROM product"
  pool.query(sql, function (error, results) {
    console.log()
    if (error) throw error; // not connected!
    if (results.length > 0) {
      res.json({
        results
      })
    }
    else {
      res.status(500).send({ message: "No product found!" })
    }
  })
})

/* Create product page. */
router.post('/create', function (req, res) {
  console.log(req.body, "test o day")
  let userid = req.body.userid
  let name = req.body.name
  let description = req.body.description
  let detail = req.body.detail
  let price = req.body.price
  let category = req.body.category
  let created = new Date()
  let createdtrans = moment(created, 'DD/MM/YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
  let status = req.body.status // not tick on checkbox. if not tick, database is 1. that mean you sell it. if 0, this mean you dont want to sell it 
  let tab = req.body.tab
  let vegetarian = req.body.vegetarian

  let data = [userid, name, description, detail, price, createdtrans, status, category, tab, vegetarian]
  console.log(data, "co gi khong")
  let sql = "INSERT INTO product(userid, name, description, detail, price, created, status, category, tab, vegetarian) VALUES ('" + userid + "','" + name + "', '" + description + "', '" + detail + "', '" + price + "', '" + createdtrans + "', " + status + ", '" + category + "', '" + tab + "', " + vegetarian + ")"

  pool.query(sql, function (error, results) {
    if (error) {
      throw error; // not connected!
    } else {
      console.log(results.affectedRows + " product inserted!")
      res.send({ message: '1 product inserted!' })
    }
  })
})



/* load data when click edit product. */
router.get('/details', function (req, res) {
    const id = req.query.id
    console.log(id, "ID get from URL")
  
    let sql = "SELECT * FROM product WHERE id=" + id + ""
  
    pool.query(sql, function (error, results) {
      if (error) throw error; // not connected!
  
      if (results.length > 0) {
        console.log(results, "1 record get from database following condition")
        res.json(results)
      } else {
        console.log("No data of product found!")
        res.status(500).send({ message: "No data of product found!" })
      }
    })
})

/* UPDATE PRODUCT */

router.put('/update', function (req, res) {
  console.log(req.body.ProductID, "this is product id get from client. Its stored in Object aka data")
  console.log(req.body.UserID, "this is user id get from LocalStorage. Its stored in Object aka data")
  let id = req.body.productID
  let userid = req.body.userid
  let name = req.body.name
  let description = req.body.description
  let detail = req.body.detail
  let price = req.body.price
  let category = req.body.category
  let updated = new Date()
  let updatedtrans = moment(updated, 'DD/MM/YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
  let status = req.body.status // not tick on checkbox. if not tick, status is FALSE, database is 0. that mean you sell it. if 1, it hidden
  let tab = req.body.tab
  let vegetarian = req.body.vegetarian

  let data = [userid, name, description, detail, price, updatedtrans, status, category, tab, vegetarian]
  console.log(data)
  let sql = "UPDATE product SET userid = '" + userid + "', name = '" + name + "', description = '" + description + "', detail = '" + detail + "', price = " + price + ", updated = '" + updatedtrans + "', status = " + status + ", category = '" + category + "', tab = '" + tab + "', vegetarian = " + vegetarian + " WHERE id = " + id + ""
  console.log(sql)


  pool.query(sql, function (error, results) {
    if (error) {
      throw error; // not connected! 
    } else {
      console.log(results.affectedRows + " product inserted!")
      res.send({ message: "Updated successfully" })
    }
  })
})

/* DELETE PRODUCT */
router.delete('/delete', function (req, res) {
  const id = req.query.id
  console.log(id, "id dung khong")

  let sql = "DELETE FROM product WHERE id = " + id + ""

  pool.query(sql, function (error, results) {
    if (error) throw error; // not connected!
    console.log(results)
    console.log(results.affectedRows + " product deleted!")
    res.send({ message: "1 product deleted!" })
  })

})
module.exports = router;