<template>
    <div>
        <form v-if="!confirmPhoneModal" @submit.prevent="register">
            <div class="form-group">
                <label for="fname">First Name</label>
                <input v-model="user.firstName" id="fname" type="text" class="form-control" placeholder="First Name">
            </div>
            <div class="form-group">
                <label for="lname">Last Name</label>
                <input v-model="user.lastName" id="lname" type="text" class="form-control" placeholder="Last Name">
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input v-model="user.email" id="email" type="email" class="form-control" placeholder="Email">
                <small class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
                <label for="phone">Phone Number</label>
                <div class="row">
                    <div class="col-2 pr-0">
                        <vue-country-code @onSelect="assignPhoneDialCode"/>
                    </div>
                    <div class="col-10 pl-0">
                        <input v-model="user.phone" id="phone" type="tel" class="form-control" placeholder="Telephone">
                    </div>
                </div>
                <small class="form-text text-muted">
                    A code will be sent to this phone. <sup>*</sup>Standard rates may apply
                </small>
            </div>
            <div class="form-group">
                <label for="pass">Password</label>
                <input v-model="user.password" id="pass" type="password" class="form-control" placeholder="Password">
                <small class="form-text text-muted">Ensure your password is at least 8 characters in length.</small>
            </div>
            <div class="form-group">
                <label for="repass">Confirm Password</label>
                <input v-model="c_password" id="repass" type="password" class="form-control" placeholder="Confirm Password">
            </div>
            <div class="form-group" id="recaptcha_reg_container"></div>
            <div class="row align-content-center justify-content-center">
                <div class="col-8">
                    <button type="submit" id="zili_reg-btn" class="btn btn-light w-100">Register</button>
                </div>
            </div>
        </form>
        <form v-else @submit.prevent="confirmCode">
            <p @click="confirmPhoneModal = false">
                <a class="text-primary" href="javascript:void(0)">Phone number not correct? click here to update</a>
            </p>
            <div class="form-group">
                <label for="cde">Enter the code sent to your phone number</label>
                <input v-model="phoneVerificationCode" id="cde" type="text" class="form-control" placeholder="XXXXX">
                <small class="form-text text-muted">you should not share this code with anybody</small>
            </div>
            <div class="row align-content-center justify-content-center">
                <div class="col-8">
                    <button type="submit" class="btn btn-light w-100">Confirm</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    import basicValidationMixin from "../../utils/mixins/basicValidationMixin";
    import {UserModel} from "../../models/user";

    export default {
        name: "register",
        data(){
            return {
                user: new UserModel(),
                c_password: '',
                phone_dial_code: '',
                confirmPhoneModal: false,
                phoneVerificationCode: '',
            }
        },
        mixins: [basicValidationMixin],
        watch: {
            confirmPhoneModal(newVal){
                if(!newVal){
                    setTimeout(()=>{
                        this.$store.dispatch('auth/initRecaptcha', 'recaptcha_reg_container')
                    }, 1000)
                }
            }
        },
        methods: {
            validateFields(){
                if(
                    !(Object.entries(this.user)).every(fieldArr=>{
                        if(typeof fieldArr[1] === 'boolean') return true;
                        else if(fieldArr[0] === 'passkey') return true;
                        return !!fieldArr[1]
                    })
                ){
                    return this.$toast.warning('We think you might have missed some required fields', 'Oops!')
                }
                if(!this.validateEmail(this.user.email)){
                    return this.$toast.warning('The specified email is badly formatted', 'Caution!')
                }
                if(this.user.phone.length < 5){
                    return this.$toast.warning('Specify a valid phone number', 'Caution!')
                }
                if(this.user.password.length < 8){
                    return this.$toast.warning('Remember your password should be greater than 8 characters', 'Caution!')
                }
                if(this.user.password !== this.c_password){
                    return this.$toast.warning('Both passwords do not match', 'Oops!')
                }
                if(!this.$store.getters['auth/getRecaptchaStatus']){
                    return this.$toast.warning('Complete the recaptcha to proceed', 'Oops!')
                }
                return true
            },
            assignPhoneDialCode({dialCode}){
                this.phone_dial_code = dialCode
            },
            async register(){
                if(this.validateFields()){
                    const loader = this.$loading.show({container: this.$refs.zili_auth_modal})
                    if(this.user.phone[0] !== '+'){
                        if(this.user.phone[0] === '0'){
                            let _phone = this.user.phone.split("").reverse();
                            _phone.pop();
                            this.user.phone = _phone.reverse().join("")
                        }
                        this.user.phone = `+${this.phone_dial_code}${this.user.phone}`
                    }
                    const response = await this.$store.dispatch('auth/loginWithPhone', this.user.phone);
                    loader.hide()
                    if(response.status){
                        // code sent, await code confirmation
                        this.confirmPhoneModal = true
                    }else{
                        // code not sent
                        this.$toast.error(response.message)
                    }


                }
            },
            async confirmCode(){
                const loader = this.$loading.show({container: this.$refs.zili_auth_modal})
                const response = await this.$store.dispatch('auth/proceedToLogin', {
                    code: this.phoneVerificationCode,
                    userData: this.user
                });
                loader.hide();
                if(response.status){
                    const route = this.$router.resolve({name: 'Dashboard'}).resolved.fullPath.split('/')
                    route.pop();
                    window.location.href = route.join('/');
                }else{
                    this.$toast.error(response.message)
                }
            }
        },
        mounted() {
            this.$store.dispatch('auth/initRecaptcha', 'recaptcha_reg_container')
        }
    }
</script>

<style scoped>

</style>