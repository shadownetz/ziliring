<template>
    <div class="modal fade" id="paymentInfoUpliner">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        Payment Info
                        <span class="badge badge-outline-danger" v-if="payment.data.reported">
                            reported
                        </span>
                        <span class="badge badge-outline-success" v-else-if="payment.data.confirmed">
                            completed
                        </span>
                        <span class="badge badge-outline-warning" v-else>
                            pending
                        </span>
                    </h5>
                    <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
                </div>
                <div class="modal-body">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-12 col-sm-12 col-md-6 col-lg-6">
                                <h4 class="font-weight-bolder">Package</h4>
                                <h5>
                                    <template v-if="package_z.data">{{package_z.data.name}}</template>
                                    <template v-else></template>
                                </h5>
                            </div>
                            <div class="col-12 col-sm-12 col-md-6 col-lg-6">
                                <h4 class="font-weight-bolder">Amount</h4>
                                <h5>₦{{payment.data.amount}}</h5>
                            </div>
                            <div class="col-12">
                                <h4 class="font-weight-bolder">Date</h4>
                                <h5>{{getReadableDatetime(payment.data.createdAt)}}</h5>
                            </div>
                            <template v-if="downlinerProfileInfo.data">
                                <div class="col-12 my-3">
                                    <h3 class="text-center">Sender Information</h3>
                                </div>
                                <div class="col-12 col-sm-12 col-md-6 col-lg-6">
                                    <h4 class="font-weight-bolder">Account Name</h4>
                                    <h5>{{downlinerProfileInfo.data.bankAccountName}}</h5>
                                </div>
                                <div class="col-12 col-sm-12 col-md-6 col-lg-6">
                                    <h4 class="font-weight-bolder">Account Number</h4>
                                    <h5>{{downlinerProfileInfo.data.bankAccountNumber}}</h5>
                                </div>
                                <div class="col-12 col-sm-12 col-md-6 col-lg-6 mt-2">
                                    <h4 class="font-weight-bolder">Bank Name</h4>
                                    <h5>{{downlinerProfileInfo.data.bankName}}</h5>
                                </div>
                                <div class="col-12 col-sm-12 col-md-6 col-lg-6 mt-2" v-if="downlinerInfo.data">
                                    <h4 class="font-weight-bolder">Contact Phone</h4>
                                    <h5>{{downlinerInfo.data.phone}}</h5>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger light" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import basicMethodMixins from "../../../utils/mixins/basicMethodMixins";

    export default {
        name: "paymentInfoUpliner",
        data(){
            return {
                downlinerProfileInfo: {},
                downlinerInfo: {},
            }
        },
        mixins: [basicMethodMixins],
        methods: {
            async fetchDownlinerInfo(){
                let response = await this.$store.dispatch('profile/get', this.payment.data.userId);
                if(response.status){
                    this.downlinerProfileInfo = response.data;
                    response = await this.$store.dispatch('user/get', this.payment.data.userId);
                    if(response.status){
                        this.downlinerInfo = response.data;
                    }
                }
            },
        },
        props: {
            payment: {
                type: Object,
                default(){
                    return {
                        id: '' , data: {}
                    }
                }
            },
            package_z: {
                type: Object,
                default(){
                    return {
                        id: '' , data: {}
                    }
                }
            }
        },
        mounted() {
            const infoModal = $('#paymentInfoUpliner');
            infoModal.on('show.bs.modal', ()=>{
                this.fetchDownlinerInfo()
            })
            infoModal.on('hidden.bs.modal', ()=>{
                this.downlinerProfileInfo = this.downlinerInfo = {};
            })
        }
    }
</script>

<style scoped>

</style>