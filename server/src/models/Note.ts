import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/db';
import User from './User';

interface NoteAttributes {
  id?: number;
  title: string;
  content: string;
  userId: number;
  createdAt: Date;
  lastUpdated: Date;
}

class Note extends Model<NoteAttributes> {
  public id!: number;
  public title!: string;
  public content!: string;
  public userId!: number;
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
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    lastUpdated: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'Note',
    tableName: 'notes'
  }
);

Note.belongsTo(User, { foreignKey: 'userId' });

export default Note;
