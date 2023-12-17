import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Album from './Album'
import Artist from './Artist'

export default class Song extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column({ serializeAs: 'artistId' })
  public artistId: number

  @column()
  public albumId: number

  @column()
  public duration: number

  @belongsTo(() => Artist, {
    localKey: 'id',
    foreignKey: 'artistId',
  })
  artist: BelongsTo<typeof Artist>

  @belongsTo(() => Album)
  album: BelongsTo<typeof Album>

  @column.dateTime()
  public releaseAt: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
