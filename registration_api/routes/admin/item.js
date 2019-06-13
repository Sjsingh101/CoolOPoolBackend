const express = require('express'), 
      Item =  require('../../models/item'),
      router = express.Router();

router.get("/admin/items", (req,res) => {
    Item.find({},function(err,allItems){
        if(err){
            console.log(err);
        }else{
            res.render("admin/item/index", {items: allItems});
        }
    });
});


router.get("/admin/items/new", (req,res) => {
    res.render("admin/item/new"); 
 }); 

router.post("/admin/items", (req,res) => {
    
    Item.create(req.body.item, (err,newItem)=> {
        if(err){
            console.log(`error from new item adding: ${err}`);
        }else{
           // console.log(newItem);
            res.redirect("/admin/items");
        }   
    });   
});

router.get("/admin/items/:id", (req,res) => {
    Item.findById(req.params.id, (err,foundItem)=> {
        if(err){
            console.log(err);
        }else{
            //console.log(foundItem)
            res.render("admin/item/show",{item: foundItem});
        }
    });
});

//edit item route
router.get("/admin/item/:id/edit", (req,res)=> {
    Item.findById(req.params.id, (err,foundItem)=>{
       if(err){
           res.redirect("/admin/items/" + req.params.id);
           console.log(err);
       }else{
           console.log(foundItem);
           res.render("admin/item/edit", {item: foundItem});
       }
    });
});

router.put("/admin/item/:id", (req,res)=> {
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
router.delete("/admin/items/:id",function(req,res){
    Item.findByIdAndDelete(req.params.id, function(err){
        if(err){
            console.log(`deleting error : ${err}`)
            res.redirect("/admin/items");
        }else{
            res.redirect("/admin/items");
        }
    });
});

module.exports = router;