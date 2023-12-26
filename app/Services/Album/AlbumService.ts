import { ModelPaginatorContract } from '@ioc:Adonis/Lucid/Orm'
import Album from 'App/Models/Album'

export default class AlbumService {
  public async getAllAlbums(page: number = 1, perPage: number = 10) {
    return Album.query().preload('artist').preload('song').paginate(page, perPage)
  }

  public async findAlbum(id: number) {
    return Album.query().preload('artist').preload('song').where('id', id).firstOrFail()
  }

  public async searchAlbums(
    search: string,
    page: number = 1,
    perPage: number = 10
  ): Promise<ModelPaginatorContract<Album>> {
    return Album.query()
      .where((query) => {
        query.where('name', 'LIKE', `%${search}%`).orWhere('description', 'LIKE', `%${search}%`)
      })
      .paginate(page, perPage)
  }

  public async createAlbum(albumData: any) {
    return Album.create(albumData)
  }

  public async updateAlbum(id: number, albumData: any) {
    const album = await Album.findOrFail(id)
    album.merge(albumData)
    await album.save()
    return album
  }

  public async deleteAlbum(id: number) {
    const album = await Album.findOrFail(id)

    // Load and delete associated songs
    await album.load('song')
    await Promise.all(album.song.map((song) => song.delete()))

    // Delete the album
    await album.delete()

    return album
  }
}
