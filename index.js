// const express = require('express');//inporting 3rd party 
// const { MongoClient } = require('mongodb');

import express from 'express';//inporting 3rd party 
import { MongoClient } from 'mongodb';
import dotenv from "dotenv";
import { moviesRouter } from './routes/movies.js';
import cors from 'cors';
import { usersRouter } from './routes/users.js';

dotenv.config();


const app = express()
const PORT=process.env.PORT;
app.use(cors());
app.use(express.json())


    const Mongo_URL=process.env.Mongo_URL;

    async function createConnection(){
      const client=new MongoClient(Mongo_URL);
      await client.connect(); 
      console.log("Mongo is Conencted😊✌️")
      return client;
    }
   export const client = await createConnection();

app.get('/', function (request, response) {
  response.send('App Started🌍🎊🎊🎊🎃')
});

app.use("/movies",moviesRouter);
app.use("/users",usersRouter);

app.listen(PORT,()=>console.log(`Node App Started in ${PORT}` ))

