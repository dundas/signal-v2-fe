export function localizeLog(localFunction, currentLog) {
  currentLog.localStart = new Date();
  currentLog.lastFunction = `${currentLog.currentFunction}`;
  if (currentLog.lastFunction.indexOf(localFunction) === -1) {
    currentLog.currentFunction = `${currentLog.lastFunction}.${localFunction}`;
  }
  return currentLog;

}