// import { expect } from 'chai'
// import supertest from 'supertest'
// import '../src/config/env.js'
// import { describe } from 'mocha'

// const requester = supertest(process.env.BASE_URL + "/api")

// describe("Testeando metodos de pago: ", () => {

// })

import { expect } from 'chai';
import supertest from 'supertest';
import '../src/config/env.js';

const requester = supertest(process.env.BASE_URL + "/api");

describe("Testeando el flujo de operaciones para Pagos...", () => {

  let token;

  before(async () => {
    // Inicia sesión para obtener el token
    // Este User debe estar creado en la base de datos para q funcione
    const loginData = { email: 'abel2t@gmail.com', password: '12345678' };
    const loginResponse = await requester.post('/user/login').send(loginData);
    token = `Bearer ${loginResponse.body.token}`;
    console.log("Info login= " + token);
  });
  // El id debe estar en la basepara q funcione
  it("Debería crear una sesión de pago", async () => {
    const paymentData = { id: '66a1bc1f090d3b93baac1e8a', price: 1000, type: 'reservation' }; // Reemplaza 'id' con un valor válido
    const response = await requester.post('/payment/create-checkout-session').set('Authorization', token).send(paymentData);
    const { statusCode, body } = response;

    expect(statusCode).to.be.equals(200);
    expect(body).to.have.property('url');
  });
  // El id debe estar en la basepara q funcione
  it("Debería manejar errores durante la creación de sesión de pago", async () => {
    const paymentData = { id: '66a1bc1f090d3b93baac1e8e', price: 1000, type: 'reservation' };
    const response = await requester.post('/payment/create-checkout-session').set('Authorization', token).send(paymentData);
    const { statusCode, body } = response;

    expect(statusCode).to.be.equals(404); //el código de error que la API maneja
    expect(body.message).to.be.equals('El item que se intenta pagar no existe'); //el mensaje de error que la API devuelve
  });

});
