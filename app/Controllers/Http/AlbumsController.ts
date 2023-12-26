import { inject } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AlbumService from 'App/Services/Album/AlbumService'
import AlbumValidator from 'App/Validators/AlbumValidator'
import NotFoundException from 'App/Exceptions/NotFoundException'

@inject()
export default class AlbumsController {
  constructor(private readonly albumService: AlbumService) {}

  public async index({ request, response }: HttpContextContract) {
    try {
      const page = request.input('page', 1)
      const perPage = request.input('perPage', 10)

      const albums = await this.albumService.getAllAlbums(page, perPage)
      return response.json(albums)
    } catch (error) {
      return response.status(500).json({ error: 'Internal Server Error' })
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const album = await this.albumService.findAlbum(params.id)
      return response.json(album)
    } catch (error) {
      if (error instanceof NotFoundException) {
        return response.notFound({ message: 'Album not found' })
      }
      return response.status(500).json({ error: 'Internal Server Error' })
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      await request.validate(AlbumValidator)

      const albumData = request.only(['artistId', 'name', 'description', 'coverPhoto', 'releaseAt'])
      const album = await this.albumService.createAlbum(albumData)

      return response.status(201).json(album)
    } catch (error) {
      return response.status(500).json({ error: 'Internal Server Error' })
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    try {
      await request.validate(AlbumValidator)

      const albumData = request.only(['artistId', 'name', 'description', 'coverPhoto', 'releaseAt'])
      const album = await this.albumService.updateAlbum(params.id, albumData)

      if (!album) {
        return response.notFound({ message: 'Album not found' })
      }

      return response.json(album)
    } catch (error) {
      return response.status(500).json({ error: 'Internal Server Error' })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const album = await this.albumService.deleteAlbum(params.id)

      if (!album) {
        return response.notFound({ message: 'Album not found' })
      }

      return response.noContent()
    } catch (error) {
      return response.status(error.status).json({ error: error })
    }
  }

  public async search({ request, response }: HttpContextContract) {
    try {
      const keyword = request.input('keyword', '')
      const page = request.input('page', 1)
      const perPage = request.input('perPage', 10)

      const searchResults = await this.albumService.searchAlbums(keyword, page, perPage)

      return response.json(searchResults)
    } catch (error) {
      return response.status(500).json({ error: 'Internal Server Error' })
    }
  }
}
