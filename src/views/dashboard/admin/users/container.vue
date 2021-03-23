<template>
    <component
            :is="activeComponent"
            :payload="payload"
            @toggle="$emit('toggle',$event)"
    />
</template>

<script>
    import users from "./users";

    export default {
        name: "container",
        data(){
            return {
                activeComponent: 'users',
                payload: {}
            }
        },
        components: {
            users
        }
    }
</script>

<style scoped>

</style>