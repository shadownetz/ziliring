class CustomResponse{
    constructor(message, status=true) {
        this.status = status;
        this.message = message;
        this.data = {}
    }
}

export const ResponseObject = CustomResponse