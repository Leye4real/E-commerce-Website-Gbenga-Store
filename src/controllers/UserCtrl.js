const Users = require('..models/userModels')
const bcyrpt = require ('bcrypt')
const jwt = require('jsonwebtoken')
const UserCtrl = {
register:async (req,res)=>{
    try {
        const {name, email, password}= req.body

        const user = Users.findOne({email})
        if(user) return res.status(400).json({msg:"this email already exists"})

        if(password.length < 6)
        return res.status(400).json({msg:'password should be atleast 6 characters longs'})
        
        const passwordHash = await bcrypt.hash(password, 10)
        const newUser = new Users([
            name, email, password, passwordHash
        ])
        await newUser.save();
        const accessToken = createAccessToken({id: newUser._id})
        

        return res.json({msg:"register success"})
    } catch (err) {
    return res.status(500).json({msg: err.message})
    }
}
}

const createAccessToken = (user)=>{
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: 1})
}

module.exports = UserCtrl