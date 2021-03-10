class CustomResponse{
    constructor(message, status=true) {
        this.status = status;
        this.message = message
    }
}

export const ResponseObject = CustomResponse