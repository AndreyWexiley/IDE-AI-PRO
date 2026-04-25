/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.test.json',
    },
  },
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.test.ts'],
  moduleNameMapper: {
    '^@core/(.*)$': '<rootDir>/src/core/$1',
    '^@ai/(.*)$': '<rootDir>/src/ai/$1',
    '^@agent/(.*)$': '<rootDir>/src/agent/$1',
    '^@rag/(.*)$': '<rootDir>/src/rag/$1',
    '^@executor/(.*)$': '<rootDir>/src/executor/$1',
    '^@parser/(.*)$': '<rootDir>/src/parser/$1',
    '^@memory/(.*)$': '<rootDir>/src/memory/$1',
    '^@logger/(.*)$': '<rootDir>/src/logger/$1',
    '^@api/(.*)$': '<rootDir>/src/api/$1',
    '^@config/(.*)$': '<rootDir>/src/config/$1',
  },
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.test.ts', '!src/**/*.d.ts'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
};
