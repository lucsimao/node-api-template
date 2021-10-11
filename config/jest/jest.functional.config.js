/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve } = require('path');
const root = resolve(__dirname, '../../');
const rootConfig = require(`${root}/config/jest/jest.config.js`);

module.exports = {
  ...rootConfig,
  ...{
    rootDir: root,
    displayName: 'functional-tests',
    testMatch: ['<rootDir>/test/**/*.test.ts'],
    collectCoverage: true,
    setupFilesAfterEnv: ['<rootDir>/test/jest-setup.ts'],
    collectCoverageFrom: ['src/controllers/**/*.ts', '!src/**/*.test.ts'],
  },
};
