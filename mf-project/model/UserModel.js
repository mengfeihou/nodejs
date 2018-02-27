var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//创建文档对象
var User = new Schema({
    username    : String,
    psw         : String
});

//创建model对象 与数据库中的文档（表）映射
var UserModel = mongoose.model('douadmin', User,'douadmins');

module.exports = UserModel;