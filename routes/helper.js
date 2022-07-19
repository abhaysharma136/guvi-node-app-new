import { client } from '../index.js';

export async function updateMovieById(id, data) {
    return await client.db("guvi-new-db").collection("movies").updateOne({ id: id }, { $set: data });
}
export async function deleteMovieById(id) {
    return await client.db("guvi-new-db").collection("movies").deleteOne({ id: id });
}
export async function CreateMovies(data) {
    return await client.db('guvi-new-db').collection('movies').insertMany(data);
}
export async function GetMovieById(id) {
    return await client.db("guvi-new-db").collection("movies").findOne({ id: id });
}
export async function getAllMovies(request) {
    return await client.db("guvi-new-db").collection("movies").find(request.query).toArray();
}
