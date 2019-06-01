const express = require('express'), 
      Bus =  require('../../models/bus'),
      router = express.Router();

router.get("/admin/buses", (req,res) => {
    Bus.find({},function(err,allbuses){
        if(err){
            console.log(err);
        }else{
            res.render("admin/bus/index", {buses: allbuses});
        }
    });
});


router.get("/admin/buses/new", (req,res) => {
    res.render("admin/bus/new"); 
 }); 

router.post("/admin/buses", (req,res) => {
    
    Bus.create(req.body.bus, (err,newbus)=> {
        if(err){
            console.log(`error from new bus adding: ${err}`);
        }else{
           //console.log(newbus);
            res.redirect("/admin/buses");
        }   
    });   
});

router.get("/admin/buses/:id", (req,res) => {
    Bus.findById(req.params.id, (err,foundbus)=> {
        if(err){
            console.log(err);
        }else{
            //console.log(foundbus)
            res.render("admin/bus/show",{bus: foundbus});
        }
    });
});

//edit bus route
router.get("/admin/bus/:id/edit", (req,res)=> {
    Bus.findById(req.params.id, (err,foundbus)=>{
       if(err){
           res.redirect("/admin/buses/" + req.params.id);
           console.log(err);
       }else{
           console.log(foundbus);
           res.render("admin/bus/edit", {bus: foundbus});
       }
    });
});

router.put("/admin/bus/:id", (req,res)=> {
    Bus.findByIdAndUpdate(req.params.id,req.body.bus, (err,foundbus)=>{
        if(err){
            res.redirect("/admin/buses/" + req.params.id);
            console.log(err);
        }else{
            res.redirect("/admin/buses/" + req.params.id);
        }
    });
});

// DELETE bus ROUTE
router.delete("/admin/buses/:id",function(req,res){
    Bus.findByIdAndDelete(req.params.id, function(err){
        if(err){
            console.log(`deleting error : ${err}`)
            res.redirect("/admin/buses");
        }else{
            res.redirect("/admin/buses");
        }
    });
});

module.exports = router;