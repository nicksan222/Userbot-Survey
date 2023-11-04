import type { Config } from "jest";

const config: Config = {
  verbose: true,
  preset: "ts-jest",
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/$1",
  },
};

export default config;
