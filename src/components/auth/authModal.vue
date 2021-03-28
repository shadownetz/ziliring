<template>
    <div ref="zili_auth_modal" class="modal fade" id="authModal" tabindex="-1" role="dialog" aria-labelledby="authModalTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title text-capitalize" id="authModalTitle">{{activeComponent}}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <component :is="activeComponent"/>
                </div>
                <div class="modal-footer text-center font-weight-bolder">
                    <a href="javascript:void(0)" v-if="activeComponent==='login'" @click="activeComponent='register'">
                        You don't have an account yet? Register
                    </a>
                    <a href="javascript:void(0)" @click="activeComponent='login'" v-else>
                        Already have an account? Login instead
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import login from "./login";
    import register from "./register";

    export default {
        name: "authModal",
        data(){
            return {
                activeComponent: 'login'
            }
        },
        methods: {

        },
        components: {
            login,
            register
        },
        mounted() {
            let modalElem = $('#authModal');
            modalElem.modal({
                backdrop: 'static',
                show: false
            });
            modalElem.on('hidden.bs.modal', ()=>{
                this.activeComponent = 'login'
            })
        }
    }
</script>

<style scoped>
    .modal-content{
        border-radius: 10px
    }
    .modal-header{
        padding: 20px 40px;
        background: #fb3e3e;
        color: #ffffff;
    }
    .modal-header h5{
        color: #ffffff;
    }
    .modal-header .close{
        background: rgba(0,0,0,.5);
        border-radius: 50%;
        width: 30px;
        height: 30px;
        padding: 2px 4px;
        margin-top: 5px;
        margin-right: 5px;
        color: #ffffff;
        text-align: center;
    }
    a{
        color: #fb3e3e
    }
    a:hover,
    a:focus{
        color: #bb2e2e;
    }
</style>
<style>
    #authModal button{
        background: #fb3e3e;
        color: #ffffff;
    }
    #authModal button:hover,
    #authModal button:focus{
        background: #ffffff;
        border-color: #fb3e3e;
        color: #fb3e3e
    }
    #authModal input{
        border-radius: 15px;
    }
</style>