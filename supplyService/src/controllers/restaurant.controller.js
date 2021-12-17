const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { restaurantService, userService } = require('../services');

const createRestaurant = catchAsync(async (req, res) => {
  const restaurant = await restaurantService.createRestaurant(req.body);
  await userService.updateUserById(req.params.userId, { idRestaurant: restaurant._id });
  res.status(httpStatus.CREATED).send(restaurant);
});

const getRestaurants = catchAsync(async (req, res) => {
  const result = await restaurantService.getRestaurants(req.query);
  res.send(result);
});

const getRestaurant = catchAsync(async (req, res) => {
  const restaurant = await restaurantService.getRestaurantById(req.params.restaurantId);
  if (!restaurant) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Restaurant not found');
  }
  res.send(restaurant);
});

const updateRestaurant = catchAsync(async (req, res) => {
  const restaurant = await restaurantService.updateRestaurantById(req.params.restaurantId, req.body);
  res.send(restaurant);
});

const deleteRestaurant = catchAsync(async (req, res) => {
  await restaurantService.deleteRestaurantById(req.params.restaurantId);
  await restaurantService.deleteAllTablesOfRestaurant(req.params.restaurantId);
  res.status(httpStatus.NO_CONTENT).send();
});

const createTable = catchAsync(async (req, res) => {
  const table = await restaurantService.createTable(req.body);
  await restaurantService.addTableToRestaurant(table._id, req.body.restaurant);
  res.status(httpStatus.CREATED).send(table);
});

const getTables = catchAsync(async (req, res) => {
  const result = await restaurantService.getTables(req.params.restaurantId);
  res.send(result);
});

const getTable = catchAsync(async (req, res) => {
  const table = await restaurantService.getTableById(req.params.tableId);
  if (!table) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Table not found');
  }
  res.send(table);
});

const updateTable = catchAsync(async (req, res) => {
  const table = await restaurantService.updateTableById(req.params.tableId, req.body);
  res.send(table);
});

const deleteTable = catchAsync(async (req, res) => {
  await restaurantService.deleteTableById(req.params.tableId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createRestaurant,
  getRestaurants,
  getRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getTables,
  createTable,
  getTable,
  updateTable,
  deleteTable,
};
