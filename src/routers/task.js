const express=require('express')
const Task=require('../models/task')
const router=new express.Router()
const auth=require('../middleware/auth')

router.post('/tasks',auth,async (req,res)=>{
    //const task=new Task(req.body)
    // task.save().then(()=>{
    //     res.send(task)
    // }).catch((error)=>{
    //     res.status(500).send(error)
    // })
    const task=new Task({...req.body,owner:req.user._id})
    try{
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(500).send(e)
    }
})

// GET /tasks?completed=true
// GET /tasks?limit=10&skip=20
// GET /tasks?sortBy=createdAt:desc
router.get('/tasks',auth,async (req,res)=>{
    // Task.find({}).then((task)=>{
    //     if(!task){
    //         return res.status(404).send()
    //     }
    //     res.send(task)
    // }).catch((e)=>{
    //     res.status(500).send(e)
    // })

    const match={} //if no value for completed is empty this will provide a empty list for the options
    const sort={} //if no value for completed is empty this will provide a empty list for the options

    if(req.query.completed){
        match.completed=req.query.completed === 'true'
    }
    if(req.query.sortBy){
        const part=req.query.sortBy.split(':')
       // console.log("Hello ",part)
        sort[part[0]] = part[1]==='desc'?-1:1
    }

    try{
        //const task= await Task.find({owner:req.user._id})
        await req.user.populate({
            path:'tasks',
            match,
            options:{
                limit:parseInt(req.query.limit),
                skip:parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        //if(!task){return res.status(404).send()}
        res.send(req.user.tasks)
    }catch(e){
        res.status(500).send(e)
    }


})

router.get('/tasks/:id',auth,async (req,res)=>{
    const id = req.params.id
    // Task.findById(id).then((task)=>{
    //     if(!task){
    //         return res.status(404).send()
    //     }
    //     res.send(task)
    // }).catch((e)=>{
    //     res.status(500).send(e)
    // })

    try{
        const task=await Task.findOne({_id:id,owner:req.user._id})
        if(!task){res.status(404).send()}
        res.send(task)
    }catch(e){res.status(500).error(e)}
})



router.patch('/tasks/:id',auth,async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const task=await Task.findOne({_id:req.params.id,owner:req.user._id})

        if (!task) {
            return res.status(404).send()
        }


        updates.forEach((update)=>task[update]=req.body[update])
        await task.save()
        //const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true})

       
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id',auth,async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({_id:req.params.id,owner:req.user._id})

        if (!task) {
            res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports=router