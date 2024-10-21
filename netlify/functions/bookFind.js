"use strict";

const { ObjectId } = require('mongodb');  // Importar ObjectId
const clientPromise = require('./mongoDB');
const headers = require('./headersCORS');

exports.handler = async (event, context) => {

  if (event.httpMethod == "OPTIONS") {
    return { statusCode: 200, headers, body: "OK" };
  }
  
  try {
    const client = await clientPromise;
    const id = event.path.split("/").reverse()[0];  // Obtener el ID del path

    // Convertir el ID en ObjectId
    const book = await client.db("books").collection("books").findOne({ _id: new ObjectId(id) });

    if (!book) {
      return { statusCode: 404, headers, body: 'Book not found' };
    }

    return { statusCode: 200, headers, body: JSON.stringify(book) };
  } catch (error) {
    console.log(error);
    return { statusCode: 400, headers, body: JSON.stringify(error) };
  }
};
