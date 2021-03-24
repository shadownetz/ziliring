<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-12">
                <div class="profile card card-body px-3 pt-3 pb-0">
                    <div class="profile-head">
                        <div class="photo-content">
                            <div class="cover-photo"></div>
                        </div>
                        <div class="profile-info">
                            <div class="profile-photo">
                                <img src="../../assets/images/logo/user.png" class="img-fluid rounded-circle" alt="">
                            </div>
                            <div class="profile-details">
                                <div class="profile-name px-3 pt-2">
                                    <h4 class="text-primary mb-0">
                                        {{user.data.firstName}} {{user.data.lastName}}
                                    </h4>
                                    <p>{{user.data.isAdmin?'Admin':'Contributor'}}</p>
                                </div>
                                <div class="profile-email px-2 pt-2">
                                    <h4 class="text-muted mb-0">{{user.data.email}}</h4>
                                    <p>Email</p>
                                </div>
                                <div class="profile-email px-2 pt-2">
                                    <h4 class="text-muted mb-0">{{user.data.phone}}</h4>
                                    <p>Phone</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xl-4">
                <div class="card">
                    <div class="card-body">
                        <div class="profile-statistics mb-5">
                            <div class="text-center">
                                <div class="row">
                                    <div class="col">
                                        <h3 class="m-b-0">₦{{profile.data.balance||0}}</h3><span>Balance</span>
                                    </div>
                                    <div class="col">
                                        <h3 class="m-b-0">₦{{profile.data.profit||0}}</h3><span>Profit</span>
                                    </div>
                                    <div class="col">
                                        <h3 class="m-b-0">{{profile.data.purgeCount||0}}</h3><span>Purged</span>
                                    </div>
                                </div>
                                <div class="mt-4">
                                    <div class="col-12" v-if="withdrawalFocused">
                                        <p class="text text-info">
                                            <small>send {{withdrawalContext}} request</small>
                                        </p>
                                        <p class="text-warning">
                                            Avoid sending multiple requests to prevent rendering your request invalid
                                        </p>
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <button @click.prevent="withdrawalFocused=false" class="btn btn-primary" type="button">
                                                    <i class="ti-close"></i>
                                                </button>
                                            </div>
                                            <input type="number" class="form-control" v-model.number="withdrawalAmount" :placeholder="withdrawalContext+ ' amount'">
                                            <div class="input-group-append">
                                                <button @click.prevent="makeWithdrawal()" class="btn btn-primary" type="button">Send</button>
                                            </div>
                                        </div>
                                    </div>
                                    <a href="javascript:void(0)"
                                       class="btn btn-primary mb-1 mr-1"
                                       @click="initWithdrawal('withdrawal')"
                                    >
                                        Withdraw Balance
                                    </a>
                                    <a href="javascript:void(0)"
                                       class="btn btn-primary mb-1"
                                       @click="initWithdrawal('profit')"
                                    >
                                        Withdraw Profit
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="profile-blog mb-5">
                            <h5 class="text-primary d-inline">Financial Information</h5>
<!--                            <a href="javascript:void(0)" class="pull-right f-s-16">Information</a>-->
                            <h5 class="mt-3">Account Name</h5>
                            <p class="mb-0">
                                {{profile.data.bankAccountName||'No Account Name'}}
                            </p>
                            <h5 class="mt-2">Account Number</h5>
                            <p class="mb-0">
                                {{profile.data.bankAccountNumber||'No Account Number'}}
                            </p>
                            <h5 class="mt-2">Bank Name</h5>
                            <p class="mb-0">
                                {{profile.data.bankName||'No Bank Name'}}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-8">
                <div class="card">
                    <div class="card-body" ref="profileEditable">
                        <template v-if="!user.data.isAdmin">
                            <h4>Statistics</h4>
                            <div class="col-12 text-center" style="margin-top: 40px">
                                <h5><i>Buffering...</i></h5>
                                <p>please check back later</p>
                            </div>
                        </template>
                        <template v-else>
                            <h4>Personal Information</h4>
                            <div class="form-group mt-3">
                                <label>First Name</label>
                                <input class="form-control" v-model="u_editable.firstName" type="text" :placeholder="user.data.firstName">
                            </div>
                            <div class="form-group">
                                <label>Last Name</label>
                                <input class="form-control" v-model="u_editable.lastName" type="text" :placeholder="user.data.lastName">
                            </div>
                            <div class="form-group">
                                <label>Email</label>
                                <input class="form-control" v-model="u_editable.email" type="email" :placeholder="user.data.email">
                            </div>
                            <div class="row my-3 mb-5 justify-content-center align-content-center">
                                <button class="btn btn-outline-primary"
                                        @click="updatePersonal"
                                        :disabled="!u_editable.firstName&&!u_editable.lastName&&!u_editable.email"
                                >
                                    Update personal information
                                </button>
                            </div>
                            <h4>Financial Information</h4>
                            <div class="form-group mt-3">
                                <label>Bank Name</label>
                                <input class="form-control" v-model="p_editable.bankName" type="text" :placeholder="profile.data.bankName">
                            </div>
                            <div class="form-group">
                                <label>Bank Account Name</label>
                                <input class="form-control" v-model="p_editable.bankAccountName" type="text" :placeholder="profile.data.bankAccountName">
                            </div>
                            <div class="form-group">
                                <label>Bank Account Number</label>
                                <input class="form-control" v-model="p_editable.bankAccountNumber" type="text" :placeholder="profile.data.bankAccountNumber">
                            </div>
                            <div class="row my-3 justify-content-center align-content-center">
                                <button class="btn btn-outline-warning"
                                        @click="updateFinance"
                                        :disabled="!p_editable.bankAccountNumber&&!p_editable.bankAccountName&&!p_editable.bankName"
                                >
                                    Update financial information
                                </button>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {RequestModel} from "../../models/request";
    import basicMethodMixins from "../../utils/mixins/basicMethodMixins";

    export default {
        name: "profile",
        data(){
            return {
                u_editable: {
                    firstName: '',
                    lastName: '',
                    email: ''
                },
                p_editable: {
                    bankName: '',
                    bankAccountName: '',
                    bankAccountNumber: '',
                },
                withdrawalAmount: 0,
                withdrawalContext: 'withdrawal',
                withdrawalFocused: false
            }
        },
        mixins: [basicMethodMixins],
        watch: {
            withdrawalFocused(newVal){
                if(!newVal){
                    this.withdrawalAmount = 0;
                    this.withdrawalContext = 'withdrawal'
                }
            }
        },
        computed: {
            ...mapGetters({
                user: 'user/getUser',
                profile: 'profile/getProfile'
            })
        },
        methods: {
            async updatePersonal(){
                const update = {};
                if(this.u_editable.firstName) update.firstName = this.u_editable.firstName;
                if(this.u_editable.lastName) update.lastName = this.u_editable.lastName;
                if(this.u_editable.email) update.email = this.u_editable.email;
                if(Object.entries(update).length > 0){
                    const loader = this.$loading.show({container: this.$refs.profileEditable});
                    const response = await this.$store.dispatch('user/edit', update);
                    loader.hide()
                    if(response.status){
                        this.$toast.success('Operation successful', 'Done');
                        setTimeout(()=>{
                            this.$router.push({name: 'Dashboard'})
                        }, 1000)
                    }else{
                        this.$toast.error(response.message, 'Unable to complete request')
                    }
                }
            },
            async updateFinance(){
                const f_update = {};
                if(this.p_editable.bankName) f_update.bankName = this.p_editable.bankName;
                if(this.p_editable.bankAccountName) f_update.bankAccountName = this.p_editable.bankAccountName;
                if(this.p_editable.bankAccountNumber) f_update.bankAccountNumber = this.p_editable.bankAccountNumber;
                if(Object.entries(f_update).length > 0){
                    const loader = this.$loading.show({container: this.$refs.profileEditable});
                    const response = await this.$store.dispatch('profile/edit', f_update);
                    loader.hide()
                    if(response.status){
                        this.$toast.success('Operation successful', 'Done');
                        setTimeout(()=>{
                            this.$router.push({name: 'Dashboard'})
                        }, 1000)
                    }else{
                        this.$toast.error(response.message, 'Unable to complete request')
                    }
                }
            },
            initWithdrawal(context){
                this.withdrawalContext = context;
                this.withdrawalFocused = true
            },
            makeWithdrawal(){
                if(this.withdrawalAmount <= 0){
                    this.$toast.warning("Invalid amount specified")
                }else if(this.withdrawalContext === 'withdrawal' && (this.withdrawalAmount > this.profile.data.balance)){
                    this.$toast.warning("You do not have sufficient balance for this operation", "Oops")
                }else if(this.withdrawalContext === 'profit' && (this.withdrawalAmount > this.profile.data.profit)){
                    this.$toast.warning("You do not have sufficient profit for this operation", "Oops")
                }else{
                    this.affirm(async()=>{
                        const newRequest = new RequestModel();
                        newRequest.context = this.withdrawalContext;
                        newRequest.amount = this.withdrawalAmount;
                        const response = await this.$store.dispatch('request/add', newRequest);
                        if(response.status){
                            this.$toast.success("Request sent", "Done");
                            setTimeout(()=>{
                                this.$router.push({name: 'Withdrawals'})
                            }, 2000)
                        }else{
                            this.$toast.error(response.message, "Unable to send request")
                        }
                    }, "Continue? This action cannot be reversed")
                }

            }
        },
        mounted() {
        }
    }
</script>

<style scoped>

</style>