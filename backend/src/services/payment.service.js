import Stripe from 'stripe';
import Payment from '../models/payment.model.js';
import Reservation from '../models/reservation.model.js'
import CustomError from '../utils/custom.error.js'
import dictionary from '../utils/error.dictionary.js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async ({ id, price, type, userId }) => {
  try {
    let item;

    if (type === 'reservation') {
      item = await Reservation.findById(id);
    }
    // else if (type === 'order') {
    //   item = await Order.findById(id);
    // }

    if (!item) return CustomError.new(dictionary.itemNotFound)

    // Crear la sesión de pago en Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: type
          },
          unit_amount: price,
        },
        quantity: 1,
      }],
      mode: 'payment',
      //URL de respuestas => tarea del front
      success_url: `${process.env.FRONT_URL}/success`,
      cancel_url: `${process.env.FRONT_URL}/cancel`,
      metadata: {
        customId: id,
        customType: type,
        userId: userId.toString()
      }
    });

    // Guardar el pago en la base de datos
    const payment = new Payment({
      user: userId,
      sessionId: session.id,
      status: 'pendiente',
      amount: price
    });

    console.log("Pago creado en espera de confirmación: ", payment);
    await Payment.create(payment);

    return { url: session.url };
  }
  catch (error) {
    throw error;
  }
};

export const handleCheckoutSessionCompleted = async (session) => {
  try {
    const payment = await Payment.findOne({ sessionId: session.id });

    if (!payment) return CustomError.new(dictionary.paymentNotFound);

    payment.status = 'confirmado';
    await payment.save();

    const data = session.metadata || {};

    if (data.customType === 'reservation') {
      await Reservation.findByIdAndUpdate(data.customId, { status: 'confirmada', paymentId: payment._id });
    }
    // else if (data.customType === 'order') {
    //   await Order.findByIdAndUpdate(data.customId, { status: 'confirmada' });
    // }

    console.log(`El pago para el item ${data.customId} fue exitoso`);
  } 
  catch (error) {
    console.error(`Error al manejar la sesión de pago: ${error.message}`);
  }
};

export const handleCheckoutSessionFailed = async (session) => {
  try {
    const payment = await Payment.findOne({ sessionId: session.id });

    if (!payment) return CustomError.new(dictionary.paymentNotFound);

    payment.status = 'fallido';
    await payment.save();
  
    console.log(`El pago con sesión ${session.id} ha fallado`);
  } 
  catch (error) {
    console.error(`Error al manejar la sesión de pago fallido: ${error.message}`);
  }
};

export const handleCheckoutSessionExpired = async (session) => {
  try {
    const payment = await Payment.findOne({ sessionId: session.id });

    if (!payment) return CustomError.new(dictionary.paymentNotFound);

    payment.status = 'expirado';
    await payment.save();
  
    console.log(`La sesión de pago ${session.id} ha expirado`);
  } 
  catch (error) {
    console.error(`Error al manejar la expiración de la sesión de pago: ${error.message}`);
  }
};



// export const findOne = async (data) => {
//   try {
//     const payment = Payment.findOne(data);
//     return payment;
//   } catch (error) {
//     throw (error);
//   }
// }

// export const findPaymentsAll = async (data) => {
//   try {
//     const payments = Payment.find();
//     console.log(payments);
//     return payments;
//   } catch (error) {
//     throw (error);
//   }
// }

// export const handlePaymentIntentSucceeded = async (paymentIntent) => {

//   try {
//     const payment = await Payment.findOne({ sessionId: paymentIntent.id });

//     if (!payment) {
//       console.error(`Payment with sessionId ${paymentIntent.id} not found.`);
//       return;
//     }

//     payment.status = 'confirmed';
//     await payment.save();

//     console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);

//     // Actualiza la reserva si es necesario
//     // await Reservation.findByIdAndUpdate(payment.reservation, { status: 'confirmed' });
//   } catch (error) {
//     console.error(`Error handling payment intent: ${error.message}`);
//   }
// };

