/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: 'jsdom',

  preset: 'ts-jest',

  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  setupFiles: ['./src/features/utils/__mocks__'],
  collectCoverage: true,
  coverageReporters: ['json-summary', 'lcov', 'json', 'html'],
  coveragePathIgnorePatterns: ['node_modules', '.styles.ts*', 'index.ts'],
};
