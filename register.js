var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
const path = require('path')
const myapp = express();

// Parse incoming requests with JSON payloads
myapp.use(bodyParser.json());
myapp.use(express.static('public'));
myapp.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect('mongodb://localhost:27017/Efarmd');
var db = mongoose.connection;
db.on('error', () => console.log("Error in Connection to Database"));
db.once('open', () => console.log("Connected to database"));

myapp.post("/signup", (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var phno = req.body.phno;
    var password = req.body.password;

    var data = {
        "name": name,
        "email": email,
        "phno": phno,
        "password": password
    };

    db.collection('users').insertOne(data, (err, collection) => {
        if (err) {
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.sendFile(__dirname+ '/signup_succesful.html');
});

myapp.get("/", (req, res) => {
    res.sendFile(__dirname+'/register.html');
});

const PORT = 3000;
myapp.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
