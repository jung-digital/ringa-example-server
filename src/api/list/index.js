import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export List, { schema } from './model'

const router = new Router()
const { title, description } = schema.tree

/**
 * @api {post} /list Create list
 * @apiName CreateList
 * @apiGroup List
 * @apiParam title List's title.
 * @apiParam description List's description.
 * @apiSuccess {Object} list List's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 List not found.
 */
router.post('/',
  body({ title, description }),
  create)

/**
 * @api {get} /list Retrieve lists
 * @apiName RetrieveLists
 * @apiGroup List
 * @apiUse listParams
 * @apiSuccess {Object[]} lists List of lists.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /list/:id Retrieve list
 * @apiName RetrieveList
 * @apiGroup List
 * @apiSuccess {Object} list List's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 List not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /list/:id Update list
 * @apiName UpdateList
 * @apiGroup List
 * @apiParam title List's title.
 * @apiParam description List's description.
 * @apiSuccess {Object} list List's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 List not found.
 */
router.put('/:id',
  body({ title, description }),
  update)

/**
 * @api {delete} /list/:id Delete list
 * @apiName DeleteList
 * @apiGroup List
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 List not found.
 */
router.delete('/:id',
  destroy)

export default router
