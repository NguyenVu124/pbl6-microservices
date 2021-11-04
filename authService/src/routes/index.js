const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const hotelRoute = require('./hotel.route');
const billRoute = require('./bill.route');
const feedbackRoute = require('./feedback.route');
const restaurantRoute = require('./restaurant.route');
const selfVehicleRoute = require('./selfVehicle.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/hotel',
    route: hotelRoute,
  },
  {
    path: '/bill',
    route: billRoute,
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
