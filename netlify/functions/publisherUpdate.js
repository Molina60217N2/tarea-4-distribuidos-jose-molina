"use strict";

const { ObjectId } = require('mongodb');
const clientPromise = require('./mongoDB');
const headers = require('./headersCORS');

exports.handler = async (event, context) => {

  if (event.httpMethod == "OPTIONS") {
    return { statusCode: 200, headers, body: "OK" };
  }

  try {
    const client = await clientPromise;
    const id = event.path.split("/").reverse()[0];  // Obtener el ID del path
    const data = JSON.parse(event.body);  // Datos que se enviarán para actualizar
    console.log(data);

    // Excluir _id del objeto de actualización si está presente
    delete data._id;

    // Actualizar el documento utilizando _id como filtro
    const result = await client.db("books").collection("publishers").updateOne(
      { _id: new ObjectId(id) }, // Buscar por ObjectId
      { $set: data }  // Actualizar con los datos recibidos
    );

    if (result.matchedCount === 0) {
      return { statusCode: 404, headers, body: 'Book not found' };
    }

    return { statusCode: 200, headers, body: 'Book updated successfully' };
  } catch (error) {
    console.log(error);
    return { statusCode: 422, headers, body: JSON.stringify(error) };
  }
};
