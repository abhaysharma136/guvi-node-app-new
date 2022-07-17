// const express = require('express');//inporting 3rd party 
// const { MongoClient } = require('mongodb');

import express from 'express';//inporting 3rd party 
import { MongoClient } from 'mongodb';
import dotenv from "dotenv";

dotenv.config();

const app = express()

app.use(express.json())
const PORT=4000;

    const Mongo_URL=process.env.Mongo_URL;

    async function createConnection(){
      const client=new MongoClient(Mongo_URL);
      await client.connect(); 
      console.log("Mongo is Conencted😊✌️")
      return client;
    }
    const client= await createConnection();

app.get('/', function (request, response) {
  response.send('App Started🌍🎊🎊🎊🎃')
})

app.get('/movies', async function (request, response) {
  //db.movies.find({})
  const movies= await client.db("guvi-new-db").collection("movies").find({}).toArray();
    console.log(movies)
    response.send(movies)
  })

  app.get('/movies/:id',async function (request, response) {
    const {id}=request.params;
    console.log(request.params,id)
    // const movie=movies.find((mv)=>mv.id===id);
    //db.movies.findone({id:101})

    const movie= await client.db("guvi-new-db").collection("movies").findOne({id:id})
    console.log(movie)
    movie?response.send(movie):response.status(404).send({"msg":"Movie not found"})
  })

  app.post('/movies',async function (request, response) {
    const data=request.body;
    console.log(data);
    //db.movies.insertMany(data)
    const result=await client.db('guvi-new-db').collection('movies').insertMany(data);
    response.send(result)
  })


app.listen(PORT,()=>console.log(`Node App Started in ${PORT}` ))