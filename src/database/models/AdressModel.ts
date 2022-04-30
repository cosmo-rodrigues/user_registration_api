import { DataTypes } from "sequelize";
import { db } from "../db";
import { UserModel } from "./UserModel";

export const AddressModel = db.define(
  "address",
  {
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
      // @ts-ignore
      type: DataTypes.BIGINT(8),
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
  },
  {
    timestamps: false,
  }
);

UserModel.belongsTo(AddressModel, {
  constraints: true,
  foreignKey: "idAddress",
});

AddressModel.hasMany(UserModel, {
  foreignKey: "idAddress",
});
