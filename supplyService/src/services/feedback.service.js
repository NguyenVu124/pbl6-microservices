const httpStatus = require('http-status');
const hotelService = require('./hotel.service');
const restaurantService = require('./restaurant.service');
const selfVehicleService = require('./selfVehicle.service');
const { Feedback } = require('../models');
const ApiError = require('../utils/ApiError');

const createFeedback = async (feedbackBody) => {
  return Feedback.create(feedbackBody);
};

const getFeedbacksByUserId = async (userId) => {
  const feedbacks = await Feedback.find({ idUser: userId });
  return feedbacks;
};
const getFeedbacksByServiceId = async (service, serviceId) => {
  let query = {};
  switch (service) {
    case 'restaurant':
      query = { idRestaurant: serviceId };
      break;
    case 'hotel':
      query = { idHotel: serviceId };
      break;
    case 'selfVehicle':
      query = { idSelfVehicle: serviceId };
      break;
    default:
      break;
  }
  const feedbacks = await Feedback.find(query).populate('idUser').exec();
  return feedbacks;
};

const getFeedbackById = async (id) => {
  return Feedback.findById(id);
};

const updateFeedbackById = async (feedbackId, updateBody) => {
  const feedback = await getFeedbackById(feedbackId);
  if (!feedback) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Feedback not found');
  }
  Object.assign(feedback, updateBody);
  await feedback.save();
  return feedback;
};

const deleteFeedbackById = async (feedbackId) => {
  const feedback = await getFeedbackById(feedbackId);
  if (!feedback) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Feedback not found');
  }
  await feedback.remove();
  return feedback;
};

const addFeedbackToService = async (feedbackId, service) => {
  let detailService = {};

  switch (service.service) {
    case 'restaurant':
      detailService = await restaurantService.getRestaurantById(service.idRestaurant);
      break;
    case 'hotel':
      detailService = await hotelService.getHotelById(service.idHotel);
      break;
    case 'selfVehicle':
      detailService = await selfVehicleService.getSelfVehicleById(service.idSelfVehicle);
      break;
    default:
      throw new ApiError(httpStatus.FORBIDDEN, 'Error');
  }
  if (!detailService) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Service not found');
  }
  const { feedbacks } = detailService;
  feedbacks.push(feedbackId);
  const updateBody = { feedbacks };
  Object.assign(detailService, updateBody);
  await detailService.save();
};

module.exports = {
  createFeedback,
  getFeedbacksByUserId,
  getFeedbacksByServiceId,
  getFeedbackById,
  updateFeedbackById,
  deleteFeedbackById,
  addFeedbackToService,
};
