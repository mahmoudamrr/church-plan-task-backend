import { inject } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SongService from 'App/Services/Song/SongService'
import SongValidator from 'App/Validators/SongValidator'
import NotFoundException from 'App/Exceptions/NotFoundException'

@inject()
export default class SongsController {
  constructor(private readonly songService: SongService) {}

  public async index({ request, response }: HttpContextContract) {
    try {
      const page = request.input('page', 1)
      const perPage = request.input('perPage', 10)

      const songs = await this.songService.getAllSongs(page, perPage)
      return response.json(songs)
    } catch (error) {
      return response.status(500).json({ error: 'Internal Server Error' })
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const song = await this.songService.findSong(params.id)
      return response.json(song)
    } catch (error) {
      if (error instanceof NotFoundException) {
        return response.notFound({ message: 'Song not found' })
      }
      return response.status(500).json({ error: 'Internal Server Error' })
    }
  }

  public async store({ request, response }: HttpContextContract) {
    await request.validate(SongValidator)
    try {
      const songData = request.only(['name', 'artistId', 'albumId', 'duration', 'releaseAt'])
      const song = await this.songService.createSong(songData)

      return response.status(201).json(song)
    } catch (error) {
      console.error('Error in store method:', error)
      return response.status(500).json({ error: 'Internal Server Error' })
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    await request.validate(SongValidator)
    try {
      // If validation passes, proceed with updating the song
      const songData = request.only(['name', 'artistId', 'albumId', 'duration', 'releaseAt'])
      const song = await this.songService.updateSong(params.id, songData)

      if (!song) {
        return response.notFound({ message: 'Song not found' })
      }

      return response.json(song)
    } catch (error) {
      return response.status(500).json({ error: 'Internal Server Error' })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const song = await this.songService.deleteSong(params.id)

      if (!song) {
        return response.notFound({ message: 'Song not found' })
      }

      return response.noContent()
    } catch (error) {
      return response.status(error.status).json({ error: error })
    }
  }
}
