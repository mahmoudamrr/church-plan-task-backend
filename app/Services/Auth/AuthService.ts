import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hash from '@ioc:Adonis/Core/Hash'
import User from 'App/Models/User'

export default class AuthService {
  public async register(userData: any): Promise<User> {
    const hashedPassword = await Hash.make(userData.password)
    const user = await User.create({ ...userData, password: hashedPassword })
    return user
  }

  public async login(
    auth: HttpContextContract['auth'],
    email: string,
    password: string
  ): Promise<string> {
    const user = await User.findBy('email', email)

    if (!user || !(await Hash.verify(user.password, password))) {
      throw new Error('Invalid credentials')
    }

    const token = await auth.use('api').attempt(email, password)
    return token.toJSON().token
  }

  public async logout(auth: HttpContextContract['auth']): Promise<void> {
    await auth.use('api').logout()
  }
}
