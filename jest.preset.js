const nxPreset = require('@nrwl/jest/preset');

module.exports = {
  ...nxPreset,
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
};
