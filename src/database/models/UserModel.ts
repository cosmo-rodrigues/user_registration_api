import { DataTypes } from "sequelize/types";
import { db } from "../db";

export const UserModel = db.define("user", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  cpf: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  pis: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
});
