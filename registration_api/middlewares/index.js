const item = require("../models/item");

const middlewareObj = {}

middlewareObj.isAdmin = (req,res,next)=>{
    if(req.body.email === "test@example.com" && req.body.pass === "manu"){
        next();
    }else{
        res.redirect("/");
    }

}


module.exports = middlewareObj;