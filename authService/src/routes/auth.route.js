const express = require('express');

const validate = require('../middlewares/validate');
const authValidation = require('../validations/auth.validation');
const authController = require('../controllers/auth.controller');
// const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/register', validate(authValidation.register), authController.register);
router.post('/login', validate(authValidation.login), authController.login);
router.post('/logout', validate(authValidation.logout), authController.logout);
router.post('/refresh-tokens', validate(authValidation.refreshTokens), authController.refreshTokens);
// router.post('/reset-password', validate(authValidation.resetPassword), authController.resetPassword);
// router.post('/forgot-password', validate(authValidation.forgotPassword), authController.forgotPassword);
// router.post('/send-verification-email', auth(), authController.sendVerificationEmail);
// router.post('/verify-email', validate(authValidation.verifyEmail), authController.verifyEmail);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register as user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: At least one number and one letter
 *               role:
 *                 type: string
 *                 description: one of two roles [guest, partner]
 *               birth:
 *                 type: Date
 *                 description: include this field when register for guest
 *               phone:
 *                 type: string
 *               typeBusiness:
 *                 type: string
 *                 description: one of three types [hotel, restaurant, self vehicle]; include this field when register for partner
 *               businessIdentifier:
 *                 type: string
 *                 description: include this field when register for partner
 *               isValid:
 *                 type: Boolean
 *                 description: include this field when register for partner
 *               gender:
 *                 type: string
 *                 description: one of two [male or female]; include this field when register for guest
 *               identityNumber:
 *                 type: string
 *                 description: include this field when register for guest
 *             example:
 *                name: Hoàng Nguyên Vũ
 *                email: hoangnguyenvubk@gmail.com
 *                password: nguyenvu124
 *                role: guest
 *                birth: 12/04/2000
 *                phone: 0339878481
 *                gender: male
 *                identityNumber: 191969481
 *     responses:
 *       "201":
 *         description: Created
 *       "400":
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *             example:
 *               email: hoangnguyenvubk@gmail.com
 *               password: nguyenvu124
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                 tokens:
 *       "401":
 *         content:
 *           application/json:
 *             schema:
 *             example:
 *               code: 401
 */

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *             example:
 *               refreshToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWJhYzUzNDk1NGI1NDEzOTgwNmMxMTIiLCJpYXQiOjE1ODkyOTg0ODQsImV4cCI6MTU4OTMwMDI4NH0.m1U63blB0MLej_WfB7yC2FTMnCziif9X8yzwDEfJXAg
 *     responses:
 *       "204":
 *         description: No content
 *       "404":
 */

/**
 * @swagger
 * /auth/refresh-tokens:
 *   post:
 *     summary: Refresh auth tokens
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *             example:
 *               refreshToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWJhYzUzNDk1NGI1NDEzOTgwNmMxMTIiLCJpYXQiOjE1ODkyOTg0ODQsImV4cCI6MTU4OTMwMDI4NH0.m1U63blB0MLej_WfB7yC2FTMnCziif9X8yzwDEfJXAg
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *       "401":
 */

// /**
//  * @swagger
//  * /auth/forgot-password:
//  *   post:
//  *     summary: Forgot password
//  *     description: An email will be sent to reset password.
//  *     tags: [Auth]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - email
//  *             properties:
//  *               email:
//  *                 type: string
//  *                 format: email
//  *             example:
//  *               email: fake@example.com
//  *     responses:
//  *       "204":
//  *         description: No content
//  *       "404":
//  *         $ref: '#/components/responses/NotFound'
//  */

// /**
//  * @swagger
//  * /auth/reset-password:
//  *   post:
//  *     summary: Reset password
//  *     tags: [Auth]
//  *     parameters:
//  *       - in: query
//  *         name: token
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: The reset password token
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - password
//  *             properties:
//  *               password:
//  *                 type: string
//  *                 format: password
//  *                 minLength: 8
//  *                 description: At least one number and one letter
//  *             example:
//  *               password: password1
//  *     responses:
//  *       "204":
//  *         description: No content
//  *       "401":
//  *         description: Password reset failed
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Error'
//  *             example:
//  *               code: 401
//  *               message: Password reset failed
//  */

// /**
//  * @swagger
//  * /auth/send-verification-email:
//  *   post:
//  *     summary: Send verification email
//  *     description: An email will be sent to verify email.
//  *     tags: [Auth]
//  *     security:
//  *       - bearerAuth: []
//  *     responses:
//  *       "204":
//  *         description: No content
//  *       "401":
//  *         $ref: '#/components/responses/Unauthorized'
//  */

// /**
//  * @swagger
//  * /auth/verify-email:
//  *   post:
//  *     summary: verify email
//  *     tags: [Auth]
//  *     parameters:
//  *       - in: query
//  *         name: token
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: The verify email token
//  *     responses:
//  *       "204":
//  *         description: No content
//  *       "401":
//  *         description: verify email failed
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Error'
//  *             example:
//  *               code: 401
//  *               message: verify email failed
//  */
