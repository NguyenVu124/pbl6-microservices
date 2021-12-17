const express = require('express');

const hotelRoute = require('./hotel.route');

const feedbackRoute = require('./feedback.route');
const restaurantRoute = require('./restaurant.route');
const selfVehicleRoute = require('./selfVehicle.route');
const roomRoute = require('./room.route');
const tableRoute = require('./table.route');
const detailVehicleRoute = require('./detailVehicle.route');

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
  {
    path: '/room',
    route: roomRoute,
  },
  {
    path: '/table',
    route: tableRoute,
  },
  {
    path: '/detailVehicle',
    route: detailVehicleRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
