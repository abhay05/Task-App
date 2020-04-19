// const mongodb=require('mongodb')
// const mongodbClient=mongodb.MongoClient

// const {mongdbClient,ObjectID}=require() wrong statement bcz mongodbClent need to be MongoClient

const {MongoClient,ObjectID}=require('mongodb')

const connectionUrl='mongodb://127.0.0.1:27017'
const databaseName='task-manager'

MongoClient.connect(connectionUrl,{useNewUrlParser:true},(error,client)=>{
    if(error){
        return console.log('Unable to connect to database')
    }
    //console.log("Hello")
    //console.log("Connected Correctly")
     const db=client.db(databaseName)
    // db.collection('users').insertOne({
    //     name:'Abhay',
    //     age:21
    // })
    // "5e8d60a0eaa37b316c56cf5a" is not a string use ObjectID to convert it into a key
    // db.collection('users').findOne({_id: new ObjectID("5e8d60a0eaa37b316c56cf5a")},(error,result)=>{
    //     if(error){
    //         return console.log(error)
    //     }
    //     console.log(result)
    // })

    // db.collection('users').insertMany([
    //     {name:'Jen',age:24},
    //     {name:'Gunther',age:28}
    // ],(error,result)=>{
    //     if(error){return console.log(error)}
    //     console.log(result.ops)
    // })

    // db.collection('tasks').insertMany([
    //     {description:'Clean The House',
    // completed:true},{
    //     description:'Renew inspection',
    //     completed:false
    // },{
    //     description:'Pot Plants',
    //     completed:false
    // }
    // ],(error,result)=>{
    //     if(error){return console.log(error)}
    //     console.log(result.ops)
    // })
    // find return pointer to a array
    // db.collection('users').find({age:21}).toArray((error,result)=>{
    //     console.log(result)
    // })

    // db.collection('tasks').findOne({_id:new ObjectID("5e8e8caa17d64504a0d9a2b9")},(error,task)=>{
    //     if(error){
    //        return console.log(error)
    //     }
    //     console.log(task)
    // })

    // db.collection('tasks').find({completed:false}).toArray((error,tasks)=>{
    //     console.log(tasks)
    // })

    // db.collection('users').updateOne({
    //     _id:new ObjectID("5e8e888b90d0910f603a9f37")
    // },{
    //     $inc:{
    //         age:1
    //     }
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })

    // db.collection('tasks').updateMany({
    //     completed:false
    // },{$set:{completed:true}}).then(
    //     (result)=>{
    //         console.log(result)
    //     }
    // ).catch((error)=>{
    //     console.log(error)
    // })

    db.collection('users').deleteMany({
        age:25
    }).then((result)=>{
        console.log(result)
    }).catch((error)=>{
        console.log(error)
    })


})
