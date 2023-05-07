const mongoose = require("mongoose");
// const { string } = require("yup");
const {Schema}=mongoose;
//creation of schema
const addressSchema = new Schema({
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    pincode: {
      type: Number,
      required: true
    }
  });
const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    age:{
        type:Number, 
        required:true
    },
    sex:{
        type:String,
        required:true
    },
    mobileNumber:{
        type:String
    },
    idType:{ 
        type:String,
    },
    govtId:{
        type:String
    },
    guardianName:{
        type:String
    },
    guardianDetails:{
        type:String
    },
    emergencyContactNumber:{
        type:String
    },
    address:{
        type:addressSchema,
        required:true
    },
    occupation:{
        type:String
    },
    religion:{
        type:String
    },
    maritalStatus:{
        type:String
    },
    bloodGroup:{ 
        type:String
    },
    nationality:{
        type:String
    }
})
module.exports = mongoose.model('user',userSchema)