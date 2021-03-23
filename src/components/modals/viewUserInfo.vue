<template>
    <div class="modal fade" id="userInfo">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        User Details
                    </h5>
                    <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
                </div>
                <div class="modal-body">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-6 alert alert-primary">
                                <h4>Total Balance</h4>
                                <h6>{{userProfile.data.balance}}</h6>
                            </div>
                            <div class="col-6 alert alert-primary">
                                <h4>Total Profit</h4>
                                <h6>{{userProfile.data.profit}}</h6>
                            </div>
                            <div class="col-6 alert alert-primary">
                                <h4>Purge Count</h4>
                                <h6>{{userProfile.data.purgeCount}}</h6>
                            </div>
                            <div class="col-6 alert alert-primary">
                                <h4>Last Purge</h4>
                                <h6 v-if="userProfile.data.purgedAt">{{getReadableDatetime(userProfile.data.purgedAt)}}</h6>
                                <h6>None</h6>
                            </div>

                            <div class="col-12 col-md-6">
                                <h4>First Name</h4>
                                <h6>{{user.data.firstName}}</h6>
                            </div>
                            <div class="col-12 col-md-6">
                                <h4>Last Name</h4>
                                <h6>{{user.data.lastName}}</h6>
                            </div>
                            <div class="col-12 col-md-6 mt-3">
                                <h4>Email</h4>
                                <h6>{{user.data.email}}</h6>
                            </div>
                            <div class="col-12 col-md-6 mt-3">
                                <h4>Phone</h4>
                                <h6>{{user.data.phone}}</h6>
                            </div>
                            <div class="col-12 col-md-6 mt-3">
                                <h4>Bank Account Name</h4>
                                <h6>{{userProfile.data.bankAccountName}}</h6>
                            </div>
                            <div class="col-12 col-md-6 mt-3">
                                <h4>Bank Account Number</h4>
                                <h6>{{userProfile.data.bankAccountNumber}}</h6>
                            </div>
                            <div class="col-12 col-md-6 mt-3">
                                <h4>Bank</h4>
                                <h6>{{userProfile.data.bankName}}</h6>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="container-fluid">
                        <div class="row align-content-center justify-content-center">
                            <button type="button" class="btn btn-danger light" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import basicMethodMixins from "../../utils/mixins/basicMethodMixins";
    export default {
        name: "viewUserInfo",
        data(){
            return {
                userProfile: {id: '', data: {}}
            }
        },
        mixins: [basicMethodMixins],
        methods: {
            async fetchMetaInfo(){
                const response = await this.$store.dispatch('profile/get', this.user.id);
                if(response.status){
                    this.userProfile = response.data;
                }
            }
        },
        props: {
            user: {
                type: Object,
                default: ()=>{return {id:'', data: {}}}
            }
        },
        mounted() {
            const viewModal = $('#userInfo');
            viewModal.on('show.bs.modal', ()=>{
                this.fetchMetaInfo()
            })
            viewModal.on('hidden.bs.modal', ()=>{
                this.userProfile = {id: '', data: {}}
            })
        }
    }
</script>

<style scoped>

</style>