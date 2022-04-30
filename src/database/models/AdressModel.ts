import { DataTypes } from "sequelize/types";
import { db } from "../db";
import { UserModel } from "./UserModel";

export const AddressModel = db.define("address", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  county: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  zipCode: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  street: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  number: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  complement: {
    type: DataTypes.STRING,
  },
});

UserModel.belongsTo(AddressModel, {
  constraints: true,
  foreignKey: "idAddress",
});

AddressModel.hasMany(UserModel, {
  foreignKey: "idAddress",
});
