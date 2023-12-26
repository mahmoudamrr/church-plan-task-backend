import { ModelPaginatorContract } from '@ioc:Adonis/Lucid/Orm'
import Song from 'App/Models/Song'
export default class SongService {
  public async getAllSongs(page: number = 1, perPage: number = 10) {
    return Song.query().preload('artist').preload('album').paginate(page, perPage)
  }

  public async findSong(id: number) {
    return Song.query().preload('artist').preload('album').where('id', id).firstOrFail()
  }

  public async searchSongs(
    search: string,
    page: number = 1,
    perPage: number = 10
  ): Promise<ModelPaginatorContract<Song>> {
    return Song.query().where('name', 'LIKE', `%${search}%`).paginate(page, perPage)
  }

  public async createSong(songData: any) {
    return Song.create(songData)
  }

  public async updateSong(id: number, songData: any) {
    const song = await Song.findOrFail(id)
    song.merge(songData)
    await song.save()
    return song
  }

  public async deleteSong(id: number) {
    const song = await Song.findOrFail(id)
    await song.delete()
    return song
  }
}
