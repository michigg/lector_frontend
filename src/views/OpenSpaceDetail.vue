<template>
    <div class="h-100">
        <navigation-bar/>
        <b-row class="justify-content-center">
            <!--            Heading-->
            <b-col xs="12">
                <h1>Open Space {{file_name}}</h1>
                <p><a :href="geojsonioLink" target="_blank">Bearbeiten in geojson.io</a></p>
                <button class="btn btn-primary" v-if="!openSpacePlotUrl" v-on:click="this.getCurrentOpenSpacePlotUrl">
                    Plot erstellen
                </button>
                <p><a v-if="openSpacePlotUrl" :href="openSpacePlotUrl" target="_blank">Plot</a></p>
            </b-col>
            <b-col xs="12" sm="12" md="12" lg="12" xl="12" class="text-center"
                   v-if="loadOpenSpacePlot">
                <p>Plot wird erstellt...</p>
                <font-awesome-icon icon="spinner" spin pulse size="6x"/>
            </b-col>
        </b-row>
        <b-row class="h-100">
            <b-col xs="12" sm="12" lg="12" xl="12" class="h-100">
                <div class="map-wrapper h-100">
                    <l-map style="height: 100%; width: 100%" :zoom="zoom" :center="center"
                           :options="{zoomControl: false}">
                        <l-tile-layer :url="url"></l-tile-layer>
                        <l-geo-json :geojson="openSpace"></l-geo-json>
                    </l-map>
                </div>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import NavigationBar from "./NavigationBar";
    import {LMap, LTileLayer, LGeoJson} from 'vue2-leaflet'

    export default {
        name: 'openSpaceDetail',
        props: ['file_name'],
        components: {LMap, LTileLayer, LGeoJson, NavigationBar},
        data() {
            return {
                openSpace: {
                    "type": "FeatureCollection",
                    "features": []
                },
                url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
                zoom: 18,
                bounds: null,
                openSpacePlotUrl: null,
                loadOpenSpacePlot: false,
            }
        },
        created: function () {
            const url = "" + process.env.VUE_APP_LECTOR_DOMAIN + "/api/v1/open-space/?file_name=".concat(this.file_name);
            window.axios.get(url)
                .then(response => {
                    this.openSpace = response.data.geojson;
                })
                .catch(e => {
                    console.error(e)
                });
        },
        computed: {
            center() {
                let min_lat = 360;
                let max_lat = -360;
                let min_lon = 360;
                let max_lon = -360;
                for (const feature of this.openSpace.features) {
                    if (feature.properties.walkable == "True") {
                        for (const coordinate of feature.geometry.coordinates[0]) {
                            if (coordinate[1] < min_lat) {
                                min_lat = coordinate[1]
                            }
                            if (coordinate[1] > max_lat) {
                                max_lat = coordinate[1]
                            }
                            if (coordinate[0] < min_lon) {
                                min_lon = coordinate[0]
                            }
                            if (coordinate[0] > max_lon) {
                                max_lon = coordinate[0]
                            }
                        }
                        const lat = min_lat + (max_lat - min_lat) / 2;
                        const lon = min_lon + (max_lon - min_lon) / 2;
                        return [lat, lon];
                    }
                }
                return this.$store.getters.getUserPosition
            },
            geojsonioLink() {
                return "http://geojson.io/#data=data:application/json,".concat(JSON.stringify(this.openSpace));
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
                const url = "" + process.env.VUE_APP_LECTOR_DOMAIN + "/api/v1/open-space/plot/?file_name=".concat(this.file_name);
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
