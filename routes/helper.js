import { client } from '../index.js';
import { ObjectId } from "mongodb";

export async function updateMovieById(id, data) {
    return await client.db("guvi-new-db")
    .collection("movies")
    .updateOne({ _id: ObjectId(id) }, { $set: data });
}
export async function deleteMovieById(id) {
    return await client.db("guvi-new-db")
    .collection("movies")
    .deleteOne({ _id: ObjectId(id) });
}
export async function CreateMovies(data) {
    return await client.db('guvi-new-db')
    .collection('movies')
    .insertMany(data);
}
export async function GetMovieById(id) {
    return await client.db("guvi-new-db")
    .collection("movies")
    .findOne({ _id: ObjectId(id) });
}
export async function getAllMovies(request) {
    return await client.db("guvi-new-db")
    .collection("movies")
    .find(request.query)
    .toArray();
}
