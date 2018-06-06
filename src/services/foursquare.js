import request from 'request';
import qs from 'querystring';

export function getData(radius, callback) {

    navigator.geolocation.getCurrentPosition(position => {

        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        const params = {
            ll: `${lat},${lng}`,
            radius: radius
        };

        //TODO: fix server to work on both dev and prod environments
        const url = `http://localhost:3001/api/explore?${qs.stringify(params)}`;
        //url = `https://react-4sq.herokuapp.com/api/explore?${qs.stringify(params)}`

        request(url, (err, res, data) => {
            if (err) {
                callback(err);
            } else {
                callback(null, JSON.parse(data));
            }
        });
    }, (err) => {
        callback(err);
    });
}