var express        = require("express"),
    router         = express.Router({mergeParams: true}),
    Restaurant     = require("../models/restaurant"),
    Food           = require("../models/food"),
    middleware     = require("../middleware");

// ===========================
// foods ROUTES
// ==========================

//NEW food  
router.get("/new", middleware.isLoggedIn, function(req, res){
    Restaurant.findById(req.params.id,function(err, restaurant){
        if(err){
            console.log(err);
        }else{
             res.render("foods/new",{restaurant: restaurant});
        }
    });
}); 

//CREATE
router.post("/", middleware.isLoggedIn, function(req, res){

    Restaurant.findById(req.params.id,function(err, restaurant) {
        if(err){
            console.log(err);
            res.redirect("/restaurants")
        }else{
            Food.create(req.body.food,function(err,food){
                if(err){
                    req.flash("error", "Something went wrong !");
                    console.log(err);
                }else{
                    //add username & id to food
                    food.author.id = req.user._id;
                    food.author.username = req.user.username;
                    Food.save();
                    
                    Restaurant.foods.push(Food);
                    Restaurant.save();
                    res.redirect("/restaurants/" + restaurant._id);
                }
            });
        }
    });
});

//EDIT Food
router.get("/:food_id/edit",function(req, res){
    Food.findById(req.params.food_id, function(err,foundfood){
        if(err){
            res.redirect("back");
        }else{
            res.render("foods/edit", {restaurant_id: req.params.id, food: foundfood})                                                  
        }
    });
});

//UPDATE food
router.put("/:food_id", middleware.checkfoodOwnership, function(req, res){
    Food.findByIdAndUpdate(req.params.food_id, req.body.food, function(err, updatedfood){
        if(err){
            res.redirect("back");
        }else{
            res.redirect("/restaurants/" + req.params.id);
        }
    });
});

//DELETE food
router.delete("/:food_id", middleware.checkfoodOwnership , function(req, res){
   Food.findByIdAndRemove(req.params.food_id, function(err){
       if(err){
           res.redirect("back");
       }else{
           res.redirect("/restaurants/" + req.params.id);
       }
   })
})


module.exports = router; 