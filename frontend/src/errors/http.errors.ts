class HttpError extends Error {
  constructor(message?: string){
    super(message);
    this.name = this.constructor.name;
  }
}

/**
 * Status code: 401
 * when the user doesnt input valid credentials
 * or makes a request w/o authorization
 */
export class UnauthorizedError extends HttpError {}

/**
 * Status code: 409
 * when the user trys to signup with an emai
 * that already exists for example
 */
export class ConflictError extends HttpError {}

// Add more classes if you need distinction