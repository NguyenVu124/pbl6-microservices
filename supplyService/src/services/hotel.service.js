const httpStatus = require('http-status');
const { Hotel, Room } = require('../models');
const ApiError = require('../utils/ApiError');

const createHotel = async (hotelBody) => {
  return Hotel.create(hotelBody);
};

const getHotels = async (query) => {
  console.log(Object.keys(query)[0]);
  const hotels = await Hotel.find(query);
  return hotels;
};

const getHotelById = async (id) => {
  return Hotel.findById(id);
};

const updateHotelById = async (hotelId, updateBody, file) => {
  const hotel = await getHotelById(hotelId);
  if (updateBody)
    if (!hotel) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Hotel not found');
    }
  if (file) {
    hotel.images.push(`http://localhost:5000/${file.path}`);
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

const getRoomsByHotel = async (hotelId) => {
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

const getRooms = async () => {
  const rooms = await Room.find().populate('idHotel').exec();
  return rooms;
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
  getRoomsByHotel,
  createRoom,
  getRooms,
  getRoomById,
  updateRoomById,
  deleteRoomById,
};
