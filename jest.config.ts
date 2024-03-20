/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest'

const config: Config = {
  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // Tool selection for test coverage.
  coverageProvider: 'babel',

  // Optimization for the extensionsToTreatAsEsm configuration.
  extensionsToTreatAsEsm: ['.ts'],

  // Regex matching to ignore collection paths.
  coveragePathIgnorePatterns: ['/node_modules/']
}

export default config
