var request = require("request");
var cheerio = require("cheerio");
var url= process.env.REQUESTURL;




var middleware = {

    preise: [
        {"diesel": ""},
        {"sorteSuper": ""},
        {"superPlus": ""},
        {"superE10": ""}
    ],
    altePreise: [
        {"diesel": ""},
        {"sorteSuper": ""},
        {"superE10": ""},
        {"superPlus": ""}
    ],

    alert: {
        oldVal: "",
        newVal: "",
        date: ""
    },

    filter: [
            ["#sorte_3_1", "diesel"],
            ["#sorte_5_3", "sorteSuper"],
            ["#sorte_1_10","superPlus"],
            ["#sorte_16_9", "superE10"]
    ],

    fuelFilter: function(domElement, fuel, $, next){
        
        $(domElement).filter(function(){
                    
            var data = $(this);
            if(data.text()!=middleware.preise[fuel]){
                console.log("Diesel has changed");

                middleware.alert = {
                    oldVal : middleware.preise[fuel],
                    newVal : data.text()
                }
                
                middleware.altePreise[fuel] = middleware.preise[fuel];

            } else {
                middleware.altePreise[fuel] = middleware.preise[fuel];
            };
            middleware.preise[fuel] = parseFloat(data.text(), 10);
            console.log(middleware.preise[fuel]);

            if(next){
                next();
            };
            

        })
    },

    
    hoyerRequest: function(req, res, next){
        request(url, function(error, response, html){

            if(!error && response.statusCode == 200){
                var $ = cheerio.load(html);       
                console.log("Abfrage ");
                
                // middleware.filter.forEach(function(item, a){
                //     // middleware.fuelFilter(index, item,$);
                //     console.log(item);

                // });

                for(var i=0; i<middleware.filter.length; i++){
                   
                    middleware.fuelFilter(middleware.filter[i][0], middleware.filter[i][1],$);
                };

                next();
                
                
            } if(error) {
                console.log("Fehler: "+error);
    
             };
             
            
    
        });
    },

    resetValues: function(req, res, next){
        
        middleware.alert = {
            oldVal: "",
            newVal: "",
            date: ""
        };
    
        
        middleware.preise.forEach(function(fuel, index, object){
            object.splice(index, 1);
        });
        middleware.altePreise.forEach(function(fuel, index, object){
            object.splice(index, 1);
        });



        next();



    }





};




module.exports = middleware;