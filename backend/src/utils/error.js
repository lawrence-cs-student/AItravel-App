
export class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
        this.statusCode = 400;  
    }
}

export class DuplicateError extends Error {
    constructor(message) {
        super(message);
        this.name = 'DuplicateError';
        this.statusCode = 409;  
    }
}

export class AuthenticationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'AuthenticationError';
        this.statusCode = 401;
    }
}

export class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
        this.statusCode = 404;
    }
}

export class ConnectionError extends Error {
    constructor(message) {
        super(message);
        this.name = "DBConnectError"
        this.statusCode = 503;
    }
}

export class BadRequestError extends Error {
  constructor(message = 'Bad request') {
    super(message)
    this.statusCode = 503;
  }
}