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
    superPlus: "",
    date: ""
};

var altePreise = {
    diesel: "",
    sorteSuper: "",
    superPlus: ""
};

var alert = {};




//MIDDLEWARE
function hoyerRequest (req, res, next){

    request("https://www.hoyer-tankstellen.de/tankstelle/hoyer_autohof_hansator-28217_bremen-hansator_7", function(error, response, html){

        if(!error && response.statusCode == 200){
            var $ = cheerio.load(html);       
            console.log("Abfrage ");
            
            
           $(".aktualisierungsDatum").filter(function(){
            var data = $(this);
            var datum = data.children("strong").text();
            preise.date = datum;
            
           


           });
           
           $('#sorte_3_1').filter(function(){
                
                var data = $(this);
                if(data.text()!=preise.diesel){
                    console.log("Diesel has changed");

                    alert = {
                        oldVal : preise.diesel,
                        newVal : data.text()
                    }
                    altePreise.diesel = preise.diesel;

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
                    altePreise.sorteSuper = preise.sorteSuper;
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
                    altePreise.superPlus = preise.superPlus;

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

function resetValues (req, res, next){
    alert = {
        oldVal: "",
        newVal: ""
    };

    preise = {
        diesel: "",
        superPlus: "",
        sorteSuper: ""
    };
    altePreise = {
        diesel: "",
        superPlus: "",
        sorteSuper: ""
    };
};

//ROUTES
app.get("/", function(req, res){
    

    res.redirect("/scrape");
    

});
 

app.get("/scrape",hoyerRequest, function(req, res){
    

    res.render("result", {preise: preise, alert: alert, altePreise: altePreise});
    

});


app.get("/reset", resetValues, function(req, res){
    
    

    //redirect to scrape route 
    res.redirect("/scrape");

});






app.listen(process.env.PORT, process.env.IP, function(){
    console.log("started");
});

