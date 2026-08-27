<template>
    <modals-modalBase
        class="modal-project"
        :open="Boolean(project)"
        :label="project ? `Проект ${project.title}` : ''"
        @close="emit('close')"
    >
        <div
            id="scroll-project"
            class="DTScroll scroll-project-slider scroll-project-slider--0 modal-project__slider"
            direction="vertical"
        >
            <div class="scroll-project-shadow-prev"></div>

            <div class="scroll-project-line">
                <div class="scroll-project-item">
                    <header class="modal-project__header">
                        <a
                            class="modal-project__header-logo"
                            :href="project?.link"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                class="modal-project__header-logo-icon"
                                :src="project?.logoIcon"
                                alt=""
                                width="35"
                                height="35"
                            >

                            <span class="modal-project__header-logo-title">{{ project?.title }}</span>
                        </a>

                        <p v-if="project?.company" class="modal-project__header-link">
                            Компания:
                            <a :href="project.company.link" target="_blank" rel="noopener noreferrer">
                                {{ project.company.name }}
                            </a>
                        </p>

                        <p class="modal-project__header-link">
                            Должность:
                            <a :href="project?.job.link" target="_blank" rel="noopener noreferrer">
                                {{ project?.job.name }}
                            </a>
                        </p>
                    </header>

                    <div class="modal-project__date">
                        <div class="modal-project__date-point">
                            <p>От: {{ period.from }}</p>
                            <p>До: {{ period.to }}</p>
                        </div>

                        <svg class="modal-project__date-bracket" aria-hidden="true" focusable="false">
                            <use href="@/assets/svg/sprite.svg#bracket"></use>
                        </svg>

                        <p class="modal-project__date-sum">{{ period.duration }}</p>
                    </div>

                    <section v-if="project?.duties.length" class="modal-project__list">
                        <h3 class="modal-project__list-title">--- Обязанности на рабочем месте:</h3>
                        <ol>
                            <li v-for="dutie in project.duties" :key="dutie" class="modal-project__list-item">
                                {{ dutie }}
                            </li>
                        </ol>
                    </section>

                    <section v-if="project?.achievements?.length" class="modal-project__list">
                        <h3 class="modal-project__list-title">--- Достижения за время работы:</h3>
                        <ol>
                            <li
                                v-for="achievement in project.achievements"
                                :key="achievement"
                                class="modal-project__list-item"
                            >{{ achievement }}</li>
                        </ol>
                    </section>

                    <p v-if="project?.tags.length" class="modal-project__tags">{{ project.tags.join(', ') }}</p>
                </div>
            </div>

            <div class="scroll-project-shadow-next"></div>
        </div>

        <div class="scroll-project-scroll modal-project__scrollbar" direction="vertical">
            <div class="scroll-project-thumb modal-project__scrollbar-thumb"></div>
        </div>
    </modals-modalBase>
</template>

<script setup>
import { DTScroll } from '~/scripts/DTScroll.min'
import { formatDuration, formatYearMonth } from '~/utils/date'

const props = defineProps({
    project: { type: Object, default: null },
})

/** Идентификатор, по которому DTScroll находит прокручиваемую область */
const SCROLL_ID = 'scroll-project'

const emit = defineEmits(['close'])

const period = computed(() => {
    const experience = props.project?.experience
    if (!experience) return { from: '', to: '', duration: '' }

    return {
        from: formatYearMonth(experience.from),
        to: formatYearMonth(experience.to),
        duration: formatDuration(experience.from, experience.to),
    }
})

/**
 * Свой скроллбар пересобирается, когда в окно приезжает другой проект.
 * Прежняя версия следила за этим через MutationObserver с subtree: true —
 * а сам DTScroll меняет DOM, то есть наблюдатель будил сам себя
 * и никогда не отключался.
 */
watch(() => props.project, async (project) => {
    if (!project || !import.meta.client) return

    await nextTick()
    // DTScroll — свой минифицированный скрипт без типов
    if (DTScroll.scrollsData[SCROLL_ID]) DTScroll.sliderUpdateDeep(SCROLL_ID)
    else DTScroll.initScroll(SCROLL_ID)
})
</script>
