const httpStatus = require('http-status');
const { Restaurant, Table } = require('../models');
const ApiError = require('../utils/ApiError');

const createRestaurant = async (restaurantBody) => {
  return Restaurant.create(restaurantBody);
};

const getRestaurants = async () => {
  const restaurants = await Restaurant.find();
  return restaurants;
};

const getRestaurantById = async (id) => {
  return Restaurant.findById(id);
};

const updateRestaurantById = async (restaurantId, updateBody) => {
  const restaurant = await getRestaurantById(restaurantId);
  if (!restaurant) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Restaurant not found');
  }
  Object.assign(restaurant, updateBody);
  await restaurant.save();
  return restaurant;
};

const deleteAllTablesOfRestaurant = async (restaurantId) => {
  await Table.remove({ restaurant: restaurantId }, (err) => {
    if (err) throw new ApiError(httpStatus.NOT_FOUND, `${err}`);
  });
};

const deleteRestaurantById = async (restaurantId) => {
  const restaurant = await getRestaurantById(restaurantId);
  if (!restaurant) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Restaurant not found');
  }
  await restaurant.remove();
  return restaurant;
};

const getTables = async (restaurantId) => {
  const tablesId = await Restaurant.findById(restaurantId).select('tables');
  const tables = await Table.find({ _id: tablesId.tables });
  return tables;
};

const addRoomToRestaurant = async (tableId, restaurantId) => {
  const restaurant = await getRestaurantById(restaurantId);
  if (!restaurant) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Restaurant not found');
  }
  const { tables } = restaurant;
  tables.push(tableId);
  const updateBody = { tables };
  Object.assign(restaurant, updateBody);
  await restaurant.save();
};

const createRoom = async (tableBody) => {
  return Table.create(tableBody);
};

const getRoomById = async (id) => {
  return Table.findById(id);
};

const updateRoomById = async (tableId, updateBody) => {
  const table = await getRoomById(tableId);
  if (!table) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Table not found');
  }
  Object.assign(table, updateBody);
  await table.save();
  return table;
};

const deleteRoomById = async (tableId) => {
  const table = await getRoomById(tableId);
  if (!table) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Table not found');
  }
  await table.remove();
  return table;
};

module.exports = {
  createRestaurant,
  getRestaurants,
  getRestaurantById,
  updateRestaurantById,
  deleteAllTablesOfRestaurant,
  deleteRestaurantById,
  addRoomToRestaurant,
  getTables,
  createRoom,
  getRoomById,
  updateRoomById,
  deleteRoomById,
};
