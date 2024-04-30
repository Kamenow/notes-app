import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model
} from 'sequelize';
import sequelize from '../db/db';
import Note from './Note';

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare email: string;
  declare password: string;
}

User.init(
  {
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      allowNull: false
    }
  },
  { sequelize }
);

User.hasMany(Note);

export default User;
