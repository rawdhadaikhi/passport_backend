const mongoose =require ('mongoose');
const userSchema = mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type :String,
        required:true,
    },
    email :String,
    phoneNumber :String,
    password : String,
    address :String,
    city:String,
    profession:String
})
module.exports =User = mongoose.model('user',userSchema);