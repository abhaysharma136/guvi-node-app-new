import express from 'express';
import bcrypt from "bcrypt";
import  Jwt  from 'jsonwebtoken';
import { CreateUsers, getUserByName } from './helper.js';

const router=express.Router();
    async function genhashedPassword(password){
      const NO_OF_ROUNDS=10;
      const Salt=await bcrypt.genSalt(NO_OF_ROUNDS);
      const hashedPassword=await bcrypt.hash(password,Salt);
      console.log(Salt,password);
      return hashedPassword;
    }


    //Create User
      router.post('/signup',async function (request, response) {
        const {username,password}=request.body;

        const userFromDB=await getUserByName(username);
        console.log(userFromDB);
        if(userFromDB){
          response.status(400).send({message:"username allready exists"})
        }else if(password.length<8){
          response.status(400).send({message:"password must be atleast 8 characters"});
        }
        else{
          const hashedPassword=await genhashedPassword(password);
        console.log(hashedPassword);
        //db.users.insertOne(data)
        const result=await CreateUsers({
          username:username,
          password:hashedPassword
        });
        response.send(result)
        }
        
      })


      router.post('/login',async function (request, response) {
        const {username,password}=request.body;

        const userFromDB=await getUserByName(username);
        console.log(userFromDB);
        if(!userFromDB){
          response.status(401).send({message:"Invalid Credentials"})
        }
        else{
        const storedPassword=userFromDB.password;
        const isPasswordMatch=await bcrypt.compare(password,storedPassword);
        console.log(isPasswordMatch);
        
        if(isPasswordMatch){
          const token=Jwt.sign({id:userFromDB._id},process.env.SECRET_KEY);
          response.send({message:"Successful Login",token:token});
        }else{
          response.status(401).send({message:"Invalid Credentials"});
        }
        
        }
        
      })
      export const usersRouter=router;


