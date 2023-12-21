import { inject } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ArtistService from 'App/Services/Artist/ArtistService'
import ArtistValidator from 'App/Validators/ArtistValidator'

@inject()
export default class ArtistsController {
  constructor(private readonly artistService: ArtistService) {}

  public async index({ request, response }: HttpContextContract) {
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 10)

    const artists = await this.artistService.getAllArtists(page, perPage)

    return response.json(artists)
  }

  public async show({ params, response }: HttpContextContract) {
    const artist = await this.artistService.findArtist(params.id)

    if (!artist) {
      return response.notFound({ message: 'Artist not found' })
    }

    return response.json(artist)
  }

  public async store({ request, response }: HttpContextContract) {
    // Validate incoming data
    await request.validate(ArtistValidator)

    // If validation passes, proceed with creating the artist
    const artistData = request.only(['firstName', 'lastName', 'profilePicture', 'birthDate'])
    const artist = await this.artistService.createArtist(artistData)

    return response.status(201).json(artist)
  }

  public async update({ params, request, response }: HttpContextContract) {
    // Validate incoming data
    await request.validate(ArtistValidator)

    // If validation passes, proceed with updating the artist
    const artistData = request.only(['firstName', 'lastName', 'profilePicture', 'birthDate'])
    const artist = await this.artistService.updateArtist(params.id, artistData)

    if (!artist) {
      return response.notFound({ message: 'Artist not found' })
    }

    return response.json(artist)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const artist = await this.artistService.deleteArtist(params.id)

    if (!artist) {
      return response.notFound({ message: 'Artist not found' })
    }

    return response.noContent()
  }
}
