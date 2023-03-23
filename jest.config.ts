export default {
  testMatch: ['**/*.test.ts'],
  collectCoverageFrom: ['**/src/**'],
  coveragePathIgnorePatterns: [
    '__snapshots__',
    'constructs',
    'constructsHelpers',
    'assets',
    'consts',
    'cdk-app.ts',
    'mockData.ts',
  ],
  transform: { '^.+\\.tsx?$': '@swc/jest' },
  setupFiles: ['./setupTests.ts'],
  testEnvironment: 'node',
  clearMocks: true,
  collectCoverage: true,
  coverageReporters: [['text']],
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
};
