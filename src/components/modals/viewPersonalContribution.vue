<template>
    <div class="modal fade" id="personalContrib">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        Contribution Info
                        <span class="badge badge-outline-success" v-if="contribution.data.isComplete">
                            completed
                        </span>
                        <span class="badge badge-outline-warning" v-else>
                            in progress
                        </span>
                    </h5>
                    <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
                </div>
                <div class="modal-body">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-12">
                                <h4 class="font-weight-bolder">Package</h4>
                                <h5 v-if="packageInfo.id">{{packageInfo.data.name}}</h5>
                                <h5 v-else>{{contribution.data.packageId}}</h5>
                            </div>
                            <div class="col-12">
                                <h4 class="font-weight-bolder">Payment</h4>
                                <span class="badge badge-outline-danger" v-if="contribution.data.hasPaid">
                                    paid
                                </span>
                                <span class="badge badge-outline-warning" v-else>
                                    awaiting
                                </span>
                            </div>
                            <div class="col-12">
                                <h4 class="font-weight-bolder">Amount</h4>
                                <h5>₦{{contribution.data.amountToBePaid}}</h5>
                            </div>
                            <div class="col-12">
                                <h4 class="font-weight-bolder">Accumulated Profit</h4>
                                <h5>₦{{contribution.data.profitReceived}}</h5>
                            </div>
                            <div class="col-12">
                                <h4 class="font-weight-bolder">Expected Profit</h4>
                                <h5>₦{{contribution.data.expectedProfit}}</h5>
                            </div>
                            <div class="col-12">
                                <h4 class="font-weight-bolder">Expiration Date</h4>
                                <h5>{{getReadableDate(contribution.data.expireAt)}}</h5>
                            </div>
                            <div class="col-12">
                                <h4 class="font-weight-bolder">Created</h4>
                                <h5>{{getReadableDatetime(contribution.data.createdAt)}}</h5>
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
        name: "viewPersonalContribution",
        data(){
            return {
                packageInfo: {id: '', data: {}}
            }
        },
        mixins: [basicMethodMixins],
        props: {
            contribution: {
                type: Object,
                default(){
                    return {id: '', data: {}}
                }
            }
        },
        methods: {
            async fetchMetaInfo(){
                const response = await this.$store.dispatch('package/get', this.contribution.data.packageId);
                if(response.status){
                    this.packageInfo = response.data
                }
            }
        },
        mounted() {
            const modalElem = $('#personalContrib');
            modalElem.on('show.bs.modal', ()=>{
                this.fetchMetaInfo();
                console.log('shown')
            })
            modalElem.on('hidden.bs.modal', ()=>{
                this.packageInfo = {id: '', data: {}}
            })
        }
    }
</script>

<style scoped>

</style>