// test/unit/controllers/ArtistsController.spec.ts
import { test } from '@japa/runner'
import supertest from 'supertest'
import Database from '@ioc:Adonis/Lucid/Database'
import { ArtistFactory } from 'Database/factories/ArtistFactory'

test.group('ArtistsController', (group) => {
  test('before each', async () => {
    // Reset the database before each test
    await Database.beginGlobalTransaction()
  })

  test('after each', async () => {
    // Rollback the database changes after each test
    await Database.rollbackGlobalTransaction()
  })

  test('it should list all artists', async (assert) => {
    await ArtistFactory.createMany(3)

    const response = await supertest(process.env.BASE_URL).get('/v1/artist').expect(200)

    assert.cleanup(response.body)
  })

  test('it should show a specific artist', async (assert) => {
    const artist = await ArtistFactory.create()

    const response = await supertest(process.env.BASE_URL)
      .get(`/v1/artist/${artist.id}`)
      .expect(200)

    assert.cleanup(response.body)
  })

  test('it should create a new artist', async (assert) => {
    const artistData = {
      firstName: 'John',
      lastName: 'Doe',
      profilePicture: 'john-doe.jpg',
      birthDate: '1990-01-01',
    }

    const response = await supertest(process.env.BASE_URL)
      .post('/v1/artist')
      .send(artistData)
      .expect(201)

    assert.cleanup(response.body)

    const createdArtist = await Database.from('artists').where('id', response.body.id).first()
    assert.cleanup(createdArtist)
  })

  test('it should update a specific artist', async (assert) => {
    const artist = await ArtistFactory.create()
    const updatedData = {
      firstName: 'UpdatedFirstName',
      lastName: 'UpdatedLastName',
    }

    await supertest(process.env.BASE_URL)
      .put(`/v1/artist/${artist.id}`)
      .send(updatedData)
      .expect(200)

    const updatedArtist = await Database.from('artists').where('id', artist.id).first()
    assert.cleanup(updatedArtist)
  })

  test('it should delete a specific artist', async (assert) => {
    const artist = await ArtistFactory.create()

    await supertest(process.env.BASE_URL).delete(`/v1/artist/${artist.id}`).expect(204)

    const deletedArtist = await Database.from('artists').where('id', artist.id).first()
    assert.cleanup(deletedArtist)
  })
})
