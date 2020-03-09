//Initiallising node modules
var express = require("express");
var bodyParser = require("body-parser");
var sql = require("mssql");
var app = express();

// Setting Base directory
app.use(bodyParser.json());

var config = {
        user: 'adminku',
        password: '',
        server: '223.25.101.77', 
        database: 'BELTIM2018v27',
		options: {
                    encrypt: false
                }
    };


//Function to connect to database and execute query
var  executeQuery = function(res, query){	
	sql.connect(config, function (err) {
		if (err) {   
			console.log("Error while connecting database :- " + err);
			res.send(err);
		}
		else {
			// create Request object
			var request = new sql.Request();
			// query to the database
			request.query(query, function (err, rec) {
				if (err) {
					console.log("Error while querying database :- " + err);
					//res.send(err);
				}
				else {
					res.send(rec);
				}
			});
		}
	});	
}

app.use(function(req, res, next) {
//console.log("2: Route: " + JSON.stringify(req.route));
  //console.log("2: Path: " + req.originalUrl);
  
var Tables = [ 'Ref_bank', 'Ref_Program', 'Ta_Belanja' ];
var i =0;

while (Tables[i]) {

	if("/"+Tables[i]==req.originalUrl)
	console.log("kite proses"+Tables[i]);
	{
	app.get(req.originalUrl, function(req , res){
	var query = 'select * from '+req.originalUrl.replace("/","");
	console.log(query);
	executeQuery (res, query);
});
	}
  i++;
}

  
  
  
  next();
});



app.get("/baca", function(req , res){
	console.log("ini "+req);
	console.log(app.route.path);

});

app.get("/api", function(req , res){
	var query = "select * from Ref_Bank";
	executeQuery (res, query);
});


app.get('/simda', function (req, res) {
   
    var sql = require("mssql");

    // config for your database
    var config = {
        user: 'ad',
        password: '',
        server: '223.25.101.77', 
        database: 'BELTIM2018v27',
		options: {
                    encrypt: false
                }
    };

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('select * from Ref_Bank', function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset);
            
        });
    });
});

var server = app.listen(5000, function () {
    console.log('Server is running..');
});
