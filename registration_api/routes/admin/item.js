const express = require('express'), 
      Item =  require('../../models/item'),
      router = express.Router();

router.get("/admin/items", (req,res) => {
    Item.find({},function(err,allItems){
        if(err){
            console.log(err);
        }else{
            res.json(allItems);
        }
    });
});


router.post("/admin/items", (req,res) => {
    
    Item.create(req.body.item, (err,newItem)=> {
        if(err){
            console.log(`error from new item adding: ${err}`);
        }else{
           res.json(newItem);
        }   
    });   
});


router.get("/admin/items/:id", (req,res) => {
    Item.findById(req.params.id, (err,foundItem)=> {
        if(err){
            console.log(err);
        }else{
            res.json(foundItem);
        }
    });
});


router.put("/admin/items/:id", (req,res)=> {
    Item.findByIdAndUpdate(req.params.id,req.body.item, (err,foundItem)=>{
        if(err){
           res.json(err)
        }else{
          res.json("item updated")
        }
    });
});

// DELETE item ROUTE
router.delete("/admin/items/:id",function(req,res){
    Item.findByIdAndDelete(req.params.id, function(err){
        if(err){
            res.json(err)
        }else{
            res.json("deleted");
        }
    });
});

module.exports = router;