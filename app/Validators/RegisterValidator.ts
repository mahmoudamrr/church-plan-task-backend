import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class RegisterValidator {
  public schema = schema.create({
    username: schema.string({}, [
      rules.required(),
    ]),
    email: schema.string({}, [
      rules.required(),
      rules.email(),
      rules.unique({ table: 'users', column: 'email' }),
    ]),
    password: schema.string({}, [rules.required(), rules.minLength(8)]),
  })

  public messages = {
    required: 'The {{ field }} field is required.',
    email: 'The {{ field }} must be a valid email address.',
    unique: 'The {{ field }} has already been taken.',
    minLength: 'The {{ field }} must be at least {{ options.minLength }} characters.',
  }
}
