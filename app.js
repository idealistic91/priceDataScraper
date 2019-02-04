var express = require("express"),
    fs      = require("fs"),
    request = require("request"),
    cheerio = require("cheerio");
    
var app     = express();
app.use(express.static("public"));
app.set("view engine", "ejs");


var preise = {
    diesel: "",
    sorteSuper: "",
    superPlus: ""
};

function hoyerRequest (req, res, next){

    request("https://www.hoyer-tankstellen.de/tankstelle/hoyer_autohof_hansator-28217_bremen-hansator_7", function(error, response, html){

        if(!error && response.statusCode == 200){
            var $ = cheerio.load(html);       
            console.log("keine fehler");
            var diesel, sorteSuper, superPlus;
            
            
           
           $('#sorte_3_1').filter(function(){
                //checke ob a segment an oder aus ist.
                var data = $(this);
                preise.diesel = parseFloat(data.text(), 10);
                console.log(preise.diesel);
                

            });
            $('#sorte_5_3').filter(function(){
                //checke ob a segment an oder aus ist.
                var data = $(this);
                preise.sorteSuper = parseFloat(data.text(), 10);
                console.log(preise.sorteSuper);
                
                

            });
            $('#sorte_1_10').filter(function(){
                //checke ob a segment an oder aus ist.
                var data = $(this);
                preise.superPlus = parseFloat(data.text(), 10);
                console.log(preise.superPlus);
               
                

            });
            
         return preise;   
            
        } if(error) {
            console.log("Fehler: "+error);

         };
         
        

    });

    next();


};



 

 

app.get("/scrape",hoyerRequest, function(req, res){
    
    

    res.render("result", {preise: preise});
    
    

    




});


app.listen(3000, function(){
    console.log("started");
});

// exports = module.exports = app;