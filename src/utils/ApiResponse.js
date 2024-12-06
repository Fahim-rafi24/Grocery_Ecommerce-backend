
class ApiResponse {
    constructor(
        statusCode, data, message = 'success'
    ) {
        this.statusCode = statusCode
        this.success = statusCode < 400
        this.data = data
        this.message = message
    }
}

export { ApiResponse };