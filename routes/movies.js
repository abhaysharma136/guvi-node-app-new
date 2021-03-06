import express from 'express';
import { getAllMovies, GetMovieById, CreateMovies, deleteMovieById, updateMovieById } from './helper.js';
const router=express.Router();


router.get('/', async function (request, response) {
  
    if(request.query.rating){
      request.query.rating=+request.query.rating;
    }
    console.log(request.query);
    
      //db.movies.find({})
      const movies= await getAllMovies(request);
        // console.log(movies)
        response.send(movies)
      })
    
      //GEt Movie By ID
      router.get('/:id',async function (request, response) {
        const {id}=request.params;
        console.log(request.params,id)
        // const movie=movies.find((mv)=>mv.id===id);
        //db.movies.findone({id:101})
    
        const movie= await GetMovieById(id)
        console.log(movie)
        movie?response.send(movie):response.status(404).send({"msg":"Movie not found"})
      })
    
    
    //Create Movies
      router.post('/',async function (request, response) {
        const data=request.body;
        console.log(data);
        //db.movies.insertMany(data)
        const result=await CreateMovies(data);
        response.send(result)
      })
    //Delete Movie By ID
    router.delete('/:id',async function (request, response) {
        const {id}=request.params;
        console.log(request.params,id)
        // const movie=movies.find((mv)=>mv.id===id);
        //db.movies.deleteone({id:101})
    
        const result= await deleteMovieById(id)
        console.log(result)
        result.deletedCount>0
        ?response.send({"msg":"Movie was succesfully Deleted"})
        :response.status(404)
        .send({"msg":"Movie not found"})
      })
    
      //Update Movie By ID
      router.put('/:id',async function (request, response) {
        const {id}=request.params;
        console.log(request.params,id)
        const data=request.body;
        // const movie=movies.find((mv)=>mv.id===id);
        //db.movies.updateOne({id:101},{$set:data})
    
        const result= await updateMovieById(id, data)
        console.log(result)
        response.send(result)
      })

      export const moviesRouter=router;


