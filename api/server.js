'use strict';

const express = require('express');
const cors = require('cors');
const _ = require('lodash');
const { v4: uuidv4 } = require('uuid');
// Constants
const PORT = 8091;
const HOST = '0.0.0.0';




// App
const app = express();
var corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200, 
    methods: "GET, PUT"
}
app.use(express.json())
app.use(cors(corsOptions));
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
let cards = [];

app.get('/', (req, res) => {
  return res.send("Buenas");
  //const obj = JSON.parse(cards);
  //res.send(obj);
});

app.get('/card', (req, res) => {
    res.send(cards);
  });

app.post('/card', (req, res) => {   
  let card = {
    id: uuidv4().toString(),
    text: req.body.text
  }
  cards.push(card)
  res.send(card);
});

app.put('/card/:id', (req, res) => {    
  let card = {
    id: req.params['id'],
    text: req.body.text
  }
  _.remove(cards, (elem)=>{
    return elem.id == req.params['id']    
  });
  cards.push(card);
  res.send(card);
});

app.delete('/card/:id', (req, res) => {    
  _.remove(cards, (elem)=> {
    return elem.id == req.params['id']    
  });
  res.send(cards);
});