const httpStatus = require('http-status');
const { SelfVehicle, DetailVehicle } = require('../models');
const ApiError = require('../utils/ApiError');

const createSelfVehicle = async (selfVehicleBody) => {
  return SelfVehicle.create(selfVehicleBody);
};

const getSelfVehicles = async (query) => {
  const selfVehicles = await SelfVehicle.find(query);
  return selfVehicles;
};

const getSelfVehicleById = async (id) => {
  return SelfVehicle.findById(id);
};

const updateSelfVehicleById = async (selfVehicleId, updateBody) => {
  const selfVehicle = await getSelfVehicleById(selfVehicleId);
  if (!selfVehicle) {
    throw new ApiError(httpStatus.NOT_FOUND, 'SelfVehicle not found');
  }
  Object.assign(selfVehicle, updateBody);
  await selfVehicle.save();
  return selfVehicle;
};

const deleteAllDetailVehiclesOfSelfVehicle = async (selfVehicleId) => {
  await DetailVehicle.remove({ relfVehicle: selfVehicleId }, (err) => {
    if (err) throw new ApiError(httpStatus.NOT_FOUND, `${err}`);
  });
};

const deleteSelfVehicleById = async (selfVehicleId) => {
  const selfVehicle = await getSelfVehicleById(selfVehicleId);
  if (!selfVehicle) {
    throw new ApiError(httpStatus.NOT_FOUND, 'SelfVehicle not found');
  }
  await selfVehicle.remove();
  return selfVehicle;
};

const getDetailVehicles = async (selfVehicleId) => {
  const detailVehiclesId = await SelfVehicle.findById(selfVehicleId).select('detailVehicles');
  const detailVehicles = await DetailVehicle.find({ _id: detailVehiclesId.detailVehicles });
  return detailVehicles;
};

const addRoomToSelfVehicle = async (detailVehicleId, selfVehicleId) => {
  const selfVehicle = await getSelfVehicleById(selfVehicleId);
  if (!selfVehicle) {
    throw new ApiError(httpStatus.NOT_FOUND, 'SelfVehicle not found');
  }
  const { detailVehicles } = selfVehicle;
  detailVehicles.push(detailVehicleId);
  const updateBody = { detailVehicles };
  Object.assign(selfVehicle, updateBody);
  await selfVehicle.save();
};

const createRoom = async (detailVehicleBody) => {
  return DetailVehicle.create(detailVehicleBody);
};

const getRoomById = async (id) => {
  return DetailVehicle.findById(id);
};

const updateRoomById = async (detailVehicleId, updateBody) => {
  const detailVehicle = await getRoomById(detailVehicleId);
  if (!detailVehicle) {
    throw new ApiError(httpStatus.NOT_FOUND, 'DetailVehicle not found');
  }
  Object.assign(detailVehicle, updateBody);
  await detailVehicle.save();
  return detailVehicle;
};

const deleteRoomById = async (detailVehicleId) => {
  const detailVehicle = await getRoomById(detailVehicleId);
  if (!detailVehicle) {
    throw new ApiError(httpStatus.NOT_FOUND, 'DetailVehicle not found');
  }
  await detailVehicle.remove();
  return detailVehicle;
};

module.exports = {
  createSelfVehicle,
  getSelfVehicles,
  getSelfVehicleById,
  updateSelfVehicleById,
  deleteAllDetailVehiclesOfSelfVehicle,
  deleteSelfVehicleById,
  addRoomToSelfVehicle,
  getDetailVehicles,
  createRoom,
  getRoomById,
  updateRoomById,
  deleteRoomById,
};
