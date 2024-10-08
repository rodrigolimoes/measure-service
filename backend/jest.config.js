/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "@/(.*)$": "<rootDir>/$1",
    "@src/(.*)": "<rootDir>/src/$1",
  },
  moduleDirectories: ["node_modules"],
};
