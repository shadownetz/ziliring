<template>
    <div class="modal fade" id="requestInfo">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        Request Information
                        <span v-if="request.data.status === 'approved'" class="badge badge-success">approved</span>
                        <span v-else-if="request.data.status === 'invalid'" class="badge badge-danger">invalid</span>
                        <span v-else class="badge badge-warning">pending</span>
                    </h5>
                    <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
                </div>
                <div class="modal-body">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-6 alert alert-primary">
                                <h4>Context</h4>
                                <h6>{{request.data.context}}</h6>
                            </div>
                            <div class="col-6 alert alert-primary">
                                <h4>Requested Amount</h4>
                                <h6>₦{{request.data.amount}}</h6>
                            </div>
                            <div class="col-6 alert alert-primary">
                                <h4>Created By</h4>
                                <h6>{{user.data.lastName}} {{user.data.firstName}}</h6>
                            </div>
                            <div class="col-6 alert alert-primary">
                                <h4>Created At</h4>
                                <h6>{{getReadableDatetime(request.data.createdAt)}}</h6>
                            </div>
                            <div class="col-6 alert alert-primary">
                                <h4>Updated At</h4>
                                <h6>{{getReadableDatetime(request.data.updatedAt)}}</h6>
                            </div>

                            <div class="col-12">
                                <h3 class="mt-3">Sender Information</h3>
                            </div>
                            <div class="col-12 col-md-6">
                                <h4>Name</h4>
                                <h6>{{user.data.lastName}} {{user.data.firstName}}</h6>
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
                                <h4>Account Balance</h4>
                                <h6>₦{{userProfile.data.balance}}</h6>
                            </div>
                            <div class="col-12 col-md-6 mt-3">
                                <h4>Profit Balance</h4>
                                <h6>₦{{userProfile.data.profit}}</h6>
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
    import Request from "../../models/request";

    export default {
        name: "viewRequestInfo",
        data(){
            return {
                user: {id: '', data: {}},
                userProfile: {id: '', data: {}}
            }
        },
        mixins: [basicMethodMixins],
        methods: {
            async fetchMetaInfo(){
                let response = await this.$store.dispatch('user/get', this.request.data.createdBy);
                if(response.status){
                    this.user = response.data;
                }
                response = await this.$store.dispatch('profile/get', this.request.data.createdBy);
                if(response.status){
                    this.userProfile = response.data;
                }
            }
        },
        props: {
            request: {
                type: Object,
                default: ()=>new Request({})
            }
        },
        mounted() {
            const viewModal = $('#requestInfo');
            viewModal.on('show.bs.modal', ()=>{
                this.fetchMetaInfo()
            })
            viewModal.on('hidden.bs.modal', ()=>{
                this.userProfile = {id: '', data: {}};
                this.user = {id: '', data: {}}
            })
        }
    }
</script>

<style scoped>

</style>