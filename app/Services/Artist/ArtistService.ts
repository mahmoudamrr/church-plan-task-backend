import Artist from 'App/Models/Artist'
import { ModelPaginatorContract } from '@ioc:Adonis/Lucid/Orm'

export default class ArtistService {
  public async getAllArtists(
    page: number = 1,
    perPage: number = 10
  ): Promise<ModelPaginatorContract<Artist>> {
    return Artist.query().preload('song').preload('album').paginate(page, perPage)
  }

  public async findArtist(id: number): Promise<Artist> {
    return Artist.query().preload('song').preload('album').where('id', id).firstOrFail()
  }

  public async createArtist(artistData: any): Promise<Artist> {
    return Artist.create(artistData)
  }

  public async updateArtist(id: number, artistData: any): Promise<Artist> {
    const artist = await Artist.findOrFail(id)
    artist.merge(artistData)
    await artist.save()
    return artist
  }

  public async deleteArtist(id: number): Promise<Artist> {
    const artist = await Artist.findOrFail(id)

    await artist.load('song')
    await artist.load('album')
    await Promise.all(artist.song.map((song) => song.delete()))
    await Promise.all(artist.album.map((album) => album.delete()))

    await artist.delete()

    return artist
  }
}
