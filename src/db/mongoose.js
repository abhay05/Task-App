const mongoose=require('mongoose')
const validator=require('validator')

mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser:true,
    useCreateIndex:true
})



// const me=new User({
//     name:'Andrew',
//     email:'MYMAIL@MEAD.IO',
//     password:'phone098!'
// })

// me.save().then((result)=>{
// console.log(result)
// }).catch((error)=>{
// console.log(error)
// })

// const task=new Task({
//     description:'Eat lunch'
// })

// task.save().then(()=>{
// console.log(task)
// }).catch((error)=>{
//     console.log(error)
// })