const express = require('express');
const { selfVehicleController } = require('../controllers');
const auth = require('../middlewares/auth');

const router = express.Router();

router.route('/:selfVehicleId/all').get(selfVehicleController.getDetailVehicles);

router.route('/').post(auth('manageDetailVehicles'), selfVehicleController.createDetailVehicle);

router
  .route('/:detailVehicleId')
  .get(selfVehicleController.getDetailVehicle)
  .patch(auth('manageDetailVehicles'), selfVehicleController.updateDetailVehicle)
  .delete(auth('manageDetailVehicles'), selfVehicleController.deleteDetailVehicle);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: DetailVehicle
 *   description: DetailVehicle management and retrieval
 */

/**
 * @swagger
 * /detailVehicle/{selfVehicleId}/all:
 *   get:
 *     summary: Get all vehicles of selfVehicle
 *     description: Logged in users can fetch only their own user information. Only admins can fetch other users.
 *     tags: [DetailVehicle]
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
 */

/**
 * @swagger
 * /detailVehicle/{detailVehicleId}:
 *   get:
 *     summary: Get a detailVehicle
 *     description: Logged in users can fetch only their own user information. Only admins can fetch other users.
 *     tags: [DetailVehicle]
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
 *     summary: Update a detailVehicle
 *     description: Logged in users can only update their own information. Only admins can update other users.
 *     tags: [DetailVehicle]
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
 *     summary: Delete a detailVehicle
 *     description: Logged in users can delete only themselves. Only admins can delete other users.
 *     tags: [DetailVehicle]
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

/**
 * @swagger
 * /detailVehicle:
 *   post:
 *     summary: Create a detailVehicle
 *     description:  Admins and Partner can create detailVehicle
 *     tags: [DetailVehicle]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *             properties:
 *             example:
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
 */
