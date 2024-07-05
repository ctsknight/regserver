
const app = require('express')();
const fs = require('fs');
const http = require('http');
const https = require('https');
const httpsOptions = {
	  key: fs.readFileSync('/etc/letsencrypt/live/test3.ubonex.de/privkey.pem'),
	  cert: fs.readFileSync('/etc/letsencrypt/live/test3.ubonex.de/cert.pem'),
} 
const httpsServer = https.createServer(httpsOptions, app);
const SSLPORT = 8443;
const Json_DB_Path = "./db.json";
const Data_Security_Key = "";

httpsServer.listen(SSLPORT, function() {
	    console.log('HTTPS Server is running on: https://test3.ubonex.de:%s', SSLPORT);
});

// Welcome
app.get('/checkreg', function(req, res) {
	    if(req.protocol === 'https') {
					const db_data = read_json_db(Json_DB_Path);
					if(find_user_by_id(db_data, "123"))
		            	res.status(200).send('valid');
					res.status(200).send('not valid');
		        }
});

function read_json_db(json_db_path){
	fs.readFile(json_db_path, "utf8", (error, data) => {
		if (error) {
		  console.log(error);
		  return;
		}
		db_data = JSON.parse(data);
		console.log(db_data);
		return db_data;
	  });
}

function find_user_by_id(data, id){
	const user = data.users.find((element) => (element.user_id == id))
	return user;
}