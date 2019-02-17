var express = require("express"),
    fs      = require("fs"),
    routes  = require("./routes"),
    app     = express();



//SETUP
app.use(express.static("public"));
app.set("view engine", "ejs");



//ROUTES
app.use(routes);



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("started");
});


