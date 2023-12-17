import { inject } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ArtistService from 'App/Services/Artist/ArtistService'


@inject()
export default class ArtistsController {
  constructor(private readonly artistService: ArtistService) {}

  public async index({ response }: HttpContextContract) {
    const artists = await this.artistService.getAllArtists()
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
    const artistData = request.only(['firstName', 'lastName', 'profilePicture', 'birthDate'])
    const artist = await this.artistService.createArtist(artistData)

    return response.status(201).json(artist)
  }

  public async update({ params, request, response }: HttpContextContract) {
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
