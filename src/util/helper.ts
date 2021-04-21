const packageJSON = require('../../package.json');

export const getVersion = () => {
  return packageJSON.version;
}