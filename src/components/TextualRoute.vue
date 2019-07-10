<template>
    <div class="textual-route-wrapper">
        <b-button block squared variant="outline-secondary" href="#" v-b-toggle.textual-route-description
                  class="bg-light">{{from}} - {{to}}
            ({{duration}})
            <router-link to="/">
                <font-awesome-icon icon="home"/>
            </router-link>
        </b-button>
        <b-collapse id="textual-route-description" accordion="textual-route-accordion" role="tabpanel">
            <ul class="list-group">
                <!-- eslint-disable-next-line -->
                <li v-for="step in routingData" class="list-group-item">
                     {{step.instruction}} - ({{ step.distance }}m | {{step.duration}}s)
                </li>
            </ul>
        </b-collapse>
    </div>
</template>

<script>
    export default {
        name: "TextualRoute",
        data() {
            return {
                from: 'An der Weberei 5',
                to: 'An der Universität 2',
                duration: "20min",
                items: [
                    {'distance': '300m', 'street': 'Maria-Ward Straße'},
                    {'distance': '1.2km', 'street': 'Berliner Ring'},
                    {'distance': '1.2km', 'street': 'Berliner Ring'},
                    {'distance': '1.2km', 'street': 'Berliner Ring'},
                    {'distance': '1.2km', 'street': 'Berliner Ring'},
                ],
            }
        },
        computed: {
            routingData() {
                return this.$store.getters.getTextualRoute
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

    #app {
        margin-top: 38px;
    }
</style>