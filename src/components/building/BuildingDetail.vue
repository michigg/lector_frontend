<template>
    <div class="h-100">
        <navigation-bar :route-back-link="true"/>
        <b-row class="justify-content-center">
            <!--            Heading-->
            <b-col xs="12">
                <h1>Building <span class="building-key">{{building.key}}</span></h1>
            </b-col>
        </b-row>
        <b-row class="h-100">
            <b-col xs="12" sm="12" lg="12" xl="12">
                <p>Treppenhäuser: {{staircases.length}}</p>
                <b-row v-if="staircases.length > 0">
                    <b-col xs="12" sm="6" md="4" lg="4" xl="3" v-for="(staircase, index) in staircases"
                           v-bind:key="index">
                        <staircase-config :staircase="staircase" :staircases="staircases" :hide-levels="true"/>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import NavigationBar from "../utils/NavigationBar";
    import StaircaseConfig from "./StaircaseConfig";

    export default {
        name: 'userIndoorMapDetail',
        components: {StaircaseConfig, NavigationBar},
        data() {
            return {
                building: {},
            }
        },
        computed: {
            staircases() {
                if (this.building && this.building.staircases) {
                    return this.building.staircases;
                }
                return []
            }
        },
        created: function () {
            const room = this.$store.getters.getDestinationRoom;
            const url = "" + process.env.VUE_APP_LECTOR_DOMAIN + "/api/v1/buildings/".concat(room.building_key).concat("/").concat(room.level).concat("/").concat(room.number).concat("/");
            window.axios.get(url)
                .then(response => {
                    this.building = response.data;
                })
                .catch(e => {
                    console.error(e)
                });
        },
    }
</script>

<style scoped>
    .locomotion-btn-group {
        width: 300px;
        height: 150px;
    }


</style>
