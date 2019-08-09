import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        routingData: {},
        route: 0,
        lectures: {},
        rooms: [],
        to_coord: [
            49.89348707885022,
            10.887494087219238
        ],
        to: "",
        user_position: [
            49.900052680341155,
            10.8984375
        ],
        modus: 'foot',
    },
    getters: {
        getLectures: state => {
            return state.lectures
        },
        getLecturesBefore: state => {
            if (state.lectures.before) {
                return state.lectures.before;
            }
        },
        getLecturesAfter: state => {
            if (state.lectures.after) {
                return state.lectures.after;
            }
            return []
        },
        getRooms: state => {
            return state.rooms;
        },
        // getLecturesMinimal: state => {
        //     let minimal_lectures = [];
        //     for (const lecture of state.lectures) {
        //         minimal_lectures.push({'value': lecture, 'label': lecture.name})
        //     }
        //     return minimal_lectures
        // },
        getToCoord: state => {
            return state.to_coord
        },
        getUserPosition: state => {
            return state.user_position
        },
        getRoutingDataAsGeoJson: state => {
            if (state.routingData) {
                return state.routingData
            }
            return {}
        },
        getTextualRoute: state => {
            if (state.routingData.paths) {
                return state.routingData.paths[0].instructions
            }
            return []
        },
        getRoutingData: state => {
            if (state.routingData) {
                return state.routingData
            }
            return {}
        },
        getRouteDuration: state => {
            if (state.routingData.paths) {
                return Math.round(state.routingData.paths[0].time / 60000);
            }
            return 0
        },
        getRouteFrom: state => {
            if (state.routingData.paths) {
                let street_name = state.routingData.paths[0].instructions[0].street_name.toString();
                if (street_name == 'nan') {
                    return street_name
                }
            }
            return "Unbekannt"
        },
        getRouteTo: state => {
            return state.to;
        },
        getPolyLineRoute: state => {
            if (state.routingData.paths) {
                const points = state.routingData.paths[0].points.coordinates;
                // const instrucations = state.routingData.paths[0].instructions;
                let polyline = [];
                for (const point of points) {
                    polyline.push([point[1], point[0]]);
                }
                return polyline
            }
            return []
        },
    },
    mutations: {
        loadRouting(state) {
            //TODO: implement modus again
            const url = "" + process.env.VUE_APP_GH_DOMAIN + "/route"
                .concat("?point=").concat(state.user_position)
                .concat("&point=").concat([state.to_coord])
                .concat("&vehicle=").concat(state.modus)
                .concat("&weighting=fastest")
                .concat("&type=json")
                .concat("&locale=de")
                .concat("&points_encoded=false")
                .concat("&eleceation=true")
                .concat("&key=");
            axios.get(url)
                .then(response => {
                    state.routingData = response.data;
                })
                .catch(e => {
                    console.error(e)
                });
        },
        loadLectures(state, {token}) {
            state.lectures = [];
            const url = "" + process.env.VUE_APP_LECTOR_DOMAIN + "/api/v1/lecture/?token=".concat(token);
            console.log(url);
            axios.get(url)
                .then(response => {
                    state.lectures = response.data;
                })
                .catch(e => {
                    console.error(e);
                    state.lectures = {}
                });
        },
        loadRooms(state, {token}) {
            const url = "" + process.env.VUE_APP_LECTOR_DOMAIN + "/api/v1/room/?token=".concat(token);
            axios.get(url)
                .then(response => {
                    state.rooms = response.data;
                })
                .catch(e => {
                    console.error(e);
                    state.rooms = []
                });
        },
        loadRoomStaircaseCoord(state, {room}) {
            state.to = room.display;
            state.to_coord = null;
            const url = "" + process.env.VUE_APP_LECTOR_DOMAIN + "/api/v1/staircase/"
                .concat("?building=").concat(room.building_key)
                .concat("&level=").concat(room.level)
                .concat("&number=").concat(room.number);
            axios.get(url)
                .then(response => {
                    state.to_coord = [response.data.latitude, response.data.longitude];
                })
                .catch(e => {
                    console.error(e)
                });
        },
        setUserPosition(state, {user_position}) {
            state.user_position = user_position;
        },
        setModus(state, {modus}) {
            state.modus = modus;
        },
    },
    actions: {
        loadRouting(context, config) {
            context.commit('loadRouting', config)
        },
        loadLectures(context, config) {
            context.commit('loadLectures', config)
        },
        loadRooms(context, config) {
            context.commit('loadRooms', config)
        },
        loadRoomStaircaseCoord(context, config) {
            context.commit('loadRoomStaircaseCoord', config)
        },
        setUserPosition(context, config) {
            context.commit('setUserPosition', config);
            context.commit('loadRouting');
        },
        setModus(context, config) {
            context.commit('setModus', config);
        },
    },
})
