const express = require('express');

const hotelRoute = require('./hotel.route');
const roomRoute = require('./room.route');

const feedbackRoute = require('./feedback.route');
const restaurantRoute = require('./restaurant.route');
const tableRoute = require('./table.route');
const selfVehicleRoute = require('./selfVehicle.route');
const detailVehicleRoute = require('./detailVehicle.route');
// const config = require('../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/hotel',
    route: hotelRoute,
  },
  {
    path: '/room',
    route: roomRoute,
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
    path: '/table',
    route: tableRoute,
  },
  {
    path: '/selfVehicle',
    route: selfVehicleRoute,
  },
  {
    path: '/detailVehicle',
    route: detailVehicleRoute,
  },
];

// const devRoutes = [
//   {
//     path: '/docs',
//     route: docsRoute,
//   },
// ];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

// if (config.env === 'development') {
//   devRoutes.forEach((route) => {
//     router.use(route.path, route.route);
//   });
// }

module.exports = router;
