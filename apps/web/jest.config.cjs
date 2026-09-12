module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: { '^@/(.*)$': '<rootDir>/src/$1' },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: {
          esModuleInterop: true,
          jsx: 'react-jsx',
          module: 'CommonJS',
          paths: { '@/*': ['./src/*'] },
          verbatimModuleSyntax: false,
        },
      },
    ],
  },
}
