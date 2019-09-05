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
        to_coord: null,
        to_room: {},
        to_staircase: {},
        user_position: [
            49.900052680341155,
            10.8984375
        ],
        modus: 'foot',
        lecturesLoaded: false,
        roomsLoaded: false,
        cancelSources: [],
        CancelToken: axios.CancelToken
    },
    getters: {
        getLectures: state => state.lectures,
        getLecturesBefore: state => state.lectures.before ? state.lectures.before : [],
        getLecturesAfter: state => state.lectures.after ? state.lectures.after : [],

        getRooms: state => state.rooms,

        getDestinationCoord: state => state.to_coord,
        getDestinationRoom: state => state.to_room,
        getDestinationRoomName: state => state.to_room.display ? state.to_room.display : "",
        getDestinationStaircase: state => state.to_staircase,

        getRoutingDataAsGeoJson: state => state.routingData ? state.routingData : {},
        getTextualRoute: state => state.routingData.paths ? state.routingData.paths[0].instructions : [],
        getRoutingData: state => state.routingData ? state.routingData : {},
        getRouteDuration: state => state.routingData.paths ? Math.round(state.routingData.paths[0].time / 60000) : 0,

        getUserPosition: state => state.user_position,
        getUserLocationName: state => {
            if (state.routingData.paths) {
                let street_name = state.routingData.paths[0].instructions[0].street_name.toString();
                if (street_name == 'nan') {
                    return street_name
                }
            }
            return "Unbekannt"
        },

        getPolyLineRoute: state => {
            if (state.routingData.paths) {
                const points = state.routingData.paths[0].points.coordinates;
                let polyline = [];
                for (const point of points) {
                    polyline.push([point[1], point[0]]);
                }
                return polyline
            }
            return []
        },
        areRoomsLoaded: state => state.roomsLoaded,
        areLecturesLoaded: state => state.lecturesLoaded,
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
                .catch();
        },
        loadLectures(state, {token}) {
            // let cancelTokenSource = axios.CancelToken.source();
            // state.cancelSources.push(cancelTokenSource);
            var CancelToken = axios.CancelToken;
            var source = CancelToken.source();
            state.cancelSources.push(source);
            state.lecturesLoaded = false;
            state.lectures = [];
            const url = "" + process.env.VUE_APP_LECTOR_UNIVIS_API_ENDPOINT + "lectures/?token=".concat(token);
            axios.get(url, {
                cancelToken: source.token
            })
                .then(response => {
                    state.lecturesLoaded = true;
                    state.lectures = response.data;
                })
                .catch((thrown) => {
                    if (axios.isCancel(thrown)) {
                        console.log('Request canceled', thrown.message);
                    }
                    state.lecturesLoaded = true;
                    state.lectures = {};
                });
        },
        loadRooms(state, {token}) {
            // let cancelTokenSource = axios.CancelToken.source();

            var CancelToken = axios.CancelToken;
            var source = CancelToken.source();
            state.cancelSources.push(source);
            state.selected = null;
            state.roomsLoaded = false;
            const url = "" + process.env.VUE_APP_LECTOR_DOMAIN + "/api/v1/room/?token=".concat(token);
            axios.get(url, {
                cancelToken: source.token
            })
                .then(response => {
                    state.roomsLoaded = true;
                    state.rooms = response.data;
                })
                .catch((e) => {
                    state.roomsLoaded = true;
                    state.rooms = [];
                    console.log(e.isCancel)
                });
        },
        loadRoomStaircaseCoord(state, {room}) {
            state.to = room;
            state.to_coord = null;
            const url = "" + process.env.VUE_APP_LECTOR_DOMAIN + "/api/v1/staircases/"
                .concat(room.building_key).concat("/")
                .concat(room.level).concat("/")
                .concat(room.number).concat("/");
            axios.get(url)
                .then(response => {
                    state.to_coord = [response.data.coord[1], response.data.coord[0]];
                    state.to_staircase = response.data;
                })
                .catch();
        },
        setUserPosition(state, {user_position}) {
            state.user_position = user_position;
        },
        setModus(state, {modus}) {
            state.modus = modus;
        },
        resetTo(state) {
            state.to = "";
            state.to_coord = null;
            state.to_staircase = {};
            state.routingData = {}
        },
        cancelRequests(state) {
            for (const cancelSource of state.cancelSources) {
                console.log(cancelSource);
                cancelSource.cancel();
            }
            state.cancelSources = []
        },
    },
    actions: {
        loadRouting(context, config) {
            context.commit('loadRouting', config)
        },
        loadLecturesAndRooms(context, config) {
            context.commit('cancelRequests');
            context.commit('resetTo');
            context.commit('loadLectures', config);
            context.commit('loadRooms', config);
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
        reset(context) {
            context.commit('resetTo');
        },
    },
})
