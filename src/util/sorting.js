export const sortByDistance = function(a,b) {
    return a.venue.location.distance - b.venue.location.distance;
};