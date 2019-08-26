<template>
    <div>
        <navigation-bar/>
        <b-row class="justify-content-center">
            <!--            Heading-->
            <b-col xs="12">
                <h1>Freiflächen Konfigurationen</h1>
            </b-col>
        </b-row>
        <b-row>
            <b-col xs="12" sm="12" lg="12" xl="12">
                <b-list-group-item v-for="(openSpace, index) in openSpaces" :key="index">
                    <router-link :to="{ name: 'OpenSpaceDetail', params: {file_name: openSpace.file_name}}" class="openspace-name">
                        {{openSpace.file_name | format_file_name}}
                    </router-link>
                </b-list-group-item>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import NavigationBar from "../components/NavigationBar";

    export default {
        name: 'home',
        components: {NavigationBar},
        data() {
            return {
                openSpaces: []
            }
        },
        created: function () {
            const url = "" + process.env.VUE_APP_LECTOR_DOMAIN + "/api/v1/open-spaces/";
            window.axios.get(url)
                .then(response => {
                    this.openSpaces = response.data;
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
