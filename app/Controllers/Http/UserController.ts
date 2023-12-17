import { inject } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserService from 'App/Services/User/UserService'

@inject()
export default class UsersController {
  constructor(private readonly userService: UserService) {}

  public async index({ response }: HttpContextContract) {
    const users = await this.userService.getAllUsers()
    return response.json(users)
  }

  public async show({ params, response }: HttpContextContract) {
    const user = await this.userService.findUser(params.id)

    if (!user) {
      return response.notFound({ message: 'User not found' })
    }

    return response.json(user)
  }

  public async store({ request, response }: HttpContextContract) {
    const userData = request.only(['username', 'email', 'password'])
    const user = await this.userService.createUser(userData)

    return response.status(201).json(user)
  }

  public async update({ params, request, response }: HttpContextContract) {
    const userData = request.only(['username', 'email', 'password'])
    const user = await this.userService.updateUser(params.id, userData)

    if (!user) {
      return response.notFound({ message: 'User not found' })
    }

    return response.json(user)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const user = await this.userService.deleteUser(params.id)

    if (!user) {
      return response.notFound({ message: 'User not found' })
    }

    return response.noContent()
  }
}
