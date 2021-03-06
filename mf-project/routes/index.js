var express = require('express');
var router = express.Router();
var UserModel = require("../model/UserModel");
var GoodModel = require("../model/GoodModel"); 
var multiparty = require('multiparty');//传文件解密的模块


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

//商品列表页删除 get
router.get('/goods_list/del',function(req,res){
		var list_id = req.query.list_id;
		GoodModel.findByIdAndRemove(list_id,function (err) {
	  	var result = {
				status:1,
				message:"删除成功"
			};
			if(!err){
				console.log("删除成功");
				res.send(result)
			}else{
				console.log("删除失败");
				result.status = -100;
				result.message = "删除失败";
				res.send(result);
			}
 	  });
})

//商品列表 post ajax接收、
router.post('/api/goods_list',function(req,res){
	var search = req.body.search;
	GoodModel.find({$or:[{goods_name:{$regex:search}},{goods_number:{$regex:search}}]},function(err,docs){
//	GoodModel.find({goods_name:search},function(err,docs){
//			res.send(docs);
//		console.log(docs);
//		res.render('goods_list',{list : docs});
		res.send(docs);
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
//				res.send("商品保存成功");
//					res.render('goods_list',{});
					res.render('skip');
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
	
	UserModel.find({username:username,psw:psw},function(err,docs){
		var result = {
			status:1,
			message:"登录成功"
		}
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
