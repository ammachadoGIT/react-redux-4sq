import request from 'request';
import qs from 'querystring';

export function getData(radius, callback) {

    navigator.geolocation.getCurrentPosition(position => {

        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        const params = {
            ll: `${lat},${lng}`,
            radius: radius
        }

        //TODO: fix server to work on both dev and prod environments
        request(`https://react-4sq.herokuapp.com/api/explore?` + qs.stringify(params), (err, res, data) => {
        //request(`http://localhost:3000/api/explore?` + qs.stringify(params), (err, res, data) => {
            console.log(err);
            console.log(data);

            if (err) {
                callback(err);
            } else {
                console.log("aaaa", data)
                callback(null, JSON.parse(data));
            }
        });
    }, (err) => {
        callback(err);
    });
}
