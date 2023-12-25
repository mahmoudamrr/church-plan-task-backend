import { inject } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AuthService from 'App/Services/Auth/AuthService'
import RegisterValidator from 'App/Validators/RegisterValidator'

@inject()
export default class AuthController {
  constructor(private authService: AuthService) {}

  public async register({ request, response }: HttpContextContract) {
    await request.validate(RegisterValidator)
    try {
      const userData = request.only(['username', 'email', 'password'])
      const user = await this.authService.register(userData)
      return response.json(user)
    } catch (error) {
      return response.status(error.status).json({ message: error.message })
    }
  }

  public async login({ auth, request, response }: HttpContextContract) {
    try {
      const email = request.input('email')
      const password = request.input('password')
      const token = await this.authService.login(auth, email, password)
      return response.json({ token })
    } catch (error) {
      return response.status(error.status).json({ message: error.message })
    }
  }

  public async logout({ auth, response }: HttpContextContract) {
    await this.authService.logout(auth)
    return response.status(204)
  }
}
