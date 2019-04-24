/**
* Name : Tian Yang , TK Chen
* csc 337
* date:4/21
*/


/**
* get  button first
* get the search record
* get clear
*/
 (function() {
"use strict";
window.onload=function begin(){
 let button=document.getElementById("search");
 button.onclick=sendfunction;
 document.getElementById("cityname").onclick=history;
 document.getElementById("clear").onclick=clear;

 };

/**
* get  the input 
* city name
* post to the server
*/
function sendfunction(){
let input=document.getElementById("cityname").value;
console.log(input);
const message = {
	name: input
};
 console.log(message);
 const fetchOptions={
 method:'POST',
 headers:{
		'Accept':'application/json',
		'Content-Type':'application/json'
	},
   body: JSON.stringify(message)
};
let url="http://weathersearch4ua.herokuapp.com";
fetch(url,fetchOptions)
.then(checkStatus)
.then(function(){
console.log("1");
})
.catch(function(error){
console.log(error);
});
search();
}

/**
* the city name is part of rhe api
* create  table
* show the table
*/
function search(){
document.getElementById("history").innerHTML="";
document.getElementById("table").innerHTML="";
document.getElementById("specific").innerHTML="";
let input=document.getElementById("cityname").value;
console.log(input);
let url="http://api.apixu.com/v1/current.json?key=131227c8ca1b49399da52945192204&q="+input;
fetch(url)
    .then(checkStatus)
    .then(function(responseText){

        let json=JSON.parse(responseText);
        
        console.log(json); 
        let name=input;
        let weather=json.current.condition.text;
        console.log(weather);
        let tempc=json.current.temp_c;
        let tempf=json.current.temp_f;
        console.log(tempc);
        console.log(tempf);
        let pictureurl="http:"+json.current.condition.icon;
        console.log(pictureurl);
        let table=document.createElement("table");
        let row = document.createElement("tr");
        let col1 = document.createElement("th");
        let col2 = document.createElement("th");
        let col3 = document.createElement("th");
        let col4 = document.createElement("th");
        let col5 = document.createElement("th");
        col5.innerHTML="icon";
        col1.innerHTML="city";
        col2.innerHTML="condition";
        col3.innerHTML="temperature C";
        col4.innerHTML="temperature F";
        row.appendChild(col1);
        row.appendChild(col5);
        row.appendChild(col2);
        row.appendChild(col3);
        row.appendChild(col4);
        table.appendChild(row);
        let _img = document.createElement("img");
        _img.setAttribute("id","icon");
        _img.setAttribute("src",pictureurl);
        _img.setAttribute("alt","1");


        let row2 = document.createElement("tr");
        let col11 = document.createElement("th");
        let col22 = document.createElement("th");
        let col33 = document.createElement("th");
        let col44 = document.createElement("th");
        let col55 = document.createElement("th");

        col11.innerHTML=name;
        col22.innerHTML=weather;
        col55.appendChild(_img);
        col33.innerHTML=tempc;
        col44.innerHTML=tempf;
        row2.appendChild(col11);
        row2.appendChild(col55);
        row2.appendChild(col22);
        row2.appendChild(col33);
        row2.appendChild(col44);
        table.appendChild(row2);

        document.getElementById("table").appendChild(table);

        let button2=document.createElement("button");
		button2.innerHTML="specific";
		document.getElementById("specific").innerHTML="";
		document.getElementById("specific").appendChild(button2);
		button2.onclick = specific;
	

    
    })
.catch(function(error){
window.alert("No matching location found.");

console.log(error);
});


    
}

/**
* get more specific information
* create table
* show the table
*/
function specific(){
let input=document.getElementById("cityname").value;
document.getElementById("specific").innerHTML="";
console.log(input);
let url="http://api.apixu.com/v1/current.json?key=131227c8ca1b49399da52945192204&q="+input;
fetch(url)
    .then(checkStatus)
    .then(function(responseText){
     let json=JSON.parse(responseText);

     let localtime=json.location.localtime;
     let lastupdate=json.current.last_updated;
     let windm=json.current.wind_mph;
     let feelsC=json.current.feelslike_c;
     let feelsF=json.current.feelslike_f;
     let humidity=json.current.humidity;
     let cloud=json.current.cloud;
     let winddegree=json.current.wind_degree;



     let table=document.createElement("table");
     let row = document.createElement("tr");
     let col1 = document.createElement("th");
     let col2 = document.createElement("th");
     let col3 = document.createElement("th");
     let col4 = document.createElement("th");
     let col5 = document.createElement("th");
     let col6 = document.createElement("th");
     let col7 = document.createElement("th");
     let col8 = document.createElement("th");
     
     col1.innerHTML="Lastupdate Time";
     col2.innerHTML="Feels Temp C";
     col3.innerHTML="Feels Temp F";
     col4.innerHTML="Wind Speed (Mile)";
     col5.innerHTML="Wind Degree";
     col6.innerHTML="Humidity";
     col7.innerHTML="Cloud";
     col8.innerHTML="Local Time";
     row.appendChild(col1);
     row.appendChild(col2);
     row.appendChild(col3);
     row.appendChild(col4);
     row.appendChild(col5);
     row.appendChild(col6);
     row.appendChild(col7);
     row.appendChild(col8);
     table.appendChild(row);

     
     let row2 = document.createElement("tr");
     let col11 = document.createElement("th");
     let col22 = document.createElement("th");
     let col33 = document.createElement("th");
     let col44 = document.createElement("th");
     let col55 = document.createElement("th");
     let col66 = document.createElement("th");
     let col77 = document.createElement("th");
     let col88 = document.createElement("th");
     
     col11.innerHTML=lastupdate;
     col22.innerHTML=feelsC;
     col33.innerHTML=feelsF;
     col44.innerHTML=windm;
     col55.innerHTML=winddegree;
     col66.innerHTML=humidity;
     col77.innerHTML=cloud;
     col88.innerHTML=localtime;
     row2.appendChild(col11);
     row2.appendChild(col22);
     row2.appendChild(col33);
     row2.appendChild(col44);
     row2.appendChild(col55);
     row2.appendChild(col66);
     row2.appendChild(col77);
     row2.appendChild(col88);
     table.appendChild(row2);

    document.getElementById("specific").appendChild(table);
	})
	.catch(function(error){
	console.log(error);	
	});
}

/**
* get the search record
* get the search record
* show the search record
*/
function history(){
	document.getElementById("history").innerHTML = "";
	let url="http://weathersearch4ua.herokuapp.com";
	fetch(url)
    .then(checkStatus)
    .then(function(responseText){
    let json=JSON.parse(responseText);
    console.log(json.chat); 
    let list = document.createElement("ul");
    for(let i=0; i<json.city.length&&i<8; i++){
    let lis = document.createElement("li");
    lis.innerHTML = json.city[i];
    list.appendChild(lis);
    lis.onclick = function(){
    document.getElementById("cityname").value = json.city[i];
	
	sendfunction();
   };
    }
    document.getElementById("history").appendChild(list);

})
    .catch(function(error){
	console.log(error);	
	});


}

/**
* clear all the page 
* clear table
* clear cityname
*/
function clear(){
	document.getElementById("specific").innerHTML="";
	document.getElementById("table").innerHTML="";
	document.getElementById("cityname").value="";
	
}

/**
* @param {string} response
* 200-300 response
* 410 response
* 404 response
* @return{print}print
*/
function checkStatus(response) {
    let errorm=document.getElementById("errors");
    if (response.status >= 200 && response.status < 300) {  
        return response.text();
    } 
    else if(response.status==410){
     errorm.innerHTML="This state do not have data";
     return Promise.reject(new Error("Sorry, we couldn't find that page")); 
    } 
   else if(response.status==404){
        document.getElementById("errors").innerHTML="Failed to fetch!";
        return Promise.reject(new Error("Sorry, we couldn't find that page")); 
    } 
    else {  
        return Promise.reject(new Error(response.status+": "+response.statusText)); 
    } 
}


})();