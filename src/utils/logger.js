const log = require('loglevel')
const LEVEL =
  process.env.NODE_ENV === 'development' ? log.levels.TRACE : log.levels.WARN // TRACE: 0 | DEBUG: 1 | INFO: 2 | WARN: 3 | ERROR: 4 | SILENT: 5

function getLogger(moduleName) {
  let moduleLog = log.getLogger(moduleName)
  moduleLog.setLevel(LEVEL)
  return moduleLog
}

export let logger = {
  log,
  getLogger
}
