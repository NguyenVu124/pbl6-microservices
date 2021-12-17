const express = require('express');
const { billController } = require('../controllers');
const auth = require('../middlewares/auth');

const router = express.Router();

router.route('/:userId').get(auth('getBills'), billController.getBills).post(auth('manageBills'), billController.createBill);
// router.route('/:userId').post(billController.createBill);

router
  .route('/:userId/:billId')
  .get(auth('getBills'), billController.getBill)
  .patch(auth('manageBills'), billController.updateBill)
  .delete(auth('manageBills'), billController.deleteBill);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Bill
 *   description: Bill management and retrieval
 */

/**
 * @swagger
 * /bill/{userId}:
 *   get:
 *     summary: Get all Bills by userId
 *     description: Logged in users can fetch only their own user information. Only admins can fetch other users.
 *     tags: [Bill]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *       "401":
 *       "403":
 *       "404":
 *   post:
 *     summary: Create a Bill
 *     description:  Admins and Partner can create Bill
 *     tags: [Bill]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - service
 *               - total
 *               - status
 *               - guest
 *             properties:
 *               service:
 *                 type: string
 *               hotel:
 *                 type: idHotel
 *               restaurant:
 *                 type: idRestaurant
 *               selfVehicle:
 *                 type: idSelfVehicle
 *               additionalFee:
 *                 type: Number
 *               total:
 *                 type: Number
 *               checkIn:
 *                 type: Date
 *               checkOut:
 *                 type: Date
 *               status:
 *                  type: boolean
 *               guest:
 *                  type: idUser
 *               room:
 *                  type: roomId
 *               table:
 *                  type: tableId
 *               detailVehicle:
 *                  type: detailVehicleId
 *             example:
 *               service: hotel
 *               hotel: 23423432432j423432
 *               additionalFee: 2000
 *               total: 3
 *               checkIn: 12/4/2021
 *               checkOut: 15/4/2021
 *               status: false
 *               room: 23984723dukfh
 *               guest: 239asdadsad84723dukfh
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *       "400":
 *       "401":
 *       "403":
 *
 *
 */

/**
 * @swagger
 * /bill/{userId}/{billId}:
 *   get:
 *     summary: Get Bill by userId
 *     description: Logged in users can fetch only their own user information. Only admins can fetch other users.
 *     tags: [Bill]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *       "401":
 *       "403":
 *       "404":
 *
 *   patch:
 *     summary: Update a Bill
 *     description: Logged in users can only update their own information. Only admins can update other users.
 *     tags: [Bill]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *             example:
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *       "400":
 *       "401":
 *       "403":
 *       "404":
 *
 *   delete:
 *     summary: Delete a Bill
 *     description: Logged in users can delete only themselves. Only admins can delete other users.
 *     tags: [Bill]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *       "403":
 *       "404":

 */
