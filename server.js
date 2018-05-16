const express = require('express');
const request = require('request');
const qs = require('querystring');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

const apiExplore = "https://api.foursquare.com/v2/venues/explore/";

const app = express();
const port = process.env.PORT || 3000;

app.get('/api/explore', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    const ll = req.query.ll;
    const radius = req.query.radius;

    const params = {
        client_id: clientId,
        client_secret: clientSecret,
        ll: ll,
        sortByDistance: 1,
        v: '20180515',
        radius: radius
    };

    const url = `${apiExplore}?${qs.stringify(params)}`;
    request(url, (err, response, data) => {
        if (err) {
            res.send(err);
        } else {
            console.log(data)
            res.send(JSON.parse(data));
        }
    });
});

app.use(express.static('build'));

app.listen(port);