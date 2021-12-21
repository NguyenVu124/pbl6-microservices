const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const hotelRoute = require('./hotel.route');
const roomRoute = require('./room.route');
const billRoute = require('./bill.route');
const docsRoute = require('./docs.route');
const feedbackRoute = require('./feedback.route');
const restaurantRoute = require('./restaurant.route');
const tableRoute = require('./table.route');
const selfVehicleRoute = require('./selfVehicle.route');
const detailVehicleRoute = require('./detailVehicle.route');
// const config = require('../config/config');

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
    path: '/room',
    route: roomRoute,
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
  {
    path: '/docs',
    route: docsRoute,
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
