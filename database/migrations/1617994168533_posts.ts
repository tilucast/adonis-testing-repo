import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Posts extends BaseSchema {
  protected tableName = 'posts'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamps(true)
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('users.id')
      table.string('title').notNullable()
      table.string('body', 8000).notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
