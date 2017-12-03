const path = require('path')
module.exports = {
  verbose: true,
  setupTestFrameworkScriptFile: path.resolve(__dirname,'spec','setup.js'),
  moduleNameMapper: {
    "^helpers/(.*)$"    : "<rootDir>/spec/helpers/$1",
    "^main/(.*)$"       : "<rootDir>/src/main/$1",
    "^common/(.*)$"     : "<rootDir>/src/common/$1",
    "^components/(.*)$" : "<rootDir>/src/renderer/components/$1",
    "^core/(.*)$"       : "<rootDir>/src/renderer/core/$1",
    "^states/(.*)$"     : "<rootDir>/src/renderer/states/$1",
    "^ui/(.*)$"         : "<rootDir>/src/renderer/ui/$1"
  },
  "moduleFileExtensions": [
    "ts",
    "js"
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "testMatch": ["**/spec/**/*.spec.(ts|tsx|js)"]
};
