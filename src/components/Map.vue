<template>
    <div>
        <div class="info" style="height: 15%">
            <span>Center: {{ center }}</span>
            <span>Zoom: {{ zoom }}</span>
            <span>Bounds: {{ bounds }}</span>
        </div>
        <l-map
                style="height: 400px; width: 400px"
                :zoom="zoom"
                :center="center"
                @update:zoom="zoomUpdated"
                @update:center="centerUpdated"
                @update:bounds="boundsUpdated"
        >
            <l-tile-layer :url="url"></l-tile-layer>
            <l-marker :lat-lng="center"></l-marker>
        </l-map>
    </div>
</template>

<script>
    import {LMap, LTileLayer, LMarker} from 'vue2-leaflet'

    export default {
        name: "Map",
        components: { LMap, LTileLayer, LMarker },
        data() {
            return {
                url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
                zoom: 10,
                center: [49.8900562,  10.913047],
                bounds: null
            }
        },
        methods: {
            zoomUpdated(zoom) {
                this.zoom = zoom;
            },
            centerUpdated(center) {
                this.center = center;
            },
            boundsUpdated(bounds) {
                this.bounds = bounds;
            }
        }
    }
</script>

<style scoped>

</style>