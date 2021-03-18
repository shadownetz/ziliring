<template>
    <div class="modal fade" id="paymentInfo">
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
                                <h5>{{package_z.data.name}}</h5>
                            </div>
                            <div class="col-12 col-sm-12 col-md-6 col-lg-6">
                                <h4 class="font-weight-bolder">Amount</h4>
                                <h5>₦{{payment.data.amount}}</h5>
                            </div>
                            <div class="col-12">
                                <h4 class="font-weight-bolder">Date</h4>
                                <h5>{{getReadableDatetime(payment.data.createdAt)}}</h5>
                            </div>
                            <template v-if="uplinerProfileInfo.data">
                                <div class="col-12 my-3">
                                    <h3 class="text-center">Receiver Information</h3>
                                </div>
                                <div class="col-12 col-sm-12 col-md-6 col-lg-6">
                                    <h4 class="font-weight-bolder">Account Name</h4>
                                    <h5>{{uplinerProfileInfo.data.bankAccountName}}</h5>
                                </div>
                                <div class="col-12 col-sm-12 col-md-6 col-lg-6">
                                    <h4 class="font-weight-bolder">Account Number</h4>
                                    <h5>{{uplinerProfileInfo.data.bankAccountNumber}}</h5>
                                </div>
                                <div class="col-12 col-sm-12 col-md-6 col-lg-6 mt-2">
                                    <h4 class="font-weight-bolder">Bank Name</h4>
                                    <h5>{{uplinerProfileInfo.data.bankName}}</h5>
                                </div>
                            </template>
                            <template v-if="confirmPay">
                                <div class="col-12 my-3">
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <button class="btn btn-primary btn-sm" type="button">Upload</button>
                                        </div>
                                        <div class="custom-file">
                                            <input @change="uploadProof" id="paymentProof" type="file" class="custom-file-input" :disabled="uploading">
                                            <label for="paymentProof" class="custom-file-label">Choose file</label>
                                        </div>
                                    </div>
                                    <p class="text-muted">
                                        The proof of payment could be your payment receipt from your bank or a screenshot of your online transaction
                                    </p>
                                    <div v-if="uploading">
                                        <h6>Uploading
                                            <span class="pull-right">{{progress}}%</span>
                                        </h6>
                                        <div class="progress ">
                                            <div class="progress-bar bg-danger progress-animated"
                                                 style="height:6px;"
                                                 :style="{'width': progress+'%'}"
                                                 role="progressbar">
                                                <span class="sr-only">{{progress}}% Complete</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
                <div class="modal-footer" v-if="!payment.data.confirmed&&!payment.data.reported">
                    <div class="container-fluid">
                        <div class="row align-content-center justify-content-center">
                            <button type="button" class="btn btn-primary btn-rounded" @click.prevent="confirmPay=true" :disabled="!uplinerProfileInfo.data">
                                <i class="flaticon-381-cloud"></i> Upload Proof of Payment
                            </button>
                        </div>
                    </div>
                    <!--                    <button type="button" class="btn btn-danger light" data-dismiss="modal">Close</button>-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import basicMethodMixins from "../../utils/mixins/basicMethodMixins";
    import {storageRef} from "../../firebase/firebase";

    export default {
        name: "paymentInfo",
        data(){
            return {
                uplinerProfileInfo: {},
                uploading: false,
                progress: 0,
                confirmPay: false
            }
        },
        mixins: [basicMethodMixins],
        methods: {
            async fetchUplinerInfo(){
                const response = await this.$store.dispatch('profile/get', this.payment.data.receiverId);
                if(response.status){
                    this.uplinerProfileInfo = response.data
                }
            },
            async uploadProof(event){
                const file = event.target.files[0];
                const file_ext = file.name.split(".").pop();
                const file_name = `zili_${(new Date()).valueOf()}.${file_ext}`
                const metadata = {
                    contentType: 'image/'+file_ext,
                }
                if(!this.image_is_valid(file_ext)){
                    this.resetUpload();
                    return this.$toast.warning("Please upload a valid image", "Invalid file type")
                }
                this.uploading = true;
                const uploadTask = storageRef.ref()
                    .child(`paymentProofs/${this.$store.getters['user/getUser'].id}/${file_name}`)
                    .put(file, metadata);
                uploadTask.on('state_changed',
                    (snapshot)=>{
                        this.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    },
                    (error)=>{
                        this.$toast.error('Upload Error', error.message);
                        this.resetUpload()
                    },
                    ()=>{
                        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                            return this.$store.dispatch('payment/uploadPaymentProof', {
                                id: this.payment.id,
                                fileURL: downloadURL
                            })
                        }).then(()=>{
                            this.$toast.success('Payment proof received', 'Successful');
                            this.resetUpload();
                            $('#paymentInfo').modal('hide');
                            $('.modal-backdrop').remove()
                        }).catch(err=>{
                            this.$toast.error('Upload Error', err.message);
                            this.resetUpload()
                        })
                    }
                )
            },
            resetUpload(){
                this.progress = 0;
                this.uploading = false;
                $('#paymentProof').val('')
            }
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
            const infoModal = $('#paymentInfo');
            infoModal.on('show.bs.modal', ()=>{
                this.fetchUplinerInfo()
            })
            infoModal.on('hidden.bs.modal', ()=>{
                this.uplinerProfileInfo = {};
                this.confirmPay = false;
            })
        }
    }
</script>

<style scoped>

</style>