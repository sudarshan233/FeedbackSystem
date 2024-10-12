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
    res.send(`
        <html>
        <head>
            <link rel="shortcut icon" type="x-icon" href="./logo.png">
            <title>FastForms</title>
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap" rel="stylesheet">

            <style>
                h1,h2
                {
                    color: whitesmoke;
                    text-align: center;
                    font-family: "Ubuntu", sans-serif;
                }
                div
                {
                    display: flex;
                    justify-content: center;
                }
                a
                {
                    color: white;
                    font-family: "Ubuntu", sans-serif;
                }
                body
                {
                    background-image: url(./Background.png);
                    background-size: cover;
                    background-repeat: no-repeat;
                    background-attachment: fixed;
            </style>
        </head>
        <body>
            <h1>Feedback has been successfully submitted</h1>
            <h2>Thank you!!</h2>
            <div>
                <a href="/">Go Back to Form</a>
            </div>
        </body>
        </html>`)
})

app.listen(port,()=>
{
    console.log("Server has started. Click https://localhost:3020")
    
})
