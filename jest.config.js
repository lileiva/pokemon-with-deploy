module.exports = {
  roots: ['<rootDir>'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': 'ts-jest', // Required for typescript
  },
  resetMocks: true,
  collectCoverageFrom: ['src/**/*.{js,ts}'],
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '@domain/(.+)$': '<rootDir>/src/domain/$1',
    '@data/(.+)$': '<rootDir>/src/data/$1',
    '@helpers/(.+)$': '<rootDir>/src/helpers/$1',
    '@presentation/(.+)$': '<rootDir>/src/presentation/$1',
    '@config/(.+)$': '<rootDir>/config/$1',
    '@tests/(.+)$': '<rootDir>/tests/$1',
  },
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      lines: 100,
      functions: 100,
    },
  },
  testRegex: '(/tests/.*|(.|/)).spec.ts?$', // Look for tests only on .spec.ts files
  coveragePathIgnorePatterns: [
    'node_modules',
    'tests',
    '(/src/.*|(.|/)).types.ts?$',
  ], // Don't include anything else in coverage
  moduleFileExtensions: ['ts', 'tsx', 'json', 'node'],
}
