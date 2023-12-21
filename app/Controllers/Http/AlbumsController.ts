import { inject } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AlbumService from 'App/Services/Album/AlbumService'
import AlbumValidator from 'App/Validators/AlbumValidator'

@inject()
export default class AlbumsController {
  constructor(private readonly albumService: AlbumService) {}

  public async index({ request, response }: HttpContextContract) {
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 10)

    const albums = await this.albumService.getAllAlbums(page, perPage)
    return response.json(albums)
  }

  public async show({ params, response }: HttpContextContract) {
    const album = await this.albumService.findAlbum(params.id)

    if (!album) {
      return response.notFound({ message: 'Album not found' })
    }

    return response.json(album)
  }

  public async store({ request, response }: HttpContextContract) {
    // Validate incoming data
    await request.validate(AlbumValidator)

    // If validation passes, proceed with creating the album
    const albumData = request.only(['artistId', 'name', 'description', 'coverPhoto', 'releaseAt'])
    const album = await this.albumService.createAlbum(albumData)

    return response.status(201).json(album)
  }

  public async update({ params, request, response }: HttpContextContract) {
    // Validate incoming data
    await request.validate(AlbumValidator)

    // If validation passes, proceed with updating the album
    const albumData = request.only(['artistId', 'name', 'description', 'coverPhoto', 'releaseAt'])
    const album = await this.albumService.updateAlbum(params.id, albumData)

    if (!album) {
      return response.notFound({ message: 'Album not found' })
    }

    return response.json(album)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const album = await this.albumService.deleteAlbum(params.id)

    if (!album) {
      return response.notFound({ message: 'Album not found' })
    }

    return response.noContent()
  }
}
