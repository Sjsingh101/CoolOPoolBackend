var express        = require("express"),
    router         = express.Router({mergeParams: true}),
    Restaurant     = require("../../models/restaurants"),
    Food           = require("../../models/food");


// ===========================
// foods ROUTES
// ==========================


//CREATE
router.post("/admin/restaurants/:id/foods", function(req, res){

    Restaurant.findById(req.params.id,function(err, restaurant) {
        if(err){
            res.json(err);
        }else{
            Food.create(req.body.food,function(err,food){
                if(err){
                    res.json(err);
                }else{
                    restaurant.foods.push(food);
                    restaurant.save();
                    res.json(restaurant)
                }
            });
        }
    });
});


//UPDATE food
router.put("/admin/restaurants/:id/foods/:food_id", function(req, res){
    Food.findByIdAndUpdate(req.params.food_id, req.body.food, function(err, updatedfood){
        if(err){
            res.json(err)
        }else{
            res.json("updated")
        }
    });
});

//DELETE food
router.delete("/admin/restaurants/:id/foods/:food_id", function(req, res){
   Food.findByIdAndRemove(req.params.food_id, function(err){
       if(err){
           res.json(err);
       }else{
           res.json("deleted");
       }
   });
});

module.exports = router; 