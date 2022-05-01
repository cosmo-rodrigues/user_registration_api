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
      type: DataTypes.STRING,
      allowNull: false,
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    number: {
      type: DataTypes.STRING,
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
  foreignKey: "addressId",
});

AddressModel.hasMany(UserModel, {
  foreignKey: "addressId",
});
