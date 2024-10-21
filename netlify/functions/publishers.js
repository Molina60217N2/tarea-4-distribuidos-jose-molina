'use strict';
const express = require('express');
const serverless = require('serverless-http');
const exp = express();
const bodyParser = require('body-parser');

let publishers = [
  {
    "id": "1",
    "name": "John Wiley & Sons",
    "founded": 1807,
    "genre": "Academic",
    "history": "John Wiley & Sons, commonly known as Wiley, is an American multinational publishing company founded in 1807.",
    "books": [
      {
        "id": "1",
        "title": "Operating System Concepts"
      },
      {
        "id": "2",
        "title": "Database System Concepts"
      }
    ]
  },
  {
    "id": "2",
    "name": "Pearson Education",
    "founded": 1844,
    "genre": "Educational",
    "history": "Pearson Education is a British-owned education publishing and assessment service to schools and corporations, as well as directly to students.",
    "books": [
      {
        "id": "3",
        "title": "Computer Networks"
      },
      {
        "id": "4",
        "title": "Modern Operating Systems"
      }
    ]
  }
];

const app = express.Router();

app.get('/', (req, res) => {
  res.json(publishers);
});

app.get('/:id', (req, res) => {
  let publisher = publishers.find(p => p.id == req.params.id);
  if (!publisher)
    res.status(404).send('Publisher not found');
  else
    res.json(publisher);
});

app.post('/', (req, res) => {
  let newPublisher = req.body;
  let publisherExists = publishers.find(p => p.id == newPublisher.id);
  
  if (publisherExists)
    res.status(404).send('Publisher already exists');
  else {
    publishers.push(newPublisher);
    res.status(201).json(newPublisher);
  }
});

app.put('/:id', (req, res) => {
  let index = publishers.findIndex(p => p.id == req.params.id);
  if (index === -1)
    res.status(404).send('Publisher not found');
  else {
    publishers[index] = req.body;
    res.json(publishers[index]);
  }
});

app.delete('/:id', (req, res) => {
  let index = publishers.findIndex(p => p.id == req.params.id);
  if (index === -1)
    res.status(404).send('Publisher not found');
  else {
    publishers = publishers.filter(p => p.id != req.params.id);
    res.status(204).send();
  }
});

exp.use(bodyParser.json());
exp.use('/.netlify/functions/publishers', app);

module.exports = exp;
module.exports.handler = serverless(exp);
