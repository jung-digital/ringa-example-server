import request from 'supertest-as-promised'
import express from '../../services/express'
import routes, { List } from '.'

const app = () => express(routes)

let list

beforeEach(async () => {
  list = await List.create({})
})

test('POST /list 201', async () => {
  const { status, body } = await request(app())
    .post('/')
    .send({ title: 'test', description: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.title).toEqual('test')
  expect(body.description).toEqual('test')
})

test('GET /list 200', async () => {
  const { status, body } = await request(app())
    .get('/')
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /list/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`/${list.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(list.id)
})

test('GET /list/:id 404', async () => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /list/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`/${list.id}`)
    .send({ title: 'test', description: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(list.id)
  expect(body.title).toEqual('test')
  expect(body.description).toEqual('test')
})

test('PUT /list/:id 404', async () => {
  const { status } = await request(app())
    .put('/123456789098765432123456')
    .send({ title: 'test', description: 'test' })
  expect(status).toBe(404)
})

test('DELETE /list/:id 204', async () => {
  const { status } = await request(app())
    .delete(`/${list.id}`)
  expect(status).toBe(204)
})

test('DELETE /list/:id 404', async () => {
  const { status } = await request(app())
    .delete('/123456789098765432123456')
  expect(status).toBe(404)
})
