

var rewire = require("rewire");

exports.require = function (path) {
  return rewire((process.env.INSTRUMENTED_BASE_DIR || '../../') + path);
};