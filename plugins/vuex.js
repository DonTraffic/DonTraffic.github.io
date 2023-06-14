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