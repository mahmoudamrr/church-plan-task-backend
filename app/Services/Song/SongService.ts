import Song from 'App/Models/Song'

export default class SongService {
  public async getAllSongs(page: number = 1, perPage: number = 10) {
    return await Song.query().preload('artist').preload('album').paginate(page, perPage)
  }

  public async findSong(id: number) {
    return await Song.query().preload('artist').preload('album').where('id', id).first()
  }

  public async createSong(songData: any) {
    return await Song.create(songData)
  }

  public async updateSong(id: number, songData: any) {
    const song = await Song.findOrFail(id)
    song.merge(songData)
    await song.save()
    return song
  }

  public async deleteSong(id: number) {
    const song = await Song.find(id)

    if (song) {
      await song.delete()
    }

    return song
  }
}
