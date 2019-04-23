const express               = require('express'),
      mongoose              = require('mongoose'),
      bodyParser            = require('body-parser'),
      methodOverride = require("method-override"),
      passport              = require('passport'),
      passportLocalMongoose = require('passport-local-mongoose'),
      LocalStrategy         = require('passport-local'),
      User                  = require('./models/user'),
      flash                 = require("connect-flash"),
      Item                  = require("./models/item"),
      middleware            = require("./middlewares");

mongoose.connect("mongodb://localhost/coolOpool",{useNewUrlParser: true}); 

const app = express();
app.use(methodOverride("_method"))
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
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





///////////////////////////////////////////////////////////////////ADMIN ROUTES///////////////////////////////////////////////////////////////////



app.get("/admin", (req,res) => res.render("admin/login"));



app.post("/admin/items", middleware.isAdmin, (req,res) => {
    Item.find({},function(err,allItems){
        if(err){
            console.log(err);
        }else{
            res.render("admin/dashboard",{items: allItems});
        }
    });
});

app.get("/admin/items/new", (req,res) => {
    res.render("admin/newItem"); 
 }); 

app.post("/admin/items", (req,res) => {
    
    Item.create(req.body.item, (err,newItem)=> {
        if(err){
            console.log(`error from new item adding: ${err}`);
        }else{
           // console.log(newItem);
            res.redirect("/admin/items");
        }   
    });   
});

app.get("/admin/items/:id", (req,res) => {
    Item.findById(req.params.id, (err,foundItem)=> {
        if(err){
            console.log(err);
        }else{
            //console.log(foundItem)
            res.render("admin/show",{item: foundItem});
        }
    });
});

//edit item route
app.get("/admin/item/:id/edit", (req,res)=> {
    Item.findById(req.params.id, (err,foundItem)=>{
       if(err){
           res.redirect("/admin/items/" + req.params.id);
           console.log(err);
       }else{
           console.log(foundItem);
           res.render("admin/edit", {item: foundItem});
       }
    });
});

app.put("/admin/item/:id", (req,res)=> {
    Item.findByIdAndUpdate(req.params.id,req.body.item, (err,foundItem)=>{
        if(err){
            res.redirect("/admin/items/" + req.params.id);
            console.log(err);
        }else{
            res.redirect("/admin/items/" + req.params.id);
        }
    });
});

// DELETE item ROUTE
app.delete("/admin/items/:id",function(req,res){
    Item.findByIdAndDelete(req.params.id, function(err){
        if(err){
            console.log(`deleting error : ${err}`)
            res.redirect("/admin/items");
        }else{
            res.redirect("/admin/items");
        }
    });
});

const port = process.env.PORT || 3000;
app.listen(port , () => console.log('App listening on port ' + port));