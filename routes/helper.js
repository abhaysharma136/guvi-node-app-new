import { client } from "../index.js";
import { ObjectId } from "mongodb";

export async function updateMovieById(id, data) {
  return await client
    .db("guvi-new-db")
    .collection("movies")
    .updateOne({ _id: ObjectId(id) }, { $set: data });
}
export async function deleteMovieById(id) {
  return await client
    .db("guvi-new-db")
    .collection("movies")
    .deleteOne({ _id: ObjectId(id) });
}
export async function CreateMovies(data) {
  return await client.db("guvi-new-db").collection("movies").insertMany(data);
}

export async function CreateUsers(data) {
  return await client.db("guvi-new-db").collection("users").insertOne(data);
}

//Internship Task Creeating Users
export async function CreateUsers2(data) {
  return await client
    .db("guvi-new-db")
    .collection("usersInternshipTask")
    .insertOne(data);
}

export async function CreateMovie(data) {
  return await client.db("guvi-new-db").collection("movies").insertOne(data);
}

export async function GetMovieById(id) {
  return await client
    .db("guvi-new-db")
    .collection("movies")
    .findOne({ _id: ObjectId(id) });
}

export async function getUserByName(username) {
  return await client
    .db("guvi-new-db")
    .collection("users")
    .findOne({ username: username });
}

//Internship Task VERIFY USER EXISTS OR NOT
export async function getUserByName2(email) {
  return await client
    .db("guvi-new-db")
    .collection("usersInternshipTask")
    .findOne({ email: email });
}

export async function getAllMovies(request) {
  return await client
    .db("guvi-new-db")
    .collection("movies")
    .find(request.query)
    .toArray();
}

//Internship Task Add images to Image Array
export async function updateImageArrayById(id, data) {
  return await client
    .db("guvi-new-db")
    .collection("usersInternshipTask")
    .updateOne({ _id: ObjectId(id) }, { $push: { imgArr: data } });
}

//Internship task get all images from id
export async function GetArrayImagesById(id) {
  return await client
    .db("guvi-new-db")
    .collection("usersInternshipTask")
    .findOne({ _id: ObjectId(id) });
}

//Internship Task Remove image from Image Array
export async function removeImageArrayById(id, data) {
  let ans=data.imgID;
  console.log(ans);
  return await client
    .db("guvi-new-db")
    .collection("usersInternshipTask")
    .updateOne({ _id: ObjectId(id) }, { $pull: { imgArr:{imgID:ans} } });
}
