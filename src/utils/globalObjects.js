const axios = require('axios').default;

class CustomResponse{
    constructor(message, status=true) {
        this.status = status;
        this.message = message;
        this.data = {}
    }
}

class NetworkCall{
    constructor(data) {
        this.data = data;
    }

    async getBankDetails(){
        const response = new ResponseObject();
        try{
            const result = await axios.get('https://api.paystack.co/bank/resolve', {
                params: {...this.data},
                headers: {
                    'Authorization': 'Bearer sk_test_7bb08891343c4a021fba8e9de1235c6b3ef41f7e'
                }
            });
            console.log(result)
            response.data = result.data.data
        }catch (e) {
            response.status = false;
            response.message = e.message;
            console.log(e)
        }
        return Promise.resolve(response)
    }

}

export const ResponseObject = CustomResponse
export const NetworkCallObject = NetworkCall