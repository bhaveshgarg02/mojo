'use strict'

/** @type {typeof import('@adonisjs/core/build/standalone')} */
const Env = use('Env')

module.exports = {
  /*
  |--------------------------------------------------------------------------
  | Allow Origin
  |--------------------------------------------------------------------------
  |
  | List of origins that are allowed to access the resources. You can use
  | `*` to allow requests from any origin. Make sure to use `*` only for
  | development purposes.
  |
  */
  origin: Env.get('CORS_ORIGIN', '*'),

  /*
  |--------------------------------------------------------------------------
  | Allow Methods
  |--------------------------------------------------------------------------
  |
  | List of HTTP methods that are allowed to be used in the requests. You
  | can use `*` to allow any method.
  |
  */
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],

  /*
  |--------------------------------------------------------------------------
  | Allow Headers
  |--------------------------------------------------------------------------
  |
  | List of headers that are allowed to be used in the request. You can use
  | `*` to allow any header.
  |
  */
  headers: ['content-type', 'authorization', 'accept'],

  /*
  |--------------------------------------------------------------------------
  | Expose Headers
  |--------------------------------------------------------------------------
  |
  | List of headers that are exposed to the client.
  |
  */
  exposeHeaders: [],

  /*
  |--------------------------------------------------------------------------
  | Max Age
  |--------------------------------------------------------------------------
  |
  | Max age for the CORS preflight request.
  |
  */
  maxAge: 90,
}
