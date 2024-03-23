const {JWT_SECRET} = require('./config')
const jwt = require('jsonwebtoken')
const authMiddleware=(req, res, next)=>{
    // console.log("reached till authMid")
    // console.log(JWT_SECRET)
    const authHeader = req.headers.authorization
    // console.log(authHeader)
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        // console.log(req.headers)
        return res.sendStatus(403);
    }
    const token = authHeader.split(' ')[1]
    try{
        //  console.log(token)
        const decoded = jwt.verify(token, JWT_SECRET)
        req.userId= decoded.userId
        next()
    }
    catch(err){
       return res.status(403).json({msg :"abre"})
    }
}

module.exports={authMiddleware}