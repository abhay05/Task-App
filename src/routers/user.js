const express=require('express')
const User=require('../models/users')
const auth=require('../middleware/auth')
const router = new express.Router()
const multer=require('multer')
const sharp=require('sharp')
const {sendWelcomeEmail,sendCancellationEmail}=require('../emails/account')

router.post('/users',async (req,res)=>{
    //res.send('testing')
    //console.log(req.body)
    // user.save().then(()=>{
    //     res.send(user)
    // }).catch((error)=>{
    //     res.status(400).send(error)
    // })
    const user = new User(req.body)
    try{
    await user.save()
    sendWelcomeEmail(user.email,user.name)
    const token=await user.generateAuthToken()
    res.status(201).send({user,token}) // res.send uses JSON.stringify to that's why toJSON is called
    
    }catch(e){
        res.status(400).send(e)
    }
    
    })
    
router.post('/users/login',async (req,res)=>{
    try{
        const user=await User.findByCredentials(req.body.email,req.body.password)
        const token=await user.generateAuthToken()
        //console.log(user,token)
        res.send({user,token})  // res.send uses JSON.stringify to that's why toJSON is called but then you would need to call it in every function
    }catch(e){
        res.status(400).send(e)
    }

})

router.post('/users/logout',auth,async (req,res)=>{
    try{
        req.user.tokens=req.user.tokens.filter((tol)=>{
            return tol.token!==req.token
        })
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send(e)
    }
})

router.post('/users/logoutAll',auth,async (req,res)=>{
    try{
        req.user.tokens=[]
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send(e)
    }
})

router.get('/users/me',auth,async (req,res)=>{

    res.send(req.user)
//     try{
//     const user=await User.find({})
//     res.send(user)
// }
//     catch(e){
//         res.status(500).send(e)
//     }
    // User.find({}).then((user)=>{
    //     if(!user){
    //         return res.status(404).send()
    //     }
    //     res.send(user)
    // }).catch((e)=>{
    //     res.status(500).send(e)
    // })

})

router.get('/users/me',auth,async (req,res)=>{
    const id=req.params.id
    //console.log(req.params)
    //res.send(req)
   // console.log(typeof id)
    // User.findById(id).then((user)=>{
    //     if(!user){return res.status(404).send() // because server can even send empty value when there is no matching id it considers that valid
    //     }
    //     res.status(200).send(user)
    // }).catch((e)=>{
    //     res.status(500).send(e)
    // })

    try{
      //  const user = await User.findById(id)
     //   if(!user){return res.status(404).send()}
        res.status(200).send(req.user)
    }catch(e){
        res.status(500).send(e)
    }
})

router.patch('/users/me',auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
       // const user=await User.findById(req.params.id)
        updates.forEach((update)=>req.user[update]=req.body[update])
        await req.user.save()
        //const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        

        // if (!user) {
        //     return res.status(404).send()
        // }

        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/me',auth, async (req, res) => {
    try {
        //const user = await User.findByIdAndDelete(req.params.id)
        await req.user.remove()
        sendCancellationEmail(req.user.email,req.user.name)
        // if (!user) {
        //     return res.status(404).send()
        // }

        res.send(req.user) // Why ???
    } catch (e) {
        res.status(500).send()
    }
})

const upload = multer({
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload an image'))
        }
        cb(undefined,true)
    }
})

router.post('/users/me/avatar',auth,upload.single('avatar'),async (req,res)=>{
    // buffer can be used only when destination is not mentioned in the upload multer dictionary
    const buffer = await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
    req.user.avatar=buffer
    await req.user.save()
    res.send()
},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
})

router.delete('/users/me/avatar',auth,async (req,res)=>{
    req.user.avatar=undefined
    await req.user.save()
    res.send()
})

router.get('/users/:id/avatar',async (req,res)=>{
    try{
        const user=await User.findById(req.params.id)
        if(!user || !user.avatar){
            throw new Error()
        }

        res.set('Content-type','image/png')
        res.send(user.avatar)
    }catch(e){
        res.status(404).send()
    }
})

module.exports=router