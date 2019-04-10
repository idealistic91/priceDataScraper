var express = require("express"),
    request = require("request"),
    cheerio = require("cheerio"),
    fs      = require("fs"),
    routes  = require("./routes"),
    app     = express();

var url= process.env.REQUESTURL;

var prices={};

var fuels = ["diesel", "sorteSuper", "superPlus", "superE10"];

//SETUP
//read json
function random(min, max) {
    return  Math.floor(min + Math.random() * (max - min));
  };



function randomFloatBetween(minValue,maxValue,precision){
    if(typeof(precision) == 'undefined'){
        precision = 2;
    }
    return parseFloat(Math.min(minValue + (Math.random() * (maxValue - minValue)),maxValue).toFixed(precision));
};


function readJSON(){

    fs.readFile('public/output.json', 'utf8', function (err, data) {
        if (err) throw err;
        prices = JSON.parse(data);
      });

};

function saveJSON(){

    fs.writeFile('public/output.json', JSON.stringify(prices, null, 4), function(err){
    
        console.log('Updates made to the outpost.json file!');
    
    });

};



app.use(express.static("public"));
app.set("view engine", "ejs");

function checkPrice(fetchedData, fuel){

        var currPrice = parseFloat(fetchedData.text(), 10);
            //fetched price is equal to saved price (prices unchanged)
        if(currPrice === prices[fuel].current){

            console.log("Prices are up to date");
            prices[fuel].old = "";

        } else {
            
            console.log(fuel+" price has changed!");
            //fetched price differ from saved ones (prices changed)
            prices[fuel].old = prices[fuel].current;
            console.log("Old "+fuel+" price is now "+prices[fuel].old);
            prices[fuel].current = currPrice;
            console.log("Current "+fuel+" price is now "+prices[fuel].current);

        };

        
};


function hoyerRquest(){
    readJSON();
    request(url, function(error, response, html){


        if(!error && response.statusCode == 200){
            var $ = cheerio.load(html);       
            console.log("Abfrage ");
            
            // middleware.filter.forEach(function(item, a){
            //     // middleware.fuelFilter(index, item,$);
            //     console.log(item);
    
            // });
    
            $("#sorte_3_1").filter(function(){
                  
                var data = $(this);
                checkPrice(data, "diesel");
               
            });
            $("#sorte_5_3").filter(function(){
               
                var data = $(this);
                checkPrice(data, "sorteSuper");

    
            });
            $("#sorte_1_10").filter(function(){
                  
                var data = $(this);
                checkPrice(data, "superPlus");
    
            });
            $("#sorte_16_9").filter(function(){
                  
                var data = $(this);
                checkPrice(data, "superE10");
            
            });
            var randomNumber = Math.floor(Math.random() * Math.floor(fuels.length-1));
            prices.ID = random(100000, 900000);
            saveJSON();
            
        } if(error) {
            console.log("Fehler: "+error);
    
         };
    
         
         
        
    
    });



};

function randomPricesTest(){
    
    var fuels = ["diesel", "sorteSuper", "superPlus", "superE10"];
    var randomNumber = Math.floor(Math.random() * Math.floor(fuels.length-1));
    var fuel = fuels[randomNumber];
    

    fuels.forEach(function(item){
        prices[item] = randomFloatBetween(0.000, 1.999, 3);
    });
    saveJSON();

};


setInterval(hoyerRquest, 20000);



//ROUTES
app.use(routes);



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("started");
});


