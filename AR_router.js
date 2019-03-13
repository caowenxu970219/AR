var express = require('express')
var User = require('./models/user')
var Labuser = require('./models/labuser')
var Relate = require('./models/relate')
var Stock = require('./models/stock')
var Record = require('./models/record.js')
var Borrow = require('./models/history_borrow.js')
var Return = require('./models/history_return.js')
var fs = require("fs")
var iconv = require('iconv-lite')

var md5 = require('blueimp-md5')

var router = express.Router()
/***************************AR_router************************** */
const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'caowenxu970219',
    database: 'ar'
  })
  connection.connect()
/***************************************** */
  router.get('/my_ar', function (req, res) {
      res.render('AR_show_index.html', {
          user: req.session.user,
          admuser: req.session.admuser,
        })
    })
/***************************************** */
router.get('/', function (req, res) {
  res.render('AR_index.html', {
      user: req.session.user,
      admuser: req.session.admuser,
    })
})
/*********首页新闻中心列表获取接口******** */
    router.get('/get_news_list', function (req, res) {
        connection.query('SELECT * FROM news_show',function(err,ret){//查找所有
            if (err) {
                return res.status(500).json({
                    err_code: 500,
                    message: err.message
                })
            }
            else{
                return res.status(200).json({
                    err_code: 0,
                    message: ret
                })
            }
        })
    })
/*********首页顶部轮播图获取接口********* */
router.get('/get_top_carrousel_list', function (req, res) {
    connection.query('SELECT * FROM carousel_top',function(err,ret){//查找所有
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: err.message
            })
        }
        else{
            return res.status(200).json({
                err_code: 0,
                message: ret
            })
        }
    })
})
/*********首页左下方轮播图获取接口********* */
router.get('/get_left_carrousel_list', function (req, res) {
    connection.query('SELECT * FROM carrousel_left',function(err,ret){//查找所有
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: err.message
            })
        }
        else{
            return res.status(200).json({
                err_code: 0,
                message: ret
            })
        }
    })
})
/************************管理员登录接口*************************/ 
router.post('/administrator_login', function (req, res) {
  // 1. 获取表单数据
  // 2. 查询数据库用户名密码是否正确
  // 3. 发送响应数据
  var body = req.body
  connection.query(
    'select * from administrators_user where user_name = ? and password = ?',
    [body.username, body.password], 
    function(err, admuser) {
      if (err) {
        return res.status(500).json({
          err_code: 500,
          message: err.message
        })
      }
      else if(admuser!=''){
      req.session.admuser = admuser
      res.status(200).json({
        err_code: 0,
        message: 'OK'
      })
    }else{
      res.status(200).json({
        err_code: 1,
        message: 'not found'
      })
    }
    });
  })
/**********************退出接口**********************/
router.get('/logout', function (req, res) {
  // 清除登陆状态
  req.session.user = null
  req.session.admuser = null
  
  // 重定向到登录页
  res.redirect('/')
})
/************************首页新闻删除接口*************************/ 
router.post('/index_news_del', function (req, res) {
  var body = req.body
  connection.query('delete from  news_center where id=?',[body.id],function(err, ret) {
    if (err) {
      return res.status(500).json({
        err_code: 500,
        message: err.message
      })
    }
    res.status(200).json({
      err_code: 0,
      message: 'ok'
    })
  });
})   
/************************首页新闻添加接口*************************/ 
router.post('/news_add', function (req, res) {
  var body = req.body
  var base64Data1 = body.i1.replace(/^data:image\/\w+;base64,/, "");
  var dataBuffer1 = new Buffer(base64Data1, 'base64');
  var base64Data2 = body.i2.replace(/^data:image\/\w+;base64,/, "");
  var dataBuffer2 = new Buffer(base64Data2, 'base64');
  var base64Data3 = body.i3.replace(/^data:image\/\w+;base64,/, "");
  var dataBuffer3 = new Buffer(base64Data3, 'base64');
  var base64Data4 = body.i4.replace(/^data:image\/\w+;base64,/, "");
  var dataBuffer4 = new Buffer(base64Data4, 'base64');
  var base64Data5 = body.i5.replace(/^data:image\/\w+;base64,/, "");
  var dataBuffer5 = new Buffer(base64Data5, 'base64');
  var base64Data6 = body.i6.replace(/^data:image\/\w+;base64,/, "");
  var dataBuffer6 = new Buffer(base64Data6, 'base64');
  var base64Data7 = body.i7.replace(/^data:image\/\w+;base64,/, "");
  var dataBuffer7 = new Buffer(base64Data7, 'base64');
  var base64Data8 = body.i8.replace(/^data:image\/\w+;base64,/, "");
  var dataBuffer8 = new Buffer(base64Data8, 'base64');
  var base64Data9 = body.i9.replace(/^data:image\/\w+;base64,/, "");
  var dataBuffer9 = new Buffer(base64Data9, 'base64');
  var base64Data10 = body.i10.replace(/^data:image\/\w+;base64,/, "");
  var dataBuffer10 = new Buffer(base64Data10, 'base64');
  var mysqlParam=[
    body.time,
    body.name,
    body.order,
    'writing1.txt','writing2.txt','writing3.txt','writing4.txt','writing5.txt','writing6.txt','writing7.txt','writing8.txt','writing9.txt','writing10.txt',
    body.i1n,body.i2n,body.i3n,body.i4n,body.i5n,body.i6n,body.i7n,body.i8n,body.i9n,body.i10n,
    'describe1.txt','describe2.txt','describe3.txt','describe4.txt','describe5.txt','describe6.txt','describe7.txt','describe8.txt','describe9.txt','describe10.txt'
  ]
  
  var mysqlQuery = 'insert news_show(time,title,flag,writing1,writing2,writing3,writing4,writing5,writing6,writing7,writing8,writing9,writing10,image1,image2,image3,image4,image5,image6,image7,image8,image9,image10,describe1,describe2,describe3,describe4,describe5,describe6,describe7,describe8,describe9,describe10) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
  connection.query(mysqlQuery,mysqlParam,function(err,ret,fields){
    if(err){
      console.log(err.message)
      return res.status(500).json({
        err_code: 500,
        message: err.message     
      })
    }else{
      var id = ret.insertId
      fs.mkdir('./public/news/'+id,function(err){
        if(!err){
          for(i=0;i<body.order.length;i=i+2){
            var img1=body.order[i]
            var img2=body.order[i+1]
            if(img1=='w'){
              if(img2==1){
                var url ='writing'+img2+'.txt'
                fs.writeFile('./public/news/'+id+'/writing'+img2+'.txt',body.w1,'utf8',function(error){})
              }
              if(img2==2){
                fs.writeFile('./public/news/'+id+'/writing'+img2+'.txt',body.w2,'utf8',function(error){})
              }
              if(img2==3){
                fs.writeFile('./public/news/'+id+'/writing'+img2+'.txt',body.w3,'utf8',function(error){})
              }
              if(img2==4){
                fs.writeFile('./public/news/'+id+'/writing'+img2+'.txt',body.w4,'utf8',function(error){})
              }
              if(img2==5){
                fs.writeFile('./public/news/'+id+'/writing'+img2+'.txt',body.w5,'utf8',function(error){})
              }
              if(img2==6){
                fs.writeFile('./public/news/'+id+'/writing'+img2+'.txt',body.w6,'utf8',function(error){})
              }
              if(img2==7){
                fs.writeFile('./public/news/'+id+'/writing'+img2+'.txt',body.w7,'utf8',function(error){})
              }
              if(img2==8){
                fs.writeFile('./public/news/'+id+'/writing'+img2+'.txt',body.w8,'utf8',function(error){})
              }
              if(img2==9){
                fs.writeFile('./public/news/'+id+'/writing'+img2+'.txt',body.w9,'utf8',function(error){})
              }
              if(img2==10){
                fs.writeFile('./public/news/'+id+'/writing'+img2+'.txt',body.w10,'utf8',function(error){})
              }
            }else if(img1=='i'){
              if(img2==1){
                fs.writeFile('./public/news/'+id+'/'+body.i1n, dataBuffer1, function(err) {});
              }
              if(img2==2){
                fs.writeFile('./public/news/'+id+'/'+body.i2n, dataBuffer2, function(err) {});
              }
              if(img2==3){
                fs.writeFile('./public/news/'+id+'/'+body.i3n, dataBuffer3, function(err) {});
              }
              if(img2==4){
                fs.writeFile('./public/news/'+id+'/'+body.i4n, dataBuffer4, function(err) {});
              }
              if(img2==5){
                fs.writeFile('./public/news/'+id+'/'+body.i5n, dataBuffer5, function(err) {});
              }
              if(img2==6){
                fs.writeFile('./public/news/'+id+'/'+body.i6n, dataBuffer6, function(err) {});
              }
              if(img2==7){
                fs.writeFile('./public/news/'+id+'/'+body.i7n, dataBuffer7, function(err) {});
              }
              if(img2==8){
                fs.writeFile('./public/news/'+id+'/'+body.i8n, dataBuffer8, function(err) {});
              }
              if(img2==9){
                fs.writeFile('./public/news/'+id+'/'+body.i9n, dataBuffer9, function(err) {});
              }
              if(img2==10){
                fs.writeFile('./public/news/'+id+'/'+body.i10n, dataBuffer10, function(err) {});
              }
            }else if(img1=='d'){
              if(img2==1){
                fs.writeFile('./public/news/'+id+'/describe'+img2+'.txt',body.d1,'utf8',function(error){})
              }
              if(img2==2){
                fs.writeFile('./public/news/'+id+'/describe'+img2+'.txt',body.d2,'utf8',function(error){})
              }
              if(img2==3){
                fs.writeFile('./public/news/'+id+'/describe'+img2+'.txt',body.d3,'utf8',function(error){})
              }
              if(img2==4){
                fs.writeFile('./public/news/'+id+'/describe'+img2+'.txt',body.d4,'utf8',function(error){})
              }
              if(img2==5){
                fs.writeFile('./public/news/'+id+'/describe'+img2+'.txt',body.d5,'utf8',function(error){})
              }
              if(img2==6){
                fs.writeFile('./public/news/'+id+'/describe'+img2+'.txt',body.d6,'utf8',function(error){})
              }
              if(img2==7){
                fs.writeFile('./public/news/'+id+'/describe'+img2+'.txt',body.d7,'utf8',function(error){})
              }
              if(img2==8){
                fs.writeFile('./public/news/'+id+'/describe'+img2+'.txt',body.d8,'utf8',function(error){})
              }
              if(img2==9){
                fs.writeFile('./public/news/'+id+'/describe'+img2+'.txt',body.d9,'utf8',function(error){})
              }
              if(img2==10){
                fs.writeFile('./public/news/'+id+'/describe'+img2+'.txt',body.d10,'utf8',function(error){})
              }
            }
          }
            if(!err){
              res.status(200).json({
                err_code: 0,
                message: 'ok'
              })
            }
          
        }
      })
    }
  })
  /*var mysqlParam=[
    body.news_name,
    body.time,
  ]
  var mysqlQuery = 'insert news_center(news_name,time) values(?,?)'*/
  /*connection.query(mysqlQuery,mysqlParam,function(err,ret,fields){
    if(err){
      return res.status(500).json({
        err_code: 500,
        message: err.message
      })
    }else{
      res.status(200).json({
        err_code: 0,
        message: 'ok'
      })
    }
  })*/
})   
/************************首页新闻修改接口*************************/ 
router.post('/news_change', function (req, res) {
  var body = req.body
  var mysqlParam=[
    body.news_name,
    body.time,
    body.id,
  ]
  var mysqlQuery = 'UPDATE news_center SET news_name = ?,time = ? WHERE id = ?'
  connection.query(mysqlQuery,mysqlParam,function (err, result) {
    if(err){
      return res.status(500).json({
        err_code: 500,
        message: err.message
      })
    }else{
      res.status(200).json({
        err_code: 0,
        message: 'ok'
      })
    }
  })
})   
/**********************添加顶部轮播图接口**********************/
router.post('/top_carousels_add', function (req, res){
  //接收前台POST过来的base64
  var imgData = req.body.img;
  var filename=req.body.filename;
  //过滤data:URL
  var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
  var dataBuffer = new Buffer(base64Data, 'base64');
  fs.writeFile('./public/img/top_carousels/'+filename, dataBuffer, function(err) {
      if(err){
        res.send(err);
      }else{      
        var mysqlParam=[
          filename,
          filename,
        ]
        var mysqlQuery = 'insert carousel_top(picture_name,file_name) values(?,?)'
        connection.query(mysqlQuery,mysqlParam,function(err,ret,fields){
          if(err){
            return res.status(500).json({
              err_code: 500,
              message: err.message
            })
          }else{
            res.status(200).json({
              err_code: 0,
              message: 'ok'
            })
          }
        })

      }
  });
})
/************************首页顶部轮播图删除接口*************************/ 
router.post('/top_carousels_del', function (req, res) {
  var body = req.body
  connection.query('delete from  carousel_top where id=?',[body.id],function(err, ret) {
    if (err) {
      return res.status(500).json({
        err_code: 500,
        message: err.message
      })
    }else{
      fs.unlink('./public/img/top_carousels/'+body.file_name,function(error){})

      res.status(200).json({
        err_code: 0,
        message: 'ok'
      })
    }
  });
})  
/**********************首页添加从轮播图接口**********************/
router.post('/left_carousels_add', function (req, res){
  //接收前台POST过来的base64
  var imgData = req.body.img;
  var filename=req.body.filename;
  //过滤data:URL
  var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
  var dataBuffer = new Buffer(base64Data, 'base64');
  fs.writeFile('./public/img/left_carousels/'+filename, dataBuffer, function(err) {
      if(err){
        res.send(err);
      }else{      
        var mysqlParam=[
          filename,
          filename,
        ]
        var mysqlQuery = 'insert carrousel_left(picture_name,file_name) values(?,?)'
        connection.query(mysqlQuery,mysqlParam,function(err,ret,fields){
          if(err){
            return res.status(500).json({
              err_code: 500,
              message: err.message
            })
          }else{
            res.status(200).json({
              err_code: 0,
              message: 'ok'
            })
          }
        })

      }
  });
}) 
/************************首页从轮播图删除接口*************************/ 
router.post('/left_carousels_del', function (req, res) {
  var body = req.body
  connection.query('delete from  carrousel_left where id=?',[body.id],function(err, ret) {
    if (err) {
      return res.status(500).json({
        err_code: 500,
        message: err.message
      })
    }else{
      fs.unlink('./public/img/left_carousels/'+body.file_name,function(error){})

      res.status(200).json({
        err_code: 0,
        message: 'ok'
      })
    }
  });
})  
/************************从轮播图标题修改接口*************************/ 
router.post('/carrousel_title_change', function (req, res) {
  var body = req.body
  var mysqlParam=[
    body.title,
    body.id,
  ]
  var mysqlQuery = 'UPDATE carrousel_left SET title = ? WHERE id = ?'
  connection.query(mysqlQuery,mysqlParam,function (err, result) {
    if(err){
      return res.status(500).json({
        err_code: 500,
        message: err.message
      })
    }else{
      res.status(200).json({
        err_code: 0,
        message: 'ok'
      })
    }
  })
})   
/************************普通用户登录接口*************************/ 
router.post('/user_login', function (req, res) {
  // 1. 获取表单数据
  // 2. 查询数据库用户名密码是否正确
  // 3. 发送响应数据
  var body = req.body
  connection.query(
    'select * from user where username = ? and password = ?',
    [body.username, body.password], 
    function(err, user) {
      if (err) {
        return res.status(500).json({
          err_code: 500,
          message: err.message
        })
      }
      else if(user!=''){
      req.session.user = user
      res.status(200).json({
        err_code: 0,
        message: 'OK'
      })
    }else{
      res.status(200).json({
        err_code: 1,
        message: 'not found'
      })
    }
    });
  })
/****************************被点击新闻展示接口*************************** */
router.post('/news_show', function (req, res) {

connection.query(
  'select * from news_show where id = ?',
  [req.body.id], 
  function(err, news) {
    var id = req.body.id
    var title = news[0].title
    var time = news[0].time
    var flag = news[0].flag
    var length = (flag.length)
    var writing = [news[0].writing1,news[0].writing2,news[0].writing3,news[0].writing4,news[0].writing5,news[0].writing6,news[0].writing7,news[0].writing8,news[0].writing9,news[0].writing10]
    var image = [news[0].image1,news[0].image2,news[0].image3,news[0].image4,news[0].image5,news[0].image6,news[0].image7,news[0].image8,news[0].image9,news[0].image10]
    var describe = [news[0].describe1,news[0].describe2,news[0].describe3,news[0].describe4,news[0].describe5,news[0].describe6,news[0].describe7,news[0].describe8,news[0].describe9,news[0].describe10]
    for(i=0;i<length;i=i+2){
      var msg1 = flag[i]
      var msg2 = flag[i+1]
      
      if(msg1 == 'w'){
        for(j=0;j<=9;j++){
          if(msg2==j+1){
            var writingurl = './public/news/'+id+'/'+writing[j]
            writing[j]= iconv.decode(fs.readFileSync(writingurl), 'utf-8')
          }
        }
      }
      else if(msg1 == 'i'){
        {
          for(j=0;j<=9;j++){
            if(msg2==j+1){
              image[j] = './public/news/'+id+'/'+image[j]
            }
          }
        }
      }
      else if(msg1 == 'd'){
        for(j=0;j<=9;j++){
          if(msg2==j+1){
            var describeurl = './public/news/'+id+'/'+describe[j]
            describe[j]= iconv.decode(fs.readFileSync(describeurl), 'utf-8')
          }
        }
      }    
    }
    res.status(200).json({
      err_code: 0,
      writing,
      image,
      describe,
      order:flag,
      time,
      title,
      id,
    })
  })
})


/**************************myaql************************ */
/*const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'caowenxu970219',
  database: 'cishi'
})

connection.connect(function(err){//连接
  if(err){
    console.error('error connecting:'+err.stack)
    return
  }
  console.log('connected as id'+connection.threadId)
})*/

/*********增********* */
/*
var mysqlParam=[
  new Date,
  'xu',
  '789'
]

var mysqlQuery = 'insert man(time,name,id) values(?,?,?)'
connection.query(mysqlQuery,mysqlParam,function(err,ret,fields){
  if(err){
    console.log(err);
  }else{
    console.log('ok')
  }
})
*/
/******************* */

/***********删********** */
/*connection.query('delete from  man where name="xu"', function(err, ret) {
  if (err) throw err;

  console.log(ret);
});*/
/*********************** */
/************改********* */
/*
connection.query('update man set id="654" where name="wen"', function(err, result) {
  if (err) throw err;

});
*/
/********************** */
/*connection.query('SELECT * FROM man',function(err,res){//查找所有
  if(err){
    console.log(err);
  }else{
    console.log(res)
  }
})*/

/*let sql = 'SELECT * FROM man WHERE name='+connection.escape('wen')//按条件查找

connection.query(sql,function(err,res){//查找所有
  if(err){
    console.log(err);
  }else{
    console.log(res)
  }
})*/
/******************************************************** */





var userfind_x = 0
var labfind_x = 0

/*router.get('/', function (req, res) {
  res.render('index.html', {
    user: req.session.user,
    labuser: req.session.labuser,
    flag:1

  })
})*/

router.get('/borrow_history', function (req, res) {
  //console.log(req.session.user)
    res.render('borrow_history.html', {
      user: req.session.user,
      labuser: req.session.labuser,
      flag:0
     /* relate: req.session.relate,
      stock: req.session.stock,
      record: req.session.borrow*/
    })
  })

  router.get('/revert_history', function (req, res) {
    //console.log(req.session.user)
      res.render('revert_history.html', {
        user: req.session.user,
        labuser: req.session.labuser,
        flag:0
       /* relate: req.session.relate,
        stock: req.session.stock,
        record: req.session.borrow*/
      })
    })

  router.get('/my_borrw', function (req, res) {
    //console.log(req.session.user)
      res.render('my_borrw.html', {
        user: req.session.user,
        labuser: req.session.labuser,
        flag:0
       /* relate: req.session.relate,
        stock: req.session.stock,
        record: req.session.borrow*/
      })
    })
  

/*
*
*
**********************个人登录接口**********************
*
*/
/*router.get('/login', function (req, res) {
  res.render('login.html')
})*/

/*router.post('/login', function (req, res) {
  // 1. 获取表单数据
  // 2. 查询数据库用户名密码是否正确
  // 3. 发送响应数据
  var body = req.body

  User.findOne({
    email: body.email,
    password: md5(md5(body.password))
  }, function (err, user) {
    if (err) {
      return res.status(500).json({
        err_code: 500,
        message: err.message
      })
    }
    
    // 如果邮箱和密码匹配，则 user 是查询到的用户对象，否则就是 null
    if (!user) {
      return res.status(200).json({
        err_code: 1,
        message: 'Email or password is invalid.'
      })
    }

    // 用户存在，登陆成功，通过 Session 记录登陆状态
    req.session.user = user

    res.status(200).json({
      err_code: 0,
      message: 'OK'
    })
  })
})*/

/*
*
*
**********************个人注册接口**********************
*
*/
router.get('/register', function (req, res) {
  res.render('register.html')
})

router.post('/register', function (req, res) {
  // 1. 获取表单提交的数据
  //    req.body
  // 2. 操作数据库
  //    判断改用户是否存在
  //    如果已存在，不允许注册
  //    如果不存在，注册新建用户
  // 3. 发送响应
  var body = req.body

/********************************************* */
  Labuser.findOne({
    nickname: body.labnickname
  }, function (err,data) {

    if (err) {
      return res.status(500).json({
        success: false,
        message: '服务端错误'
      })
    }
    // console.log(data)
    if (data) {
      labfind_x=1
    }else{
      labfind_x=0
    }
    if (labfind_x==0) {
      // 实验室不存在
      return res.status(200).json({
        err_code: 3,
        message: 'labnickname anot found.'
      })
      return res.send(`实验室不存在，请重试`)
    }
  })
/************************************************** */

  User.findOne({
    $or: [{
        email: body.email
      },
      {
        nickname: body.nickname
      }
    ]
  }, function (err, data) {

    if (err) {
      return res.status(500).json({
        success: false,
        message: '服务端错误'
      })
    }
    // console.log(data)
    if (data) {
      userfind_x=1
    }else{
      userfind_x=0
    }
    if (userfind_x==1) {
      // 邮箱或者昵称已存在
      return res.status(200).json({
        err_code: 1,
        message: 'Email or nickname aleady exists.'
      })
      return res.send(`邮箱或者密码已存在，请重试`)
    }else if(userfind_x == 0 && labfind_x == 1){
     // 对密码进行 md5 重复加密
    body.password = md5(md5(body.password))
    /*********************************************** */
    new Relate(body).save(function (err, relate) {
      if (err) {
        return res.status(500).json({
          err_code: 500,
          message: 'Internal error.'
        })
      }
    })
    /************************************************** */
    new User(body).save(function (err, user) {
      if (err) {
        return res.status(500).json({
          err_code: 500,
          message: 'Internal error.'
        })
      }
      // 注册成功，使用 Session 记录用户的登陆状态
      req.session.user = user

      // Express 提供了一个响应方法：json
      // 该方法接收一个对象作为参数，它会自动帮你把对象转为字符串再发送给浏览器
      res.status(200).json({
        err_code: 0,
        message: 'OK'
      })
    
      // 服务端重定向只针对同步请求才有效，异步请求无效
      // res.redirect('/')
    })



  }
  })
})
/*
*
*
**********************退出接口**********************
*
*/
/*router.get('/logout', function (req, res) {
  // 清除登陆状态
  req.session.user = null
  req.session.labuser = null
  // 重定向到登录页
  res.redirect('/')
})*/

// router.post('/register', async function (req, res) {
//   var body = req.body
//   try {
//     if (await User.findOne({ email: body.email })) {
//       return res.status(200).json({
//         err_code: 1,
//         message: '邮箱已存在'
//       })
//     }

//     if (await User.findOne({ nickname: body.nickname })) {
//       return res.status(200).json({
//         err_code: 2,
//         message: '昵称已存在'
//       })
//     }

//     // 对密码进行 md5 重复加密
//     body.password = md5(md5(body.password))

//     // 创建用户，执行注册
//     await new User(body).save()

//     res.status(200).json({
//       err_code: 0,
//       message: 'OK'
//     })
//   } catch (err) {
//     res.status(500).json({
//       err_code: 500,
//       message: err.message
//     })
//   }
// })
/*
*
*
**********************实验室登录接口**********************
*
*/
router.get('/lablogin', function (req, res) {
  res.render('lablogin.html')
})

router.post('/lablogin', function (req, res) {
  // 1. 获取表单数据
  // 2. 查询数据库用户名密码是否正确
  // 3. 发送响应数据
  var body = req.body

  Labuser.findOne({
    email: body.email,
    password: md5(md5(body.password))
  }, function (err, labuser) {
    if (err) {
      return res.status(500).json({
        err_code: 500,
        message: err.message
      })
    }
    
    // 如果邮箱和密码匹配，则 user 是查询到的用户对象，否则就是 null
    if (!labuser) {
      return res.status(200).json({
        err_code: 1,
        message: 'Email or password is invalid.'
      })
    }

    // 用户存在，登陆成功，通过 Session 记录登陆状态
    req.session.labuser = labuser
    res.status(200).json({
      err_code: 0,
      message: 'OK'
    })
  })
})



/*
*
*
**********************实验室注册接口**********************
*
*/

router.get('/labregister', function (req, res) {
  res.render('labregister.html')
})

router.post('/labregister', function (req, res) {
  // 1. 获取表单提交的数据
  //    req.body
  // 2. 操作数据库
  //    判断改用户是否存在
  //    如果已存在，不允许注册
  //    如果不存在，注册新建用户
  // 3. 发送响应
  var body = req.body
  Labuser.findOne({
    $or: [{
        email: body.email
      },
      {
        nickname: body.nickname
      }
    ]
  }, function (err, data) {
    if (err) {
      return res.status(500).json({
        success: false,
        message: '服务端错误'
      })
    }
    // console.log(data)
    if (data) {
      // 邮箱或者昵称已存在
      labfind_x=1
    }
    if(labfind_x==1){
      // 邮箱或者昵称已存在
      return res.status(200).json({
        err_code: 1,
        message: 'Email or nickname aleady exists.'
      })
      return res.send(`邮箱或者密码已存在，请重试`)
    }else if(labfind_x==0){

    // 对密码进行 md5 重复加密
    body.password = md5(md5(body.password))

    new Labuser(body).save(function (err, labuser) {
      if (err) {
        return res.status(500).json({
          err_code: 500,
          message: 'Internal error.'
        })
      }

      // 注册成功，使用 Session 记录用户的登陆状态
      req.session.labuser = labuser
      // Express 提供了一个响应方法：json
      // 该方法接收一个对象作为参数，它会自动帮你把对象转为字符串再发送给浏览器
      res.status(200).json({
        err_code: 0,
        message: 'OK'
      })

      // 服务端重定向只针对同步请求才有效，异步请求无效
      // res.redirect('/')
    })
  }
  })
})

/*
*
*
**********************实验室用户器件查找接口**********************
*
*/

router.post('/finding', function (req, res) {
 // console.log(req.session.labuser.nickname)
  Stock.find({ $or:[
  {kind: { $regex: req.body.search, $options: 'i' }},
  {model: { $regex: req.body.search, $options: 'i' }}],labnickname:req.session.labuser.nickname},function(err,finding){
    //console.log(finding)
    if (err) {
      return res.status(500).json({
        err_code: 500,
        message: err.message
      })
    }
    else{
      return res.status(200).json({
        err_code: 0,
        message: finding
      })
    }
  })
})

/*
*
*
**********************实验室借用历史查找接口**********************
*
*/

router.post('/borrow_finding', function (req, res) {
  // console.log(req.session.labuser.nickname)
   Borrow.find({ $or:[ 
   {kind: { $regex: req.body.search, $options: 'i' }},
   {model: { $regex: req.body.search, $options: 'i' }},
   {nickname: { $regex: req.body.search, $options: 'i' }}],labnickname:req.session.labuser.nickname},function(err,finding){
     //console.log(finding)
     if (err) {
       return res.status(500).json({
         err_code: 500,
         message: err.message
       })
     }
     else{
       return res.status(200).json({
         err_code: 0,
         message: finding
         
       })

     }
   })
 })

 /*
*
*
**********************我的借用查找接口**********************
*
*/

router.post('/my_borrow_finding', function (req, res) {
  // console.log(req.session.labuser.nickname)
   Record.find({ $or:[ 
   {kind: { $regex: req.body.search, $options: 'i' }},
   {model: { $regex: req.body.search, $options: 'i' }},],nickname:req.session.user.nickname},function(err,finding){
     //console.log(finding)
     if (err) {
       return res.status(500).json({
         err_code: 500,
         message: err.message
       })
     }
     else{
       return res.status(200).json({
         err_code: 0,
         message: finding
       })
     }
   })
 })

 /*
*
*
**********************未归还借用查找接口**********************
*
*/

router.post('/lab_borrow_finding', function (req, res) {
  // console.log(req.session.labuser.nickname)
   Record.find({ $or:[ 
   {kind: { $regex: req.body.search, $options: 'i' }},
   {model: { $regex: req.body.search, $options: 'i' }},],labnickname:req.session.labuser.nickname},function(err,finding){
     //console.log(finding)
     if (err) {
       return res.status(500).json({
         err_code: 500,
         message: err.message
       })
     }
     else{
       return res.status(200).json({
         err_code: 0,
         message: finding
       })
     }
   })
 })
 
/*
*
*
**********************个人用户所属实验室借用历史查找接口**********************
*
*/

router.post('/user_borrow_finding', function (req, res) {
  // console.log(req.session.labuser.nickname)
   Borrow.find({ $or:[ 
   {kind: { $regex: req.body.search, $options: 'i' }},
   {model: { $regex: req.body.search, $options: 'i' }},
   {nickname: { $regex: req.body.search, $options: 'i' }}],labnickname:req.session.user.labnickname},function(err,finding){
     //console.log(finding)
     if (err) {
       return res.status(500).json({
         err_code: 500,
         message: err.message
       })
     }
     else{
       return res.status(200).json({
         err_code: 0,
         message: finding
       })
     }
   })
 })

 /*
*
*
**********************个人用户所属实验室归还列表查找接口**********************
*
*/

router.post('/user_revert_finding', function (req, res) {
  // console.log(req.session.labuser.nickname)
   Return.find({ $or:[ 
   {kind: { $regex: req.body.search, $options: 'i' }},
   {model: { $regex: req.body.search, $options: 'i' }},
   {nickname: { $regex: req.body.search, $options: 'i' }}],labnickname:req.session.user.labnickname},function(err,finding){
     //console.log(finding)
     if (err) {
       return res.status(500).json({
         err_code: 500,
         message: err.message
       })
     }
     else{
       return res.status(200).json({
         err_code: 0,
         message: finding
       })
     }
   })
 })


/*
*
*
**********************实验室用户归还历史查找接口**********************
*
*/

router.post('/revert_finding', function (req, res) {
  // console.log(req.session.labuser.nickname)
   Return.find({ $or:[
   {kind: { $regex: req.body.search, $options: 'i' }},
   {model: { $regex: req.body.search, $options: 'i' }},
   {nickname: { $regex: req.body.search, $options: 'i' }}],labnickname:req.session.labuser.nickname},function(err,finding){
     //console.log(finding)
     if (err) {
       return res.status(500).json({
         err_code: 500,
         message: err.message
       })
     }
     else{
       return res.status(200).json({
         err_code: 0,
         message: finding
       })
     }
   })
 })

/*
*
*
**********************个人用户器件查找接口**********************
*
*/

router.post('/user_finding', function (req, res) {
  // console.log(req.session.labuser.nickname)
   Stock.find({ $or:[ 
   {kind: { $regex: req.body.search, $options: 'i' }},
   {model: { $regex: req.body.search, $options: 'i' }}],labnickname:req.session.user.labnickname},function(err,finding){
     //console.log(finding)
     if (err) {
       return res.status(500).json({
         err_code: 500,
         message: err.message
       })
     }
     else{
       return res.status(200).json({
         err_code: 0,
         message: finding
       })
     }
   })
 })
/*
*
*
**********************器件添加接口**********************
*
*/

router.get('/add', function (req, res) {
  res.render('add.html')
})
router.post('/add', function (req, res) {
  // 1. 获取表单提交的数据
  //    req.body
  // 2. 操作数据库
  //    判断改用户是否存在
  //    如果已存在，不允许注册
  //    如果不存在，注册新建用户
  // 3. 发送响应
  var body = req.body
  if(body.quantity===''){
    body.quantity=99999
  }
  
    new Stock(body).save(function (err, stock) {
      if (err) {
        return res.status(500).json({
          err_code: 500,
          message: 'Internal error.'
        })
      }
      // Express 提供了一个响应方法：json
      // 该方法接收一个对象作为参数，它会自动帮你把对象转为字符串再发送给浏览器
      res.status(200).json({
        err_code: 0,
      })
    })
  })

/*
*
*
**********************当前实验室用户获取接口**********************
*
*/
router.get('/active_uer', function (req, res) {
  if(req.session.labuser.nickname){
  return res.status(200).json({
    message: req.session.labuser.nickname
  })
}
})

/*
*
*
**********************当前用户实验室获取接口**********************
*
*/
router.get('/active_labuer', function (req, res) {
  if(req.session.user.labnickname){
  return res.status(200).json({
    message: req.session.user.labnickname
  })
}
})


/*
*
*
**********************当前用户实验室借用历史列表获取接口**********************
*
*/
router.get('/user_getborrowlist', function (req, res) {
  Borrow.find({labnickname:req.session.user.labnickname,
  nickname:req.session.user.nickname},function(err,ret){
    if (err) {
      return res.status(500).json({
        err_code: 500,
        message: err.message
      })
    }
    else{
      return res.status(200).json({
        err_code: 0,
        message: ret
      })
    }
  })
})


/*
*
*
**********************当前用户实验室归还历史列表获取接口**********************
*
*/
router.get('/user_getrevertlist', function (req, res) {
  Return.find({labnickname:req.session.user.labnickname,
  nickname:req.session.user.nickname},function(err,ret){
    if (err) {
      return res.status(500).json({
        err_code: 500,
        message: err.message
      })
    }
    else{
      return res.status(200).json({
        err_code: 0,
        message: ret
      })
    }
  })
})




/*
*
*
**********************当前用户借用列表获取接口**********************
*
*/
router.get('/user_myborrowlist', function (req, res) {
  Record.find({nickname:req.session.user.nickname},function(err,ret){
    if (err) {
      return res.status(500).json({
        err_code: 500,
        message: err.message
      })
    }
    else{
      return res.status(200).json({
        err_code: 0,
        message: ret
      })
    }
  })
})

/*
*
*
**********************借用未归还列表获取接口**********************
*
*/
router.get('/myborrowlist', function (req, res) {
  Record.find({labnickname:req.session.labuser.nickname},function(err,ret){
    if (err) {
      return res.status(500).json({
        err_code: 500,
        message: err.message
      })
    }
    else{
      return res.status(200).json({
        err_code: 0,
        message: ret
      })
    }
  })
})


/*
*
*
**********************当前实验室借用历史列表获取接口**********************
*
*/
router.get('/getborrowlist', function (req, res) {
  Borrow.find({labnickname:req.session.labuser.nickname},function(err,ret){
    if (err) {
      return res.status(500).json({
        err_code: 500,
        message: err.message
      })
    }
    else{
      return res.status(200).json({
        err_code: 0,
        message: ret
      })
    }
  })
})

/*
*
*
**********************当前实验室归还历史列表获取接口**********************
*
*/
router.get('/getrevertlist', function (req, res) {
  Return.find({labnickname:req.session.labuser.nickname},function(err,ret){
    if (err) {
      return res.status(500).json({
        err_code: 500,
        message: err.message
      })
    }
    else{
      return res.status(200).json({
        err_code: 0,
        message: ret
      })
    }
  })
})



/*
*
*
**********************当前实验室用户元件库获取接口**********************
*
*/
router.get('/getpartlist', function (req, res) {
  Stock.find({labnickname:req.session.labuser.nickname},function(err,ret){
    if (err) {
      return res.status(500).json({
        err_code: 500,
        message: err.message
      })
    }
    else{
      return res.status(200).json({
        err_code: 0,
        message: ret
      })
    }
  })
})

/*
*
*
**********************当前用户实验室元件库获取接口**********************
*
*/
router.get('/user_getpartlist', function (req, res) {
  Stock.find({labnickname:req.session.user.labnickname},function(err,ret){
    if (err) {
      return res.status(500).json({
        err_code: 500,
        message: err.message
      })
    }
    else{
      return res.status(200).json({
        err_code: 0,
        message: ret
      })
    }
  })
})



  





/*
*
*
**********************删除元件库获取接口**********************
*
*/
router.post('/delete', function (req, res){
  Stock.remove({_id:req.body.id},function(err,stock){
    if (err) {
      return res.status(500).json({
        err_code: 500,
        message: 'Internal error.'
      })
    }
    // Express 提供了一个响应方法：json
    // 该方法接收一个对象作为参数，它会自动帮你把对象转为字符串再发送给浏览器
    res.status(200).json({
      err_code: 0,
    })
  })
})

/*
*
*
**********************归还元件接口**********************
*
*/
router.post('/revert', function (req, res){
  Stock.findOne({_id:req.body.id},function(err,stock){
    var msg = {
      labnickname:req.session.user.labnickname,
        nickname:req.session.user.nickname,
        id:req.body.id,
        kind:req.body.kind,
        model:req.body.model
       }
       if (err) {
        return res.status(500).json({
          err_code: 500,
          message: 'Internal error.'
        })
      }else{
        if(stock.quantity<99999){
          Stock.findOneAndUpdate({_id:req.body.id},{quantity:stock.quantity+1},function(err,newstock){
            if (err) {
              return res.status(500).json({
                err_code: 500,
                message: 'Internal error.'
              })
            }else{
              Record.findOneAndRemove({id:req.body.id},function(err,newrecord){
                if (err) {
                  return res.status(500).json({
                    err_code: 500,
                    message: 'Internal error.'
                  })
                }
              })
              new Return(msg).save(function (err, stock) {
                if (err) {
                  return res.status(500).json({
                    err_code: 500,
                    message: 'Internal error.'
                  })
                }
              }) 
              res.status(200).json({
                err_code: 2,
              })
            }
          })
        }else{
          Record.findOneAndRemove({id:req.body.id},function(err,newrecord){
            if (err) {
              return res.status(500).json({
                err_code: 500,
                message: 'Internal error.'
              })
            }
          })
          new Return(msg).save(function (err, stock) {
            if (err) {
              return res.status(500).json({
                err_code: 500,
                message: 'Internal error.'
              })
            }
          }) 
          res.status(200).json({
            err_code: 0,
          })
        }
      }

  })
})

/*
*
*
**********************借用元件接口**********************
*
*/


router.post('/borrow', function (req, res){
  Stock.findOne({_id:req.body.id},function(err,stock){   
   var msg = {
     labnickname:req.session.user.labnickname,
       nickname:req.session.user.nickname,
       id:req.body.id,
       kind:req.body.kind,
       model:req.body.model
      }
      
    if (err) {
      return res.status(500).json({
        err_code: 500,
        message: 'Internal error.'
      })
    }else{
      if(stock.quantity===0){
        res.status(200).json({
          err_code: 1,
        })
      }else if(stock.quantity>0 && stock.quantity<99999){
       
        Stock.findOneAndUpdate({_id:req.body.id},{quantity:stock.quantity-1},function(err,newstock){
          if (err) {
            return res.status(500).json({
              err_code: 500,
              message: 'Internal error.'
            })
          }else{
            new Record(msg).save(function (err, stock) {
              if (err) {
                return res.status(500).json({
                  err_code: 500,
                  message: 'Internal error.'
                })
              }
            })
            new Borrow(msg).save(function (err, stock) {
              if (err) {
                return res.status(500).json({
                  err_code: 500,
                  message: 'Internal error.'
                })
              }
            })
            res.status(200).json({
              err_code: 0,
            })
          }
        })
      }
      else if(stock.quantity===99999){
        new Borrow(msg).save(function (err, stock) {})
        new Record(msg).save(function (err, stock) {
          if (err) {
            return res.status(500).json({
              err_code: 500,
              message: 'Internal error.'
            })
          }else{
            res.status(200).json({
              err_code: 2,
            })
          }
        })
      }
    }
  
  })
})




/************************************************************* */  

module.exports = router
