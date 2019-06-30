<template>
    <div class="h-100">
        <b-row>
            <b-col>
                <TextualRoute/>
            </b-col>
        </b-row>
        <b-row class="h-100">
            <b-col class="h-100">
                <Map/>
            </b-col>
        </b-row>
        <b-row>
            <b-col class="h-100">
                <Options/>
            </b-col>
        </b-row>
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

</style>