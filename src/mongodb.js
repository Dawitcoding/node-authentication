const mongoose = require('mongoose')

// connect to the db
mongoose.connect("mongodb+srv://dave:12341234@nodejsdatabase.g1uztzp.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
   //lisining app
  
    console.log('conected to to db succesfully')

})
.catch((err)=>{
  console.log("failed to connect to db")
})

const LogInSchema = new mongoose.Schema({
     name:{
        type:String,
        required:true
     },
     email:{
      type:String,
      required:true
   },
     password:{
        type:String,
        required:true
     }
})

const collection = new mongoose.model("auth",LogInSchema);
module.exports = collection;