<template>
    <div class="modal fade" id="paymentProofs">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        Payment Proofs
                    </h5>
                    <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
                </div>
                <div class="modal-body">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-6" v-for="(url, index) in urls" :key="'url_'+index">
                                <img class="img-fluid" :src="url" alt="proof of payment">
                                <div class="col-12">
                                    <a :href="url" target="_blank" download>
                                        <i class="flaticon-381-download"></i> Download
                                    </a>
                                </div>
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
    export default {
        name: "paymentProofs",
        props: ['urls']
    }
</script>

<style scoped>

</style>