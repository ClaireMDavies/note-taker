const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();


const PORT = 3000; 

app.use(express.static(__dirname +"/public"));
//app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//creating the route to render the home page
app.get("/", (req, res) => { res.sendFile(path.join(__dirname+"/public/index.html"));
});

//creating the route to render the notes page
app.get("/notes", (req, res) => { res.sendFile(path.join(__dirname+"/public/notes.html"));
});

//create api route to read saved data
app.get("/api/notes", (req, res) => {
    
    var notes = readNotes();
    res.send(notes);
});

// TO DO: create api route to post data to db.json

// TO DO: create route to delete data
 


function readNotes(){

    var fileContent = fs.readFileSync("db/db.json", "utf8");
    var notes = [];

    if (fileContent.length > 0){
         notes = JSON.parse(fileContent);

    }
    return notes;
}

app.listen(PORT, function(){
    console.log("App listening on PORT:" + PORT);
});
