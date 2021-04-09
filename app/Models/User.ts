import { DateTime } from 'luxon'
import Encryption from '@ioc:Adonis/Core/Encryption'
import { BaseModel, column, computed, hasMany, HasOne, hasOne, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Profile from './Profile'
import Post from './Post'

export default class User extends BaseModel {

  @column({ isPrimary: true })
  public id: number

  @column({serialize: (value: string) => value + ' boi'})
  public email: string

  @column({
    prepare: (value: string) => Encryption.encrypt(value),
    consume: (value: string) => Encryption.decrypt(value),
    serializeAs: null
  })
  public password: string

  @column.dateTime({ 
    autoUpdate: true,
    serialize: (value: DateTime) => value.setZone('utc').toObject()
  })
  public lastLoginAt: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Profile)
  public profile: HasOne<typeof Profile>

  @hasMany(() => Post)
  public posts: HasMany<typeof Post>

  @computed()
  public get randomshit (){
    return (Math.random() * 10).toPrecision(2)
  }
}
