class Logger {
  public static info(message: string): void {
    console.log(`[INFO] ${message}`);
  }

  public static warn(message: string): void {
    console.warn(`[WARN] ${message}`);
  }

  public static error(message: string): void {
    console.error(`[ERROR] ${message}`);
  }

  public static debug(message: string): void {
    console.log(`[DEBUG] ${message}`);
  }
}

export default Logger; 