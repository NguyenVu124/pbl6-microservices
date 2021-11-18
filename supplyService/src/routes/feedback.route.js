const express = require('express');
const { feedbackController } = require('../controllers');
const auth = require('../middlewares/auth');

const router = express.Router();

router.route('/:userId').get(feedbackController.getFeedbacksByUserId);
router
  .route('/:service/:serviceId')
  .get(feedbackController.getFeedbacksByServiceId)
  .post(auth('createFeedback'), feedbackController.createFeedback);

router
  .route('detail/:feedbackId')
  .get(feedbackController.getFeedback)
  .patch(auth('updateFeedback'), feedbackController.updateFeedback)
  .delete(auth('deleteFeedback'), feedbackController.deleteFeedback);
module.exports = router;
