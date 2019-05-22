require('dotenv').config();
const express = require('express');  
const bodyParser = require('body-parser');

const request = require('request');
const app = express();
const port = process.env.PORT || 5001;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));		

const fetch = require('node-fetch');
const https = require('https');
var Bluebird = require('bluebird');
fetch.Promise = Bluebird;

var mapbox_key = require('./mapbox_key');
app.post('/getLatLong', (req,res)=>{
	console.log('within getlatlong');
    var latLongUri = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+req.body.city+'.json?access_token='+mapbox_key;
	request({
      url: latLongUri,
      json: true
    }, (error, {body}) => {
      	if (error) { 
        	console.log('error occured: ' + error);
        	res.send(error);
		} else {
			var latitude = body.features[0].center[1];
			var longitude = body.features[0].center[0];
	        var weatherUri = 'https://api.darksky.net/forecast/88030114c5e47763a011a75e7a10c633/'+latitude +','+longitude;
	        request({
	        	url: weatherUri,
	        	json: true
	        }, (error, {body})=>{
	        	res.json(body);
	        });
      	}
    });


    //??????????????????????????????????
	// fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/medellin.json?access_token=pk.eyJ1IjoibWF0dGZpY2tlIiwiYSI6ImNqNnM2YmFoNzAwcTMzM214NTB1NHdwbnoifQ.Or19S7KmYPHW8YjRz82v6g&cachebuster=1558044009444&autocomplete=false", {
	// 	method: 'GET',
 //      	headers: {
 //        	"Content-Type": "application/json"
 //      	}
 // 	}).then((response)=>{
	// 	//console.log(response.body);
	// 	// console.log(response.headers.values());
	// 	res.send(response);	
	// });
});

app.listen(port, () => {
	
});	
