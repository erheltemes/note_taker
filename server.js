// Dependencies
const express = require('express');
const { dirname } = require('path');
const path = require("path")

const app = express();
const PORT = 8080;

const notes = require('./db/db.json');
const { allowedNodeEnvironmentFlags } = require('process');

//put in every server file you write, allows for user input to work?
app.use(express.urlencoded({extended: true}))
app.use(express.json())


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/assets/css/styles.css', (req, res) => {
    res.sendFile(path.join(__dirname, './public/assets/css/styles.css'));
});

app.get('/assets/js/index.js', (req, res) => {
    res.sendFile(path.join(__dirname, './public/assets/js/index.js'));
});

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './db/db.json'));
});

app.get('/api/notes', (req, res) => {
    notes.push(req.body)
});



// app.get('/add/characters/all', (req, res) => {
//     res.json(characters);
// });

// app.post('/api/characters'), (req,res) => {
//     characters.push(req.body)
//     res.json(req.body)
// }

// app.get('/api/characters/:character', (req, res) => {
//     const obj = characters.filter( char => char.routeName === req.params.character)[0]

//     if (obj === undefined) {
//         res.send("yousa clumsy")
//     } else {
//         res.json(obj)
//     }
// });


app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
