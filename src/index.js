const express = require("express")

const app = express()
const path = require("path")
const hbs = require("hbs")
const collection= require("./mongodb")
const async = require("hbs/lib/async")
const bcrypt = require("bcrypt")



app.use(express.json())
app.set("view engine","ejs")

app.use(express.urlencoded({extended:false}))

// routes
app.get("/", (req,res)=>{
    res.render("login")
})

app.get("/signup", (req,res)=>{
    res.render("signup")
})
app.get("/logout", (req,res)=>{
    res.render("/")
})
// post request
app.post("/signup", async (req,res) =>{
    // const hashedPassword = await bcrypt.hash(req.body.password,10)
    const data = {
        name: req.body.name,
        email : req.body.email,
        password : req.body.password
    }

    await collection.insertMany([data])

    res.render("login")

})

app.post("/login", async (req,res) =>{
    
     try{
        const check = await collection.findOne({email : req.body.email})
        if(check.password === req.body.password){
            res.render("home")
        }
        else{
            res.send("wrong password")
        }
     }
     catch{
        
        res.send("wrong details")
     }

})


app.listen(3000, ()=>{
    console.log("app running on port 3000.")
})