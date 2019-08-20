<template>
    <div class="h-100">
        <l-map v-if="center && goal"
                style="height: 100%; width: 100%"
                :zoom="zoom"
                :center="center"
                @update:zoom="zoomUpdated"
                @update:bounds="boundsUpdated"
        >
            <l-tile-layer :url="url"></l-tile-layer>
            <l-marker :lat-lng="center">
                <l-icon :icon-anchor="[4, 24]" :icon-size="[10,20]">
                    <font-awesome-icon icon="male" size="2x"/>
                </l-icon>
            </l-marker>
<!--            <l-marker :lat-lng="lineStart">-->
<!--                <l-icon :icon-anchor="[8, 10]" :icon-size="[10,10]">-->
<!--                    <font-awesome-icon icon="circle" size="1x" class="text-primary"/>-->
<!--                </l-icon>-->
<!--            </l-marker>-->
            <l-marker v-if="goal" :lat-lng="goal">
                <l-icon :icon-anchor="[4, 24]" :icon-size="[10,20]">
                    <font-awesome-icon icon="flag" size="2x"/>
                </l-icon>
            </l-marker>
            <l-polyline
                    :lat-lngs="getPolyLine"
                    color="#007bff">
            </l-polyline>
        </l-map>
        <div v-else class="h-100 text-center mt-5 h1">Es wurde leider keine Route gefunden</div>
    </div>
</template>

<script>
    import {LMap, LTileLayer, LMarker, LPolyline, LIcon} from 'vue2-leaflet'

    export default {
        name: "leaflet-map",
        components: {LMap, LTileLayer, LMarker, LPolyline, LIcon},
        data() {
            return {
                url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
                zoom: 18,
                bounds: null,
                iconSize: 10,
            }
        },
        computed: {
            getPolyLine() {
                return this.$store.getters.getPolyLineRoute
            },
            center() {
                return this.$store.getters.getUserPosition
            },
            goal() {
                return this.$store.getters.getToCoord
            },
            // lineStart() {
            //     return this.$store.getters.getPolyLineRoute[0]
            // },
        },

        methods: {
            zoomUpdated(zoom) {
                this.zoom = zoom;
            },
            boundsUpdated(bounds) {
                this.bounds = bounds;
            },
            geo_success(position) {
                this.$store
                    .dispatch('setUserPosition', {'user_position': [position.coords.latitude, position.coords.longitude]})
                    .then();
            },
            geo_error(error) {
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        alert("User denied the request for Geolocation.");
                        break;
                    case error.POSITION_UNAVAILABLE:
                        alert("Location information is unavailable.");
                        break;
                    case error.TIMEOUT:
                        alert("The request to get user location timed out.");
                        break;
                    case error.UNKNOWN_ERROR:
                        alert("An unknown error occurred.");
                        break;
                }
            },
        },
        created() {
            let options = {
                enableHighAccuracy: false,
                timeout: Infinity,
                maximumAge: 30000
            };

            navigator.geolocation.watchPosition(this.geo_success, this.geo_error, options);
        }
    }
</script>

<style>
    .leaflet-top {
        top: 45px !important;
    }
</style>