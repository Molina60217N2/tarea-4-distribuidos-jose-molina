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
    console.log(id);

    // Convertir el id en ObjectId para la consulta de eliminación
    const result = await client.db("books").collection("authors").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return { statusCode: 404, headers, body: 'Book not found' };
    }

    return { statusCode: 200, headers, body: 'Book deleted successfully' };
  } catch (error) {
    console.log(error);
    return { statusCode: 422, headers, body: JSON.stringify(error) };
  }
};
