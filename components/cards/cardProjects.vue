<template>
    <div class="card card-projects card--position-right" id="cardProjects">
        <div class="card-projects__preview-container">
            <div class="card-projects__preview-viewport" :style="`translate: 0 ${sliderStatus}00%`">
                <div 
                    class="card-projects__preview" 
                    v-for="(project, index) in projectsData" 
                    :key="'project-preview-' + index"
                >
                    <img 
                        v-if="project.project"
                        class="card-projects__preview-svg" 
                        :src="`/svg/projects/preview-${project.project.name}.svg`" 
                        :alt="`preview-${project.project.name}`"
                    >
                    <img 
                        v-else
                        class="card-projects__preview-svg" 
                        :src="`/svg/projects/preview-${project.company.name}.svg`" 
                        :alt="`preview-${project.company.name}`"
                    >
                </div>
            </div>
            
            <div class="card-projects__preview-sun icon-sun"></div>
        </div>

        <div class="card-projects__line card-shadow"></div>

        <div class="card-projects__content-container">
            <div class="card-projects__content-viewport" :style="`translate: 0 -${sliderStatus}00%`">
                <div
                    class="card-projects__content" 
                    v-for="(project, index) in projectsData" 
                    :key="'project-content-' + index"
                >
                    <div class="card-projects__content-logo" v-if="project.project">
                        <img 
                            class="card-projects__content-logo-icon" 
                            :src="`/svg/projects/${project.project.name}-logo.svg`"
                            :alt="`${project.project.name}-logo.svg`"
                        >

                        <a 
                            :href="project.project.link" 
                            class="card-projects__content-logo-title"
                        >{{ project.project.name }}</a>
                    </div>
                    <div class="card-projects__content-logo" v-else>
                        <img 
                            class="card-projects__content-logo-icon" 
                            :src="`/svg/projects/${project.company.name}-logo.svg`"
                            :alt="`${project.company.name}-logo.svg`"
                        >

                        <a 
                            :href="project.company.link" 
                            class="card-projects__content-logo-title"
                        >{{ project.company.name }}</a>
                    </div>

                    <p class="card-projects__content-desc" v-if="project.project">{{ project.project.description }}</p>
                    <p class="card-projects__content-desc" v-else>{{ project.company.description }}</p>

                    <button 
                        class="card-projects__content-btn" 
                        @click="openDialog(index)"
                    >Подробности</button>
                </div>
            </div>

            <button
                class="card-projects__content-controll card-projects__content-controll--top"
                @click="updateSliderStatus(false)"
            >
                <svg class="card-projects__content-controll-svg">
                    <use xlink:href="@/assets/svg/sprite.svg#arrow"></use>
                </svg>
            </button>

            <button
                class="card-projects__content-controll card-projects__content-controll--bottom"
                @click="updateSliderStatus(true)"
            >
                <svg class="card-projects__content-controll-svg">
                    <use xlink:href="@/assets/svg/sprite.svg#arrow"></use>
                </svg>
            </button>
        </div>

        <modals-modalProject
            :info="projectsData[activeProject]"
            @closeModal="closeModal"
        />

        <modules-controller
            parentId="cardProjects"
            :controllerHide="controllerHide"
            :controllers="{
                left: 'cardMenu',
            }"
        />
    </div>
</template>

<script>
export default {
    name: 'cardProjects',

    data() {
        return {
            projectsData: {
                0: {
                    project: {
                        name: 'qayli',
                        link: 'https://qayli.com/',
                        description: 'Портал для поиска новостроек и ипотечные предложения'
                    },

                    company: {
                        name: 'x.seven',
                        link: 'https://xseven.io/'
                    },

                    job: {
                        name: 'Frontend-developer',
                        link: 'https://vologda.hh.ru/resume/c1497482ff0b662b500039ed1f4a6e78766c69'
                    },

                    experience: {
                        from: '2021-08',
                        before: '2023-04'
                    },

                    duties: {
                        1: 'Декомпозиция задач и оценка сроков',
                        2: 'Адаптивная верстка (html, css, scss) страниц портала по макетам из Figma',
                        3: 'Написание и поддержка компонентов Vue.js',
                        4: 'Перенос страниц портала со стека php/html+css на стек php/nuxt.js',
                        5: 'Работа REST-API для реализации логики на стороне клиента',
                        6: 'Оптимизация запросов к API',
                        7: 'Исправление багов',
                        8: 'Добавление нового функционала',
                    },

                    achievements: {
                        1: 'Совместно с backend программистом полностью перевели портал со стека php/html+css на стек php/nuxt.js с реализацией рендеринга страниц на сервере (SSR)',
                        2: 'На 30% сократил количество запросов к API',
                        3: 'Занял 2 место в компании по соревнованию быстрой печати среди программистов',
                    },

                    tags: 'JavaScript, Vue2, Nuxt2, Git, WebPack, Editor.js, Node.js'
                },

                1: {
                    company: {
                        name: 'servizoria',
                        link: 'https://servizoria.ru/',
                        description: 'Экосистема маркетинговых исследований и продуктов для бизнеса'
                    },

                    job: {
                        name: 'Frontend-developer',
                        link: 'https://vologda.hh.ru/resume/c1497482ff0b662b500039ed1f4a6e78766c69'
                    },

                    experience: {
                        from: '2023-04',
                        before: 'actual'
                    },

                    duties: {
                        1: 'Декомпозиция задач и оценка сроков',
                        2: 'Адаптивная верстка (html, css, scss) страниц портала по макетам из Figma',
                        3: 'Добавление нового функционала',
                        4: 'Написание кода на jQuery и поддержка/обновление legacy кода',
                    },

                    tags: 'JavaScript, Git'
                }
            },

            // modal
            activeProject: null,
            controllerHide: false,

            // slider
            sliderStatus: 0
        }
    },

    // mounted() {
    //     let card = document.querySelector('#cardProjects')
    //     let cardShadow = document.querySelector('.card-shadow')
    //     this.windowSize = window.innerWidth

    //     this.changeDirection()

    //     DTScroll.initScroll('projects')

    //     window.addEventListener('resize', () => {
    //         this.windowSize = window.innerWidth

    //         // this.changeDirection()

    //         card.style.transition = 'none'
    //         cardShadow.style.transition = 'none'
    //         // DTScroll.sliderUpdateDeep('projects')

    //         setTimeout(() => {
    //             card.style.transition = '1s ease'
    //             cardShadow.style.transition = '1s ease'
    //         }, 1000);
    //     })
    // },

    // watch: {
    //     // следим за активным слайдом и возобнавляем работу анимации
    //     '$store.state.activeCard' (activeCard) {
    //         if (activeCard == 'cardProject') DTScroll.sliderUpdateDeep('projects')
    //     }
    // },

    methods: {
        updateSliderStatus(direction) {
            direction ? this.sliderStatus++ : this.sliderStatus--

            if (this.sliderStatus > Object.keys(this.projectsData).length-1) this.sliderStatus = 0
            if (this.sliderStatus < 0) this.sliderStatus = Object.keys(this.projectsData).length-1
        },

        openDialog(index) {
            this.activeProject = index
            this.controllerHide = true
        },

        closeModal() {
            this.activeProject = null
            this.controllerHide = false
        }
    }
}
</script>