const express = require('express');
const { selfVehicleController } = require('../controllers');
const auth = require('../middlewares/auth');

const router = express.Router();

router.route('/:userId').post(auth('createSelfVehicle'), selfVehicleController.createSelfVehicle);
router.route('/').get(selfVehicleController.getSelfVehicles);
router
  .route('/:selfVehicleId')
  .get(selfVehicleController.getSelfVehicle)
  .patch(auth('updateSelfVehicle'), selfVehicleController.updateSelfVehicle)
  .delete(auth('deleteSelfVehicle'), selfVehicleController.deleteSelfVehicle);

router.route('/:selfVehicleId/detailVehicle').get(selfVehicleController.getDetailVehicles);

router.route('/detailVehicle').post(auth('createDetailVehicle'), selfVehicleController.createDetailVehicle);

router
  .route('/detailVehicle/:detailVehicleId')
  .get(selfVehicleController.getDetailVehicle)
  .patch(auth('updateDetailVehicle'), selfVehicleController.updateDetailVehicle)
  .delete(auth('deleteDetailVehicle'), selfVehicleController.deleteDetailVehicle);

module.exports = router;
