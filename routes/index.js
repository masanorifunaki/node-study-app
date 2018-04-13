var express = require('express');
var router = express.Router();
var moment = require('moment');
var connection = require('../mysqlConnection');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});


router.post('/', function (req, res, next) {
    var title = req.body.title;
    var createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
    var id = 4;
    var query = `INSERT INTO boards (title, created_at) VALUES ("${title}", "${createdAt}")`;
    console.log(query);
    connection.query(query, function (err, rows) {
        console.log(rows);
        res.redirect('/');
    });
});


module.exports = router;