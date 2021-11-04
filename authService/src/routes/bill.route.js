const express = require('express');
const { billController } = require('../controllers');
const auth = require('../middlewares/auth');

const router = express.Router();

router.route('/:userId').get(auth('getBills'), billController.getBills);

router
  .route('/:userId/:billId')
  .get(auth('getBills'), billController.getBill)

  .patch(auth('updateBill'), billController.updateBill)
  .delete(auth('deleteBill'), billController.deleteBill);

router.route('/:userId').post(auth('createBill'), billController.createBill);
module.exports = router;
