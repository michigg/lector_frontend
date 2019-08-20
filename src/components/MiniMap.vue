<template>
    <div class="mini-map">
        <l-map
                :zoom="zoom"
                :center="reverseCoord"
                @update:zoom="zoomUpdated"
                @update:bounds="boundsUpdated"
        >
            <l-tile-layer :url="url"></l-tile-layer>
            <l-marker :lat-lng="reverseCoord">
                <l-icon :icon-anchor="dynamicAnchor" :icon-size="dynamicSize">
                    <font-awesome-icon icon="map-pin" size="2x"/>
                </l-icon>
            </l-marker>
            <l-marker v-if="wheelchairCoord" :lat-lng="wheelchairCoord" >
                <l-icon :icon-anchor="wheelchairAnchorSize" :icon-size="wheelchairStaircaseSize">
                    <font-awesome-icon icon="wheelchair" size="1x" class="d-inline-block text-primary"/>
                </l-icon>
            </l-marker>
            <l-marker v-for="(entry, index) in reverseEntries" v-bind:key="index" :lat-lng="entry.latlon_coord">
                <l-icon :icon-anchor="dynamicAnchor" :icon-size="dynamicSize">
                    <font-awesome-icon icon="door-open" size="2x" class="d-inline-block"/>
                </l-icon>
            </l-marker>
            <l-marker v-for="(entry, index) in reverseWheelChairEntries" v-bind:key="'wheel'+index" :lat-lng="entry.latlon_coord">
                <l-icon :icon-anchor="wheelchairAnchorSize" :icon-size="wheelchairSize">
                    <font-awesome-icon icon="wheelchair" size="1x" class="d-inline-block text-primary"/>
                </l-icon>
            </l-marker>
        </l-map>
    </div>
</template>

<script>
    import {LMap, LTileLayer, LMarker, LIcon} from 'vue2-leaflet'

    export default {
        name: "mini-map",
        components: {LMap, LTileLayer, LMarker, LIcon},
        props: ["staircase"],
        data() {
            return {
                url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
                zoom: 18,
                bounds: null,
                iconSize: 20,
            }
        },
        methods: {
            zoomUpdated(zoom) {
                this.zoom = zoom;
            },
            boundsUpdated(bounds) {
                this.bounds = bounds;
            },
            // reverseCoord(val){
            //     let new_point = val.slice();
            //     return new_point.reverse();
            // }
        },
        computed: {
            dynamicSize() {
                return [this.iconSize, this.iconSize * 1.15];
            },
            wheelchairSize() {
                return [this.iconSize + 50, this.iconSize * 10];
            },
            wheelchairAnchorSize() {
                return [12, 34];
            },
            wheelchairStaircaseSize() {
                return [this.iconSize + 30, this.iconSize * 1.15];
            },
            dynamicAnchor() {
                return [this.iconSize / 2, this.iconSize * 1.15];
            },
            reverseCoord() {
                return [this.staircase.coord[1], [this.staircase.coord[0]]];
            },
            wheelchairCoord() {
                if (this.staircase.wheelchair){
                    return [this.staircase.coord[1], [this.staircase.coord[0]]];
                }
                return []
            },
            reverseEntries() {
                let reversedEntries = [];
                for (const entry of this.staircase.entries) {
                    entry["latlon_coord"] = [entry.coord[1], entry.coord[0]];
                    reversedEntries.push(entry);
                }
                return reversedEntries;
            },
            reverseWheelChairEntries() {
                let reversedEntries = [];
                for (const entry of this.staircase.entries) {
                    if (entry.wheelchair){
                        reversedEntries.push(entry)
                    }
                }
                return reversedEntries;
            },
        }
    }
</script>

<style scoped>
    .mini-map {
        height: 200px !important;
    }
</style>