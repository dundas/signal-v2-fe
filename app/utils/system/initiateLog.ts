import { v4 as uuidv4 } from "uuid";
export function initiateLog(currentFunction) {

  const newLog = {};
  newLog.chainId = uuidv4();
  newLog.start = new Date()
  newLog.currentFunction = currentFunction;
  newLog.invokeFunction = currentFunction;
  newLog.lastFunction = currentFunction;
  return newLog;

}