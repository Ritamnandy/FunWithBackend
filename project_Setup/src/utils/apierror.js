

class ApiError extends Error {
    constructor(
        statuscode,
        message = "Something went wrong",
        errors = [],
        stack=""

    ) {
        super(message)
        this.statuscode = statuscode
        this.data = null
        this.message = message
        this.success = false
        this.error = errors
        this.timestamp = new Date().toISOString();
        
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this,this.constructor)
        }
    }
}


export { ApiError };