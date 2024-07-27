import { expect } from 'chai'
import supertest from 'supertest'
import '../src/config/env.js'

const requester = supertest(process.env.BASE_URL + "/api")

describe("Testeando un flujo de operaciones para Restaurants...", () => {

  // Declaro variables cuyo valor voy a completar de acuerdo a las respuestas de MongoDB
  let token
  let restaurantId
  let userId

  const email = "merchant-test@gmail.com"
  const password = "12345678"

  it("Debería registrar un usuario merchant", async () => {
    const data = { username: "Test de Merchant", email, password, role: "merchant" }
    const response = await requester.post('/user/register').send(data)
    const { statusCode, body } = response
    expect(statusCode).to.be.equals(201)
    expect(body).to.have.property('_id');

    userId = body._id
  })

  it("Debería iniciar sesión", async () => {
    const data = { email, password }
    const response = await requester.post('/user/login').send(data)
    const { statusCode, body } = response
    expect(statusCode).to.be.equals(200)
    expect(body).to.have.property('token');

    // El token con el jwt del usuario
    token = "Bearer " + body.token
  })

  it("Debería crear un restaurante", async () => {
    const data = {
      title: "Restaurant de prueba",
      description: "Este es un restaurante de prueba",
      location: [-58.98494, -34.45158],
      reservationPrice: 100,
      cuisine: ["Parrilla", "Pastas"]
    }
    const response = await requester.post('/restaurants').set('Authorization', token).send(data)
    const { statusCode, body } = response
    expect(statusCode).to.be.equals(201)
    expect(body).to.include.all.keys('id', 'title', 'description', 'location');
    expect(body.photos).to.be.an('array').that.is.empty

    restaurantId = body.id
  })

  it("Debería modificar un restaurante", async () => {
    const data = { reservationPrice: 150 }
    const response = await requester.put('/restaurants').set('Authorization', token).send(data)
    const { statusCode, body } = response
    expect(statusCode).to.be.equals(200)
    expect(body.reservationPrice).to.be.equals(150)
  })

  // it("Debería agregar fotos al restaurante", async () => {
  //   const response = await requester.post('/restaurants/photos').set('Authorization', token)
  //     .attach('photos', './test/images/photo1.jpg')
  //     .attach('photos', './test/images/photo2.jpg')
  //   const { statusCode, body } = response
  //   expect(statusCode).to.be.equals(200)
  //   expect(body.message).to.be.equals('Imágenes subidas exitosamente')
  // })

  it("Debería eliminar el restaurante", async () => {
    const response = await requester.delete('/restaurants').set('Authorization', token)
    const { statusCode, body } = response
    expect(statusCode).to.be.equals(200)
    expect(body.response).to.be.equals(`Restaurante ${restaurantId} eliminado`)
  })

  it("Debería eliminar al usuario", async () => {
    const response = await requester.delete('/user/destroy').set('Authorization', token)
    const { body, statusCode } = response
    expect(statusCode).to.be.equals(200)
    expect(body.response).to.be.equals(`Usuario ${userId} eliminado`)
  })
})