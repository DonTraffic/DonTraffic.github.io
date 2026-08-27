<template>
    <div class="card card-skills" :data-position="positionOf('cardSkills')">
        <div class="card__content card-skills__content">
            <blockquote
                class="card-skills__content-quote text-shadow"
                :class="{ 'card-skills__content-quote--hidden': activeSlide !== 0 }"
            >
                <p>
                    Аналогично тому, как написание картины является искусством для души,
                    так и написание программы является искусством для разума.
                </p>
                <cite class="card-skills__content-quote-author">- Volnik -</cite>
            </blockquote>
        </div>

        <div class="card__background card-skills__background">
            <canvas
                ref="canvas"
                class="card-skills__background-sea"
                aria-hidden="true"
                @mousemove="onPointerMove"
                @wheel.passive="scene?.scroll($event.deltaY > 0)"
                @click="onCanvasClick"
            ></canvas>

            <!-- Волны для узких экранов. Раньше все шестнадцать слоёв были
                 выписаны в разметке руками. -->
            <div class="card-skills__background-sea card-skills__background-sea--mobile">
                <div class="sea__sun icon-sun"></div>

                <div class="sea">
                    <div
                        v-for="wave in waves"
                        :key="wave.index"
                        :class="['sea__wave', `sea__wave--${wave.index}`]"
                    >
                        <button
                            v-if="wave.skill"
                            type="button"
                            class="sea__wave-block"
                            :style="{ '--block-left': wave.skill.mobile.left }"
                            @click="activeSkill = wave.skill"
                        >{{ wave.skill.mobile.label ?? wave.skill.name }}</button>

                        <img src="@/assets/svg/wave.svg" alt="" width="600" height="30">
                    </div>
                </div>
            </div>
        </div>

        <!-- Содержимое холста недоступно ни с клавиатуры, ни скринридеру.
             Тот же список навыков живёт рядом и всплывает при фокусе. -->
        <nav class="card-skills__fallback" aria-label="Список навыков">
            <ul>
                <li v-for="{ skill } in ALL_SKILLS" :key="skill.name">
                    <button type="button" @click="activeSkill = skill">{{ skill.name }}</button>
                </li>
            </ul>
        </nav>

        <modals-modalSkill :skill="activeSkill" @close="activeSkill = null" />

        <modules-controller card="cardSkills" :hide="Boolean(activeSkill)" :controllers="{ right: 'cardMenu' }" />
    </div>
</template>

<script setup>
import { createSeaScene } from '~/utils/seaScene'
import { ALL_SKILLS, MOBILE_WAVE_COUNT } from '~/data/skills'

const { positionOf, isOnScreen } = useCards()
const isDesktop = useIsDesktop()

const activeSkill = ref(null)
const activeSlide = ref(0)

// ── Волны узкой версии ───────────────────────────────────────
const waves = computed(() =>
    Array.from({ length: MOBILE_WAVE_COUNT }, (_, index) => ({
        index: index + 1,
        skill: ALL_SKILLS.find(({ skill }) => skill.mobile.wave === index + 1)?.skill,
    })),
)

// ── Сцена на canvas ──────────────────────────────────────────
const canvas = useTemplateRef('canvas')
const scene = shallowRef(null)

useAnimationFrame(
    () => scene.value?.draw(),
    () => Boolean(scene.value) && isOnScreen('cardSkills'),
)

function onPointerMove(event) {
    scene.value?.setPointer(event.offsetX, event.offsetY)
}

function onCanvasClick(event) {
    const skill = scene.value?.hitTest(event.offsetX, event.offsetY)
    if (skill) activeSkill.value = skill
}

let builtWidth = 0
let builtHeight = 0
let observer

function buildScene() {
    const element = canvas.value
    const card = element?.closest('.card')
    if (!element || !card) return

    const width = card.clientWidth
    const height = card.clientHeight
    if (!width || !height || (width === builtWidth && height === builtHeight)) return

    builtWidth = width
    builtHeight = height

    scene.value = createSeaScene(
        element,
        { width, height },
        { onSlideChange: slide => { activeSlide.value = slide } },
    )
    // Пересобранная сцена возвращается на тот слайд, где был посетитель
    scene.value?.goToSlide(activeSlide.value)
}

onMounted(async () => {
    // На узких экранах вместо холста работает разметка волн
    if (!isDesktop.value) return

    await nextTick()
    buildScene()

    // Размеры холста заданы в пикселях: без пересборки при изменении окна
    // картинка растянулась бы. Прежняя версия ресайз не обрабатывала вовсе.
    const card = canvas.value?.closest('.card')
    if (!card) return

    observer = new ResizeObserver(buildScene)
    observer.observe(card)
})

onBeforeUnmount(() => observer?.disconnect())
</script>
