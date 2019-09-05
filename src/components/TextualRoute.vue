<template>
    <div class="textual-route-wrapper">
        <b-button block squared variant="outline-primary" href="#" v-on:click="isActive = !isActive"
                  class="bg-white textual-route-btn" v-if="routingData.length > 0">{{from | get_street_name}} - {{to |
            get_street_name}}
            ({{duration}}min)
            <router-link to="/">
                <font-awesome-icon icon="home"/>
            </router-link>
        </b-button>
        <b-button block squared variant="outline-secondary" href="#" v-on:click="isActive = !isActive"
                  class="bg-light textual-route-btn" v-else>
            Keine Route gefunden!
            <router-link to="/">
                <font-awesome-icon icon="home"/>
            </router-link>
        </b-button>
        <div class="textual-route-description" v-bind:class="{ active: isActive }" v-if="routingData.length > 0">
            <ul class="list-group">
                <li v-for="(step, index) in routingData" v-bind:key="index" class="list-group-item"
                    :class="{ 'active': index === 0 }">
                    <span class="route-description-elem">{{step.text}}</span>
                    <span class="d-block" v-if="step.street_name"> {{step.street_name | get_street_name}} ({{step.distance |round_meter }}m
                        | {{step.time | to_minutes}})</span>
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
                lastSpocken: ""
            }
        },
        computed: {
            routingData() {
                return this.$store.getters.getTextualRoute
            },
            nextStep() {
                return this.$store.getters.getTextualRoute[0]
            },
            duration() {
                return this.$store.getters.getRouteDuration
            },
            from() {
                return this.$store.getters.getRouteFrom
            },
            to_room() {
                return this.$store.getters.getRouteTo
            },
        },
        watch: {
          nextStep(newVal){
              if (newVal.text != this.lastSpocken){
                  var msg = new SpeechSynthesisUtterance();
                  var voices = window.speechSynthesis.getVoices();
                  msg.voice = voices[10];
                  // msg.voiceURI = "native";
                  msg.volume = 1;
                  msg.rate = 0.9;
                  msg.pitch = 0.7;
                  msg.text = newVal.text;
                  msg.lang = 'de-DE';
                  window.speechSynthesis.speak(msg);
                  console.log(newVal.text);
              }
              this.lastSpocken = newVal.text;
          },
        },
        filters: {
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
        top: 0;
        width: 100%;
        z-index: 2000;
        margin-right: -15px;
        margin-left: -15px;
    }

    .textual-route-btn {
        position: fixed;
        top: 0;
        width: 100%;
        height: 40px;
        z-index: 2000;
    }

    .textual-route-btn:hover, .textual-route-btn:focus{
        color: var(--secondary) !important;
    }

    .textual-route-wrapper .textual-route-description {
        width: 100%;
        top: calc((100% - 40px) * -1);
        position: fixed;
        height: calc(100% - 40px);
        overflow: scroll;
        transition: top 0.5s;

    }

    .textual-route-wrapper .textual-route-description.active {
        top: 40px;
        transition: top 0.5s;
    }

    .route-description-elem {
        font-weight: 600;
    }

</style>