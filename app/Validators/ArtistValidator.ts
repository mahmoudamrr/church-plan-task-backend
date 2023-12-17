import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class ArtistValidator {
  public schema = schema.create({
    firstName: schema.string({ trim: true }, [
      rules.required(),
      rules.minLength(2),
      rules.maxLength(255),
    ]),
    lastName: schema.string({ trim: true }, [
      rules.required(),
      rules.minLength(2),
      rules.maxLength(255),
    ]),
    profilePicture: schema.string.optional({}, [rules.url()]),
    birthDate: schema.date.optional(),
  })

  public messages = {
    'firstName.required': 'The first name field is required.',
    'firstName.minLength': 'The first name must be at least {{ options.minLength }} characters.',
    'firstName.maxLength':
      'The first name cannot be longer than {{ options.maxLength }} characters.',
    'lastName.required': 'The last name field is required.',
    'lastName.minLength': 'The last name must be at least {{ options.minLength }} characters.',
    'lastName.maxLength': 'The last name cannot be longer than {{ options.maxLength }} characters.',
    'profilePicture.url': 'The profile picture must be a valid URL.',
  }
}
