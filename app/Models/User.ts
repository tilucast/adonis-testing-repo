import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {

  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'email' })
  public email: string

  @column({ columnName: 'password' })
  public password: string

  @column.dateTime({ autoUpdate: true })
  public lastLoginAt: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
