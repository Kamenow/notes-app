import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  ModelStatic
} from 'sequelize';
import sequelize from '../db/db';
import User from './User';

class Note extends Model<InferAttributes<Note>, InferCreationAttributes<Note>> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare content: string;
  declare userId: number;
}

Note.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
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
  {
    sequelize,
    modelName: 'Note'
  }
);

Note.belongsTo(User, { foreignKey: 'userId' });

export default Note;
