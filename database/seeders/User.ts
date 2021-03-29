import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public static developmentOnly = true

  public async run () {
    await User.createMany([
      {
        email: 'peste@peste.com',
        password: '123456789'
      },
      {
        email: 'some@some.com',
        password: 'a5s4d6a5s4d'
      }
    ])
  }
}
