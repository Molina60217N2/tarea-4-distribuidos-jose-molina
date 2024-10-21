'use strict';
const express = require('express');
const serverless = require('serverless-http');
const exp = express();
const bodyParser = require('body-parser');

let authors = [
  {
    "id": "1",
    "name": "Abraham Silberschatz",
    "birthdate": "1952-10-12",
    "biography": "Abraham Silberschatz is a Professor of Computer Science at Yale University, best known for his work on database systems and operating systems.",
    "books": [
      {
        "id": "1",
        "title": "Operating System Concepts",
        "edition": "9th",
        "copyright": 2012,
        "language": "ENGLISH",
        "pages": 976
      },
      {
        "id": "2",
        "title": "Database System Concepts",
        "edition": "6th",
        "copyright": 2010,
        "language": "ENGLISH",
        "pages": 1376
      }
    ]
  },
  {
    "id": "2",
    "name": "Andrew S. Tanenbaum",
    "birthdate": "1944-03-16",
    "biography": "Andrew S. Tanenbaum is a Professor Emeritus of Computer Science at the Vrije Universiteit Amsterdam and an expert on computer networks and operating systems.",
    "books": [
      {
        "id": "3",
        "title": "Computer Networks",
        "edition": "5th",
        "copyright": 2010,
        "language": "ENGLISH",
        "pages": 960
      },
      {
        "id": "4",
        "title": "Modern Operating Systems",
        "edition": "4th",
        "copyright": 2014,
        "language": "ENGLISH",
        "pages": 1136
      }
    ]
  }
];

const app = express.Router();

app.get('/', (req, res) => {
  res.json(authors);
});

app.get('/:id', (req, res) => {
  let author = authors.find(a => a.id == req.params.id);
  if (!author)
    res.status(404).send('Author not found');
  else
    res.json(author);
});

app.post('/', (req, res) => {
  let newAuthor = req.body;
  let authorExists = authors.find(a => a.id == newAuthor.id);
  
  if (authorExists)
    res.status(404).send('Author already exists');
  else {
    authors.push(newAuthor);
    res.status(201).json(newAuthor);
  }
});

app.put('/:id', (req, res) => {
  let index = authors.findIndex(a => a.id == req.params.id);
  if (index === -1)
    res.status(404).send('Author not found');
  else {
    authors[index] = req.body;
    res.json(authors[index]);
  }
});

app.delete('/:id', (req, res) => {
  let index = authors.findIndex(a => a.id == req.params.id);
  if (index === -1)
    res.status(404).send('Author not found');
  else {
    authors = authors.filter(a => a.id != req.params.id);
    res.status(204).send();
  }
});

exp.use(bodyParser.json());
exp.use('/.netlify/functions/authors', app);

module.exports = exp;
module.exports.handler = serverless(exp);
