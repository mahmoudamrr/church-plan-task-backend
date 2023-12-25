import { inject } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ArtistService from 'App/Services/Artist/ArtistService'
import ArtistValidator from 'App/Validators/ArtistValidator'
import NotFoundException from 'App/Exceptions/NotFoundException'

@inject()
export default class ArtistsController {
  constructor(private readonly artistService: ArtistService) {}

  public async index({ request, response }: HttpContextContract) {
    try {
      const page = request.input('page', 1)
      const perPage = request.input('perPage', 10)

      const artists = await this.artistService.getAllArtists(page, perPage)

      return response.json(artists)
    } catch (error) {
      return response.status(500).json({ error: 'Internal Server Error' })
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const artist = await this.artistService.findArtist(params.id)
      return response.json(artist)
    } catch (error) {
      console.error('Error in show method:', error)
      if (error instanceof NotFoundException) {
        return response.notFound({ message: 'Artist not found' })
      }
      return response.status(500).json({ error: 'Internal Server Error' })
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      await request.validate(ArtistValidator)
      const artistData = request.only(['firstName', 'lastName', 'profilePicture', 'birthDate'])
      const artist = await this.artistService.createArtist(artistData)
      return response.status(201).json(artist)
    } catch (error) {
      console.error('Error in store method:', error)
      return response.status(500).json({ error: 'Internal Server Error' })
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    try {
      // Validate incoming data
      await request.validate(ArtistValidator)

      // If validation passes, proceed with updating the artist
      const artistData = request.only(['firstName', 'lastName', 'profilePicture', 'birthDate'])
      const artist = await this.artistService.updateArtist(params.id, artistData)

      if (!artist) {
        return response.notFound({ message: 'Artist not found' })
      }

      return response.json(artist)
    } catch (error) {
      console.error('Error in update method:', error)
      return response.status(500).json({ error: 'Internal Server Error' })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const artist = await this.artistService.deleteArtist(params.id)

      if (!artist) {
        return response.notFound({ message: 'Artist not found' })
      }

      return response.noContent()
    } catch (error) {
      console.error('Error in destroy method:', error)
      return response.status(error.status).json({ error: error })
    }
  }
}
