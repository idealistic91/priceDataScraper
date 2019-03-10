var express = require("express"),
    request = require("request"),
    cheerio = require("cheerio"),
    fs      = require("fs"),
    routes  = require("./routes"),
    app     = express()

var url= process.env.REQUESTURL;

var prices;

//SETUP
//read json

function readJSON(){
    fs.readFile('output.json', 'utf8', function (err, data) {
        if (err) throw err;
        prices = JSON.parse(data);
      });
};

function saveJSON(){
    fs.writeFile('output.json', JSON.stringify(prices, null, 4), function(err){

        console.log('File successfully written! - Check your project directory for the output.json file');
    
    })
};



app.use(express.static("public"));
app.set("view engine", "ejs");

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
                prices.diesel = parseFloat(data.text(), 10);
            });
            $("#sorte_5_3").filter(function(){
               
                var data = $(this);
                prices.sorteSuper = parseFloat(data.text(), 10);

                
    
            });
            $("#sorte_1_10").filter(function(){
                  
                var data = $(this);
                prices.superPlus = parseFloat(data.text(), 10);
    
            });
            $("#sorte_16_9").filter(function(){
                  
                var data = $(this);
                prices.superE10 = parseFloat(data.text(), 10);

            });
            
            saveJSON();
            
        } if(error) {
            console.log("Fehler: "+error);
    
         };
    
         
         
        
    
    });



};


setInterval(hoyerRquest, 10000);







//ROUTES
app.use(routes);



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("started");
});


