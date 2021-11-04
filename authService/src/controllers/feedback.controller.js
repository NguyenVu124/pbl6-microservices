const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { feedbackService } = require('../services');

const createFeedback = catchAsync(async (req, res) => {
  const feedback = await feedbackService.createFeedback(req.body);
  await feedbackService.addFeedbackToService(feedback._id, req.body);

  // switch (req.params.service) {
  //   case 'restaurant':
  //     await feedbackService.addFeedbackToRestaurant(feedback._id, req.body.hotel);
  //     break;
  //   case 'hotel':
  //     await feedbackService.addFeedbackToHotel(feedback._id, req.body.hotel);
  //     break;
  //   case 'selfVehicle':
  //     await feedbackService.addFeedbackToSelfVehicle(feedback._id, req.body.hotel);
  //     break;
  //   default:
  //     throw new ApiError(httpStatus.FORBIDDEN, 'Error');
  // }
  res.status(httpStatus.CREATED).send(feedback);
});

const getFeedbacksByUserId = catchAsync(async (req, res) => {
  const result = await feedbackService.getFeedbacksByUserId(req.params.userId);
  res.send(result);
});

const getFeedbacksByServiceId = catchAsync(async (req, res) => {
  const result = await feedbackService.getFeedbacksByServiceId(req.params.service, req.params.serviceId);
  res.send(result);
});

const getFeedback = catchAsync(async (req, res) => {
  const feedback = await feedbackService.getFeedbackById(req.params.feedbackId);
  if (!feedback) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Feedback not found');
  }
  res.send(feedback);
});

const updateFeedback = catchAsync(async (req, res) => {
  const feedback = await feedbackService.updateFeedbackById(req.params.feedbackId, req.body);
  res.send(feedback);
});

const deleteFeedback = catchAsync(async (req, res) => {
  await feedbackService.deleteFeedbackById(req.params.feedbackId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createFeedback,
  getFeedbacksByUserId,
  getFeedbacksByServiceId,
  getFeedback,
  updateFeedback,
  deleteFeedback,
};
