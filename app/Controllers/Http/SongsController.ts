import { inject } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SongService from 'App/Services/Song/SongService'
import SongValidator from 'App/Validators/SongValidator'

@inject()
export default class SongsController {
  constructor(private readonly songService: SongService) {}

  public async index({ request, response }: HttpContextContract) {
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 10)

    const songs = await this.songService.getAllSongs(page, perPage)
    return response.json(songs)
  }

  public async show({ params, response }: HttpContextContract) {
    const song = await this.songService.findSong(params.id)

    if (!song) {
      return response.notFound({ message: 'Song not found' })
    }

    return response.json(song)
  }

  public async store({ request, response }: HttpContextContract) {
    // Validate incoming data
    await request.validate(SongValidator)

    // If validation passes, proceed with creating the song
    const songData = request.only(['name', 'artistId', 'albumId', 'duration', 'releaseAt'])
    const song = await this.songService.createSong(songData)

    return response.status(201).json(song)
  }

  public async update({ params, request, response }: HttpContextContract) {
    // Validate incoming data
    await request.validate(SongValidator)

    // If validation passes, proceed with updating the song
    const songData = request.only(['name', 'artistId', 'albumId', 'duration', 'releaseAt'])
    const song = await this.songService.updateSong(params.id, songData)

    if (!song) {
      return response.notFound({ message: 'Song not found' })
    }

    return response.json(song)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const song = await this.songService.deleteSong(params.id)

    if (!song) {
      return response.notFound({ message: 'Song not found' })
    }

    return response.noContent()
  }
}
