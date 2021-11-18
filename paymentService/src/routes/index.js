const express = require('express');

const billRoute = require('./bill.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/bill',
    route: billRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
