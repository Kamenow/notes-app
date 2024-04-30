import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/db';
import Note from './Note';

interface UserAttributes {
  id?: number;
  email: string;
  password: string;
}
// <UserAttributes>

class User extends Model {
  //   id?: number;
  declare id: number;
  //   public email!: string;
  //   public password!: string;
  declare email: string;
  declare password: string;
}

User.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    }
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false
  }
);

export default User;
