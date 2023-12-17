import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class AlbumValidator {
  public schema = schema.create({
    artistId: schema.number([rules.required(), rules.exists({ table: 'artists', column: 'id' })]),
    name: schema.string({ trim: true }, [
      rules.required(),
      rules.minLength(2),
      rules.maxLength(255),
    ]),
    description: schema.string({ trim: true }, [
      rules.required(),
      rules.minLength(2),
      rules.maxLength(255),
    ]),
    coverPhoto: schema.string.optional({}, [rules.url()]),
    releaseAt: schema.date.optional(),
  })

  public messages = {
    'artistId.required': 'The artist ID field is required.',
    'artistId.exists': 'The selected artist does not exist.',
    'name.required': 'The name field is required.',
    'name.minLength': 'The name must be at least {{ options.minLength }} characters.',
    'name.maxLength': 'The name cannot be longer than {{ options.maxLength }} characters.',
    'description.required': 'The description field is required.',
    'description.minLength': 'The description must be at least {{ options.minLength }} characters.',
    'description.maxLength':
      'The description cannot be longer than {{ options.maxLength }} characters.',
    'coverPhoto.url': 'The cover photo must be a valid URL.',
  }
}
