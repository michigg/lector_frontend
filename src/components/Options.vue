<template>
    <div class="options-wrapper">
        <b-button id="popover-options" v-on:click="isActive = !isActive" squared variant="outline-secondary"
                  class="options-btn bg-light">Options
        </b-button>
        <div v-bind:class="{ active: isActive }" class="options-popover bg-light">
            Hier könnte Ihre Busverbindung stehen!
        </div>
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
                title: 'Title',
                content: 'Inhalte',
                isActive: false
            }
        },
    }
</script>

<style>
    .options-wrapper {
        position: fixed;
        bottom: 0;
        right: 0;
        width: 100%;
        z-index: 500;
    }

    .options-btn {
        position: fixed;
        bottom: 0;
        right: 0;
        width: 80%;
        height: 40px;
    }

    .options-wrapper .options-popover {
        height: 600px;
        bottom: -640px;
        width: 100%;
        right: 0;
        position: fixed;
        padding: 5px;
        overflow: scroll;
        transition: bottom 0.5s;

    }

    .options-wrapper .options-popover.active {
        bottom: 40px;
        transition: bottom 0.5s;
    }

</style>