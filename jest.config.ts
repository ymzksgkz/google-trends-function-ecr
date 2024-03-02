export default {
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
  moduleNameMapper: {
    '^@api/(.*)$': '<rootDir>/src/client/$1',
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testMatch: ['**/tests/unit/*.test.ts']
}
