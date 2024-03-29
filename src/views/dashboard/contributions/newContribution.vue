<template>
    <div ref="selectPackage" class="row animated slideInLeft">
        <template v-if="loading">
            <div class="col-12 text-center">
                <h3>
                    <i class="flaticon-381-time"></i> Loading available packages
                </h3>
                <p>please wait...</p>
            </div>
        </template>
        <template v-else-if="packages.length > 0">
            <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12" v-for="(package_z, index) in packages" :key="index">
                <div class="card overflow-hidden" v-if="package_z.data">
                    <div class="text-center p-5 overlay-box" :style="{backgroundImage: 'url('+packageBG+')'}">
                        <img src="../../../assets/dashboard/images/package.png" width="100" class="img-fluid rounded-circle" alt="">
                        <h3 class="mt-3 mb-0 text-white">{{package_z.data.name}}</h3>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12">
                                <div class="bgl-primary rounded p-3" style="min-height: 170px">
                                    <h4 class="mb-0">
                                        Prices
                                        <span class="pull-right">
                                            Bonus
                                        </span>
                                    </h4>
                                    <div class="mt-2" v-for="(price, index) in package_z.data.prices" :key="'price_'+index">
                                        <div>
                                            <h5>
                                                ₦{{price.amount}}
                                                <span class="pull-right">
                                                {{price.bonus}}%
                                                </span>
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-6 text-left">
                                <label class="text-left pt-3" :for="index+'package_selector'">
                                    Select an amount
                                </label>
                            </div>
                            <div class="col-6">
                                <select :id="index+'package_selector'" class="form-control" v-model.number="selected_prices[index]">
                                    <option :value="price.amount" v-for="(price, index) in package_z.data.prices" :key="'selectprice'+index">
                                        {{price.amount}}
                                    </option>
                                </select>
                            </div>
                            <div class="col-12" v-if="getUser.data.isAdmin&&modes.length > 0">
                                <div class="col-12 text-left">
                                    <label class="text-left pt-3" :for="index+'package_selector'">
                                        Mode <small class="text-muted">(only you can see this)</small>
                                    </label>
                                </div>
                                <div class="col-12">
                                    <select :id="index+'package_mode'" class="form-control" v-model="modes[index]">
                                        <option value="default">Default</option>
                                        <option value="withdrawal">Withdrawal</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer mt-0">
                        <button @click.prevent="addContribution(package_z.id, index)" class="btn btn-primary btn-lg btn-block">Proceed <i class="flaticon-381-next-1"></i></button>
                    </div>
                </div>
            </div>
        </template>
        <template v-else>
            <div class="col-12 text-center">
                <h3>
                    <i class="flaticon-381-box"></i> There are no packages available right now.
                </h3>
                <p>please check back later</p>
            </div>
        </template>
    </div>
</template>

<script>
    import packageBG from "../../../assets/dashboard/images/big/img5.jpg"
    import {mapGetters} from 'vuex'
    import Contribution from "../../../models/contribution";

    export default {
        name: "NewContribution",
        data(){
            return {
                packageBG,
                selected_prices: [5000, 100000, 500000],
                loading: false,
                modes: []
            }
        },
        computed: {
            ...mapGetters('package', {
                packages: 'getPackages'
            }),
            ...mapGetters('user', [
                'getUser'
            ])
        },
        methods: {
            async addContribution(packageId, index){
                if(this.modes.some((mode)=>mode==='withdrawal')){
                    return this.addContributionPrioritized(packageId, index)
                }
                const loader = this.$loading.show({container: this.$refs.selectPackage})
                const response = await this.$store.dispatch('contribution/add', {
                    amount: this.selected_prices[index],
                    package: packageId
                });
                loader.hide();
                if(response.status){
                    this.$toast.success('Contribution Initiated', '', {position: 'topRight'})
                    setTimeout(()=>{
                        this.$router.push({name: 'Dashboard'})
                    }, 2000)
                }else{
                    this.$toast.error(response.message, 'Error', {position: 'topRight'})
                }
            },
            async addContributionPrioritized(packageId, index){
                const loader = this.$loading.show({container: this.$refs.selectPackage})
                const response = await Contribution.createPrioritizedAdminContrib(
                    this.$store.getters['user/getUser'].id,
                    {
                        packageId: packageId,
                        amount: this.selected_prices[index],
                        mode: this.modes[index]
                    }
                )
                loader.hide();
                if(response.status){
                    this.$toast.info('This Contribution has been initiated successfully and will be automatically matched as soon as a matching downliner becomes available', 'Admin Information')
                    setTimeout(()=>{
                        this.$router.push({name: 'Dashboard'})
                    }, 2000)
                }else{
                    this.$toast.error(response.message, 'Error')
                }
            }
        },
        created() {
            this.loading = true
            this.$store.dispatch('package/fetch').then(()=>{
                this.packages.forEach(()=>this.modes.push('default'))
                this.loading = false;
            })
        }
    }
</script>

<style scoped>

</style>