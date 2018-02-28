var express = require('express');
var router = express.Router();
var UserModel = require("../model/UserModel");
var GoodModel = require("../model/GoodModel"); 
var multiparty = require('multiparty');


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
//商品列表  get
router.get('/goods_list',function(req,res){
	GoodModel.find({},function(err,docs){
		res.render('goods_list',{list : docs});
	})
})





//商品添加详细信息页面action提交 post
router.post('/api/goods_adds',function(req,res){
	var Form = new multiparty.Form({
		uploadDir: "./public/imgs/add_imgs"
	});
	Form.parse(req, function(err, body, files) {
		var goods_name = body.goods_name[0];
		var goods_number = body.goods_name[0];
		var price = body.price[0] == "" ? 0 : body.price[0];
		var count = body.count[0] == "" ? 0 : body.count[0];
		var imgName = files.img[0].path;
		imgName = imgName.substr(imgName.lastIndexOf("\\") + 1);
		
		console.log(goods_name,goods_number,price,count,imgName);
		
		var gm = new GoodModel();
		gm.goods_name = goods_name;
		gm.goods_number = goods_number;
		gm.price = price;
		gm.count = count;
		gm.img = imgName;
		gm.save(function(err){
			if(!err){
				res.send("商品保存成功");
			}else{
				res.send("商品保存失败");
			}
		});
	});
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
