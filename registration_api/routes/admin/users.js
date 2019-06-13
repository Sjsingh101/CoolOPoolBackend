const express = require('express'), 
      User =  require('../../models/user'),
      router = express.Router();

router.get("/admin/users", (req,res) => {
    User.find({},function(err,allUsers){
        if(err){
            console.log(err);
        }else{
            res.render("admin/userbase/index", {users: allUsers});
        }
    });
});

module.exports = router;