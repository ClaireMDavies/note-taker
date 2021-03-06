const express = require("express");
const fs = require("fs");
const path = require("path");
const generateUniqueId = require('generate-unique-id');
const app = express();


const PORT = 3000;

app.use(express.static(__dirname + "/public"));
//app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//creating the route to render the home page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/index.html"));
});

//creating the route to render the notes page
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/notes.html"));
});

//create api route to read saved data
app.get("/api/notes", (req, res) => {

    var notes = readNotes();
    res.send(notes);
});

//create api route to post data to db.json

app.post("/api/notes", (req, res) => {

    const title = req.body.title;
    const text = req.body.text;
    const id = generateUniqueId({
        length: 5,
    });

    var newNote = { "id": id, "title": title, "text": text };

    console.log(newNote);

    var notes = readNotes();
    notes.push(newNote);

    fs.writeFileSync('db/db.json', JSON.stringify(notes), 'utf8');

    res.send(notes);
});

//create route to delete data

app.delete("/api/notes/:id", (req, res) => {

    var notes = readNotes();
    var deleteId = req.params.id;
    
    let newArray = notes.filter(note => note.id != deleteId);

    fs.writeFileSync('db/db.json', JSON.stringify(newArray), 'utf8');

    res.send(newArray);

});


function readNotes() {

    var fileContent = fs.readFileSync("db/db.json", "utf8");
    var notes = [];

    if (fileContent.length > 0) {
        notes = JSON.parse(fileContent);
    }

    return notes;
}

app.listen(PORT, function () {
    console.log("App listening on PORT:" + PORT);
});
