export default {

    state: {
        currentView: 'list',
        selectedEntityId: null,
        options: {
            lang: 'en',
            projectId: null,
            apiAccessToken: null,
            apiBaseUrl: null,
            apiVersion: null,
            permissions: {
                read: true,
                write: true,
                delete: true
            }
        }
    },

    mutations: {

        /**
         * Mutator updates the state of the current page
         * @param state
         * @param payload
         */
        updateCurrentView(state, payload) {
            if (["list", "view","create", "update", "delete", "error"].indexOf(payload.page) >= 0) {
                state.currentView = payload.page;
                state.selectedEntityId = (payload.id) ? payload.id : null;
            } else {
                state.currentView = 'list';
            }
        }
    }
};
