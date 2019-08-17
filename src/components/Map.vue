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
                console.log("Location Changed");
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
            // if ("geolocation" in navigator) {
            //     /* geolocation funktioniert */
            //
            //
            //     var geo_options = {
            //         enableHighAccuracy: true,
            //         maximumAge: 30000,
            //         timeout: 27000
            //     };
            //     var watchID = navigator.geolocation.watchPosition(this.geo_success, this.geo_error, geo_options);
            //     console.log(watchID)
            // } else {
            //     /* geolocation funktioniert NICHT */
            //     console.error("Geolocation not provided!")
            // }
            // const locationOptions = {
            //     enableHighAccuracy: true, //defaults to false
            //     timeout: 5000, //defaults to Infinity
            //     maximumAge: 0 //defaults to 0
            //
            // };
            // this.$getLocation(locationOptions)
            //     .then(coordinates => {
            //         this.$store
            //             .dispatch('setUserPosition', {'user_position': [coordinates.lat, coordinates.lng]})
            //             .then();
            //     });

            let options = {
                enableHighAccuracy: false,
                timeout: 5000,
                maximumAge: 0
            };

            // navigator.geolocation.getCurrentPosition(this.geo_success, this.geo_error, options);
            navigator.geolocation.watchPosition(this.geo_success, this.geo_error, options);
            // this.$watchLocation(locationOptions)
            //     .then(coordinates => {
            //         console.log(coordinates);
            //     })
            // this.$watchLocation(locationOptions)
            //     .then(coordinates => {
            //         this.$store
            //             .dispatch('setUserPosition', {'user_position': [coordinates.lat, coordinates.lng]})
            //             .then();
            //     });
        }
    }
</script>

<style>
    .leaflet-top {
        top: 45px !important;
    }
</style>