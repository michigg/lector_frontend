<template>
    <div class="h-100">
        <l-map
                style="height: 100%; width: 100%"
                :zoom="zoom"
                :center="center"
                @update:zoom="zoomUpdated"
                @update:bounds="boundsUpdated"
        >
            <l-tile-layer :url="url"></l-tile-layer>
            <l-marker :lat-lng="center"></l-marker>
            <l-polyline
                    :lat-lngs="getPolyLine"
                    color="green">
            </l-polyline>
        </l-map>
    </div>
</template>

<script>
    import {LMap, LTileLayer, LMarker, LPolyline} from 'vue2-leaflet'

    export default {
        name: "leaflet-map",
        components: {LMap, LTileLayer, LMarker, LPolyline},
        data() {
            return {
                url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
                zoom: 18,
                bounds: null,
            }
        },
        computed: {
            getPolyLine() {
                return this.$store.getters.getPolyLineRoute
            },
            center() {
                return this.$store.getters.getUserPosition
            },
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
                maximumAge: 0
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