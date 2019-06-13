var express        = require("express"),
    router         = express.Router({mergeParams: true}),
    Restaurant     = require("../../models/restaurants"),
    Food           = require("../../models/food");


// ===========================
// foods ROUTES
// ==========================

//NEW food  
router.get("/admin/restaurants/:id/foods/new", function(req, res){
    Restaurant.findById(req.params.id,function(err, restaurant){
        if(err){
            console.log(err);
        }else{
             res.render("admin/foods/new",{restaurant: restaurant});
        }
    });
}); 

//CREATE
router.post("/admin/restaurants/:id/foods", function(req, res){

    Restaurant.findById(req.params.id,function(err, restaurant) {
        if(err){
            console.log(err);
            res.redirect("/restaurants")
        }else{
            Food.create(req.body.food,function(err,food){
                if(err){
                    //req.flash("error", "Something went wrong !");
                    console.log(err);
                }else{
                    restaurant.foods.push(food);
                    restaurant.save();
                    console.log(restaurant)
                    res.redirect("/admin/restaurants/" + restaurant._id);
                }
            });
        }
    });
});

//EDIT Food
router.get("/admin/restaurants/:id/foods/:food_id/edit",function(req, res){
    Food.findById(req.params.food_id, function(err,foundfood){
        if(err){
            res.redirect("back");
        }else{
            console.log(foundfood._id)
            res.render("admin/foods/edit", {restaurant_id: req.params.id, food: foundfood})                                                              
        }
    });
});

//UPDATE food
router.put("/admin/restaurants/:id/foods/:food_id", function(req, res){
    console.log("hellllooo")

    Food.findByIdAndUpdate(req.params.food_id, req.body.food, function(err, updatedfood){
        if(err){
            console.log(err     )
            res.redirect("back");
        }else{
            res.redirect("/admin/restaurants/" + req.params.id);
        }
    });
});

//DELETE food
router.delete("/admin/restaurants/:id/foods/:food_id", function(req, res){
    console.log(req.params.food_id)
   Food.findByIdAndRemove(req.params.food_id, function(err){
       if(err){
           console.log(err)
           res.redirect("back");
       }else{
           res.redirect("/admin/restaurants/" + req.params.id);
       }
   });
});

module.exports = router; 