const express = require('express'); //import the express library
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./models/user');
require('./services/passport');

//mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, () => { }, { useNewUrlParser: true })
    .catch(err => {
        console.log(err);
    });
    
const app = express();// create an object to it

app.use(cookieSession({
    maxAge:30*24*60*60*1000,
    keys:[keys.cookieKey]

}))

app.use(passport.initialize());
app.use(passport.session());


require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000 //process.env.PORT is the port number available when the app is deployed in a service(aws,heroku etc..)
app.listen(PORT);


