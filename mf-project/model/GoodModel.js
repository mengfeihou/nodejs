var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//创建文档对象
var Goods = new Schema({
    goods_name    : String,
    goods_number  : String, 
    price         : String,
    count         : String,
    img           : String,
    create_date : { type: Date, default: Date.now }
});

//创建model对象 与数据库中的文档（表）映射
var GoodModel = mongoose.model('dougoods', Goods);

module.exports = GoodModel;