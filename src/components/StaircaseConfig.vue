<template>
    <div>
        <navigation-bar v-if="standalone" :route-back-link="true"/>
        <h2>{{staircase.name}} <span v-if="staircase.wheelchair" class="text-primary"><font-awesome-icon
                icon="wheelchair"/> </span><span
                v-if="staircase.blocked && isBlocked(staircase.blocked)" class="text-danger"><font-awesome-icon
                icon="times"/> </span></h2>
        <p>Nachbartreppenhäuser: <span v-for="(neighbour, index) in staircase.neighbours"
                                       v-bind:key="index">{{neighbour}}</span></p>

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
    import MiniMap from "./MiniMap"
    import NavigationBar from "../components/NavigationBar";

    export default {
        name: 'staircase-config',
        components: {MiniMap, NavigationBar},
        props: {
            staircase: {},
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
        }
    }
</script>
