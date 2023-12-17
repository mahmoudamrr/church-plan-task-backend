import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'artists'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('user_id').unsigned().references('users.id')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('user_id')
    })
  }
}
