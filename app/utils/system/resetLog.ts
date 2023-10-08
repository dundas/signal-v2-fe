export function resetLog(currentLog) {
    delete currentLog.tokens;
    delete currentLog.input;
    delete currentLog.promptMessages;
    delete currentLog.promptResponse;
    delete currentLog.end;
    delete currentLog.success;
    delete currentLog.localStart;
    delete currentLog.error;
    delete currentLog.promptTokens;
    delete currentLog.completionTokens;
    delete currentLog.totalTokens;
    delete currentLog.aiPlatform;
    delete currentLog.aiModel;
    delete currentLog.logType;
    delete currentLog.description;
    currentLog.currentFunction = currentLog.lastFunction;
    return currentLog;
}