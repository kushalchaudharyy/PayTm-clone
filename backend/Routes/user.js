const express = require('express')

const router  = express.Router()
const zod = require('zod')
const {user, Account} = require('../db')
const { JWT_SECRET } = require('../config')
const jwt = require('jsonwebtoken')
const { authMiddleware } = require('../middleware')
const app = express()


const signupSchema = zod.object({
    username : zod.string().email(),
    firstName : zod.string(),
    lastName : zod.string(),
    password : zod.string(),
})

router.post('/signup',async (req, res)=>{
    const {success} = signupSchema.safeParse(req.body)
    if(!success){
        return res.status(412).json({message:"Invalid credentials", Error :signupSchema.safeParse(body)})
    }
    const isExist =await user.findOne({
        username : req.body.username
    })
    if(isExist){
       return res.json({message:"You already have an account"})
    }
    const dbuser = await user.create({
        username : req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
    })
    const userId = dbuser._id
    await Account.create({
        userId,
        balance : 1 + Math.random()*10000
    })
    const token = jwt.sign({userId}, JWT_SECRET)
    res.json({message:"User created successfully", token : token})
})

const signinSchema = zod.object({
    username : zod.string().email(),
    password : zod.string()
})

router.post('/signin', async(req, res)=>{
    const body = req.body
    const {success} = signinSchema.safeParse(body)
    if(!success){
        res.status(411).json({message:"Invalid input"})
    }
    const signin = await user.findOne({
        username : body.username,
        password : body.password
    })
    console.log(signin)
    if(signin   ){
        const token = jwt.sign({userId:signin._id}, JWT_SECRET)
        console.log(token)
    res.json({token: token})
    }
    else 
    res.status(411).json({message: "Error while logging in"})
})

const updateBody = zod.object({
    firstName : zod.string().optional(),
    lastName : zod.string().optional(),
    password : zod.string().optional()
})
router.put('/',authMiddleware, async(req, res)=>{
    const body = req.body
    const {success} = updateBody.safeParse(body)
    if(!success){
        res.status(411).json({message:"Error while updating information"})
    }
    await user.updateOne(req.body, {_id:req.id})
    res.json({msg:'updated successfully'})

    })

    router.get('/bulk', async(req, res)=>{
    const name = req.query.filter || ""
    const names = await user.find({
        $or: [{
            firstName:{
                '$regex' : name
            }
        },{
            lastName :{
                '$regex' : name
             }
            }
        ]
    })
    res.json({
        user : names.map(user =>({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})
module.exports= router