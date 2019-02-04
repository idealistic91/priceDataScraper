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

var altePreise = {
    diesel: "",
    sorteSuper: "",
    superPlus: ""
};
var alert = {};





function hoyerRequest (req, res, next){

    request("https://www.hoyer-tankstellen.de/tankstelle/hoyer_autohof_hansator-28217_bremen-hansator_7", function(error, response, html){

        if(!error && response.statusCode == 200){
            var $ = cheerio.load(html);       
            console.log("keine fehler");
            
            
            
           
           $('#sorte_3_1').filter(function(){
                
                var data = $(this);
                if(data.text()!=preise.diesel){
                    console.log("Diesel has changed");

                    alert = {
                        oldVal : preise.diesel,
                        newVal : data.text()
                    }
                };
                preise.diesel = parseFloat(data.text(), 10);
                console.log(preise.diesel);
                

            });
            $('#sorte_5_3').filter(function(){
                
                var data = $(this);
                if(data.text()!=preise.sorteSuper){
                    console.log("Super has changed");

                    alert = {
                        oldVal : preise.sorteSuper,
                        newVal : data.text()
                    }
                };
                preise.sorteSuper = parseFloat(data.text(), 10);
                console.log(preise.sorteSuper);
                
                

            });
            $('#sorte_1_10').filter(function(){
                
                var data = $(this);
                if(data.text()!=preise.superPlus){
                    console.log("Super plus has changed");
                    alert = {
                        oldVal : preise.superPlus,
                        newVal : data.text()
                    }
                    console.log("old value: "+alert.oldVal);
                    console.log("new value: "+alert.newVal);

                };
                preise.superPlus = parseFloat(data.text(), 10);
                console.log(preise.superPlus);
               
                

            });
            
            
            
        } if(error) {
            console.log("Fehler: "+error);

         };
         
        

    });

    next();


};



 

 

app.get("/scrape",hoyerRequest, function(req, res){
    

    res.render("result", {preise: preise, alert: alert});
    

});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("started");
});

