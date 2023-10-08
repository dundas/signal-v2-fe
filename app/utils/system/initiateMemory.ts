import { v4 as uuidv4 } from "uuid";

export function initiateMemory(currentFunction) {

  const newMemory = {};
  newMemory.chainId = uuidv4();
  newMemory.start = new Date()
  newMemory.currentFunction = currentFunction;
  return newMemory;

}