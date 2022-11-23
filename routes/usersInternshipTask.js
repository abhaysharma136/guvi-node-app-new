import express from "express";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import {
  CreateUsers2,
  GetArrayImagesById,
  getUserByName2,
  removeImageArrayById,
  updateImageArrayById,
} from "./helper.js";
const router = express.Router();

async function genHashedpassword(password) {
  const NO_OF_ROUNDS = 10;
  const Salt = await bcrypt.genSalt(NO_OF_ROUNDS);
  const hashedPassword = await bcrypt.hash(password, Salt);
  console.log(Salt, password);
  return hashedPassword;
}

//Create User
router.post("/signup", async function (request, response) {
  const { email, password, FirstName, LastName, phoneNumber } = request.body;

  const UserFromDB = await getUserByName2(email);
  console.log(UserFromDB);
  if (UserFromDB) {
    response.status(400).send({ message: "email allready exists" });
  } else if (password.length < 8) {
    response.send({ message: "password must be atleast 8 characters" });
  } else {
    const hashedPassword = await genHashedpassword(password);
    console.log(hashedPassword);
    //db.movies.insertOne(data)
    const result = await CreateUsers2({
      email: email,
      password: hashedPassword,
      FirstName: FirstName,
      LastName: LastName,
      phoneNumber: phoneNumber,
      confirm: false,
      imgArr: [],
    });
    response.send({ result, email, message: "Registered Succesfully" });
  }
});

//Login User AND SENDING Token
router.post("/login", async function (request, response) {
  const { email, password } = request.body;

  const userFromDB = await getUserByName2(email);
  console.log(userFromDB);
  if (!userFromDB) {
    response.status(401).send({ message: "Invalid Credentials" });
  } else {
    const storedPassword = userFromDB.password;
    const isPasswordMatch = await bcrypt.compare(password, storedPassword);
    console.log(isPasswordMatch);

    if (isPasswordMatch) {
      const token = Jwt.sign({ id: userFromDB._id }, process.env.SECRET_KEY, {
        expiresIn: "30m",
      });
      response.send({
        message: "Successful Login",
        token: token,
        id: userFromDB._id,
      });
    } else {
      response.status(401).send({ message: "Invalid Credentials" });
    }
  }
});

//Update Movie By ID
router.put("/:id", async function (request, response) {
  const { id } = request.params;
  console.log(request.params, id);
  const data = request.body;
  // const movie=movies.find((mv)=>mv.id===id);
  //db.movies.updateOne({id:101},{$set:data})

  const result = await updateImageArrayById(id, data);
  console.log(result);
  response.send(result);
});

//GET all Images by Id
router.get("/:id", async function (request, response) {
  const { id } = request.params;
  console.log(request.params, id);
  // const movie=movies.find((mv)=>mv.id===id);
  //db.movies.findone({id:101})

  const images = await GetArrayImagesById(id);
  console.log(images);
  images
    ? response.send(images)
    : response.status(404).send({ msg: "No Images found" });
});

//Update/remove image from the image list/Array
router.put("/remove/:id", async function (request, response) {
  const { id } = request.params;
  console.log(request.params, id);
  const data = request.body;
  // const movie=movies.find((mv)=>mv.id===id);
  //db.movies.updateOne({id:101},{$set:data})

  const result = await removeImageArrayById(id, data);
  console.log(result);
  response.send(result);
});

export const users2Router = router;
