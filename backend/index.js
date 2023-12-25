import express from 'express'
import cors from 'cors'
import bcrypt from 'bcrypt'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import mysqlConnection from './connection.js'

const app = express()

app.use(bodyParser.json())
app.use(cors({
    origin:'http://localhost:5173',
    methods:['POST','GET'],
    credentials:true
}))
app.use(cookieParser())

app.post('/users',async(req,res)=>{
    let data = req.body
    let salt =await bcrypt.genSalt(10)
    let hashPass = await bcrypt.hash(req.body.pass,salt)
    let userData = [data.name,data.email,hashPass]
    mysqlConnection.query('INSERT INTO users(name,email,pass) VALUE(?)',[userData],(err,row)=>{
        if(err){
            console.log(err)
        }else{
            console.log(row)
            res.status(200).json(row)
        }
    })
})

app.delete('/users/:id',(req,res)=>{
    mysqlConnection.query('DELETE FROM users WHERE id=?',[req.params.id],(err,row)=>{
        if(err){
            console.log(err)
        }else{
            console.log(row)
            res.status(200).json(row)
        }
    })
})

app.post('/login',async(req,res)=>{
    mysqlConnection.query('SELECT * FROM users WHERE email=?',[req.body.email],async(err,row)=>{
       try {
        if(row.length==0)throw new Error('user not exist')
        const matched = bcrypt.compareSync(req.body.pass,row[0].pass)
        if(!matched)throw new Error("password didn't match")
        let token = jwt.sign({user:row[0]},"secret-key")
        res.cookie('token',token,{
            expiresIn:'1d',
            httpOnly:true
        })
        res.json({
            message:'success',
            token:token,
            status:200
        })

       } catch (error) {
        console.log(error.message)
        res.json({
            message:error.message,
            status:404
        })
       }

    })
})

const verifyToken=(req,res,next)=>{
    const token = req.cookies.token
    if(!token){
        return res.json({message:'user is not autheticated',status:401})
    }else{
        console.log(token)
        let user = jwt.verify(token,'secret-key')
        req.user = user
        req.token = token
        next()
    }
}

app.get('/',verifyToken,(req,res)=>{
            let user = req.user
             res.status(200).json({
                message:'success',
                token:req.token,
                user:user.user,
            })
})

app.listen(3000,()=>{
    console.log('server is running....')
    // res.send('connected')
})
