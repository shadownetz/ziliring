<template>
    <component
            :is="activeComponent"
            :payload="payload"
            @toggle="$emit('toggle',$event)"
            @switchComponent="switchComponent($event)"
    />
</template>

<script>
    import users from "./users";
    import purgedUsers from "./purgedUsers";
    import reportedUsers from "./reportedUsers";

    export default {
        name: "container",
        data(){
            return {
                activeComponent: 'users',
                payload: {}
            }
        },
        components: {
            users,
            purgedUsers,
            reportedUsers
        },
        methods: {
            switchComponent(event){
                this.activeComponent = event.component || 'users';
                this.payload = event.payload || {};
            }
        }
    }
</script>

<style scoped>

</style>