var mongoose=require('mongoose');

// Add Categoty
var blogschema=new mongoose.Schema({
    category:{
        type:String,
    },
    created:{
        type:Date,
        default:Date.now()
    }
});

module.exports = mongoose.model("category",blogschema);