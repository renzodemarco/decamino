import express from 'express';
import cors from 'cors';
import connection from './config/db.connection.js';
import { injectUser } from './middlewares/auth.middlewares.js';
import testRoutes from './routes/test.routes.js';
import userRoutes from './routes/user.routes.js';
import paymentRoutes from './routes/payment.routes.js';
import restaurantRoutes from './routes/restaurant.routes.js';
import osmRoutes from './routes/osm.routes.js';
import routeRoutes from './routes/route.routes.js';
import reviewRoutes from './routes/review.routes.js';
import reservationRoutes from './routes/reservation.routes.js';
import errorHandler from './middlewares/error.handler.middleware.js'
import notFoundHandler from './middlewares/not.found.handler.js'
import { POSTWebhook } from './controllers/payment.controller.js';

// Declaración de la variable app para usar express
const app = express()

// Declaración del puerto que se va a utilizar
const PORT = process.env.PORT || 8080

// Ruta de webhook antes de body-parser debe estar aca, mas abajo no funciona
app.post('/api/payment/webhook', express.raw({ type: 'application/json' }), POSTWebhook);

// Se agregan estos dos métodos para que express pueda leer formularios y json
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Se habilita cors para que se pueda consumir la api desde distintos dominios
app.use(cors())

// Middleware que inyecta la info del user (que viene a través del jwt en headers) en req.user para poder acceder a esta info en el resto de la ejecución de la api
app.use(injectUser)

// Este endpoint da un mensaje de bienvenida
app.get('/', (req, res) => res.status(200).json({ message: '¡Bienvenido a DeCamino!' }))

// Declaración de endpoints llamando a routes
app.use('/api/test', testRoutes);
app.use('/api/user', userRoutes);
app.use('/api/osm', osmRoutes);
app.use('/api/routes', routeRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/reservations', reservationRoutes);

// Manejador de errores
app.use(errorHandler);

// Manejador de errores 404 (endpoints no encontrados)
app.use(notFoundHandler);

// Comienzo del listening para conectar con MongoDB y correr express en el puerto previamente declarado
app.listen(PORT, async () => {
  await connection()
  console.log("Server listening on PORT ❤️ 🔥🔥: " + PORT);
})

