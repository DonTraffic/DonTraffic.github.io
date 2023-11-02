import { createStore } from "vuex";

const store = createStore({
    state() {
        return {
            activeCard: 'cardStart',
            statusCards: {
                cardStart: true,
                cardMenu: true,
            }
        };
    },

    mutations: {
        // переделать на значение 3х (active, pause, disable)
        changeActiveCard(state, name) {
            setTimeout( () => {
                state.activeCard = name

                switch (name) {
                    case 'cardMenu':
                        state.statusCards = {
                            cardMenu: true,
                            cardSkills: true
                        }
                    break;
    
                    case 'cardSkills':
                        state.statusCards = {
                            cardMenu: true,
                            cardSkills: true,
                        }
                    break;
    
                }
            }, 1000)

        },
    },

});

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(store);
});