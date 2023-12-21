import Album from 'App/Models/Album'

export default class AlbumService {
  public async getAllAlbums(page: number = 1, perPage: number = 10) {
    return await Album.query().preload('artist').preload('song').paginate(page, perPage)
  }

  public async findAlbum(id: number) {
    return await Album.query().preload('artist').preload('song').where('id', id).first()
  }

  public async createAlbum(albumData: any) {
    return await Album.create(albumData)
  }

  public async updateAlbum(id: number, albumData: any) {
    const album = await Album.findOrFail(id)
    album.merge(albumData)
    await album.save()
    return album
  }

  public async deleteAlbum(id: number) {
    const album = await Album.find(id)

    if (album) {
      await album.delete()
    }

    return album
  }
}
