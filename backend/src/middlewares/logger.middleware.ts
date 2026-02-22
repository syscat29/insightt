export class LoggerMiddleware {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  public info(message: string) {
    const timestamp = new Date().toISOString();
    console.log(`${timestamp} - [${this.name}]${message}`);
  }

  public error(message: string, error: Error) {
    const timestamp = new Date().toISOString();
    console.log(`${timestamp} - [${this.name}] ${message}`, error.message);
  }
}
