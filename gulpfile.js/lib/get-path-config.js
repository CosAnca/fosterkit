/* global process */
const projectPath = require('./projectPath');
const fs = require('fs');

function getPathConfig() {
  if (process.env.FOSTERKIT_CONFIG_PATH) {
    return require(projectPath(
      process.env.FOSTERKIT_CONFIG_PATH,
      'path-config.json'
    ));
  }

  const defaultConfigPath = projectPath('config/path-config.json');

  if (fs.existsSync(defaultConfigPath)) {
    return require(defaultConfigPath);
  }

  return require('../path-config.json');
}

module.exports = getPathConfig();
