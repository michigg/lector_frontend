<template>
    <div>
        <navigation-bar v-if="standalone" :route-back-link="true"/>
        <h2 :id="staircase.id">{{staircase.name}} <span v-if="staircase.wheelchair" class="text-primary"><font-awesome-icon
                icon="wheelchair"/> </span><span
                v-if="staircase.blocked && isBlocked(staircase.blocked)" class="text-danger"><font-awesome-icon
                icon="times"/> </span></h2>
        <p v-if="staircases">Nachbartreppenhäuser: <a :href="getTarget(neighbour)" class="badge badge-primary ml-1"
                                    v-for="(neighbour, index) in staircase.neighbours"
                                    v-bind:key="index">{{getNeighbourName(neighbour)}} </a></p>

        <mini-map :staircase="staircase"></mini-map>
        <h3 class="h4 mt-2">Stockwerke: {{staircase.floors.length}}</h3>
        <b-table hover :items="staircase.floors" :fields="fields" v-if="!hideLevels">
            <template slot="[ranges]" slot-scope="data">
                <span v-for="(range, index) in data.item.ranges"
                      v-bind:key="index">{{range[0]}} - {{range[1]}}<br></span>
            </template>
        </b-table>
    </div>
</template>
<script>
    import MiniMap from "./BuildingMap"
    import NavigationBar from "../utils/NavigationBar";

    export default {
        name: 'staircase-config',
        components: {MiniMap, NavigationBar},
        props: {
            staircase: {},
            staircases: [],
            standalone: null,
            hideLevels: null
        },
        data() {
            return {
                fields: [
                    {
                        key: 'level',
                        label: 'Stockwerk',
                        sortable: true,
                        variant: 'secondary'
                    },
                    {
                        key: 'ranges',
                        label: 'Raum Bereiche',
                        sortable: false,
                    }
                ],
            }
        },
        methods: {
            getTarget: function (val) {
                return '#' + val;
            },
            getNeighbourName: function (staircase_id) {
                for (const staircase of this.staircases) {
                    if (staircase.id === staircase_id) {
                        return staircase.name
                    }
                }
                return "Nachbartreppenhaus für ID " + staircase_id + " nicht gefunden"
            }
        }
    }
</script>
