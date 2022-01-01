import moment from "moment";

enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3,
}

export class Logger {
  private static TS_FORMAT = "DD-MM-YYYY HH:mm:ss:SSS Z";

  private internalLog: string[] = [];

  private logLevel: LogLevel;

  constructor(logLevel: string) {
    //@ts-ignore
    this.logLevel = LogLevel[logLevel];
  }

  private getTimestamp(): string {
    const ts = moment();
    return ts.format(Logger.TS_FORMAT);
  }

  private getFormattedMsg(logLevel: LogLevel, msg: string) {
    return `[${this.getTimestamp()}] [${LogLevel[logLevel]}] ${msg}`;
  }

  public debug(msg: string): void {
    const formatted = this.getFormattedMsg(LogLevel.DEBUG, msg);

    if (this.logLevel >= LogLevel.DEBUG) {
      console.log(msg);
      this.internalLog.push(formatted);
    }
  }

  public info(msg: string): void {
    const formatted = this.getFormattedMsg(LogLevel.INFO, msg);

    if (this.logLevel >= LogLevel.INFO) {
      console.log(msg);
      this.internalLog.push(formatted);
    }
  }

  public warn(msg: string): void {
    const formatted = this.getFormattedMsg(LogLevel.WARN, msg);

    if (this.logLevel >= LogLevel.WARN) {
      console.warn(msg);
      this.internalLog.push(formatted);
    }
  }

  public error(msg: string): void {
    const formatted = this.getFormattedMsg(LogLevel.ERROR, msg);

    if (this.logLevel >= LogLevel.ERROR) {
      console.error(msg);
      this.internalLog.push(formatted);
    }
  }

  public toString(): string {
    if (this.internalLog.length == 0) return "";

    return `\`\`\`log\n${this.internalLog.join("\n")}\n\`\`\``;
  }
}
