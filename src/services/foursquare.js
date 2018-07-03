import request from "request";
import qs from "querystring";
import url from "url";

let server;
if (process.env.NODE_ENV === 'production') {
    const parsedUrl = url.parse(document.location.href);
    server = `${parsedUrl.protocol}//${parsedUrl.host}`;
    console.log(server);
} else {
    server = "http://localhost:3001";
}

export function getData(filter, callback) {

    navigator.geolocation.getCurrentPosition(position => {

        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        const params = {
            ll: `${lat},${lng}`
        };

        Object.assign(params, filter);

        const apiEndpoint = `${server}/api/explore?${qs.stringify(params)}`;
        request(apiEndpoint, (err, res, data) => {
            if (err) {
                callback(err);
            } else {
                console.log(data)
                callback(null, JSON.parse(data));
            }
        });
    }, (err) => {
        callback(err);
    });
}