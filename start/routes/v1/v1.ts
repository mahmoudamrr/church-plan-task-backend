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
    //Artist Routes
  }).prefix('/artist')

  /**
   * Artist Group Routes
   */
  Route.group(() => {
    //Song Routes
  }).prefix('/song')

  /**
   * Album Group Routes
   */

  Route.group(() => {
    //Album Routes
  }).prefix('/album')
}).prefix('/v1')
