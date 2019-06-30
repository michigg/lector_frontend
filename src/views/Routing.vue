<template>
    <div class="h-100">
        <TextualRoute/>
        <div class="map-wrapper">
            <Map/>
        </div>
        <Options/>
    </div>
</template>

<script>
    import Map from '@/components/Map.vue';
    import TextualRoute from '@/components/TextualRoute.vue';
    import Options from '@/components/Options.vue';

    export default {
        name: "routing",
        components: {
            Map,
            TextualRoute,
            Options
        }
    }
</script>

<style scoped>
    .map-wrapper{
        height: calc(100% - 38px);
        top: 38px;
    }

</style>