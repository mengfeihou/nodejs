var express = require('express');
var router = express.Router();
var UserModel = require("../model/UserModel");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});
//商品添加页面get
router.get('/goods_add',function(req,res){
	res.render('goods_add',{});
})
//商品添加详细信息页面 get
router.get('/goods_adds',function(req,res){
	res.render('goods_adds',{});
})


//登录页面post
router.post('/api/login',function(req,res){
	var username = req.body.username;
	var psw = req.body.psw;
	
	var result = {
		status:1,
		message:"登录成功"
	}
	UserModel.find({username:username,psw:psw},function(err,docs){
		if(!err && docs.length>0){
			console.log("登录成功");
			res.send(result)
		}else{
			console.log("登录失败请检查您的用户名及密码");
			result.status = -100;
			result.message = "登录失败请检查您的用户名及密码";
			res.send(result);
		}
	});
})



module.exports = router;
