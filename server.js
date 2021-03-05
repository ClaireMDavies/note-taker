const express = require('express');
const fs = require("fs");
const path = require("path");

const PORT = 3000; 
const app = express();

app.use(express.static(__dirname +'/public'));
//app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//creating the route to render the home page
app.get('/', (req, res) => { res.sendFile(path.join(__dirname+'/public/index.html'));
});

//creating the route to render the notes page
app.get('/notes', (req, res) => { res.sendFile(path.join(__dirname+'/public/notes.html'));
});


 
app.listen(PORT, function(){
    console.log("App listening on PORT:" + PORT);
});