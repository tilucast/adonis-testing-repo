import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Profiles extends BaseSchema {
  protected tableName = 'profiles'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamps(true)
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('users.id')
      table.string('avatar').notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
