const express = require('express'),
      Restaurant = require('../../models/restaurants'),
      router  = express.Router();

router.get("/admin/restaurants", (req,res) => {
    Restaurant.find({}, (err,allRst) => {
        if(err){
            console.log(err);
        }else{
            res.render("admin/restaurant/index", {restaurants: allRst});
        }
    });
});

router.get("/admin/restaurants/new", (req,res) => {
    res.render("admin/restaurant/new"); 
 }); 

router.post("/admin/restaurants", (req,res) => {
    
    Restaurant.create(req.body.restaurant, (err,newrestaurant)=> {
        if(err){
            console.log(`error from new restaurant adding: ${err}`);
        }else{
           // console.log(newrestaurant);
            res.redirect("/admin/restaurants");
        }   
    });   
});

router.get("/admin/restaurants/:id", (req,res) => {
    Restaurant.findById(req.params.id).populate("foods").exec(function(err,foundrestaurant){
        if(err){
            console.log(err);
        }else{
            //console.log(foundrestaurant)
            res.render("admin/restaurant/show",{restaurant: foundrestaurant});
        }
    });
});

//edit restaurant route
router.get("/admin/restaurant/:id/edit", (req,res)=> {
    Restaurant.findById(req.params.id, (err,foundrestaurant)=>{
       if(err){
           res.redirect("/admin/restaurants/" + req.params.id);
           console.log(err);
       }else{
           console.log(foundrestaurant);
           res.render("admin/restaurant/edit", {restaurant: foundrestaurant});
       }
    });
});

router.put("/admin/restaurant/:id", (req,res)=> {
    Restaurant.findByIdAndUpdate(req.params.id,req.body.restaurant, (err,foundrestaurant)=>{
        if(err){
            res.redirect("/admin/restaurants/" + req.params.id);
            console.log(err);
        }else{
            res.redirect("/admin/restaurants/" + req.params.id);
        }
    });
});

// DELETE restaurant ROUTE
router.delete("/admin/restaurants/:id",function(req,res){
    Restaurant.findByIdAndDelete(req.params.id, function(err){
        if(err){
            console.log(`deleting error : ${err}`)
            res.redirect("/admin/restaurants");
        }else{
            res.redirect("/admin/restaurants");
        }
    });
});

module.exports = router;
