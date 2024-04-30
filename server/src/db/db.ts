import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('devteambg-notes', 'postgres', '2001godina', {
  dialect: 'postgres',
  host: 'localhost'
});

export default sequelize;
