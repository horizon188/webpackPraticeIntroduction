var express = require('express');
var router = express.Router();
//引入mysql模块

const mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "123456789",
  database: "mysql"
});

connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
router.get('/getCity', (req, res, next) => {
  // var params = Url.parse(req.url, true).query;
  let response = {
    data: {},
    code: 200,
    message: ''
  };

  connection.query("SELECT * FROM foot_list", function (err, data) {

    if (err) {
      console.log("数据库访问出错", err);
    } else {
      response.data = data
      console.log(data);
      res.json(response);

    }
  })
})
router.get('/secret', function (req, res, next) {
  console.log('Accessing the secret section ...')
  next() // pass control to the next handler
})
module.exports = router;
