import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Album from './Album'
import Song from './Song'

export default class Artist extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public firstName: string

  @column()
  public lastName: string

  @column()
  public profilePicture: string

  @hasMany(() => Song)
  public song: HasMany<typeof Song>

  @hasMany(() => Album)
  public album: HasMany<typeof Album>

  @column.dateTime()
  public birthDate: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
