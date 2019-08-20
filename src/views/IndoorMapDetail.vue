<template>
    <div class="h-100">
        <navigation-bar/>
        <b-row class="justify-content-center">
            <!--            Heading-->
            <b-col xs="12">
                <h1>Building <span class="building-key">{{file_name | format_file_name}}</span></h1>
            </b-col>
        </b-row>
        <b-row class="h-100">
            <b-col xs="12" sm="12" lg="12" xl="12">
                <p>Treppenhäuser: {{staircases.length}}</p>
                <b-row v-if="staircases.length > 0">
                    <b-col xs="12" sm="6" md="4" lg="4" xl="3" v-for="(staircase, index) in staircases"
                           v-bind:key="index">
                        <h2>{{staircase.name}} <span v-if="staircase.wheelchair" class="text-primary"><font-awesome-icon
                                icon="wheelchair"/> </span><span v-if="staircase.blocked && isBlocked(staircase.blocked)" class="text-danger"><font-awesome-icon
                                icon="times"/> </span></h2>
                        <p>Nachbartreppenhäuser: <span v-for="(neighbour, index) in staircase.neighbours"
                                                       v-bind:key="index">{{neighbour}}</span></p>

                        <mini-map :staircase="staircase"></mini-map>
                        <h3 class="h4 mt-2">Stockwerke: {{staircase.floors.length}}</h3>
                        <b-table hover :items="staircase.floors" :fields="fields">
                            <template slot="[ranges]" slot-scope="data">
                                <span v-for="(range, index) in data.item.ranges" v-bind:key="index">{{range[0]}} - {{range[1]}}<br></span>
                            </template>
                        </b-table>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import NavigationBar from "../components/NavigationBar";
    import MiniMap from "../components/MiniMap";

    export default {
        name: 'indoorMapDetail',
        props: ['file_name'],
        components: {MiniMap, NavigationBar},
        data() {
            return {
                building: {},
                fields: [
                    {
                        key: 'level',
                        label: 'Stockwerk',
                        sortable: true,
                        variant: 'secondary'
                    },
                    {
                        key: 'ranges',
                        label: 'Raum Bereiche',
                        sortable: false,
                    }
                ]
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
            const url = "" + process.env.VUE_APP_LECTOR_DOMAIN + "/api/v1/buildings/?file_name=".concat(this.file_name);
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
