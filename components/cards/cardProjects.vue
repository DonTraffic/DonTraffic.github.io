<template>
    <div class="card card-projects" :data-position="positionOf('cardProjects')">
        <div class="card-projects__preview-container" aria-hidden="true">
            <div class="card-projects__preview-viewport" :style="{ translate: `0 ${slide * 100}%` }">
                <div v-for="project in PROJECTS" :key="project.id" class="card-projects__preview">
                    <img class="card-projects__preview-svg" :src="project.previewIcon" alt="">
                </div>
            </div>

            <div class="card-projects__preview-sun icon-sun"></div>
        </div>

        <div class="card-projects__line card-shadow"></div>

        <div class="card-projects__content-container">
            <div class="card-projects__content-viewport" :style="{ translate: `0 ${-slide * 100}%` }">
                <!-- Раньше здесь дважды дублировалась разметка: под проект
                     и под компанию. Теперь у записи всегда есть заголовок. -->
                <article v-for="project in PROJECTS" :key="project.id" class="card-projects__content">
                    <h2 class="card-projects__content-logo">
                        <img
                            class="card-projects__content-logo-icon"
                            :src="project.logoIcon"
                            alt=""
                            width="35"
                            height="35"
                        >

                        <a
                            class="card-projects__content-logo-title"
                            :href="project.link"
                            target="_blank"
                            rel="noopener noreferrer"
                        >{{ project.title }}</a>
                    </h2>

                    <p class="card-projects__content-desc">{{ project.description }}</p>

                    <button
                        type="button"
                        class="card-projects__content-btn"
                        @click="activeProject = project"
                    >Подробности</button>
                </article>
            </div>

            <button
                type="button"
                class="card-projects__content-controll card-projects__content-controll--top"
                aria-label="Предыдущий проект"
                @click="move(-1)"
            >
                <svg class="card-projects__content-controll-icon" aria-hidden="true" focusable="false">
                    <use href="@/assets/svg/sprite.svg#arrow"></use>
                </svg>
            </button>

            <button
                type="button"
                class="card-projects__content-controll card-projects__content-controll--bottom"
                aria-label="Следующий проект"
                @click="move(1)"
            >
                <svg class="card-projects__content-controll-icon" aria-hidden="true" focusable="false">
                    <use href="@/assets/svg/sprite.svg#arrow"></use>
                </svg>
            </button>
        </div>

        <modals-modalProject :project="activeProject" @close="activeProject = null" />

        <modules-controller card="cardProjects" :hide="Boolean(activeProject)" :controllers="{ left: 'cardMenu' }" />
    </div>
</template>

<script setup>
import { PROJECTS } from '~/data/projects'

const { positionOf } = useCards()

const slide = ref(0)
const activeProject = ref(null)

/** Перелистывание по кругу */
function move(step) {
    slide.value = (slide.value + step + PROJECTS.length) % PROJECTS.length
}
</script>
