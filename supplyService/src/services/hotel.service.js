const httpStatus = require('http-status');
const { Hotel, Room } = require('../models');
const ApiError = require('../utils/ApiError');

const createHotel = async (hotelBody) => {
  return Hotel.create(hotelBody);
};

const getHotelByUserId = async (userId) => {
  return Hotel.find({ idUser: userId });
};

const getHotels = async (query) => {
  let hotels = null;
  if (Object.keys(query)[0] === 'sort') {
    const type = Object.values(query)[0];
    switch (type) {
      case 'price-desc': {
        hotels = await Hotel.find().sort({ priceTo: 'desc' }).exec();
        break;
      }
      case 'price-asc': {
        hotels = await Hotel.find().sort({ priceTo: 'asc' }).exec();
        break;
      }
      case 'vote': {
        hotels = await Hotel.find().sort({ vote: 'desc' }).exec();
        break;
      }
      default: {
        hotels = await Hotel.find();
      }
    }
  } else if (Object.keys(query)[0] === 'priceFrom' && Object.keys(query)[1] === 'priceTo') {
    const priceFrom = Number(Object.values(query)[0]);
    const priceTo = Number(Object.values(query)[1]);
    const result = await Hotel.find();
    hotels = result.filter((hotel) => hotel.priceFrom <= priceFrom && hotel.priceTo <= priceTo);
  } else {
    hotels = await Hotel.find(query);
  }
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
  const rooms = await Room.find({ _id: roomsId.rooms }).populate('idHotel').exec();
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

const getRooms = async (query) => {
  let rooms = null;
  if (Object.keys(query)[0] === 'sort') {
    const type = Object.values(query)[0];
    switch (type) {
      case 'price-desc': {
        rooms = await Room.find().sort({ price: 'desc' }).populate('idHotel').exec();
        break;
      }
      case 'price-asc': {
        rooms = await Room.find().sort({ price: 'asc' }).populate('idHotel').exec();
        break;
      }
      default: {
        rooms = await Room.find(query).populate('idHotel').exec();
      }
    }
  } else {
    rooms = await Room.find(query).populate('idHotel').exec();
  }
  return rooms;
};

const getRoomById = async (id) => {
  return Room.findById(id).populate('idHotel').exec();
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
  getHotelByUserId,
};
