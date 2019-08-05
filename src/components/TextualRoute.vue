<template>
    <div class="textual-route-wrapper">
        <b-button block squared variant="outline-secondary" href="#" v-on:click="isActive = !isActive"
                  class="bg-light textual-route-btn" v-if="routingData.length > 0">{{from | get_street_name}} - {{to | get_street_name}}
            ({{duration}}min)
            <router-link to="/">
                <font-awesome-icon icon="home"/>
            </router-link>
        </b-button>
        <b-button block squared variant="outline-secondary" href="#" v-on:click="isActive = !isActive"
                  class="bg-light textual-route-btn" v-else>
            Keine Route gefunden!
            <router-link to="/"><font-awesome-icon icon="home"/></router-link>
        </b-button>
        <div class="textual-route-description" v-bind:class="{ active: isActive }" v-if="routingData.length > 0">
            <ul class="list-group">
                <!-- eslint-disable-next-line -->
                <li v-for="step in routingData" class="list-group-item">
                    <p v-if="step.street_name"> {{step.street_name | get_street_name}} ({{step.distance |round_meter }}m
                        | {{step.time | to_minutes}})</p>
                    <p>{{step.text}}</p>
                </li>
            </ul>
        </div>
        <div class="textual-route-description bg-light" v-bind:class="{ active: isActive }" v-else>
            <p class="h2">Keine Route gefunden!</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TextualRoute",
        data() {
            return {
                isActive: false,
            }
        },
        computed: {
            routingData() {
                return this.$store.getters.getTextualRoute
            },
            duration() {
                return this.$store.getters.getRouteDuration
            },
            from() {
                return this.$store.getters.getRouteFrom
            },
            to() {
                return this.$store.getters.getRouteTo
            },
        }, filters: {
            to_minutes: function (value) {
                const minutes = Math.round(value / 60000);
                if (minutes > 0) {
                    return minutes + "min";
                } else {
                    return Math.round(value / 1000) + "s";
                }
            },
            round_meter: function (value) {
                return Math.round(value * 10) / 10
            },
            get_street_name: function (value) {
                console.log(value);
                if (value == "nan") {
                    return "Unbekannter Weg"
                } else {
                    return value
                }
            }
        }
    }
</script>

<style>

    .textual-route-wrapper {
        position: fixed;
        width: 100%;
        top: 0;
        z-index: 500;
    }


    .textual-route-wrapper {
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 500;
    }

    .textual-route-btn {
        position: fixed;
        top: 0;
        width: 100%;
        height: 40px;
    }

    .textual-route-wrapper .textual-route-description {
        width: 100%;
        top: -640px;
        position: fixed;
        padding: 5px;
        height: 600px;
        overflow: scroll;
        transition: top 0.5s;

    }

    .textual-route-wrapper .textual-route-description.active {
        top: 40px;
        transition: top 0.5s;
    }

</style>