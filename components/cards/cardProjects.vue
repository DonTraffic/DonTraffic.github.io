<template>
    <div class="card card-projects card__position-right" id="cardProjects">
        <div 
            id="projects" 
            class="card-projects__preview-container DTScroll projects-slider projects-slider--0"
            points='{"0":1}'
            anchor="true"
            revert="true"
        >
            <div class="card-projects__preview-line projects-line">
                <div 
                    class="card-projects__preview projects-item" 
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
        </div>

        <div class="card-projects__center">
            <div class="card-projects__center-line card-shadow"></div>

            <div class="card-projects__center-scroll projects-scroll card-shadow" direction="vertical" anchor="0">
                <div class="card-projects__center-scroll-thumb projects-thumb"></div>
            </div>
        </div>

        <div 
            class="card-projects__content-container projects-slider projects-slider--1"
            points='{"0":1}'
            anchor="true"
        >
            <div class="card-projects__content-line projects-line">
                <div
                    class="card-projects__content projects-item" 
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

            <div class="
                card-projects__content-controll 
                card-projects__content-controll-top
                projects-btn-prev
            ">
                <svg class="card-projects__content-controll-svg">
                    <use xlink:href="@/assets/svg/sprite.svg#arrow"></use>
                </svg>
            </div>

            <div class="
                card-projects__content-controll 
                card-projects__content-controll-bottom 
                projects-btn-next
            ">
                <svg class="card-projects__content-controll-svg">
                    <use xlink:href="@/assets/svg/sprite.svg#arrow"></use>
                </svg>
            </div>
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
import { DTScroll } from '~/scripts/DTScroll.min'

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

            windowSize: 1000,
        }
    },

    mounted() {
        let card = document.querySelector('#cardProjects')
        let cardShadow = document.querySelector('.card-shadow')
        this.windowSize = window.innerWidth

        this.changeDirection()

        DTScroll.initScroll('projects')

        window.addEventListener('resize', () => {
            this.windowSize = window.innerWidth

            this.changeDirection()

            card.style.transition = 'none'
            cardShadow.style.transition = 'none'
            DTScroll.sliderUpdateDeep('projects')

            setTimeout(() => {
                card.style.transition = '1s ease'
                cardShadow.style.transition = '1s ease'
            }, 1000);
        })
    },

    watch: {
        // следим за активным слайдом и возобнавляем работу анимации
        '$store.state.activeCard' (activeCard) {
            if (activeCard == 'cardProject') DTScroll.sliderUpdateDeep('projects')
        }
  },

    methods: {
        changeDirection(){
            document.querySelectorAll('.projects-slider').forEach(slider => {
                slider.setAttribute('direction', this.windowSize > 768 ? 'vertical' : 'horizontal') 
            });
            document.querySelector('.projects-scroll').setAttribute('direction', this.windowSize > 768 ? 'vertical' : 'horizontal') 
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