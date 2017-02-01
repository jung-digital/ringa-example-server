import request from 'supertest-as-promised'
import express from '../../services/express'
import routes, { Item } from '.'

const app = () => express(routes)

let item

beforeEach(async () => {
  item = await Item.create({})
})

test('POST /items 201', async () => {
  const { status, body } = await request(app())
    .post('/')
    .send({ title: 'test', description: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.title).toEqual('test')
  expect(body.description).toEqual('test')
})

test('GET /items 200', async () => {
  const { status, body } = await request(app())
    .get('/')
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /items/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`/${item.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(item.id)
})

test('GET /items/:id 404', async () => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /items/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`/${item.id}`)
    .send({ title: 'test', description: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(item.id)
  expect(body.title).toEqual('test')
  expect(body.description).toEqual('test')
})

test('PUT /items/:id 404', async () => {
  const { status } = await request(app())
    .put('/123456789098765432123456')
    .send({ title: 'test', description: 'test' })
  expect(status).toBe(404)
})

test('DELETE /items/:id 204', async () => {
  const { status } = await request(app())
    .delete(`/${item.id}`)
  expect(status).toBe(204)
})

test('DELETE /items/:id 404', async () => {
  const { status } = await request(app())
    .delete('/123456789098765432123456')
  expect(status).toBe(404)
})
