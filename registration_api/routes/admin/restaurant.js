const express = require('express'),
      Restaurant = require('../../models/restaurants'),
      router  = express.Router();

router.get("/admin/restaurants", (req,res) => {
    Restaurant.find({}, (err,allRst) => {
        if(err){
            res.json(err)
        }else{
            res.json(allRst)
        }
    });
});


router.post("/admin/restaurants", (req,res) => {
    
    Restaurant.create(req.body.restaurant, (err,newrestaurant)=> {
        if(err){
            res.json(err)
        }else{
           res.json(newrestaurant);
        }   
    });   
});

router.get("/admin/restaurants/:id", (req,res) => {
    Restaurant.findById(req.params.id).populate("foods").exec(function(err,foundrestaurant){
        if(err){
            res.json(err);
        }else{
            res.json(foundrestaurant)
        }
    });
});

//edit restaurant route
router.get("/admin/restaurant/:id/edit", (req,res)=> {
    Restaurant.findById(req.params.id, (err,foundrestaurant)=>{
       if(err){
           res.json(err);
       }else{
           res.json(foundrestaurant);
       }
    });
});

router.put("/admin/restaurant/:id", (req,res)=> {
    Restaurant.findByIdAndUpdate(req.params.id,req.body.restaurant, (err,foundrestaurant)=>{
        if(err){
            res.json(err);
        }else{
            res.send("updated");
        }
    });
});

// DELETE restaurant ROUTE
router.delete("/admin/restaurants/:id",function(req,res){
    Restaurant.findByIdAndDelete(req.params.id, function(err){
        if(err){
            res.json(`deleting error : ${err}`)
        }else{
            res.json("deleted");
        }
    });
});

module.exports = router;
