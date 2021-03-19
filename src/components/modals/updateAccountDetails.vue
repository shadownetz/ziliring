<template>
    <div class="modal fade" id="accountDetails">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content" ref="updateAcc">
                <div class="modal-header">
                    <h5 class="modal-title">
                        Update Account Details
                    </h5>
                    <!--                    <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>-->
                </div>
                <div class="modal-body">
                    <div class="container-fluid">
                        <form v-if="!verification" role="form">
<!--                            <div class="form-group">-->
<!--                                <label for="accName">Bank Account Name</label>-->
<!--                                <input v-model="bankAccountName" id="accName" class="form-control" type="text" placeholder="account name">-->
<!--                            </div>-->
                            <div class="form-group">
                                <label for="accNum">Bank Account Number</label>
                                <input v-model="bankAccountNumber" id="accNum" class="form-control" type="text" placeholder="account number">
                            </div>
                            <div class="form-group">
                                <label for="bankName">Select a Bank</label>
                                <select id="bankName" class="form-control" v-model="bankSelect">
                                    <option :value="`${key},${code}`" v-for="(code, key, index) in bankCodes" :key="'code_'+index">
                                        {{code}}
                                    </option>
                                </select>
                            </div>
                        </form>
                        <div v-else class="col-12">
                            <div class="text-center" v-if="loadingVer">
                                <h4>Fetching Account Details</h4>
                                <p>please wait...</p>
                            </div>
                            <div class="text-center" v-else-if="error">
                                <h4>We are unable to retrieve the account information</h4>
                                <p>Reload the page to try again</p>
                            </div>
                            <div v-else>
                                <p class="badge badge-outline-primary">
                                    Please verify the information provided below is correct
                                </p>
                                <h4>Account Name</h4>
                                <p>{{verifiedAccName}}</p>
                                <h4>Account Number</h4>
                                <p>{{verifiedAccNumber}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="container-fluid">
                        <div class="row align-content-center justify-content-center">
                            <button v-if="!verification" type="button" class="btn btn-primary light" @click.prevent="verify">
                                Verify
                            </button>
                            <button @click.prevent="updateAccount()" v-if="verification&&!loadingVer&&!error" type="button" class="btn btn-primary light">
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {NetworkCallObject} from "../../utils/globalObjects";

    export default {
        name: "updateAccountDetails",
        data(){
            return {
                bankName : '',
                bankAccountName : '',
                bankAccountNumber : '',
                bankCode: '',

                verification: false,
                loadingVer: false,
                error: false,
                verifiedAccName: '',
                verifiedAccNumber: ''
            }
        },
        computed: {
            ...mapGetters({
                bankCodes: 'profile/getBankCodes',
            }),
            bankSelect: {
                get: function(){
                    return `${this.bankCode},${this.bankName}`
                },
                set: function(newVal){
                    this.bankName = newVal.split(',')[1];
                    this.bankCode = newVal.split(',')[0]
                }
            }
        },
        methods: {
            async updateAccount(){
                const loader = this.$loading.show({container: this.$refs.updateAcc});
                const response = await this.$store.dispatch('profile/updateBankDetails', {
                    _bankName: this.bankName,
                    _bankAccountName: this.bankAccountName,
                    _bankAccountNumber: this.bankAccountNumber
                });
                if(response.status){
                    await this.$store.dispatch('profile/init');
                    this.$toast.success("bank information updated", "success")
                }else{
                    this.$toast.error("Unable to complete request", "Error")
                }
                loader.hide();
                $('#accountDetails').modal('hide');
                setTimeout(()=>{
                    this.$router.go()
                }, 1500)
            },
            async verify(){
                if(!this.bankAccountNumber || !this.bankSelect){
                    return this.$toast.warning('Complete all fields', 'Oops')
                }
                this.verification = true;
                this.loadingVer = true;
                const network = new NetworkCallObject({
                    account_number: this.bankAccountNumber,
                    bank_code: this.bankCode
                });
                const response = await network.getBankDetails();
                if(response.status){
                    this.verifiedAccName = this.bankAccountName = response.data.account_name;
                    this.verifiedAccNumber = response.data.account_number;
                }else{
                    this.error = true
                }
                this.loadingVer = false;
            }
        }
    }
</script>

<style scoped>

</style>