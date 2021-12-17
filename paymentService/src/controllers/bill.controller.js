const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { billService } = require('../services');

const createBill = catchAsync(async (req, res) => {
  const bill = await billService.createBill(req.body);
  // await billService.createBill(req.body);
  // res.send('test');
  res.status(httpStatus.CREATED).send(bill);
});

const getBills = catchAsync(async (req, res) => {
  const result = await billService.getBills(req.query);
  res.send(result);
});

const getBill = catchAsync(async (req, res) => {
  const bill = await billService.getBillById(req.params.billId);
  if (!bill) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Bill not found');
  }
  res.send(bill);
});

const updateBill = catchAsync(async (req, res) => {
  const bill = await billService.updateBillById(req.params.billId, req.body);
  res.send(bill);
});

const deleteBill = catchAsync(async (req, res) => {
  await billService.deleteBillById(req.params.billId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createBill,
  getBills,
  getBill,
  updateBill,
  deleteBill,
};
