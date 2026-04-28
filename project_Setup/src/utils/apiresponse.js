
class ApiResponse{
    constructor(statusCode,message,data) {
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.succes=statusCode< 400
    }
}