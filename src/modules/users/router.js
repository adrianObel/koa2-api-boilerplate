import { ensureUser } from '../../middleware/validators'
import {
  createUser,
  getUsers,
  getUser
} from './controller'

export default {
  base: '/users',

  /**
   * @api {post} /users Create a new user
   * @apiPermission
   * @apiVersion 1.0.0
   * @apiName CreateUser
   * @apiGroup Users
   *
   * @apiExample Example usage:
   * curl -H "Content-Type: application/json" -X POST -d '{ "user": { "username": "johndoe", "password": "secretpasas" } }' localhost:5000/users
   *
   * @apiParam {Object} user          User object (required)
   * @apiParam {String} user.username Username.
   * @apiParam {String} user.password Password.
   *
   * @apiSuccess {Object}   users           User object
   * @apiSuccess {ObjectId} users._id       User id
   * @apiSuccess {String}   users.name      User name
   * @apiSuccess {String}   users.username  User username
   *
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "user": {
   *          "_id": "56bd1da600a526986cf65c80"
   *          "name": "John Doe"
   *          "username": "johndoe"
   *       }
   *     }
   *
   * @apiError UnprocessableEntity Missing required parameters
   *
   * @apiErrorExample {json} Error-Response:
   *     HTTP/1.1 422 Unprocessable Entity
   *     {
   *       "status": 422,
   *       "error": "Unprocessable Entity"
   *     }
   */
  'Create new users': {
    method: 'POST',
    route: '/',
    controller: createUser
  },

  /**
   * @api {get} /users Get all users
   * @apiPermission user
   * @apiVersion 1.0.0
   * @apiName GetUsers
   * @apiGroup Users
   *
   * @apiExample Example usage:
   * curl -H "Content-Type: application/json" -X GET localhost:5000/users
   *
   * @apiSuccess {Object[]} users           Array of user objects
   * @apiSuccess {ObjectId} users._id       User id
   * @apiSuccess {String}   users.name      User name
   * @apiSuccess {String}   users.username  User username
   *
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "users": [{
   *          "_id": "56bd1da600a526986cf65c80"
   *          "name": "John Doe"
   *          "username": "johndoe"
   *       }]
   *     }
   *
   * @apiUse TokenError
   */
  'Get all users': {
    method: 'GET',
    route: '/',
    controller: getUsers,
    middleware: [
      ensureUser
    ]
  },

  /**
   * @api {get} /users/:id Get user by id
   * @apiPermission user
   * @apiVersion 1.0.0
   * @apiName GetUser
   * @apiGroup Users
   *
   * @apiExample Example usage:
   * curl -H "Content-Type: application/json" -X GET localhost:5000/users/56bd1da600a526986cf65c80
   *
   * @apiSuccess {Object}   users           User object
   * @apiSuccess {ObjectId} users._id       User id
   * @apiSuccess {String}   users.name      User name
   * @apiSuccess {String}   users.username  User username
   *
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "user": {
   *          "_id": "56bd1da600a526986cf65c80"
   *          "name": "John Doe"
   *          "username": "johndoe"
   *       }
   *     }
   *
   * @apiUse TokenError
   */
  'Get a single user': {
    method: 'GET',
    route: '/:id',
    controller: getUser,
    middleware: [
      ensureUser
    ]
  }
}
