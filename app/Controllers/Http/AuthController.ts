import { inject } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AuthService from 'App/Services/Auth/AuthService'

@inject()
export default class AuthController {
  constructor(private authService: AuthService) {}

  public async register({ request, response }: HttpContextContract) {
    const userData = request.only(['username', 'email', 'password'])
    const user = await this.authService.register(userData)
    return response.json(user)
  }

  public async login({ auth, request, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    const token = await this.authService.login(auth, email, password)
    return response.json({ token })
  }

  public async logout({ auth, response }: HttpContextContract) {
    await this.authService.logout(auth)
    return response.status(204)
  }
}
