<template>
    <div>
        <form @submit.prevent="register">
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
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
                <label for="phone">Phone Number</label>
                <input v-model="user.phone" id="phone" type="tel" class="form-control" placeholder="Telephone">
            </div>
            <div class="form-group">
                <label for="pass">Password</label>
                <input v-model="password" id="pass" type="password" class="form-control" placeholder="Password">
                <small class="form-text text-muted">Ensure your password is at least 8 characters in length.</small>
            </div>
            <div class="form-group">
                <label for="repass">Confirm Password</label>
                <input v-model="c_password" id="repass" type="password" class="form-control" placeholder="Confirm Password">
            </div>
            <div class="row align-content-center justify-content-center">
                <div class="col-8">
                    <button type="submit" class="btn btn-light w-100">Register</button>
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
                password: '',
                c_password: ''
            }
        },
        mixins: [basicValidationMixin],
        methods: {
            validateFields(){
                if(
                    !(Object.entries(this.user)).every(fieldArr=>{
                        if(typeof fieldArr[1] === 'boolean') return true;
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
                if(this.password.length < 8){
                    return this.$toast.warning('Remember your password should be greater than 8 characters', 'Caution!')
                }
                if(this.password !== this.c_password){
                    return this.$toast.warning('Both passwords do not match', 'Oops!')
                }
                return true
            },
            register(){
                if(this.validateFields()){
                    this.user = new UserModel();
                    this.password = this.c_password = '';

                    const route = this.$router.resolve({name: 'Dashboard'}).resolved.fullPath.split('/')
                    route.pop();
                    window.location.href = route.join('/');
                }
            }
        }
    }
</script>

<style scoped>

</style>