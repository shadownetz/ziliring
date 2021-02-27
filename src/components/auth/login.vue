<template>
    <div>
        <form @submit.prevent="login">
            <div class="form-group">
                <input type="email" v-model="email" class="form-control" placeholder="Email">
            </div>
            <div class="form-group">
                <input type="password" v-model="password" class="form-control" placeholder="Password">
            </div>
            <div class="form-group text-center font-weight-bolder">
                <p class="text-primary">Forgot your password?</p>
            </div>
            <div class="row align-content-center justify-content-center">
               <div class="col-8">
                   <button type="submit" class="btn btn-light w-100">Login</button>
               </div>
            </div>
        </form>
    </div>
</template>

<script>
    import basicValidationMixin from "../../utils/mixins/basicValidationMixin";

    export default {
        name: "login",
        data(){
            return {
                email: '',
                password: ''
            }
        },
        mixins: [basicValidationMixin],
        methods: {
            login(){
                if(!this.validateEmail(this.email)){
                    return this.$toast.warning('The email format is not a valid one', 'Caution')
                }
                const route = this.$router.resolve({name: 'Dashboard'}).resolved.fullPath.split('/')
                route.pop();
                window.location.href = route.join('/');
            }
        }
    }
</script>

<style scoped>

</style>