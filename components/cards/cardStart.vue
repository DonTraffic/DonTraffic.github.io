<template>
    <div class="card card-start" :data-position="positionOf('cardStart')">
        <div class="card__content card-start__content">
            <h1 class="text-shadow">{{ printed.h1 }}</h1>
            <h2 class="text-shadow">{{ printed.h2 }}</h2>

            <button
                type="button"
                :style="{ '--reveal-delay': `${revealDelay}ms` }"
                @click="goTo('cardMenu')"
            >Показать больше</button>
        </div>

        <!--
            Что показать, решает CSS, а не v-if: при рендере на сервере ширина
            окна неизвестна, и любая ветка разошлась бы с гидрацией. Холст
            на узких экранах не запускается, а трава лежит фоном в media-запросе
            и на широких экранах не скачивается.
        -->
        <div class="card__background card-start__background" aria-hidden="true">
            <canvas ref="canvas"></canvas>
        </div>

        <div class="card-start__background--mobile" aria-hidden="true"></div>
    </div>
</template>

<script setup>
import { createGrassScene } from '~/utils/grassScene'

const { goTo, positionOf, isOnScreen } = useCards()
const isDesktop = useIsDesktop()
const prefersReducedMotion = usePrefersReducedMotion()

// ── Печатающийся заголовок ───────────────────────────────────
const PHRASES = [
    { h1: '唐特拉菲克', h2: '如果你编程，那么用爱' },
    { h1: 'DonTraffic', h2: 'Если программировать, то с любовью' },
]

const FINAL = PHRASES[PHRASES.length - 1]

const LETTER_DELAY_MS = 100
const PHRASE_DELAY_MS = 500

/**
 * На сервере и в первый кадр в разметке лежит готовый текст: так заголовок
 * не пустой для поисковиков и для ботов соцсетей, которые скрипты не исполняют.
 * Эффект печати запускается уже после гидрации.
 */
const printed = reactive({ h1: FINAL.h1, h2: FINAL.h2 })

const totalLetters = PHRASES.reduce((sum, phrase) => sum + phrase.h1.length + phrase.h2.length, 0)
const typingDuration = totalLetters * LETTER_DELAY_MS + (PHRASES.length - 1) * PHRASE_DELAY_MS

/** Кнопка появляется ровно тогда, когда текст допечатался */
const revealDelay = computed(() => (prefersReducedMotion.value ? 0 : typingDuration + 200))

let cancelled = false
const wait = ms => new Promise(resolve => setTimeout(resolve, ms))

/** Замена по индексу, а не по значению: в тексте есть повторяющиеся буквы */
function replaceAt(value, index, letter) {
    if (index >= value.length) return value + letter
    return value.slice(0, index) + letter + value.slice(index + 1)
}

async function typeText() {
    printed.h1 = ''
    printed.h2 = ''

    for (const [phraseIndex, phrase] of PHRASES.entries()) {
        if (phraseIndex > 0) await wait(PHRASE_DELAY_MS)

        for (const key of ['h1', 'h2']) {
            for (let letter = 0; letter < phrase[key].length; letter++) {
                await wait(LETTER_DELAY_MS)
                // Компонент могли размонтировать, пока мы ждали
                if (cancelled) return
                printed[key] = replaceAt(printed[key], letter, phrase[key][letter])
            }
        }
    }
}

// ── Поле травы на canvas ─────────────────────────────────────
const canvas = useTemplateRef('canvas')
const scene = shallowRef(null)

useAnimationFrame(
    () => scene.value?.draw(),
    () => Boolean(scene.value) && isOnScreen('cardStart'),
)

onMounted(async () => {
    if (!prefersReducedMotion.value) typeText()

    // Узкие экраны довольствуются фоновой картинкой: тяжёлая сцена там не видна
    if (!isDesktop.value) return

    await nextTick()
    const element = canvas.value
    const card = element?.closest('.card')
    if (!element || !card) return

    scene.value = createGrassScene(element, {
        width: card.clientWidth,
        height: card.clientHeight,
    })
})

onBeforeUnmount(() => {
    // Иначе цепочка таймеров продолжит писать в состояние снятого компонента
    cancelled = true
})
</script>
