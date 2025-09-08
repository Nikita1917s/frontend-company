import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  roots: ["<rootDir>/src"],
  moduleNameMapper: {
    // SCSS/CSS modules
    "^.+\\.(css|scss)$": "identity-obj-proxy",

    // Path aliases
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@components/(.*)$": "<rootDir>/src/components/$1",

    // Static assets (svg, png, jpg, etc.)
    "\\.(svg|png|jpe?g|gif|webp)$": "<rootDir>/src/test/__mocks__/fileMock.ts",
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],

  // ESM-friendly ts-jest config since package.json has "type": "module"
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      { tsconfig: "tsconfig.jest.json", useESM: true },
    ],
  },

  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
};

export default config;
