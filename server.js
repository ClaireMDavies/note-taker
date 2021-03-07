const express = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require('uuid');

const app = express();

const databaseFile = "db/db.json";

const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));
app.use(express.json());

// route to render the home page
app.get("/", (req, res) => {

    res.sendFile(path.join(__dirname + "/public/index.html"));
});

// route to render the notes page
app.get("/notes", (req, res) => {

    res.sendFile(path.join(__dirname + "/public/notes.html"));
});

// api route to read saved data
app.get("/api/notes", (req, res) => {

    var notes = readNotes();
    res.send(notes);
});

// api route to post data to db.json
app.post("/api/notes", (req, res) => {

    const title = req.body.title;
    const text = req.body.text;
    const id = uuidv4();

    let newNote = { "id": id, "title": title, "text": text };

    let notes = readNotes();
    notes.push(newNote);

    saveNotes(notes);

    res.send(notes);
});

// route to delete data
app.delete("/api/notes/:id", (req, res) => {

    let notes = readNotes();
    let deleteId = req.params.id;
    
    let newArray = notes.filter(note => note.id != deleteId);

    saveNotes(newArray);

    res.send(newArray);
});

function readNotes() {

    let fileContent = fs.readFileSync(databaseFile, "utf8");
    let notes = [];

    if (fileContent.length > 0) {
        notes = JSON.parse(fileContent);
    }

    return notes;
}

function saveNotes(notes) {

    fs.writeFileSync(databaseFile, JSON.stringify(notes), 'utf8');
}

app.listen(PORT, function () {

    console.log("App listening on PORT:" + PORT);
});

