/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file.
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  /**
   * Artist Group Routes
   */
  Route.group(() => {
    Route.get('/', 'ArtistsController.index')
    Route.get('/:id', 'ArtistsController.show')
    Route.post('/', 'ArtistsController.store')
    Route.put('/:id', 'ArtistsController.update')
    Route.delete('/:id', 'ArtistsController.destroy')
  })
    .prefix('/artist')
    .middleware('auth')

  /**
   * Song Group Routes
   */
  Route.group(() => {
    Route.get('/', 'SongsController.index')
    Route.get('/:id', 'SongsController.show')
    Route.post('/', 'SongsController.store')
    Route.put('/:id', 'SongsController.update')
    Route.delete('/:id', 'SongsController.destroy')
  })
    .prefix('/song')
    .middleware('auth')

  /**
   * Album Group Routes
   */
  Route.group(() => {
    Route.get('/', 'AlbumsController.index')
    Route.get('/:id', 'AlbumsController.show')
    Route.post('/', 'AlbumsController.store')
    Route.put('/:id', 'AlbumsController.update')
    Route.delete('/:id', 'AlbumsController.destroy')
  })
    .prefix('/album')
    .middleware('auth')

  /**
   * User Group Routes
   */
  Route.group(() => {
    Route.get('/', 'UsersController.index')
    Route.get('/:id', 'UsersController.show')
    Route.post('/', 'UsersController.store')
    Route.put('/:id', 'UsersController.update')
    Route.delete('/:id', 'UsersController.destroy')
  })
    .prefix('/user')
    .middleware('auth')

  /**
   * Auth Group Routes
   */
  Route.group(() => {
    Route.post('/register', 'AuthController.register')
    Route.post('/login', 'AuthController.login')
    Route.post('/logout', 'AuthController.logout')
  }).prefix('/auth')
}).prefix('/v1')
