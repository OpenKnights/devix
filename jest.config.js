/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

const config = {
  clearMocks: true,
  coverageProvider: 'babel',
  extensionsToTreatAsEsm: ['.ts'],
  preset: 'ts-jest',
  coveragePathIgnorePatterns: ['/node_modules/']
}

export default config
