var express = require('express');
var router = express.Router();
const pool = require('../config/database');
const moment = require('moment');
const cookieParser = require('cookie-parser')
const path = require('path');
var passwordHash = require('password-hash');


// /* GET users listing. */
// router.get('/', function (req, res, next) {
//   res.send({ name: 'binh' });
// });

/* create session for HOMEPAGE */
router.get('/check', function (req, res) {
console.log(req.jsonData)
  const token = req.token;
  if (token) {
    let sql = "SELECT * FROM sessions WHERE token = '" + token + "' AND expires > NOW()"

    pool.getConnection(function(err, connection) {
      if (err) throw err; // not connected!

      // Use the connection
      connection.query(sql, function (error, results) {
        if (results.length > 0) {
          res.send({ message: 'Welcome' + results[0].userid })
        } else {
          res.redirect('/api/users')
        }
        // When done with the connection, release it.
        connection.release();

        // Handle error after the release.
        if (error) throw error;

        // Don't use the connection here, it has been returned to the pool.
      }) 
      })
    } else {
      res.redirect('/api/users')
  } 
})

/* user LOG-IN */

router.post('/login', function (req, res) {
  console.log(req.body)
  let email = (req.body.email).toLowerCase();
  let password = req.body.password;
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let resultCheckEmail = re.test(email);

  let emailErr = ""
  let passwordErr = ""
  console.log('check')
  if (!email || !resultCheckEmail) {
    emailErr = "Your email is not valid"
    console.log('email err')
    //res.status(500).send({ message: emailErr })
  }
  if (!password) {
    passwordErr = "Your password is not valid"
    console.log('password err')
    //res.status(500).send({message: passwordErr})
  }

  // else {let sqlemail = "SELECT * FROM users WHERE email = '" + email + "'"

  //   let emailRecords = await new Promise((resolve, reject) => {
  //     pool.query(sqlemail, function (erroremail, resultsemail) {
  //       if (erroremail) throw erroremail
  //       resolve(resultsemail)
  //     })
  //   })

  //   if (emailRecords[0] && passwordHash.verify(password, emailRecords[0].password) == false) {
  //     passwordErr = "Wrong password"
  //     console.log('wrong password');
  //     res.status(500).send({message: passwordErr})
  //   }
  // }
  if ((emailErr == "") && (passwordErr == "")) {
    let sql = "SELECT id, password FROM users WHERE email = '" + email + "'";
    // Use the connection
    pool.query(sql, function (error, results) {
      if (error) throw error; // not connected!
      console.log(results, "get user")
      if (results.length > 0) {

        if (results[0].password) {
          if (passwordHash.verify(password, results[0].password)) {

            // FOR SESSIONS TABLE
            let userid = results[0].id;
            let created = new Date();

            let createdtrans = moment(created, 'DD/MM/YYYY HH:mm:ss');
            const mycreated = createdtrans.format('YYYY-MM-DD HH:mm:ss');


            let new_date = moment(createdtrans, "DD-MM-YYYY HH:mm:ss").add(1, 'days');
            const myexpires = new_date.format('YYYY-MM-DD HH:mm:ss');

            function createGuid() {
              return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
              });
            }
            let token = createGuid();

            let sql2 = "INSERT INTO sessions(userid, created, expires, token) VALUES (" + userid + ", '" + mycreated + "', '" + myexpires + "', '" + token + "')";
            console.log("create token " + token)
            pool.query(sql2, function (error2, results2) {
              if (error2) throw error2;
              if (results2.affectedRows > 0) {
                //Expires after 360000 ms from the time it is set.

                //res.cookie('usertoken ', token);
                console.log(token)
                res.send({ message: "Create token success", token: token })
              } else {
                res.status(500).send({ message: "Can't create token" })
              }
            })
          } else {
            console.log('wrong password');
            res.status(500).send({ message: "Wrong password" })
          }
        } else {
          console.log('invalid username');
          res.status(500).send({ message: "Invalid username" })
        }

      } else {
        console.log('no record found')
        res.status(500).send({ message: 'You need sign up first' })
      }
    });
  } else {
    res.status(500).send({ message: emailErr })
  }
})

module.exports = router;
