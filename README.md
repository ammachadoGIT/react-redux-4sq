# react-redux-4sq

A React-Redux app using the Foursquare API

The app shows a list of interesting venues close to the user.

Some features of the app:

- The list shows some information about the venues like `name`, `section`, `address`, and `distance`
- The user can click on the name  of the venues to get more information about them
- A link to the venue location on Google Maps is also provided
- The user can filter the results by providing search parameters like `Radius` and `Section` (e.g. `food` or `coffee`)
- Response `caching` in order to avoid unnecessary calls to FourSquare API.

See it online: https://venue-discovery.herokuapp.com/