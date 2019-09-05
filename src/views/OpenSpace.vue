<template>
    <div class="h-100">
        <navigation-bar/>
        <b-row class="justify-content-center">
            <b-col xs="12" sm="9" md="7" lg="6" xl="6" class="text-center"
                   v-if="openSpace">

                <h1>Freifläche <span class="openspace-name">{{openSpace.file_name | format_file_name}}</span></h1>
                <b-card no-body>
                    <b-card-body>
                        <b-card-title>Konfiguration</b-card-title>
                        <b-card-sub-title class="mb-2">{{openSpace.file_name}}</b-card-sub-title>
                    </b-card-body>

                    <b-list-group flush>
                        <b-list-group-item>Freifläche Knoten: {{openSpace.walkable_area_nodes}}</b-list-group-item>
                        <b-list-group-item>Eingeschränkte Flächen: {{openSpace.restricted_areas}}</b-list-group-item>
                        <b-list-group-item>Gesperrte Flächen: {{openSpace.blocked_areas}}</b-list-group-item>
                        <b-list-group-item>Zugänge: {{openSpace.entry_points}}</b-list-group-item>
                        <b-list-group-item>Universitätsgebäude: {{openSpace.buildings}}</b-list-group-item>
                    </b-list-group>

                    <b-card-body>
                        <!--                        <a href="#" class="card-link">Card link</a>-->
                        <button class="card-link btn btn-link" v-if="!openSpacePlotUrl && !loadOpenSpacePlot"
                                v-on:click="this.getCurrentOpenSpacePlotUrl">
                            Plot erstellen
                        </button>
                        <button disabled class="card-link btn btn-link" v-if="loadOpenSpacePlot"
                                v-on:click="this.getCurrentOpenSpacePlotUrl">
                            <b-spinner small label="Large Spinner" class="card-link"></b-spinner>
                            Plot wird erstellt...
                        </button>

                        <a v-if="openSpacePlotUrl" :href="openSpacePlotUrl" class="card-link" target="_blank">Plot
                            ansehen</a>
                        <a :href="geojsonioLink" target="_blank" class="card-link">Ansehen/Bearbeiten</a>
                    </b-card-body>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import NavigationBar from "../components/utils/NavigationBar";
    // import {LMap, LTileLayer, LGeoJson} from 'vue2-leaflet'

    export default {
        name: 'openSpaceDetail',
        props: ['file_name'],
        components: {NavigationBar},
        data() {
            return {
                openSpaceGeojson: {
                    "type": "FeatureCollection",
                    "features": []
                },
                openSpace: null,
                url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
                zoom: 18,
                bounds: null,
                openSpacePlotUrl: null,
                loadOpenSpacePlot: false,
            }
        },
        created: function () {
            const geojsonUrl = "" + process.env.VUE_APP_LECTOR_DOMAIN + "/api/v1/open-spaces/".concat(this.file_name).concat("/geojson/");
            window.axios.get(geojsonUrl)
                .then(response => {
                    this.openSpaceGeojson = response.data.geojson;
                })
                .catch(e => {
                    console.error(e)
                });
            const configUrl = "" + process.env.VUE_APP_LECTOR_DOMAIN + "/api/v1/open-spaces/".concat(this.file_name).concat("/config/");
            window.axios.get(configUrl)
                .then(response => {
                    this.openSpace = response.data;
                })
                .catch(e => {
                    console.error(e)
                });
        },
        computed: {
            geojsonioLink() {
                return "http://geojson.io/#data=data:application/json,".concat(JSON.stringify(this.openSpaceGeojson));
            },
        },
        methods: {
            zoomUpdated(zoom) {
                this.zoom = zoom;
            },
            boundsUpdated(bounds) {
                this.bounds = bounds;
            },
            getCurrentOpenSpacePlotUrl() {
                this.loadOpenSpacePlot = true;
                const url = "" + process.env.VUE_APP_LECTOR_DOMAIN + "/api/v1/open-spaces/".concat(this.file_name).concat("/plot/");
                window.axios.get(url)
                    .then(response => {
                        this.openSpacePlotUrl = "" + process.env.VUE_APP_LECTOR_DOMAIN + response.data.url;
                        this.loadOpenSpacePlot = false;
                    })
                    .catch(e => {
                        console.error(e);
                        this.loadOpenSpacePlot = false;
                    });
            },

        },
    }
</script>

<style scoped>
    .locomotion-btn-group {
        width: 300px;
        height: 150px;
    }


</style>
