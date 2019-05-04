let express = require('express');
let bodyParser = require("body-parser");
let articleRoute = require('./routes/article');
let categoryRoute = require('./routes/category');
let mongoose = require('mongoose');
let cors = require('cors');
let app = express();

app.use(cors({ origin: 'http://localhost:9000' }));

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
app.use(categoryRoute);

app.use(express.static('public'));

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`Server Online ${PORT}`)
});
