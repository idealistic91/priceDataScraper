var request = require("request");
var cheerio = require("cheerio");
var url= process.env.REQUESTURL;




var middleware = {

    preise: {
        diesel: "",
        sorteSuper: "",
        superPlus: "",
        date: ""
    },
    altePreise: {
        diesel: "",
        sorteSuper: "",
        superPlus: ""
    },
    alert: {
        oldVal: "",
        newVal: ""
    },



    
    hoyerRequest: function(req, res, next){
        request(url, function(error, response, html){

            if(!error && response.statusCode == 200){
                var $ = cheerio.load(html);       
                console.log("Abfrage ");
                
               
               $('#sorte_3_1').filter(function(){
                    
                    var data = $(this);
                    if(data.text()!=middleware.preise.diesel){
                        console.log("Diesel has changed");
    
                        middleware.alert = {
                            oldVal : middleware.preise.diesel,
                            newVal : data.text()
                        }
                       
                        middleware.altePreise.diesel = middleware.preise.diesel;
    
                    } else {
                        middleware.altePreise.diesel = middleware.preise.diesel;
                    };
                    middleware.preise.diesel = parseFloat(data.text(), 10);
                    console.log(middleware.preise.diesel);
                    
    
                });
                $('#sorte_5_3').filter(function(){
                    
                    var data = $(this);
                    if(data.text()!=middleware.preise.sorteSuper){
                        console.log("Super has changed");
    
                        middleware.alert = {
                            oldVal : middleware.preise.sorteSuper,
                            newVal : data.text()
                        }
                        middleware.altePreise.sorteSuper = middleware.preise.sorteSuper;
                    } else {
                        middleware.altePreise.sorteSuper = middleware.preise.sorteSuper;
                    };
                    middleware.preise.sorteSuper = parseFloat(data.text(), 10);
                    console.log(middleware.preise.sorteSuper);
                    
                    
    
                });
                $('#sorte_1_10').filter(function(){
                    
                    var data = $(this);
                    if(data.text()!=middleware.preise.superPlus){
                        console.log("Super plus has changed");
                        middleware.alert = {
                            oldVal : middleware.preise.superPlus,
                            newVal : data.text()
                        }
                        middleware.altePreise.superPlus = middleware.preise.superPlus;
    
                    } else {
                        middleware.altePreise.superPlus = middleware.preise.superPlus;
                    };
                    middleware.preise.superPlus = parseFloat(data.text(), 10);
                    console.log(middleware.preise.superPlus);
    
                    next();
                    
    
                });
                
                
                
            } if(error) {
                console.log("Fehler: "+error);
    
             };
             
            
    
        });
    },

    resetValues: function(req, res, next){
        middleware.alert = {
            oldVal: "",
            newVal: ""
        };
    
        middleware.preise = {
            diesel: "",
            superPlus: "",
            sorteSuper: ""
        };
        middleware.altePreise = {
            diesel: "",
            superPlus: "",
            sorteSuper: ""
        };
    
        next();



    }





};




module.exports = middleware;