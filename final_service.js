/**
* Name : Tian Yang , TK Chen
* csc 337
* date:4/21
*/


const express=require("express");
const app=express();

const fs=require("fs");
//console.log('1111');
/**
* post the information
* get the search record
* 
*/
app.use(function(req,res,next) {
	res.header("Access-Control-Allow-Origin","*");
	res.header("Access-Control-Allow-Headers",
		"Origin,X-Requested-With,Content-Type,Accept");
	next();
});

app.use(express.static('public'));

const bodyParser=require('body-parser');
const jsonParser=bodyParser.json();
app.post('/',jsonParser,function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	const name =req.body.name;
	let newline='\n'+name;
    console.log(newline);

    fs.appendFile("history.txt",newline,function(err) {
    	if(err){
			console.log(err);
			res.status(400);
    	}
    	console.log("The file was saved!");
    	res.send("Success!");
	});
	
});

/**
* get  the info from text 
* get the search record
*
*/
app.get('/',function(req,res){
	res.header("Access-Control-Allow-Origin","*");
	
	let filepath="history.txt";
	let name="";
	let lines=fs.readFileSync(filepath,'utf8').split('\n');
	console.log(lines);
	let data={};
	data["city"]=[];
	for(let i=lines.length-1; i>=0; i--){
		if(lines[i]!='\n'&&lines[i]!=''){

		name=lines[i];
		//data["city"] = name;
	    console.log(name);
    
    	for(let n = -1; n < data["city"].length;n++){
    		console.log(n);
    		if(data["city"][n] == name){
    			break;
    		}
    		if(n == data["city"].length-1){
	    		data["city"].push(name);
	    	}
		}



	}
	 
	 //console.log(data);
}
res.send(JSON.stringify(data));
});



 
app.listen(process.env.PORT);