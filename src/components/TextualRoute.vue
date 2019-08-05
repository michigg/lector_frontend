<template>
    <div class="textual-route-wrapper">
        <b-button block squared variant="outline-secondary" href="#" v-on:click="isActive = !isActive"
                  class="bg-light textual-route-btn">{{from}} - {{to}}
            ({{duration}}min)
            <router-link to="/">
                <font-awesome-icon icon="home"/>
            </router-link>
        </b-button>
        <div class="textual-route-description" v-bind:class="{ active: isActive }">
            <ul class="list-group">
                <!-- eslint-disable-next-line -->
                <li v-for="step in routingData" class="list-group-item">
                    {{step.street_name}}: {{step.text}} - ({{ step.distance }}m | {{step.time}}s)
                </li>
            </ul>
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
        },
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
        /*display: none;*/
        width: 100%;
        top: -640px;
        position: fixed;
        padding: 5px;
        height: 600px;
        overflow: scroll;
        transition: top 1s;

    }

    .textual-route-wrapper .textual-route-description.active {
        display: block;
        top: 40px;
        transition: top 1s;
    }

</style>