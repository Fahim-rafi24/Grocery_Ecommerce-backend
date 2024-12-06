
class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went worng",
        errors = [],
        stack = ''
    ) {
        super(message)
        this.data = null
        this.statusCode = statusCode
        this.errors = errors
        this.success = false
        this.message = message

        if (stack) {
            this.stack = stack
        }
        else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export { ApiError }