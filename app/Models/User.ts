import { BaseModel, HasOne, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Artist from './Artist'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public username: string

  @column()
  public email: string

  @column()
  public password: string

  @hasOne(() => Artist)
  public artist: HasOne<typeof Artist>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
