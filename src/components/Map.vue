<template>
    <div class="h-100">
        <!-- <div class="info" style="height: 15%">
             <span>Center: {{ center }}</span>
             <span>Zoom: {{ zoom }}</span>
             <span>Bounds: {{ bounds }}</span>
         </div>-->
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
        },
        created() {
            this.$getLocation({
                enableHighAccuracy: true, //defaults to false
                timeout: Infinity, //defaults to Infinity
                maximumAge: 5 //defaults to 0

            })
                .then(coordinates => {
                    this.$store
                        .dispatch('setUserPosition', {'user_position': [coordinates.lat, coordinates.lng]})
                        .then();
                });
        }
    }
</script>

<style scoped>
</style>