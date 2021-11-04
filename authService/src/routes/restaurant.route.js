const express = require('express');
const { restaurantController } = require('../controllers');
const auth = require('../middlewares/auth');

const router = express.Router();

router.route('/:userId').post(auth('createRestaurant'), restaurantController.createRestaurant);
router.route('/').get(restaurantController.getRestaurants);
router
  .route('/:restaurantId')
  .get(restaurantController.getRestaurant)
  .patch(auth('updateRestaurant'), restaurantController.updateRestaurant)
  .delete(auth('deleteRestaurant'), restaurantController.deleteRestaurant);

router.route('/:restaurantId/table').get(restaurantController.getTables);

router.route('/table').post(auth('createTable'), restaurantController.createTable);

router
  .route('/table/:tableId')
  .get(restaurantController.getTable)
  .patch(auth('updateTable'), restaurantController.updateTable)
  .delete(auth('deleteTable'), restaurantController.deleteTable);

module.exports = router;
