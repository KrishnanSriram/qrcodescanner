const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
const https = require('https');
const privateKey = fs.readFileSync('./certs/ec2-34-207-178-144.compute-1.amazonaws.com.key');
const certificate = fs.readFileSync('./certs/ec2-34-207-178-144.compute-1.amazonaws.com.crt');
const helmet = require('helmet')
const PORT = process.env.PORT || 9000;
const credentials = {key: privateKey, cert: certificate};

app.use(helmet());
app.use(express.static(path.join(__dirname, '../build')));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(PORT, () => {
    console.log(`Server running un port ${PORT}`);
});

/*app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`);
});*/
