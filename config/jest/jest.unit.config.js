/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const { resolve } = require('path');
const root = resolve(__dirname, '../../');
const rootConfig = require(`${root}/config/jest/jest.config.js`);

module.exports = {
  ...rootConfig,
  ...{
    rootDir: root,
    displayName: 'unit-tests',
    testMatch: ['<rootDir>/src/**/*.test.ts'],
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.ts', '!src/**/*.test.ts'],
  },
};
