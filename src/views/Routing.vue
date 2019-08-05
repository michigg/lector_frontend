<template>
    <div class="h-100">
        <TextualRoute/>
        <div class="map-wrapper h-100">
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
        },
        created() {
            this.$store
                .dispatch('loadRouting')
                .then();
        },

    }
</script>

<style scoped>
</style>