module.exports = {
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.(js|jsx)$": "<rootDir>/node_modules/babel-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  globals: {
    "ts-jest": {
      tsConfigFile: "tsconfig.json",
      useBabelrc: true,
    },
  },
  testMatch: ["**/*.(spec|test).+(ts|tsx|jsx|js)"],
  transformIgnorePatterns: [],
  testURL: "http://0.0.0.0/",
};
