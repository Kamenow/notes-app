import sequelize from '../db/db';

export async function SyncDBModels() {
  await sequelize.sync();
}
