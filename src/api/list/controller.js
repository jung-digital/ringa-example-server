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

export const byToken = ({ params: { token } }, res, next) =>
  List.find({'token': {$eq: token}})
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
      list.items = body.items;
      list.items && list.items.forEach((item, ix) => {
        if (typeof item === 'string') {
          body.items.set(ix, mongoose.mongo.ObjectId(item));
        }
      });

      console.log('Saving', body.items);

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
