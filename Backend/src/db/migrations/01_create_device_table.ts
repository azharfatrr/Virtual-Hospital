import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('device', (table) => {
    table.string('id').primary();
    table.float('room_temp');
    table.float('room_rh');
    table.float('user_temp');
    table.float('user_spo2');
    table.float('user_bpm');
    table.string('condition');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('device');
}
