"use strict";

const { MongoClient } = require('mongodb');

const client = new MongoClient("mongodb+srv://josemolinasalas:jmdC4%21pYtP9mmKA@cluster.jtxvs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster");  // Elimina las opciones obsoletas

module.exports = client.connect();
