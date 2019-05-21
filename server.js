require('dotenv').config();
const express = require('express');  
const bodyParser = require('body-parser');

const request = require('request');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));		

// const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const fetch = require('node-fetch');
const https = require('https');
var Bluebird = require('bluebird');
fetch.Promise = Bluebird;

// https://api.darksky.net/forecast/88030114c5e47763a011a75e7a10c633/LAT,LONG
// https://api.mapbox.com/geocoding/v5/mapbox.places/city.json?access_token=pk.eyJ1IjoiamdhdmlyMjMiLCJhIjoiY2pwMzMwanYwMDJkeTNwcDduODR5bXRlayJ9.p_HLVm6sK-X0d5-JIpSdxA

// ** add app.post('/api/savelocaluser')
app.post('/getLatLong', (req,res)=>{
	console.log(process.env.DARKSKY_ACCESS);
	var latLongUri = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+req.body.city+'.json?access_token=' + process.env.DARKSKY_ACCESS;
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
	        // res.json({
	        //   latitude: body.features[0].center[1],
	        //   longitude: body.features[0].center[0]
	        // });
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
