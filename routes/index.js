var express = require("express");
var router = express();
var middleware = require("../middleware");



router.get("/", function(req, res){
    

    res.redirect("/scrape");
    

});
 

router.get("/scrape", function(req, res){
    

    res.render("result");
    

});

//resetValues
router.get("/reset", middleware.resetValues, function(req, res){
    
    //redirect to scrape route 
    res.redirect("/");

});



module.exports = router;