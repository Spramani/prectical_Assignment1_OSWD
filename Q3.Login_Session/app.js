const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const fileStore = require('session-file-store') (session);

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret : 'my Secret',
    resave : false,
    saveUninitialized : false,  
    cookie : {maxAge : 100 * 10},
    store : new fileStore({path : './session-data'})
}));

const loginRoutes = require('./routes/login');
app.use(loginRoutes);


app.listen(8003, function () {
    console.log("Listening on port 8003");
});