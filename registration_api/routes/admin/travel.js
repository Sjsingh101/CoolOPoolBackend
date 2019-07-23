const express = require('express'), 
      Bus =  require('../../models/bus'),
      router = express.Router();

router.get("/admin/buses", (req,res) => {
    Bus.find({},function(err,allbuses){
        if(err){
            res.json(err)
        }else{
            res.json(allbuses);
        }
    });
});

router.post("/admin/buses", (req,res) => { 
    Bus.create(req.body.bus, (err,newbus)=> {
        if(err){
            res.json(`error from new bus adding: ${err}`);
        }else{
           res.json(newbus);
        }   
    });   
});

router.get("/admin/buses/:id", (req,res) => {
    Bus.findById(req.params.id, (err,foundbus)=> {
        if(err){
            res.json(err);
        }else{
            //res.json(foundbus)
            res.render("admin/bus/show",{bus: foundbus});
        }
    });
});

router.put("/admin/buses/:id", (req,res)=> {
    Bus.findByIdAndUpdate(req.params.id,req.body.bus, (err,foundbus)=>{
        if(err){
            res.json(err);
        }else{
            res.json("updated")
        }
    });
});

// DELETE bus ROUTE
router.delete("/admin/buses/:id",function(req,res){
    Bus.findByIdAndDelete(req.params.id, function(err){
        if(err){
            res.json(`deleting error : ${err}`)
        }else{
            res.json("deleted")
        }
    });
});

module.exports = router;