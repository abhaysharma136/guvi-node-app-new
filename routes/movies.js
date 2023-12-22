import express from "express";
import { auth } from "../middleware/auth.js";
import {
  getAllMovies,
  GetMovieById,
  CreateMovies,
  deleteMovieById,
  updateMovieById,
  CreateMovie,
  CreateActor,
  CreateProducer,
  getAllActors,
  getAllProducers,
} from "./helper.js";
const router = express.Router();

router.get("/", async function (request, response) {
  if (request.query.rating) {
    request.query.rating = +request.query.rating;
  }
  console.log(request.query);

  //db.movies.find({})
  const movies = await getAllMovies(request);
  // console.log(movies)
  response.send(movies);
});
//GET all Actors
router.get("/actors", async function (request, response) {
  //db.movies.find({})
  const actors = await getAllActors(request);
  // console.log(movies)
  response.send(actors);
});
//GET all Actors
router.get("/producers", async function (request, response) {
  //db.movies.find({})
  const actors = await getAllProducers(request);
  // console.log(movies)
  response.send(actors);
});
//GEt Movie By ID
router.get("/:id", async function (request, response) {
  const { id } = request.params;
  console.log(request.params, id);
  // const movie=movies.find((mv)=>mv.id===id);
  //db.movies.findone({id:101})

  const movie = await GetMovieById(id);
  console.log(movie);
  movie
    ? response.send(movie)
    : response.status(404).send({ msg: "Movie not found" });
});

//Create Movies
router.post("/", async function (request, response) {
  const data = request.body;
  console.log(data);
  //db.movies.insertMany(data)
  const result = await CreateMovies(data);
  response.send(result);
});
//Delete Movie By ID
router.delete("/:id", async function (request, response) {
  const { id } = request.params;
  console.log(request.params, id);
  // const movie=movies.find((mv)=>mv.id===id);
  //db.movies.deleteone({id:101})

  const result = await deleteMovieById(id);
  console.log(result);
  result.deletedCount > 0
    ? response.send({ msg: "Movie was succesfully Deleted" })
    : response.status(404).send({ msg: "Movie not found" });
});

//Update Movie By ID
router.put("/:id", async function (request, response) {
  const { id } = request.params;
  console.log(request.params, id);
  const data = request.body;
  // const movie=movies.find((mv)=>mv.id===id);
  //db.movies.updateOne({id:101},{$set:data})

  const result = await updateMovieById(id, data);
  console.log(result);
  response.send(result);
});

//Create Movie
router.post("/add", async function (request, response) {
  const data = request.body;
  console.log(data);
  //db.movies.insertMany(data)
  const result = await CreateMovie(data);
  // const movie=movies.find((mv)=>mv.id===id);

  response.send(result);
});
//Create Actor
router.post("/actor", async function (request, response) {
  const data = request.body;
  console.log(data);
  //db.movies.insertMany(data)
  const result = await CreateActor(data);
  response.send(result);
});
//Create Producer
router.post("/producer", async function (request, response) {
  const data = request.body;
  console.log(data);
  //db.movies.insertMany(data)
  const result = await CreateProducer(data);
  response.send(result);
});
export const moviesRouter = router;
