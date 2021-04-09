module.exports = {
  preset: "ts-jest",
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  // globalSetup: "./tests/testsSetup.ts",
  globalTeardown: "./tests/testsTeardown.ts",
};
