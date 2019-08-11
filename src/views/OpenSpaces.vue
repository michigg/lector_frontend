<template>
    <div>
        <navigation-bar/>
        <b-row class="justify-content-center">
            <!--            Heading-->
            <b-col xs="12">
                <h1>Open Space</h1>
            </b-col>
        </b-row>
        <b-row>
            <b-col xs="12" sm="12" lg="12" xl="12">
                <b-list-group-item v-for="(openSpace, index) in openSpaces" :key="index">
                    <router-link :to="{ name: 'OpenSpaceDetail', params: {file_name: openSpace.file_name}}">
                        {{openSpace.file_name}}
                    </router-link>
                </b-list-group-item>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import NavigationBar from "./NavigationBar";

    export default {
        name: 'home',
        components: {NavigationBar},
        data() {
            return {
                openSpaces: []
            }
        },
        created: function () {
            const url = "" + process.env.VUE_APP_LECTOR_DOMAIN + "/api/v1/open-space/";
            window.axios.get(url)
                .then(response => {
                    this.openSpaces = response.data;
                })
                .catch(e => {
                    console.error(e)
                });
        },
        computed: {
            // lectures() {
            //     return this.$store.getters.getLectures
            // },
            // to_coord() {
            //     return this.$store.getters.getToCoord
            // },
            // selected() {
            //     return this.$store.getters.getRouteTo
            // }
        },
        methods: {
            // get_room_display_name(building_key, level, number) {
            //     switch (number.toString().length) {
            //         case 1:
            //             number = '00' + number;
            //             break;
            //         case 2:
            //             number = '0' + number;
            //             break;
            //         default:
            //             break;
            //     }
            //     switch (level.toString().length) {
            //         case 1:
            //             level = '0' + level;
            //             break;
            //         default:
            //             break;
            //     }
            //     return building_key + "/" + level + "." + number;
            // },
        },
        watch: {
            // locomotion: function () {
            //     this.$store
            //         .dispatch('setModus', {'modus': this.locomotion})
            //         .then();
            // }
        },
    }
</script>

<style scoped>
    .locomotion-btn-group {
        width: 300px;
        height: 150px;
    }


</style>
