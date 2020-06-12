const express=require('express')
const path=require('path')
const sendmail=require('nodemailer')



//console.log("Hello ",`{path.join(__dirname,'../config/dev.env')}`)
require('dotenv').config({path:path.join(__dirname,'../config/dev.env')});
//console.log(process.env.PORT)
require('./db/mongoose')
const userRouter=require('./routers/user')
const taskRouter=require('./routers/task')

const app=express()
const port=process.env.PORT

// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('GET requests are disabled')
//     } else {
//         next()
//     }
// })

// app.use((req,res,next)=>{
//     if(req.method==='GET'){
//         res.send('Get requests are disabled')
//     }
//     else{next()}
// })

// const multer=require('multer')
// const upload = multer({
//     dest:'images',
//     limits:{fileSize:1000000},
//     fileFilter(req,file,cb){
//         if(!file.originalname.match(/\.(doc|docx)$/)){
//             return cb(new Error('Please upload a Word document'))
//         }
//        cb(undefined,true)
//        //cb(new Error('Please upload a Word document'))
//     } 
// })

// app.post('/upload',upload.single('upload'),(req,res)=>{
//     //console.log("Success!")
//     res.send()
// },(error,req,res,next)=>{
//     //console.log("Failure")
//     res.status(400).send({error:error.message})
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port,()=>{
    console.log('Running')
})

//const Task=require('./models/task')
//const User=require('./models/users')

//const main=()=>{
    // const task=await Task.findById('')
    // await task.populate('owner').execPopulate()
    // console.log(task.owner)

    // const user=await User.findById('')
    // await user.populate('tasks').execPopulate()
    // console.log(user.tasks)
//}

//main()

// const func = async ()=>{
     
//     const task=await Task.f

// }

// const hello={
//     name:"Abhay",
//     surname:"Chauhan"
// }

// hello.toJSON=function(){ // we have overidden toJSON function
//     return "bhaad main jaa"
// }

// console.log(JSON.stringify(hello))

// const jwt=require('jsonwebtoken')

// const myFunction=async ()=>{
//     const token=jwt.sign({_id:'abc123'},'thisismynewcourse',{expiresIn:'7 days'})
//     console.log(token)
//     const data=jwt.verify(token,'thisismynewcourse')
//     console.log(data)
// }

// myFunction().catch((e)=>{
//     console.log(e)
// })

// const bcrypt=require('bcryptjs')

// const myFunction= async ()=>{
//     const password="hello123*"
//     const hashedPassword=await bcrypt.hash(password,8)
//     console.log(password)
//     console.log(hashedPassword)

//     const isMatch=await bcrypt.compare('hello123*',hashedPassword)
//     console.log("Abhay ",isMatch)
// }
// myFunction().catch((e)=>{
//     console.log(e)
// })

