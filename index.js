
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

httpsServer.listen(SSLPORT, function() {
	    console.log('HTTPS Server is running on: https://test3.ubonex.de:%s', SSLPORT);
});

// Welcome
app.get('/', function(req, res) {
	    if(req.protocol === 'https') {
		            res.status(200).send('Welcome to Safety Land!');
		        }
});
