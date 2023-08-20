const Users = require('..models/userModels')
const bcyrpt = require ('bcrypt')
const jwt = require('jsonwebtoken')
const { use } = require('../routers/userRouter')
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
        return res.json({msg:'register success'})
    // } catch (err) {
    //     return res.status(500).json({msg:'err.message'})
    // }

        const refreshToken = createRefreshToken({id: newUser._id})
        res.cookie('refreshToken', refreshToken,{
            httpOnly:true,
            path:'/user/refresh_token'
        })

        return res.json({accessToken})
    } catch (err) {
    return res.status(500).json({msg: err.message})
    }
},
login: async(req,res)=>{
try {
    const {email, password} = req.body

    const user = await UserCtrl.findOne({email})
    if(!user) return res.status(400).json({msg:'user does not exist'})

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) return res.status(400).json({msg:'incorrect password'})


    const accessToken = createAccessToken({id: newUser._id})
    const refreshToken = createRefreshToken({id: user._id})
        res.cookie('refreshToken', refreshToken,{
            httpOnly:true,
            path:'/user/refresh_token'
        })

        return res.json({accessToken})

} catch (err) {
    return res.status(500).json({msg: err.message})
}
},
logout: async(req,res)=>{
    try {
        res.clearCookies('refreshToken', {path:'/user/refresh_token'})
        return res.json({msg:'Logged Out'})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
refreshToken: async (req,res)=>{

    try {
        const rf_token = req.cookies.refreshToken;
        if(!rf_token) return res.status(400).json({msg: 'Please Login or Register'})

        jwt.verify(rf_token,process.env.REFRESH_TOKEN_SECRET, (err,user)=>{
            if(err) return res.status(400).json({msg:"login or register now"})
            const accessToken = createAccessToken({id:user.id})
            return res.json({accessToken})
        })
        
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
    
},
getUSer: async (req,res) =>{
    try {
        const user = await Users.findById(req.user.id).select('password')
        if(!user) return res.status(400).json({msg:'user doesnot exist'})

        return res.json(user)
    } catch (err) {
        
    }
}

}

const createAccessToken = (user)=> {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
}

const createRefreshToken = (user)=> {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}

module.exports = UserCtrl