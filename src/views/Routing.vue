<template>
    <b-row class="h-100">
        <b-col class="h-100">
            <Map/>
        </b-col>
    </b-row>
</template>

<script>
    import Map from '@/components/Map.vue'

    export default {
        name: "routing",
        components: {
            Map
        }
    }
</script>

<style scoped>

</style>