const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { selfVehicleService, userService } = require('../services');

const createSelfVehicle = catchAsync(async (req, res) => {
  const selfVehicle = await selfVehicleService.createSelfVehicle(req.body);
  await userService.updateUserById(req.params.userId, { idSelfVehicle: selfVehicle._id });

  res.status(httpStatus.CREATED).send(selfVehicle);
});

const getSelfVehicles = catchAsync(async (req, res) => {
  const result = await selfVehicleService.getSelfVehicles(req.query);
  res.send(result);
});

const getSelfVehicle = catchAsync(async (req, res) => {
  const selfVehicle = await selfVehicleService.getSelfVehicleById(req.params.selfVehicleId);
  if (!selfVehicle) {
    throw new ApiError(httpStatus.NOT_FOUND, 'SelfVehicle not found');
  }
  res.send(selfVehicle);
});

const updateSelfVehicle = catchAsync(async (req, res) => {
  const selfVehicle = await selfVehicleService.updateSelfVehicleById(req.params.selfVehicleId, req.body);
  res.send(selfVehicle);
});

const deleteSelfVehicle = catchAsync(async (req, res) => {
  await selfVehicleService.deleteSelfVehicleById(req.params.selfVehicleId);
  await selfVehicleService.deleteAllDetailVehiclesOfSelfVehicle(req.params.selfVehicleId);
  res.status(httpStatus.NO_CONTENT).send();
});

const createDetailVehicle = catchAsync(async (req, res) => {
  const detailVehicle = await selfVehicleService.createDetailVehicle(req.body);
  await selfVehicleService.addDetailVehicleToSelfVehicle(detailVehicle._id, req.body.selfVehicle);
  res.status(httpStatus.CREATED).send(detailVehicle);
});

const getDetailVehicles = catchAsync(async (req, res) => {
  const result = await selfVehicleService.getDetailVehicles(req.params.selfVehicleId);
  res.send(result);
});

const getDetailVehicle = catchAsync(async (req, res) => {
  const detailVehicle = await selfVehicleService.getDetailVehicleById(req.params.detailVehicleId);
  if (!detailVehicle) {
    throw new ApiError(httpStatus.NOT_FOUND, 'DetailVehicle not found');
  }
  res.send(detailVehicle);
});

const updateDetailVehicle = catchAsync(async (req, res) => {
  const detailVehicle = await selfVehicleService.updateDetailVehicleById(req.params.detailVehicleId, req.body);
  res.send(detailVehicle);
});

const deleteDetailVehicle = catchAsync(async (req, res) => {
  await selfVehicleService.deleteDetailVehicleById(req.params.detailVehicleId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createSelfVehicle,
  getSelfVehicles,
  getSelfVehicle,
  updateSelfVehicle,
  deleteSelfVehicle,
  getDetailVehicles,
  createDetailVehicle,
  getDetailVehicle,
  updateDetailVehicle,
  deleteDetailVehicle,
};
