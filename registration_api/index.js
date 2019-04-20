const express               = require('express'),
      mongoose              = require('mongoose'),
      bodyParser            = require('body-parser'),
      passport              = require('passport'),
      passportLocalMongoose = require('passport-local-mongoose'),
      LocalStrategy         = require('passport-local'),
      User                  = require('./models/user'),
      flash                 = require("connect-flash");

mongoose.connect("mongodb://localhost/coolOpool",{useNewUrlParser: true}); 

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(flash());



//passport setup
app.use(require("express-session")({
    secret: "I am the most strong-willed person on the planet",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session()); 

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()); 


//routes

//show forms
app.get('/', (req,res) => res.render("form"));

//handling user sign up
app.post("/register", function(req,res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, User){
        if(err){
            res.send(err);
        }else{
            passport.authenticate("local")(req,res,function(){
                res.status(200).json({message : "successful signup" })
            });
        }
    });
});

//login logic
app.post("/login",passport.authenticate("local",{
    //successRedirect: "/",
    failureRedirect: "/",
    failureFlash: true
}) ,function(req,res){
    res.status(200).json({message : "success" })
});

const port = process.env.PORT || 3000;
app.listen(port , () => console.log('App listening on port ' + port));