import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class UserValidator {
  public schema = schema.create({
    username: schema.string({ trim: true }, [
      rules.required(),
      rules.minLength(3),
      rules.maxLength(255),
    ]),
    email: schema.string({ trim: true }, [
      rules.required(),
      rules.email(),
      rules.maxLength(255),
      rules.unique({ table: 'users', column: 'email' }),
    ]),
    password: schema.string({ trim: true }, [
      rules.required(),
      rules.minLength(6),
      rules.maxLength(255),
    ]),
  })

  public messages = {
    'username.required': 'The username field is required.',
    'username.minLength': 'The username must be at least {{ options.minLength }} characters.',
    'username.maxLength': 'The username cannot be longer than {{ options.maxLength }} characters.',
    'email.required': 'The email field is required.',
    'email.email': 'The email must be a valid email address.',
    'email.maxLength': 'The email cannot be longer than {{ options.maxLength }} characters.',
    'email.unique': 'The email is already in use.',
    'password.required': 'The password field is required.',
    'password.minLength': 'The password must be at least {{ options.minLength }} characters.',
    'password.maxLength': 'The password cannot be longer than {{ options.maxLength }} characters.',
  }
}
