console.log("connected!");

var fuels = ["diesel", "sorteSuper", "superPlus", "superE10"];
var notifyBox = $("#notifyBox");
var currentRequestID = 100000;


var sound = new Howl({
    src: ['../sounds/pinwheel.mp3']
    });

// sound.play();

function confirmChange(){
    notifyBox.toggleClass("d-none");
    $(".new").css("display", "none");
    requestInterval = setInterval(request, 5000);
    

};



function priceChangeEvent(currentPrices, oldPrices){


   
    currentPricesDisplay(oldPrices);
    newPricesDisplay(currentPrices);    

    notifyBox.toggleClass("d-none");
    sound.play();

};

function newPricesDisplay(prices){

    $(".new").css("display", "block");

    $("#dieselNEU").sevenSeg({ digits: 4, value: prices.diesel});
    $("#dieselNEU").parent().children(".arrow").children(".fas.fa-exchange-alt").css("display", "inline");
    $("#dieselNEU .sevenSeg-segOn").css("fill", "red");
    $("#dieselNEU .sevenSeg-svg").css("fill", "#320000");


    $("#superNEU").sevenSeg({ digits: 4, value: prices.sorteSuper});
    $("#superNEU").parent().children(".arrow").children(".fas.fa-exchange-alt").css("display", "inline");
    $("#superNEU .sevenSeg-segOn").css("fill", "red");
    $("#superNEU .sevenSeg-svg").css("fill", "#320000");

    $("#superPlusNEU").sevenSeg({ digits: 4, value: prices.superPlus});
    $("#superPlusNEU").parent().children(".arrow").children(".fas.fa-exchange-alt").css("display", "inline");
    $("#superPlusNEU .sevenSeg-segOn").css("fill", "red");
    $("#superPlusNEU .sevenSeg-svg").css("fill", "#320000");

};


function currentPricesDisplay(data){

    console.log("hello from default func")
    $("#diesel").sevenSeg({ digits: 4, value: data.diesel});
    $("#super").sevenSeg({ digits: 4, value: data.sorteSuper});
    $("#superPlus").sevenSeg({ digits: 4, value: data.superPlus});
    return data;
};





function request(ID){
    
var data = $.ajax({
        method: "GET",
        url: "output.json"
    }).done(function(data){
        var priceChanged;


        fuels.forEach(function(fuel, i){
            
            if(data[fuel].old){
                priceChanged = true;
                
            };
            if(i===fuels.length-1){
                if(!priceChanged){
                priceChanged = false;
               
                };
            };
           
        });
        
        

        var fetchedData = {
            priceChange: priceChanged,
            currentPrices : {
                diesel      : data.diesel.current,
                sorteSuper  : data.sorteSuper.current,
                superPlus   : data.superPlus.current,
                superE10    : data.superE10.current
            },
            oldPrices : {
                diesel      : data.diesel.old,
                sorteSuper  : data.sorteSuper.old,
                superPlus   : data.superPlus.old,
                superE10    : data.superE10.old
            }

        };


        
        if(fetchedData.priceChange){
                    
            clearInterval(requestInterval);
            priceChangeEvent(fetchedData.currentPrices, fetchedData.oldPrices);
                

        } else {
            currentPricesDisplay(fetchedData.currentPrices);
        };

    })
    .fail(function(err){
        console.log(err);
    });



  
};


var requestInterval = setInterval(request, 5000);




