<template>
    <div class="row animated slideInUp">
        <div class="col-lg-12 dataTables_wrapper">
            <div class="card">
                <div class="card-header">
                    <h4 class="card-title">
                        <span class="badge badge-rounded badge-outline-dark" @click="$emit('switchComponent', {component: 'users'})">
                            <i class="ti-arrow-left"></i>
                        </span>
                        Purged Users
                    </h4>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <div class="col-12 text-center" v-if="loading">
                            <h3><i class="flaticon-381-user-4"></i> Fetching Purged Users</h3>
                            <p>Please wait...</p>
                        </div>
                        <paginate
                                name="users"
                                :list="users"
                                :per="50"
                                v-else-if="users.length > 0"
                                tag="table"
                                class="table table-responsive-md"
                        >
                            <thead>
                            <tr>
                                <th class="width80"><strong>#</strong></th>
                                <th>Name</th>
                                <th><strong>Email</strong></th>
                                <th><strong>Phone</strong></th>
                                <th><strong>Position</strong></th>
                                <th><strong>Purge Count</strong></th>
                                <th><strong>Last Purged</strong></th>
                                <th><strong>Date Joined</strong></th>
<!--                                <th></th>-->
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(user, index) in paginated('users')" :key="'users_'+index">
                                <td>
                                    <span v-if="currentPage === 0"> {{ index + 1 }}</span>
                                    <span v-else> {{ 100 * currentPage + index + 1 }}</span>
                                </td>
                                <td>{{user.data.lastName}} {{user.data.firstName}}</td>
                                <td>{{user.data.email}}</td>
                                <td>{{user.data.phone}}</td>
                                <td>
                                    <span v-if="user.data.isAdmin" class="badge light badge-success">Admin</span>
                                    <span v-else class="badge light badge-info">Contributor</span>
                                </td>
                                <td>
                                    <span v-if="profiles[index]!==undefined">{{profiles[index].data.purgeCount}}</span>
                                </td>
                                <td>
                                    <template v-if="profiles[index]!==undefined">
                                        {{getReadableDate(profiles[index].data.purgedAt)}}
                                    </template>
                                </td>
                                <td>
                                    {{getReadableDate(user.data.createdAt)}}
                                </td>
<!--                                <td>-->
<!--                                    <div class="dropdown">-->
<!--                                        <button type="button" class="btn btn-success light sharp" data-toggle="dropdown">-->
<!--                                            <svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"/><circle fill="#000000" cx="5" cy="12" r="2"/><circle fill="#000000" cx="12" cy="12" r="2"/><circle fill="#000000" cx="19" cy="12" r="2"/></g></svg>-->
<!--                                        </button>-->
<!--                                        <div class="dropdown-menu">-->
<!--                                            <a class="dropdown-item"-->
<!--                                               href="javascript:void(0)"-->
<!--                                               data-toggle="modal"-->
<!--                                               data-target="#userInfo"-->
<!--                                               @click="$emit('toggle', user)">-->
<!--                                                <i class="ti-eye"></i> View-->
<!--                                            </a>-->
<!--                                            <a href="javascript:void(0)" class="dropdown-item text-danger" @click="purgeUser(user)">-->
<!--                                                <i class="fa fa-ban"></i>-->
<!--                                            </a>-->
<!--                                        </div>-->
<!--                                    </div>-->
<!--                                </td>-->
                            </tr>
                            </tbody>
                        </paginate>
                        <div class="col-12 text-center" v-else>
                            <h3><i class="flaticon-381-gift"></i> There are no purged users on the platform yet</h3>
                            <p>When a user is purged they will show up here.</p>
                        </div>
                        <paginate-links
                                for="users"
                                :async="true"
                                :limit="2"
                                :show-step-links="true"
                                @change="onPageChange"
                                :hide-single-page="true"
                                :classes="{
                                    'ul': ['dataTables_paginate', 'paging_simple_numbers', 'w-100'],
                                    'li': 'd-inline',
                                    'a': ['paginate_button'],
                                    'li.active > a': 'current',
                                    'ul.paginate-links > li.disabled > a': 'disabled'
                                }"
                        >
                        </paginate-links>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import basicMethodMixins from "../../../../utils/mixins/basicMethodMixins";

    export default {
        name: "purgedUsers",
        data(){
            return {
                currentPage: 0,
                paginate: ["users"],
                profiles: [],
                users: [],
                loading: false
            }
        },
        mixins: [basicMethodMixins],
        methods: {
            onPageChange: function (toPage) {
                this.currentPage = toPage - 1;
            },
            async fetchMetaInfo(){
                this.loading = true;
                this.profiles = (await this.$store.dispatch('profile/getPurgedProfiles')).data;
                if(this.profiles.length > 0){
                    let users = this.profiles.map(profile=>{
                        return this.$store.dispatch('user/get', profile.id)
                    })
                    users = await Promise.all(users);
                    if(users.length > 0){
                        this.users = users.map(user=>user.data)
                    }
                }
                this.loading = false;
            },
        },
        mounted() {
            this.fetchMetaInfo()
        }
    }
</script>

<style scoped>

</style>