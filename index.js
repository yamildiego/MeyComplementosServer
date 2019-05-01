let express = require('express');
var bodyParser = require("body-parser");
let articleRoute = require('./routes/article');
var mongoose = require('mongoose');
// var user = require('./routes/user');
// var http = require('http');
// var path = require('path');
let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/YourDB", { useNewUrlParser: true }, (err, res) => {
    console.error(err);
    if (err) {
        console.log(`ERROR db connection ${err}`);
    } else {
        console.log(`DB Running`);
    }
});

app.use(articleRoute);

app.use(express.static('public'));

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`Server Online ${PORT}`)
});
