const memjs = require("memjs");
const express = require("express");
const request = require("request");
const qs = require("querystring");
const dotenv = require("dotenv");

dotenv.config();
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

const apiExplore = "https://api.foursquare.com/v2/venues/explore/";

const app = express();
const port = process.env.PORT || 3001;

const memcacheSettings = { expires: 30 };



const callFoursquareApi = (cacheKey, ll, section, radius, res) => {

    const params = {
        client_id: clientId,
        client_secret: clientSecret,
        sortByDistance: 1,
        v: "20180515"
    };

    if (ll) {
        params.ll = ll;
    }
    if (section) {
        params.section = section.toLowerCase();
    }
    if (radius) {
        params.radius = radius;
    }

    const url = `${apiExplore}?${qs.stringify(params)}`;
    request(url, (err, response, data) => {
        if (err) {
            res.send(err);
        } else {
            memjsClient.set(cacheKey, data, memcacheSettings)
            res.send(JSON.parse(data));
        }
    });
}

function ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint16Array(buf));
}

var memjsClient = memjs.Client.create(process.env.MEMCACHEDCLOUD_SERVERS, {
    username: process.env.MEMCACHEDCLOUD_USERNAME,
    password: process.env.MEMCACHEDCLOUD_PASSWORD
});

app.get("/api/explore", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    const ll = req.query.ll;
    const radius = req.query.radius;
    const section = req.query.section;

    const cacheKey = ll + radius + section;

    memjsClient
        .get(cacheKey)
        .then((data) => {
            if (!data.value) {
                console.log("not using cache for key", cacheKey)
                callFoursquareApi(cacheKey, ll, section, radius, res);
            } else {
                console.log("using cache for key", cacheKey)
                res.send(JSON.parse(ab2str(data.value)));
            }
        })
        .catch(err => {
            console.log("error", err)
        });
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static("build"));
}

app.listen(port);