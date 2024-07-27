import * as paymentService from '../services/payment.service.js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const POSTCheckoutSession = async (req, res, next) => {
  const { id, price, type } = req.body;
  const userId = req.user._id

  try {
    const response = await paymentService.createCheckoutSession({ id, price, type, userId });
    res.status(200).json(response);
  }
  catch (error) {
    next(error)
  }
};

export const POSTWebhook = async (req, res, next) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  }
  catch (error) {
    console.error('Error en la verificación de la firma del webhook:', error.message);
    next(error)
  }

  const { type } = event;
  const data = event.data.object;

  try {
    switch (type) {
      case 'checkout.session.completed':
        await paymentService.handleCheckoutSessionCompleted(data);
        break;
      case 'checkout.session.async_payment_failed':
        await paymentService.handleCheckoutSessionFailed(data);
        break;
      case 'checkout.session.expired':
        await paymentService.handleCheckoutSessionExpired(data);
        break;
      default:
        console.log(`Tipo de evento no manejado: ${type}`);
    }
  }
  catch (error) {
    console.error(`Error manejando el evento ${type}:`, error);
    next(error)
  }
};

export const GETPayments = async (req, res, next) => {
  try {
    const response = await paymentService.findPaymentsAll();
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}