const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { hotelService, userService } = require('../services');

const createHotel = catchAsync(async (req, res) => {
  const hotel = await hotelService.createHotel(req.body);
  await userService.updateUserById(req.params.userId, { idHotel: hotel._id });
  res.status(httpStatus.CREATED).send(hotel);
});

const getHotels = catchAsync(async (req, res) => {
  const result = await hotelService.getHotels(req.query);
  res.send(result);
});

const getHotel = catchAsync(async (req, res) => {
  const hotel = await hotelService.getHotelById(req.params.hotelId);
  if (!hotel) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Hotel not found');
  }
  res.send(hotel);
});

const updateHotel = catchAsync(async (req, res) => {
  const hotel = await hotelService.updateHotelById(req.params.hotelId, req.body, req.file);
  res.send(hotel);
});

const deleteHotel = catchAsync(async (req, res) => {
  await hotelService.deleteHotelById(req.params.hotelId);
  await hotelService.deleteAllRoomsOfHotel(req.params.hotelId);
  res.status(httpStatus.NO_CONTENT).send();
});

const createRoom = catchAsync(async (req, res) => {
  const room = await hotelService.createRoom(req.body);
  await hotelService.addRoomToHotel(room._id, req.body.idHotel);
  res.status(httpStatus.CREATED).send(room);
});
const getRooms = catchAsync(async (req, res) => {
  const result = await hotelService.getRooms();
  res.send(result);
});

const getRoomsByHotel = catchAsync(async (req, res) => {
  const result = await hotelService.getRoomsByHotel(req.params.hotelId);
  res.send(result);
});

const getRoom = catchAsync(async (req, res) => {
  const room = await hotelService.getRoomById(req.params.roomId);
  if (!room) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Room not found');
  }
  res.send(room);
});

const updateRoom = catchAsync(async (req, res) => {
  const room = await hotelService.updateRoomById(req.params.roomId, req.body);
  res.send(room);
});

const deleteRoom = catchAsync(async (req, res) => {
  await hotelService.deleteRoomById(req.params.roomId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createHotel,
  getHotels,
  getHotel,
  updateHotel,
  deleteHotel,
  getRoomsByHotel,
  createRoom,
  getRooms,
  getRoom,
  updateRoom,
  deleteRoom,
};
