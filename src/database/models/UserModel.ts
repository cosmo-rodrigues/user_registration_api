import { DataTypes } from "sequelize";
import { db } from "../db";

export const UserModel = db.define(
  "user",
  {
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
      // @ts-ignore
      type: DataTypes.BIGINT(11),
      allowNull: false,
      unique: true,
    },
    pis: {
      // @ts-ignore
      type: DataTypes.BIGINT(11),
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: false,
  }
);
