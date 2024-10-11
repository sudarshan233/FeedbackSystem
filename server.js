const express=require('express')
const mongoose=require('mongoose')
const path=require('path')

const port=3020

const app=express()

app.use(express.static(__dirname))
app.use(express.urlencoded({extended:true}))

mongoose.connect('mongodb://127.0.0.1:27017/basic')
const db=mongoose.connection
db.once('open',()=>{
    console.log("MongoDB connection successful")
})


const feedbackSchema=new mongoose.Schema({
    name: String, 
    contactNumber: String, 
    email: String,  
    feedback: String,
    suggestion: String 
})

const FeedbackForm=mongoose.model("data",feedbackSchema)

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'))
})

app.post('/submit-feedback', async(req,res)=>{
    const {name, contactNumber, email, feedback, suggestion}=req.body
    const feedbackDetails=new FeedbackForm({
        name, 
        contactNumber, 
        email, 
        feedback, 
        suggestion
    })
    await feedbackDetails.save()
    console.log(feedbackDetails)
    res.send("Form submission successful")
})

app.listen(port,()=>
{
    console.log("Server is started")
})
