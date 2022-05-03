import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(spec|test).ts?(x)"],
};
export default config;
