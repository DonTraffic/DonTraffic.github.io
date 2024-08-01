import { createStore } from "vuex";

const store = createStore({
    state() {
        return {
            pageData: {
                index: {
                    title: 'Middle frontend разработчик DonTraffic',
                    description: 'Визитная карточка middle frontend разработчика DonTraffic',
                    keywords: 'Визитка, визитная карточка, сайт визитка, frontend, middle, разработчик, DonTraffic, заказать сайт, вёрстка',

                    settings: {
                        header: false
                    }
                },

                market: {
                    title: 'DonTraffic.Market',
                    description: 'Небольшой магазин по продаже интересных вещей с услугой индивидуального (кастомного) оформления',
                    keywords: 'декор, подарки, интерестные подарки, подарки близким, красивый декор для дома, индивидуальное оформление, кастомное оформление, свой дизайн, свой принт, своя идея, магазин с декором, доставка, оформление своего',

                    settings: {
                        header: true
                    }
                },
            },

            activeCard: 'cardStart',
            statusCards: {
                cardStart: true,
                cardMenu: true,
            }
            // activeCard: 'cardMenu',
            // statusCards: {
            //     cardMenu: true,
            //     cardProjects: true,
            //     cardSkills: true,
            // }
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
                            cardSkills: true,
                            cardProjects: true,
                        }
                    break;
    
                    case 'cardSkills':
                        state.statusCards = {
                            cardMenu: true,
                            cardSkills: true,
                        }
                    break;

                    case 'cardProjects':
                        state.statusCards = {
                            cardMenu: true,
                            cardProjects: true,
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