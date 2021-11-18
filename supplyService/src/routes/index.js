const express = require('express');

const hotelRoute = require('./hotel.route');

const feedbackRoute = require('./feedback.route');
const restaurantRoute = require('./restaurant.route');
const selfVehicleRoute = require('./selfVehicle.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/hotel',
    route: hotelRoute,
  },

  {
    path: '/feedback',
    route: feedbackRoute,
  },
  {
    path: '/restaurant',
    route: restaurantRoute,
  },
  {
    path: '/selfVehicle',
    route: selfVehicleRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
