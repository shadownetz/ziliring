<template>
    <div class="row animated slideInLeft">
        <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12">
            <div class="card overflow-hidden">
                <div class="text-center p-5 overlay-box" :style="{backgroundImage: 'url('+packageBG+')'}">
                    <img src="../../../assets/dashboard/images/package.png" width="100" class="img-fluid rounded-circle" alt="">
                    <h3 class="mt-3 mb-0 text-white">Steel</h3>
                </div>
                <div class="card-body">
                    <div class="row text-center">
                        <div class="col-6">
                            <div class="bgl-primary rounded p-3">
                                <h4 class="mb-0">Prices</h4>
                                <small>₦5000</small><br>
                                <small>₦10,000</small><br>
                                <small>₦20,000</small><br>
                                <small>₦40,000</small>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="bgl-primary rounded p-3">
                                <h4 class="mb-0">Bonus</h4>
                                <small>0%</small>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer mt-0">
                    <button class="btn btn-primary btn-lg btn-block">Proceed <i class="flaticon-381-next-1"></i></button>
                </div>
            </div>
        </div>
        <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12">
            <div class="card overflow-hidden">
                <div class="text-center p-5 overlay-box" :style="{backgroundImage: 'url('+packageBG+')'}">
                    <img src="../../../assets/dashboard/images/package.png" width="100" class="img-fluid rounded-circle" alt="">
                    <h3 class="mt-3 mb-0 text-white">Bronze</h3>
                </div>
                <div class="card-body">
                    <div class="row text-center">
                        <div class="col-6">
                            <div class="bgl-primary rounded p-3">
                                <h4 class="mb-0">Prices</h4>
                                <small>₦100,000</small><br>
                                <small>₦200,000</small>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="bgl-primary rounded p-3">
                                <h4 class="mb-0">Bonus</h4>
                                <small>0%</small>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer mt-0">
                    <button class="btn btn-primary btn-lg btn-block">Proceed <i class="flaticon-381-next-1"></i></button>
                </div>
            </div>
        </div>
        <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12">
            <div class="card overflow-hidden">
                <div class="text-center p-5 overlay-box" :style="{backgroundImage: 'url('+packageBG+')'}">
                    <img src="../../../assets/dashboard/images/package.png" width="100" class="img-fluid rounded-circle" alt="">
                    <h3 class="mt-3 mb-0 text-white">Gold</h3>
                </div>
                <div class="card-body">
                    <div class="row text-center">
                        <div class="col-6">
                            <div class="bgl-primary rounded p-3">
                                <h4 class="mb-0">Prices</h4>
                                <small>₦500,000</small><br>
                                <small>₦1,000,000</small>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="bgl-primary rounded p-3">
                                <h4 class="mb-0">Bonus</h4>
                                <small>0%</small>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer mt-0">
                    <button class="btn btn-primary btn-lg btn-block">Proceed <i class="flaticon-381-next-1"></i></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import packageBG from "../../../assets/dashboard/images/big/img5.jpg"

    export default {
        name: "selectPackage",
        data(){
            return {
                packageBG
            }
        }
    }
</script>

<style scoped>

</style>