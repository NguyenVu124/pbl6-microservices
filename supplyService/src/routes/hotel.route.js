const express = require('express');
const { hotelController } = require('../controllers');
const auth = require('../middlewares/auth');

const router = express.Router();

router.route('/:userId').post(auth('createHotel'), hotelController.createHotel);
router.route('/').get(hotelController.getHotels);
router
  .route('/:hotelId')
  .get(hotelController.getHotel)
  .patch(auth('updateHotel'), hotelController.updateHotel)
  .delete(auth('deleteHotel'), hotelController.deleteHotel);

router.route('/:hotelId/room').get(hotelController.getRooms);

router.route('/room').post(auth('createRoom'), hotelController.createRoom);

router
  .route('/room/:roomId')
  .get(hotelController.getRoom)
  .patch(auth('updateRoom'), hotelController.updateRoom)
  .delete(auth('deleteRoom'), hotelController.deleteRoom);

module.exports = router;
