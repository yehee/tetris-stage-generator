const express = require('express');
const proxy = require('http-proxy-middleware');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();


app.use(
    '/api',
    proxy({
        target: 'http://localhost:5000',
        secure: false,
        changeOrigin: true,
    })
);

// app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static(path.join(__dirname, '/build')));

app.get('/api/save', (req, res) => {
    res.json(['saved']);
    console.log('Sent username');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
