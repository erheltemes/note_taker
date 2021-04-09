// Dependencies
const express = require('express');
const { dirname } = require('path');
const path = require("path")
const fs = require("fs")
const randomId = require('random-id')

var len = 10
var pattern = 'aA0'
var idGen = randomId(len, pattern)

const app = express();
//allows for heroku or local
const PORT = process.env.PORT || 8080;

// let notes = JSON.parse(fs.readFileSync("db/db.json", "utf8"))
// let notes = ""

const { allowedNodeEnvironmentFlags } = require('process');

//put in every server file you write, allows for user input to work?
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static ('public'))


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './db/db.json'));
});

//Same thing as above????
// app.get('/api/notes', (req, res) => {
//     var data = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
//     res.json(data);
// });

app.post('/api/notes', (req, res) => {
    var allNotes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8')) 
    var newNote = req.body;
    newNote.id = idGen
    allNotes.push(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(allNotes));
    console.log('new note saved')
    res.json(allNotes);
});

app.delete('/api/notes/:id', (req, res) => {
    const allNotes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'))
    const newArr = allNotes.filter( note => note.id !== req.params.id)
    fs.writeFileSync('./db/db.json', JSON.stringify(newArr))
    res.json(newArr)

})

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
