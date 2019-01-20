var express = require('express');
var router = express.Router();
const mysql = require('mysql').verbose();

const db = new mysql.Database('./gotr.sql', err => {
  if (err) {
    return console.error(err.message);
  }
  console.log('You are connected to the database!');
});

const query = 'SELECT * from food_trucks LIMIT 10';

db.all(query, (err, row) => {
  if (err) throw err;
  console.log(row);
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
