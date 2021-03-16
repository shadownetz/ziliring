<template>
    <div>
        <form v-if="!confirmPhone" @submit.prevent="login">
            <div class="form-group">
                <label for="phone">Phone Number</label>
                <div class="row">
                    <div class="col-2 pr-0">
                        <vue-country-code @onSelect="assignPhoneDialCode"/>
                    </div>
                    <div class="col-10 pl-0">
                        <input v-model="phone" id="phone" type="tel" class="form-control" placeholder="Phone Number">
                    </div>
                </div>
                <small class="form-text text-muted">
                    A verification code will be sent to this phone. <sup>*</sup>Standard rates may apply
                </small>
            </div>
            <div class="form-group">
                <input type="password" v-model="password" class="form-control" placeholder="Password">
            </div>
            <div class="form-group" id="recaptcha_reg_container"></div>
            <div class="form-group text-center font-weight-bolder">
                <p class="text-primary">Forgot your password?</p>
            </div>
            <div class="row align-content-center justify-content-center">
                <div class="col-8">
                    <button type="submit" class="btn btn-light w-100">Login</button>
                </div>
            </div>
        </form>
        <form v-else @submit.prevent="verifyCode">
            <div class="form-group">
                <div class="row mt-3">
                    <div class="col-8">
                        <input type="text" v-model="phoneVerificationCode" class="form-control" placeholder="XXXXX">
                        <small class="form-text text-muted">
                            Enter the verification code sent to your phone
                        </small>
                    </div>
                    <div class="col-4">
                        <button type="submit" class="btn btn-light w-100">
                            verify
                        </button>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <a href="javascript:void(0)" @click="confirmPhone=false">Back to Login</a>
            </div>
        </form>
    </div>
</template>

<script>
    import basicMethodMixins from "../../utils/mixins/basicMethodMixins";

    export default {
        name: "login",
        data(){
            return {
                phone: '',
                password: '',
                phone_dial_code: '',
                phoneVerificationCode: '',
                confirmPhone: false
            }
        },
        mixins: [basicMethodMixins],
        watch: {
            confirmPhone(newVal){
                if(!newVal){
                    setTimeout(()=>{
                        this.$store.dispatch('auth/initRecaptcha', 'recaptcha_reg_container')
                    }, 1000)
                }
            }
        },
        methods: {
            assignPhoneDialCode({dialCode}){
                this.phone_dial_code = dialCode
            },
            async login(){
                if(!this.$store.getters['auth/getRecaptchaStatus']){
                    return this.$toast.warning('Complete the recaptcha to proceed', 'Oops!')
                }
                if(!this.phone){
                    return this.$toast.warning('Please enter a correct phone number', 'Caution')
                }
                this.phone = this.getCountryTel(this.phone_dial_code, this.phone)
                const loader = this.$loading.show({container: this.$refs.zili_auth_modal})
                const response = await this.$store.dispatch('auth/loginWithPhone', this.phone);
                loader.hide()
                if(response.status){
                    // code sent, await code confirmation
                    this.confirmPhone = true
                }else{
                    // code not sent
                    this.$toast.error(response.message)
                }
            },
            async verifyCode(){
                const loader = this.$loading.show({container: this.$refs.zili_auth_modal})
                const {password} = this;
                const response = await this.$store.dispatch('auth/proceedToDashboard', {
                    code: this.phoneVerificationCode,
                    password
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