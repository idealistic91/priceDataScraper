var express = require("express");
var router = express();




router.get("/", function(req, res){
    

    res.redirect("/scrape");
    

});
 

router.get("/scrape", function(req, res){
    

    res.render("result");
    

});

//resetValues
router.get("/reset", function(req, res){
    
    //redirect to scrape route 
    res.redirect("/");

});



module.exports = router;