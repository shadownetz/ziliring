class Crypt{

    constructor(password) {
        this.password = password;
        this.char_combination_upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        this.char_combination_lower = 'abcdefghijklmnopqrstuvwxyz'
        this.digit_combination = '0123456789'
        this.symbol_combination = '$%^!@#()_-+=,>./|`'
    }

    encrypt(key='', key_len=10){
        const secret = key || this.generate_key(key_len)
        const encrypt = CryptoJS.AES.encrypt(this.password, secret)
        return {secret, encrypted: String(encrypt)}
    }

    decrypt(key){
        const code = CryptoJS.AES.decrypt(this.password, key)
        return code.toString(CryptoJS.enc.Utf8)
    }

    generate_key(length) {
        let result           = '';
        const characters       = this.char_combination_upper+this.char_combination_lower+this.digit_combination+this.symbol_combination;
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
}

export default Crypt