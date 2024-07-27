import express from 'express';
import * as paymentController from '../controllers/payment.controller.js';
import { isTraveler, requireAuth } from '../middlewares/auth.middlewares.js'

const router = express.Router();

router.post('/create-checkout-session', requireAuth, isTraveler, paymentController.POSTCheckoutSession)

export default router;
