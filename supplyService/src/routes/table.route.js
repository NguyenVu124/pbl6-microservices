const express = require('express');
const { restaurantController } = require('../controllers');
const auth = require('../middlewares/auth');

const router = express.Router();

router.route('/:restaurantId/all').get(restaurantController.getTables);

router.route('/table').post(auth('manageTables'), restaurantController.createTable);

router
  .route('/:tableId')
  .get(restaurantController.getTable)
  .patch(auth('manageTables'), restaurantController.updateTable)
  .delete(auth('manageTables'), restaurantController.deleteTable);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Table
 *   description: Table management and retrieval
 */

/**
 * @swagger
 * /table/{restaurantId}/all:
 *   get:
 *     summary: Get all tables of restaurant
 *     description: Logged in users can fetch only their own user information. Only admins can fetch other users.
 *     tags: [Table]
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
 */

/**
 * @swagger
 * /table/{tableId}:
 *   get:
 *     summary: Get a table
 *     description: Logged in users can fetch only their own user information. Only admins can fetch other users.
 *     tags: [Table]
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
 *     summary: Update a table
 *     description: Logged in users can only update their own information. Only admins can update other users.
 *     tags: [Table]
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
 *     summary: Delete a table
 *     description: Logged in users can delete only themselves. Only admins can delete other users.
 *     tags: [Table]
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
 * /table:
 *   post:
 *     summary: Create a table
 *     description:  Admins and Partner can create table
 *     tags: [Table]
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
