import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        routingData: {},
        route: 0
    },
    getters: {
        getRoutingData: state => {
            return state.routingData.routes[state.route].segments[0].steps
        },
        getTextualRoute: state => {
            return state.routingData.routes[state.route].segments[0].steps
        },
        getRouteDistance: state => {
            return state.routingData.routes[state.route].segments[0].distance
            // return state.routingData.routes[state.route]
        },
        getRouteDuration: state => {
            return state.routingData.routes[state.route].segments[0].duration
        },
    },
    mutations: {
        loadRouting(state, {from, to, modus}) {
            const url = "http://localhost:8080/ors/routes?profile="
                .concat(modus)
                .concat("&coordinates=")
                .concat(from[0])
                .concat(",")
                .concat(from[1])
                .concat("|")
                .concat(to[0])
                .concat(",")
                .concat(to[1]);
            window.axios.get(url)
                .then(response => {
                    state.routingData = response.data;
                })
                .catch(e => {
                    console.error(e)
                });

        }
    },
    actions: {
        loadRouting(context, config) {
            context.commit('loadRouting', config)
        }
    }
})
