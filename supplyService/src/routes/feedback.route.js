const express = require('express');
const { feedbackController } = require('../controllers');
const auth = require('../middlewares/auth');

const router = express.Router();

router.route('/:userId').get(feedbackController.getFeedbacksByUserId);
router.route('/:service/:serviceId').get(feedbackController.getFeedbacksByServiceId).post(feedbackController.createFeedback);
// auth('manageFeedbacks'),

router
  .route('/:feedbackId')
  .get(feedbackController.getFeedback)
  .patch(auth('manageFeedbacks'), feedbackController.updateFeedback)
  .delete(auth('manageFeedbacks'), feedbackController.deleteFeedback);
module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Feedback
 *   description: Feedback management and retrieval
 */

/**
 * @swagger
 * /feedback/{userId}:
 *   get:
 *     summary: Get a feedback
 *     description: Logged in users can fetch only their own user information. Only admins can fetch other users.
 *     tags: [Feedback]
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
 *             schema
 *       "401":
 *       "403":
 *       "404":
 *
 */

/**
 * @swagger
 * /feedback/{service}/{serviceId}:
 *   get:
 *     summary: Get feedback by service
 *     description: Logged in users can fetch only their own user information. Only admins can fetch other users.
 *     tags: [Feedback]
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
 *   post:
 *     summary: Create a feedback
 *     description:  Admins and Partner can create Feedback
 *     tags: [Feedback]
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
 *               - vote
 *               - idUser
 *               - idRestaurant
 *               - idSelfVehicle
 *               - idHotel
 *             properties:
 *               service:
 *                 type: string
 *               vote:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               comment:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: At least one number and one letter
 *               idUser:
 *                  type: idUser
 *               idRestaurant:
 *                  type: idRestaurant
 *               idSelfVehicle:
 *                  type: idSelfVehicle
 *               idHotel:
 *                  type: idHotel
 *             example:
 *               service: hotel
 *               comment: ok
 *               vote: 4
 *               idUser: 61af6a598a479b6e18d60505
 *               idHotel: 61af6cff4d52068d26112109
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

/**
 * @swagger
 * /feedback/{feedbackId}:
 *   get:
 *     summary: Get a feedback
 *     description: Logged in users can fetch only their own user information. Only admins can fetch other users.
 *     tags: [Feedback]
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
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a feedback
 *     description: Logged in users can only update their own information. Only admins can update other users.
 *     tags: [Feedback]
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
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a feedback
 *     description: Logged in users can delete only themselves. Only admins can delete other users.
 *     tags: [Feedback]
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
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
