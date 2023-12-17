import Artist from 'App/Models/Artist'


export default class ArtistService {
  public async getAllArtists() {
    return await Artist.query().preload('song').preload('album')
  }

  public async findArtist(id: number) {
    return await Artist.query().preload('song').preload('album').where('id', id).first()
  }

  public async createArtist(artistData: any) {
    return await Artist.create(artistData)
  }

  public async updateArtist(id: number, artistData: any) {
    const artist = await Artist.findOrFail(id)
    artist.merge(artistData)
    await artist.save()
    return artist
  }

  public async deleteArtist(id: number) {
    const artist = await Artist.find(id)

    if (artist) {
      await artist.delete()
    }

    return artist
  }
}
