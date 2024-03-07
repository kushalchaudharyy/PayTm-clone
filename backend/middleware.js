const {JWT_SECRET} = require('./config.js')
const jwt = require('jsonwebtoken')
const authMiddleware=(req, res, next)=>{
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.sendStatus(403);
    }
    const token = authHeader.split(' ')[1]
    try{
        // console.log(token)
        const decoded = jwt.verify(token, JWT_SECRET)
        req.userId= decoded.userId
        next()
    }
    catch(err){
       return res.status(403).json({msg :"abre"})
    }
}

module.exports={authMiddleware}