class CustomError extends Error {
    constructor(code, message) {
        super(message);
        this.name = 'CustomError';
        this.statusCode = code;
    }
}

module.exports = { CustomError };
