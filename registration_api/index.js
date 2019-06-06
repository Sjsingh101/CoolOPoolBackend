const express               = require('express'),
      mongoose              = require('mongoose'),
      bodyParser            = require('body-parser'),
      methodOverride        = require("method-override"),
      passport              = require('passport'),
      passportLocalMongoose = require('passport-local-mongoose'),
      LocalStrategy         = require('passport-local'),
      User                  = require('./models/user'),
      flash                 = require("connect-flash"),
      Item                  = require("./models/item"),
      middleware            = require("./middlewares");

const indexroutes = require('./routes/index'),
      adminUserRoutes = require('./routes/admin/users'),
      adminIndexRoutes = require('./routes/admin/index'),
      adminItemRoutes = require('./routes/admin/item'),
      adminTravelRoutes = require('./routes/admin/travel'),
      adminRestRoutes = require('./routes/admin/restaurant'),
      adminFoodRoutes = require('./routes/admin/food');

mongoose.connect("mongodb://localhost/coolOpool",{useNewUrlParser: true}); 

const app = express();
app.use(methodOverride("_method"))
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine","ejs");
app.use(flash());


//passport setup
app.use(require("express-session")({
    secret: "secret shall remain a secret",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session()); 

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()); 


app.use(indexroutes);
app.use(adminUserRoutes);
app.use(adminIndexRoutes);
app.use(adminItemRoutes);
app.use(adminTravelRoutes);
app.use(adminRestRoutes);
app.use(adminFoodRoutes);



const port = process.env.PORT || 3000;
app.listen(port , () => console.log('App listening on port ' + port));