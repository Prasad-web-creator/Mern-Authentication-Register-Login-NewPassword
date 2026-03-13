
const jwt = require('jsonwebtoken')
const UserModel = require('../Models/UserModel')
const bcrypt = require('bcryptjs')

exports.register = async(req,res)=>{
    try{
        const {username,email,password} = req.body

        if(!username || !email || !password ){
            return res.status(401).json({message:"All fields are required"})
        }

        const user = await UserModel.findOne({email})

        if(user){
            return res.status(401).json({message:"Email already exists"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt)

        await UserModel.create({
            username,
            email,
            password:hashPassword
        })

        return res.status(201).json({message:"User Registeration Successful"})

    }catch(err){
        return res.status(500).json({message:"Server Connection Failed"})
    }
}


exports.login = async(req,res)=>{
    try{
        const {email,password} = req.body

        if(!email || !password){
            return res.status(401).json({message:"All fields are required"})
        }

        const user = await UserModel.findOne({email})

        if(!user){
            return res.status(401).json({message:"User not Found"})
        }

        const matchPassword = await bcrypt.compare(password,user.password)

        if(!matchPassword){
            return res.status(401).json({message:"Invalid Password"})
        }

        const token = jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        )

        return res.status(201).json({
            token,
            user:{
                username : user.username,
                email : user.email
            },
            message:"Login Successful"
        })

    }catch(err){
        return res.status(500).json({message:"Server Connection Failed"})
    }
}


exports.newPassword = async(req,res)=>{
    try{
        const {email,password} = req.body

        if(!email || !password){
            return res.status(401).json({message:"All fields are required"})
        }

        const user = await UserModel.findOne({email})

        if(!user){
            return res.status(401).json({message:"User not Exists"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt)

        await UserModel.findOneAndUpdate({email},{password:hashPassword})
        
        return res.status(201).json({message:"Password Changed Successfully"})
    }catch(err){
        return res.status(500).json({message:"Server Connection Failed"})
    }
}
