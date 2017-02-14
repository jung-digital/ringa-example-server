import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { List } from '.'
import { Item } from '../item'
import mongoose from 'mongoose';

export const create = ({ bodymen: { body } }, res, next) =>
  List.create(body)
    .then((list) => list.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  List.find(query, select, cursor)
    .then((lists) => lists.map((list) => list.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  List.findById(params.id)
    .then(notFound(res))
    .then((list) => list ? list.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  List.findById(params.id)
    .then(notFound(res))
    .then((list) => {
      body.items = body.items ? body.items.map(item => {
        return typeof item === 'string' ? mongoose.mongo.ObjectId(item) : item;
      }) : [];

      return list ? _.merge(list, body).save() : null
    })
    .then((list) => list ? list.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  List.findById(params.id)
    .then(notFound(res))
    .then((list) => list ? list.remove() : null)
    .then(success(res, 204))
    .catch(next)
