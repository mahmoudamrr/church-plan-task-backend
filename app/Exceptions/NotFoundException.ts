import { Exception } from '@poppinss/utils'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class NotFoundException extends Exception {
  constructor(message: string) {
    super(message, 404, 'E_NOTFOUND')
  }

  public async handle(error: this, { response }: HttpContextContract) {
    response.status(error.status).json({ message: error.message })
  }
}
