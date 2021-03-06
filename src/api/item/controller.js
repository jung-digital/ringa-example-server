import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { Item } from '.'
import { List } from '../list'

export const create = ({ bodymen: { body } }, res, next) =>
  Item.create(body)
    .then((item) => item.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Item.find(query, select, cursor)
    .then((items) => items.map((item) => item.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Item.findByIds(params.ids.split(','))
    .then(notFound(res))
    .then((items) => items ? items.map(item => item.view()) : null)
    .then(success(res))
    .catch(next)

export const forList = ({params, bodymen: { body } }, res, next) =>
  List.findById(params.listId)
    .then(result => Item.findByIds(result.items))
    .then(items => items.map((item) => item.view()))
    .then(notFound(res))
    .then((item) => item ? item.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Item.findById(params.id)
    .then(notFound(res))
    .then((item) => item ? _.merge(item, body).save() : null)
    .then((item) => item ? item.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Item.findById(params.id)
    .then(notFound(res))
    .then((item) => item ? item.remove() : null)
    .then(success(res, 204))
    .catch(next)
