import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Song from './Song'
import Artist from './Artist'

export default class Album extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public artistId: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public coverPhoto: string

  @hasMany(() => Song)
  public song: HasMany<typeof Song>

  @belongsTo(() => Artist)
  artist: BelongsTo<typeof Artist>

  @column.dateTime()
  public releaseAt: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
