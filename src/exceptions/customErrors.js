class NotFoundError extends Error {
    constructor(message) {
      super(message);
      this.name = 'NotFoundError'; // Custom error name
      this.statusCode = 404; // HTTP status code
    }
  }
  
  class ValidationError extends Error {
    constructor(message) {
      super(message);
      this.name = 'ValidationError'; // Custom error name
      this.statusCode = 400; // HTTP status code
    }
  }
  
  module.exports = {
    NotFoundError,
    ValidationError,
  };