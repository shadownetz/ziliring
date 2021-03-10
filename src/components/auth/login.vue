<template>
    <div>
        <form @submit.prevent="login">
            <div class="form-group">
                <input type="tel" v-model="phone" class="form-control" placeholder="Phone Number">
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

    export default {
        name: "login",
        data(){
            return {
                phone: '',
                password: ''
            }
        },
        methods: {
            login(){
                if(!this.phone){
                    return this.$toast.warning('Please enter a correct phone number', 'Caution')
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