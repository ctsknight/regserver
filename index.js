
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
			fs.readFile(Json_DB_Path, "utf8", (error, data) => {
				if (error) {
				  console.log(error);
				  res.status(500).send('error');
				  return;
				}
				db_data = JSON.parse(data);
				//console.log(db_data);
				user = db_data.users.find((element) => (element.user_id == "123"));
				console.log(user);
				if(user) res.status(200).send('valid');
				else res.status(200).send('not valid');
			  });

		    }
});
