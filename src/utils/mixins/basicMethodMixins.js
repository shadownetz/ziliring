export default {
    methods: {
        getCountryTel(dial_code, phone){
            if(phone[0] !== '+'){
                if(phone[0] === '0'){
                    let _phone = phone.split("").reverse();
                    _phone.pop();
                    phone = _phone.reverse().join("")
                }
                return `+${dial_code}${phone}`
            }
            return phone
        }
    }
}