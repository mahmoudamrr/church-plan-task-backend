import { Exception } from '@poppinss/utils'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UnAuthorizedException extends Exception {
  constructor(message: string) {
    super(message, 401, 'E_UNAUTHORIZED')
  }

  public async handle(error: this, { response }: HttpContextContract) {
    response.status(error.status).json({ message: error.message })
  }
}
