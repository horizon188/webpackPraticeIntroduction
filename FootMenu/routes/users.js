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

  console.log('数据库连接成功 ' + connection.threadId);
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

router.post('/menu/add', (req, res, next) => {
  // var params = Url.parse(req.url, true).query;
  let response = {
    data: {},
    code: 200,
    message: '成功'
  };
  console.log("res",req.body);

  var addSql = 'INSERT INTO foot_list(name,pic,flavor) VALUES(?,?,?)';
  var addSqlParams = [req.body.name, req.body.pic, req.body.flavor];
  //增
  connection.query(addSql, addSqlParams, function (err, result) {
    if (err) {
      console.log('[INSERT ERROR] - ', err.message);
      return;
    }
    console.log('result', result);
  });

  res.json(response);

})

router.post('/menu/edit', (req, res, next) => {
  // var params = Url.parse(req.url, true).query;
  let response = {
    data: {},
    code: 200,
    message: '成功'
  };
  console.log("res",req.body);

  var modSql = 'UPDATE foot_list SET name = ?,pic = ?,flavor = ? WHERE key = ?';
var modSqlParams = [req.body.name, req.body.pic,req.body.flavor,req.body.key];
//改
connection.query(modSql,modSqlParams,function (err, result) {
   if(err){
         console.log('[UPDATE ERROR] - ',err.message);
         return;
   }        
  console.log('--------------------------UPDATE----------------------------');
  console.log('UPDATE affectedRows',result.affectedRows);
  console.log('-----------------------------------------------------------------\n\n');
});

  res.json(response);

})

router.delete('/menu/delete', (req, res, next) => {
  // var params = Url.parse(req.url, true).query;
  let response = {
    data: {},
    code: 200,
    message: '成功'
  };

  let delSql = `DELETE FROM foot_list where key=${req.body.key}`;
  console.log("delSql",delSql);

//删
connection.query(delSql,function (err, result) {
        if(err){
          console.log('[DELETE ERROR] - ',err.message);
          return;
        }        
 
       console.log('--------------------------DELETE----------------------------');
       console.log('DELETE affectedRows',result.affectedRows);
       console.log('-----------------------------------------------------------------\n\n');  
});

  res.json(response);

})
router.get('/secret', function (req, res, next) {
  console.log('Accessing the secret section ...')
  next() // pass control to the next handler
})
module.exports = router;
