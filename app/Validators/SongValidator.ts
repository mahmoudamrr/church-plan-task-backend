import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class SongValidator {
  public schema = schema.create({
    name: schema.string({ trim: true }, [
      rules.required(),
      rules.minLength(2),
      rules.maxLength(255),
    ]),
    artistId: schema.number([rules.required(), rules.exists({ table: 'artists', column: 'id' })]),
    albumId: schema.number([rules.exists({ table: 'albums', column: 'id' })]),
    duration: schema.number(),
    releaseAt: schema.date.optional(),
  })

  public messages = {
    'name.required': 'The name field is required.',
    'name.minLength': 'The name must be at least {{ options.minLength }} characters.',
    'name.maxLength': 'The name cannot be longer than {{ options.maxLength }} characters.',
    'artistId.required': 'The artist ID field is required.',
    'artistId.exists': 'The selected artist does not exist.',
    'albumId.exists': 'The selected album does not exist.',
    'duration.required': 'The duration field is required.',
  }
}
