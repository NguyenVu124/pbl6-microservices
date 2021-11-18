const httpStatus = require('http-status');
const mongoose = require('mongoose');
const { Hotel, Room } = require('../models');
const ApiError = require('../utils/ApiError');

const createHotel = async (hotelBody) => {
  return Hotel.create(hotelBody);
};

const getHotels = async () => {
  const hotels = await Hotel.find();
  return hotels;
};

const getHotelById = async (id) => {
  return Hotel.findById(id);
};

const updateHotelById = async (hotelId, updateBody) => {
  const hotel = await getHotelById(hotelId);
  if (!hotel) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Hotel not found');
  }
  Object.assign(hotel, updateBody);
  await hotel.save();
  return hotel;
};

const deleteAllRoomsOfHotel = async (hotelId) => {
  await Room.remove({ hotel: hotelId }, (err) => {
    if (err) throw new ApiError(httpStatus.NOT_FOUND, `${err}`);
  });
};

const deleteHotelById = async (hotelId) => {
  const hotel = await getHotelById(hotelId);
  if (!hotel) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Hotel not found');
  }
  await hotel.remove();
  return hotel;
};

const getRooms = async (hotelId) => {
  const roomsId = await Hotel.findById(hotelId).select('rooms');
  const rooms = await Room.find({ _id: roomsId.rooms });
  return rooms;
};

const addRoomToHotel = async (roomId, hotelId) => {
  const hotel = await getHotelById(hotelId);
  if (!hotel) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Hotel not found');
  }
  const { rooms } = hotel;
  rooms.push(roomId);
  const updateBody = { rooms };
  Object.assign(hotel, updateBody);
  await hotel.save();
};

const createRoom = async (roomBody) => {
  return Room.create(roomBody);
};

const getRoomById = async (id) => {
  return Room.findById(id);
};

const updateRoomById = async (roomId, updateBody) => {
  const room = await getRoomById(roomId);
  if (!room) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Room not found');
  }
  Object.assign(room, updateBody);
  await room.save();
  return room;
};

const deleteRoomById = async (roomId) => {
  const room = await getRoomById(roomId);
  if (!room) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Room not found');
  }
  await room.remove();
  return room;
};

module.exports = {
  createHotel,
  getHotels,
  getHotelById,
  updateHotelById,
  deleteAllRoomsOfHotel,
  deleteHotelById,
  addRoomToHotel,
  getRooms,
  createRoom,
  getRoomById,
  updateRoomById,
  deleteRoomById,
};
