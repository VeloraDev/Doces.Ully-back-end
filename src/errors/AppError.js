export default class AppError extends Error {
  constructor(messages, statusCode){
    const errors = Array.isArray(messages) ? messages : [messages];
    super(errors[0]);
    this.errors = errors;
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}