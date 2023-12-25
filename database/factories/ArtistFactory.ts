import Factory from '@ioc:Adonis/Lucid/Factory'
import Artist from 'App/Models/Artist'
import { DateTime } from 'luxon'

export const ArtistFactory = Factory.define(Artist, ({ faker }) => {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    profilePicture: faker.image.imageUrl(),
    birthDate: DateTime.fromJSDate(faker.date.past()),
  }
}).build()
