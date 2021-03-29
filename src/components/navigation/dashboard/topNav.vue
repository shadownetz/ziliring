<template>
    <div>
        <div id="preloader">
            <div class="sk-three-bounce">
                <div class="sk-child sk-bounce1"></div>
                <div class="sk-child sk-bounce2"></div>
                <div class="sk-child sk-bounce3"></div>
            </div>
        </div>

        <div class="nav-header">
            <router-link :to="{name:'Dashboard'}"  class="brand-logo">
                <img class="logo-abbr" src="../../../assets/images/logo/ziliring_logo.png" alt="ziliring logo">
                <img class="logo-compact" src="../../../assets/images/logo/ziliring_text.png" alt="ziliring logo">
                <img class="brand-title" src="../../../assets/images/logo/ziliring_text.png" alt="ziliring logo">
            </router-link>
            <div class="nav-control">
                <div class="hamburger">
                    <span class="line"></span><span class="line"></span><span class="line"></span>
                </div>
            </div>
        </div>
        <div class="header">
            <div class="header-content">
                <nav class="navbar navbar-expand">
                    <div class="collapse navbar-collapse justify-content-between">
                        <div class="header-left">
                            <div class="dashboard_bar">
                                Dashboard
                            </div>
                        </div>

                        <ul class="navbar-nav header-right">
                            <!-- Notification -->
                            <li class="nav-item dropdown notification_dropdown">
                                <a class="nav-link  ai-icon" href="javascript:void(0)" role="button" data-toggle="dropdown">
                                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21.75 14.8385V12.0463C21.7471 9.88552 20.9385 7.80353 19.4821 6.20735C18.0258 4.61116 16.0264 3.61555 13.875 3.41516V1.625C13.875 1.39294 13.7828 1.17038 13.6187 1.00628C13.4546 0.842187 13.2321 0.75 13 0.75C12.7679 0.75 12.5454 0.842187 12.3813 1.00628C12.2172 1.17038 12.125 1.39294 12.125 1.625V3.41534C9.97361 3.61572 7.97429 4.61131 6.51794 6.20746C5.06159 7.80361 4.25291 9.88555 4.25 12.0463V14.8383C3.26257 15.0412 2.37529 15.5784 1.73774 16.3593C1.10019 17.1401 0.751339 18.1169 0.75 19.125C0.750764 19.821 1.02757 20.4882 1.51969 20.9803C2.01181 21.4724 2.67904 21.7492 3.375 21.75H8.71346C8.91521 22.738 9.45205 23.6259 10.2331 24.2636C11.0142 24.9013 11.9916 25.2497 13 25.2497C14.0084 25.2497 14.9858 24.9013 15.7669 24.2636C16.548 23.6259 17.0848 22.738 17.2865 21.75H22.625C23.321 21.7492 23.9882 21.4724 24.4803 20.9803C24.9724 20.4882 25.2492 19.821 25.25 19.125C25.2486 18.117 24.8998 17.1402 24.2622 16.3594C23.6247 15.5786 22.7374 15.0414 21.75 14.8385ZM6 12.0463C6.00232 10.2113 6.73226 8.45223 8.02974 7.15474C9.32723 5.85726 11.0863 5.12732 12.9212 5.125H13.0788C14.9137 5.12732 16.6728 5.85726 17.9703 7.15474C19.2677 8.45223 19.9977 10.2113 20 12.0463V14.75H6V12.0463ZM13 23.5C12.4589 23.4983 11.9316 23.3292 11.4905 23.0159C11.0493 22.7026 10.716 22.2604 10.5363 21.75H15.4637C15.284 22.2604 14.9507 22.7026 14.5095 23.0159C14.0684 23.3292 13.5411 23.4983 13 23.5ZM22.625 20H3.375C3.14298 19.9999 2.9205 19.9076 2.75644 19.7436C2.59237 19.5795 2.50014 19.357 2.5 19.125C2.50076 18.429 2.77757 17.7618 3.26969 17.2697C3.76181 16.7776 4.42904 16.5008 5.125 16.5H20.875C21.571 16.5008 22.2382 16.7776 22.7303 17.2697C23.2224 17.7618 23.4992 18.429 23.5 19.125C23.4999 19.357 23.4076 19.5795 23.2436 19.7436C23.0795 19.9076 22.857 19.9999 22.625 20Z" fill="#6418C3"/>
                                    </svg>
                                    <span class="badge light text-white bg-primary">0</span>
                                </a>
                                <div class="dropdown-menu dropdown-menu-right">
<!--                                    <div id="DZ_W_Notification1" class="widget-media dz-scroll p-3 height380">-->
<!--                                        <ul class="timeline">-->
<!--                                            <li>-->
<!--                                                <div class="timeline-panel">-->
<!--                                                    <div class="media mr-2">-->
<!--                                                        <img alt="image" width="50" src="../../../assets/dashboard/images/avatar/1.jpg">-->
<!--                                                    </div>-->
<!--                                                    <div class="media-body">-->
<!--                                                        <h6 class="mb-1">Dr sultads Send you Photo</h6>-->
<!--                                                        <small class="d-block">29 July 2020 - 02:26 PM</small>-->
<!--                                                    </div>-->
<!--                                                </div>-->
<!--                                            </li>-->
<!--                                            <li>-->
<!--                                                <div class="timeline-panel">-->
<!--                                                    <div class="media mr-2 media-info">-->
<!--                                                        KG-->
<!--                                                    </div>-->
<!--                                                    <div class="media-body">-->
<!--                                                        <h6 class="mb-1">Resport created successfully</h6>-->
<!--                                                        <small class="d-block">29 July 2020 - 02:26 PM</small>-->
<!--                                                    </div>-->
<!--                                                </div>-->
<!--                                            </li>-->
<!--                                            <li>-->
<!--                                                <div class="timeline-panel">-->
<!--                                                    <div class="media mr-2 media-success">-->
<!--                                                        <i class="fa fa-home"></i>-->
<!--                                                    </div>-->
<!--                                                    <div class="media-body">-->
<!--                                                        <h6 class="mb-1">Reminder : Treatment Time!</h6>-->
<!--                                                        <small class="d-block">29 July 2020 - 02:26 PM</small>-->
<!--                                                    </div>-->
<!--                                                </div>-->
<!--                                            </li>-->
<!--                                            <li>-->
<!--                                                <div class="timeline-panel">-->
<!--                                                    <div class="media mr-2">-->
<!--                                                        <img alt="image" width="50" src="../../../assets/dashboard/images/avatar/1.jpg">-->
<!--                                                    </div>-->
<!--                                                    <div class="media-body">-->
<!--                                                        <h6 class="mb-1">Dr sultads Send you Photo</h6>-->
<!--                                                        <small class="d-block">29 July 2020 - 02:26 PM</small>-->
<!--                                                    </div>-->
<!--                                                </div>-->
<!--                                            </li>-->
<!--                                            <li>-->
<!--                                                <div class="timeline-panel">-->
<!--                                                    <div class="media mr-2 media-danger">-->
<!--                                                        KG-->
<!--                                                    </div>-->
<!--                                                    <div class="media-body">-->
<!--                                                        <h6 class="mb-1">Resport created successfully</h6>-->
<!--                                                        <small class="d-block">29 July 2020 - 02:26 PM</small>-->
<!--                                                    </div>-->
<!--                                                </div>-->
<!--                                            </li>-->
<!--                                            <li>-->
<!--                                                <div class="timeline-panel">-->
<!--                                                    <div class="media mr-2 media-primary">-->
<!--                                                        <i class="fa fa-home"></i>-->
<!--                                                    </div>-->
<!--                                                    <div class="media-body">-->
<!--                                                        <h6 class="mb-1">Reminder : Treatment Time!</h6>-->
<!--                                                        <small class="d-block">29 July 2020 - 02:26 PM</small>-->
<!--                                                    </div>-->
<!--                                                </div>-->
<!--                                            </li>-->
<!--                                        </ul>-->
<!--                                    </div>-->
                                    <a class="all-notification" href="javascript:void(0)">no new notification <i class="ti-info-alt"></i></a>
<!--                                    <a class="all-notification" href="javascript:void(0)">See all notifications <i class="ti-arrow-right"></i></a>-->
                                </div>
                            </li>
                            <!-- Whatsapp Message -->
                            <li class="nav-item dropdown notification_dropdown">
                                <a class="nav-link bell bell-link" href="javascript:void(0)">
                                    <img src="../../../assets/images/svg/whatsapp.svg" alt="whatsapp logo" width="23" height="22"/>
                                    <!--                                    <span class="badge light text-white bg-primary">0</span>-->
                                </a>
                            </li>
                            <li class="nav-item header-profile">
<!--                                <a class="nav-link" href="javascript:void(0)" role="button">-->
<!--                                    <div class="header-info">-->
<!--                                        <span class="text-black">₦{{getProfile.data.balance||0}}</span>-->
<!--                                        <p class="fs-12 mb-0">Balance</p>-->
<!--                                    </div>-->
<!--                                </a>-->
                                <a class="nav-link" href="javascript:void(0)" role="button">
                                    <div class="header-info">
                                        <span class="text-black">₦{{getProfile.data.profit||0}}</span>
                                        <p class="fs-12 mb-0">Profit</p>
                                    </div>
                                </a>
                            </li>
                            <!-- Another noti style -->
                            <!--                            <li class="nav-item dropdown notification_dropdown">-->
                            <!--                                <a class="nav-link" href="javascript:void(0)" data-toggle="dropdown">-->
                            <!--                                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">-->
                            <!--                                        <path d="M22.625 5.12506H21.75V1.62506C21.75 1.47268 21.7102 1.32295 21.6345 1.19068C21.5589 1.05841 21.45 0.948189 21.3186 0.870929C21.1873 0.79367 21.0381 0.75205 20.8857 0.750187C20.7333 0.748325 20.5831 0.786285 20.4499 0.860311L13 4.99915L5.55007 0.860311C5.41688 0.786285 5.26667 0.748325 5.11431 0.750187C4.96194 0.75205 4.8127 0.79367 4.68136 0.870929C4.55002 0.948189 4.44113 1.05841 4.36547 1.19068C4.28981 1.32295 4.25001 1.47268 4.25 1.62506V5.12506H3.375C2.67904 5.12582 2.01181 5.40263 1.51969 5.89475C1.02757 6.38687 0.750764 7.0541 0.75 7.75006V10.3751C0.750764 11.071 1.02757 11.7383 1.51969 12.2304C2.01181 12.7225 2.67904 12.9993 3.375 13.0001H4.25V22.6251C4.25076 23.321 4.52757 23.9882 5.01969 24.4804C5.51181 24.9725 6.17904 25.2493 6.875 25.2501H19.125C19.821 25.2493 20.4882 24.9725 20.9803 24.4804C21.4724 23.9882 21.7492 23.321 21.75 22.6251V13.0001H22.625C23.321 12.9993 23.9882 12.7225 24.4803 12.2304C24.9724 11.7383 25.2492 11.071 25.25 10.3751V7.75006C25.2492 7.0541 24.9724 6.38687 24.4803 5.89475C23.9882 5.40263 23.321 5.12582 22.625 5.12506ZM20 5.12506H16.3769L20 3.11256V5.12506ZM6 3.11256L9.62311 5.12506H6V3.11256ZM6 22.6251V13.0001H12.125V23.5001H6.875C6.64303 23.4998 6.42064 23.4075 6.25661 23.2434C6.09258 23.0794 6.0003 22.857 6 22.6251ZM20 22.6251C19.9997 22.857 19.9074 23.0794 19.7434 23.2434C19.5794 23.4075 19.357 23.4998 19.125 23.5001H13.875V13.0001H20V22.6251ZM23.5 10.3751C23.4997 10.607 23.4074 10.8294 23.2434 10.9934C23.0794 11.1575 22.857 11.2498 22.625 11.2501H3.375C3.14303 11.2498 2.92064 11.1575 2.75661 10.9934C2.59258 10.8294 2.5003 10.607 2.5 10.3751V7.75006C2.5003 7.51809 2.59258 7.2957 2.75661 7.13167C2.92064 6.96764 3.14303 6.87536 3.375 6.87506H22.625C22.857 6.87536 23.0794 6.96764 23.2434 7.13167C23.4074 7.2957 23.4997 7.51809 23.5 7.75006V10.3751Z" fill="#3E4954"/>-->
                            <!--                                    </svg>-->
                            <!--                                    <span class="badge light text-white bg-primary">2</span>-->
                            <!--                                </a>-->
                            <!--                                <div class="dropdown-menu dropdown-menu-right">-->
                            <!--                                    <div id="DZ_W_TimeLine02" class="widget-timeline dz-scroll style-1 ps ps&#45;&#45;active-y p-3 height370">-->
                            <!--                                        <ul class="timeline">-->
                            <!--                                            <li>-->
                            <!--                                                <div class="timeline-badge primary"></div>-->
                            <!--                                                <a class="timeline-panel text-muted" href="javascript:void(0)">-->
                            <!--                                                    <span>10 minutes ago</span>-->
                            <!--                                                    <h6 class="mb-0">Youtube, a video-sharing website, goes live <strong class="text-primary">$500</strong>.</h6>-->
                            <!--                                                </a>-->
                            <!--                                            </li>-->
                            <!--                                            <li>-->
                            <!--                                                <div class="timeline-badge info">-->
                            <!--                                                </div>-->
                            <!--                                                <a class="timeline-panel text-muted" href="javascript:void(0)">-->
                            <!--                                                    <span>20 minutes ago</span>-->
                            <!--                                                    <h6 class="mb-0">New order placed <strong class="text-info">#XF-2356.</strong></h6>-->
                            <!--                                                    <p class="mb-0">Quisque a consequat ante Sit amet magna at volutapt...</p>-->
                            <!--                                                </a>-->
                            <!--                                            </li>-->
                            <!--                                            <li>-->
                            <!--                                                <div class="timeline-badge danger">-->
                            <!--                                                </div>-->
                            <!--                                                <a class="timeline-panel text-muted" href="javascript:void(0)">-->
                            <!--                                                    <span>30 minutes ago</span>-->
                            <!--                                                    <h6 class="mb-0">john just buy your product <strong class="text-warning">Sell $250</strong></h6>-->
                            <!--                                                </a>-->
                            <!--                                            </li>-->
                            <!--                                            <li>-->
                            <!--                                                <div class="timeline-badge success">-->
                            <!--                                                </div>-->
                            <!--                                                <a class="timeline-panel text-muted" href="javascript:void(0)">-->
                            <!--                                                    <span>15 minutes ago</span>-->
                            <!--                                                    <h6 class="mb-0">StumbleUpon is acquired by eBay. </h6>-->
                            <!--                                                </a>-->
                            <!--                                            </li>-->
                            <!--                                            <li>-->
                            <!--                                                <div class="timeline-badge warning">-->
                            <!--                                                </div>-->
                            <!--                                                <a class="timeline-panel text-muted" href="javascript:void(0)">-->
                            <!--                                                    <span>20 minutes ago</span>-->
                            <!--                                                    <h6 class="mb-0">Mashable, a news website and blog, goes live.</h6>-->
                            <!--                                                </a>-->
                            <!--                                            </li>-->
                            <!--                                            <li>-->
                            <!--                                                <div class="timeline-badge dark">-->
                            <!--                                                </div>-->
                            <!--                                                <a class="timeline-panel text-muted" href="javascript:void(0)">-->
                            <!--                                                    <span>20 minutes ago</span>-->
                            <!--                                                    <h6 class="mb-0">Mashable, a news website and blog, goes live.</h6>-->
                            <!--                                                </a>-->
                            <!--                                            </li>-->
                            <!--                                        </ul>-->
                            <!--                                    </div>-->
                            <!--                                </div>-->
                            <!--                            </li>-->

                            <li class="nav-item dropdown header-profile">
                                <a class="nav-link" href="javascript:void(0)" role="button" data-toggle="dropdown">
                                    <div class="header-info">
                                        <span class="text-black">Hello <strong>{{getUser.data.lastName}}</strong></span>
                                        <p class="fs-12 mb-0">{{getUser.data.isAdmin?'Admin':'Contributor'}}</p>
                                    </div>
                                    <img src="../../../assets/dashboard/images/profile/user.png" width="20" alt=""/>
                                </a>
                                <div class="dropdown-menu dropdown-menu-right">
                                    <router-link :to="{name: 'Profile'}" class="dropdown-item ai-icon">
                                        <svg id="icon-user1" xmlns="http://www.w3.org/2000/svg" class="text-primary" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                        <span class="ml-2">Profile </span>
                                    </router-link>
                                    <router-link :to="{name: 'Withdrawals'}" class="dropdown-item ai-icon">
                                        <img style="width: 20px;height:20px" src="../../../assets/images/svg/withdraw.png" alt="withdraw">
                                        <span class="ml-2">Withdrawal Requests </span>
                                    </router-link>
                                    <a @click.prevent="logout" href="javascript:void(0)" class="dropdown-item ai-icon">
                                        <svg id="icon-logout" xmlns="http://www.w3.org/2000/svg" class="text-danger" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                                        <span class="ml-2">Logout </span>
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex"

    export default {
        name: "topNav",
        computed: {
            ...mapGetters('user', [
                'getUser'
            ]),
            ...mapGetters('profile', [
                'getProfile'
            ])
        },
        methods: {
            ...mapActions('auth', [
                'logout'
            ])
        },
        mounted() {
            this.$store.dispatch('profile/init')
        }
    }
</script>

<style scoped>

</style>