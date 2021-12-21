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

const getDetailVehicles = async (query) => {
  const detailVehicles = await DetailVehicle.find(query).populate('idSelfVehicle').exec();
  return detailVehicles;
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
  await DetailVehicle.remove({ selfVehicle: selfVehicleId }, (err) => {
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

const getDetailVehiclesBySelfVehicle = async (selfVehicleId) => {
  const detailVehiclesId = await SelfVehicle.findById(selfVehicleId).select('vehicles');
  const detailVehicles = await DetailVehicle.find({ _id: detailVehiclesId.vehicles }).populate('idSelfVehicle').exec();
  return detailVehicles;
};

const addDetailVehicleToSelfVehicle = async (detailVehicleId, selfVehicleId) => {
  const selfVehicle = await getSelfVehicleById(selfVehicleId);
  if (!selfVehicle) {
    throw new ApiError(httpStatus.NOT_FOUND, 'SelfVehicle not found');
  }
  const { vehicles } = selfVehicle;
  vehicles.push(detailVehicleId);
  const updateBody = { vehicles };
  Object.assign(selfVehicle, updateBody);
  await selfVehicle.save();
};

const createDetailVehicle = async (detailVehicleBody) => {
  return DetailVehicle.create(detailVehicleBody);
};

const getDetailVehicleById = async (id) => {
  return DetailVehicle.findById(id).populate('idSelfVehicle').exec();
};

const updateDetailVehicleById = async (detailVehicleId, updateBody) => {
  const detailVehicle = await getDetailVehicleById(detailVehicleId);
  if (!detailVehicle) {
    throw new ApiError(httpStatus.NOT_FOUND, 'DetailVehicle not found');
  }
  Object.assign(detailVehicle, updateBody);
  await detailVehicle.save();
  return detailVehicle;
};

const deleteDetailVehicleById = async (detailVehicleId) => {
  const detailVehicle = await getDetailVehicleById(detailVehicleId);
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
  addDetailVehicleToSelfVehicle,
  getDetailVehiclesBySelfVehicle,
  getDetailVehicles,
  createDetailVehicle,
  getDetailVehicleById,
  updateDetailVehicleById,
  deleteDetailVehicleById,
};
