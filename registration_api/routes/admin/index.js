const express = require('express'),
      router = express.Router();

router.get("/admin/dashboard", (req,res) => {
    res.render("admin/dash_Board");
});



module.exports = router;