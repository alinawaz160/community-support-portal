const express = require('express');
const app = express();
app.listen(4040, function() {
    console.log('listening on 4040')
  })
const MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    // ... do something here
  })