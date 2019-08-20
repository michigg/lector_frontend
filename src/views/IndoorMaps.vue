<template>
    <div>
        <navigation-bar/>
        <b-row class="justify-content-center">
            <!--            Heading-->
            <b-col xs="12">
                <h1>Indoor Maps Jsons</h1>
            </b-col>
        </b-row>
        <b-row>
            <b-col xs="12" sm="12" lg="12" xl="12">
                <b-list-group-item v-for="(building, index) in buildings" :key="index">
                    <router-link :to="{ name: 'IndoorMapDetail', params: {file_name: building.file_name}}" class="file-name">
                        {{building.file_name | format_file_name}}
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
        props: ['file_name'],
        data() {
            return {
                buildings: []
            }
        },
        created: function () {
            const url = "" + process.env.VUE_APP_LECTOR_DOMAIN + "/api/v1/buildings/";
            window.axios.get(url)
                .then(response => {
                    this.buildings = response.data;
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
    .file-name {
        text-transform: uppercase;
    }

</style>
