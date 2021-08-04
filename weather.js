const express = require("express");

const app=express();

const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

const https=require("https");

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
    
});

app.post("/",function(req,res){
    const query=req.body.cityName;
    const appikey="10a57bff0aa4874e218df966a9528dfc";
    const measure="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appikey+"&units="+measure;
    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
            const weatherData=JSON.parse(data);
            const temp=weatherData.main.temp;
            const weatherDescription=weatherData.weather[0].description;
            const icon=weatherData.weather[0].icon;
            const imageUrl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<h1>The temprature in "+query+" is "+temp+" degree celsius.</h1>");
            res.write("<p>The weather is "+weatherDescription+"</p>");
            res.write("<img src="+imageUrl+">");
            res.send();
        })
    })
})

app.listen(3000,function(){
    console.log("Server is runnig");
});