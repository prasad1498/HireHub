let express = require ('express');
let mongoose = require ('mongoose');
let methodOveride = require ('method-override');
let session = require('express-session');
let path = require('path');
let app = express();
let passport = require('passport');
let localStrategy = require('passport-local');
let moment = require('moment');


mongoose.connect('mongodb+srv://admin:admin@hirehubdb.tnhtbyq.mongodb.net/?retryWrites=true&w=majority')
.then(function(){
    console.log('DB working')
})
.catch(function(err){
    console.log('DB not working', err)
});


app.use(session({
    secret: 'ItsPrasad14',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        httpOnly: true,
        // secure: true,
        expires:Date.now() + 1000 * 60 * 60 * 24
     }
}))


let User = require('./modals/userDB');
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.static(path.join(__dirname, '/public')));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(methodOveride('_method'));
app.use((req,res,next)=>{
    res.locals.curruser = req.user
    res.locals.moment = moment;
    next();
})




let jobRoutes = require('./routes/jobs.js');
let notifRoutes = require('./routes/notifications.js');
let authRoutes = require('./routes/auth.js');
let userRoutes = require('./routes/user.js');


app.use(jobRoutes);
app.use(notifRoutes);
app.use(authRoutes);
app.use(userRoutes);

app.listen(3000,function(){
    console.log('serer is running on port 3000');
});