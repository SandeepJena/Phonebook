var mongoose = require('mongoose');

let schema=new mongoose.Schema({
    firstName:String,
    lastName:String,
    phoneNo:String,
    email:String
})

module.exports = mongoose.model('phonebooks', schema);