import { fitCanvas } from '~/composables/useCanvas'
import { SKILL_SLIDES, SKILL_SLIDES_COUNT } from '~/data/skills'
import { ROCK_SEAWEEDS, ROCK_SEAWEEDS_INSIDE } from '~/data/seaScene'

/**
 * Подводная сцена карточки «Навыки»: волны, блики, рыбы, скала
 * и блоки с названиями технологий.
 *
 * Сцена — обычный модуль без Vue: получает холст, размеры и обратный вызов
 * на смену слайда, а дальше живёт сама. Компоненту остаётся отдать ей
 * события ввода и раз в кадр попросить нарисоваться.
 */

const COLOR_DARK = 'rgb(15, 15, 15)'
const COLOR_LIGHT = 'rgb(235, 235, 235)'
const BLOCK_FONT = '24px "Open Sans", system-ui, sans-serif'

/** Пикселей за кадр при переезде между слайдами */
const SCROLL_SPEED = 8

/** Чем больше число, тем слабее сцена реагирует на курсор */
const PARALLAX_DAMPING = 15

// Волны
const WAVE_LENGTH = 150
const WAVE_OFFSET_LEFT = 300
const WAVE_MAX_HEIGHT = 4
const WAVE_LAYER_OFFSET = 10
const WAVE_SEGMENTS = 13
/** Стартовый сдвиг каждого слоя: слои не должны совпадать фазами */
const WAVE_LAYER_START = [0, 0, 51, 154, 0]

// Блики на поверхности воды
const BLICK_COUNT = 20
const BLICK_LIMIT = 20

// Блоки с названиями навыков
const BLOCK_HEIGHT = 30
const BLOCK_RADIUS = 10
const BLOCK_HIGHLIGHT_STEP = 5
const BLOCK_TONE_DARK = 15
const BLOCK_TONE_LIGHT = 235

const FISH_PER_SLIDE = 5

// Подсказка «крути колесо»
const WHEEL_HINT_MAX = 10
const WHEEL_HINT_PAUSE_MS = 2000

const randomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min))

// Рыба:  { speed, size, forward, x, y } — forward означает «плывёт вправо».
// Блик:  { x, y, delay, progress } — delay считает кадры до появления.

/**
 * @param size    объект вида { width, height } в CSS-пикселях
 * @param options { onSlideChange } — вызывается при смене слайда
 * @returns объект со свойствами:
 *   draw()             — нарисовать кадр
 *   setPointer(x, y)   — положение курсора в координатах холста
 *   scroll(down)       — прокрутка на слайд вниз (true) или вверх (false)
 *   goToSlide(slide)   — мгновенный переход, без проезда
 *   hitTest(x, y)      — навык под точкой холста либо null
 *   ...либо null, если холст не дал контекст.
 */
export function createSeaScene(canvas, size, options = {}) {
    const context = fitCanvas(canvas, size)
    if (!context) return null

    const { width, height } = size

    context.fillStyle = COLOR_DARK
    context.strokeStyle = COLOR_LIGHT
    context.lineWidth = 1
    context.shadowColor = COLOR_LIGHT
    // Шрифт нужен ещё до первого кадра: по нему считается ширина блока,
    // а значит и область, в которой ловится клик по навыку
    context.font = BLOCK_FONT
    context.textAlign = 'center'

    const waveTopOffset = height / 2

    // ── Состояние ────────────────────────────────────────────
    let pointerX = 0
    let pointerY = 0
    let parallaxX = 0
    let parallaxY = 0

    let activeSlide = 0
    let previousSlide = 0
    let scrollOffsetY = 0
    /** -1 — едем к следующему слайду, 1 — к предыдущему, 0 — стоим */
    let scrollDirection = 0

    // 'grow' | 'shrink' | 'pause'
    let wheelHintPhase = 'grow'
    let wheelHintValue = 1

    const wavePositions = [...WAVE_LAYER_START]
    const blicks = new Map()
    const fishes = new Map()
    /** Яркость подсветки блока: это состояние наведения, а не часть данных о навыке */
    const blockHighlight = new Map()

    // Копии, а не сами данные: водоросли качаются, меняя свои поля,
    // а исходный объект один на всё приложение
    const cloneGroups = groups =>
        groups.map(group => ({ ...group, seaweeds: group.seaweeds.map(weed => ({ ...weed })) }))

    const seaweedsOutside = cloneGroups(ROCK_SEAWEEDS)
    const seaweedsInside = cloneGroups(ROCK_SEAWEEDS_INSIDE)

    /** Слайд виден, если он активен или если мы как раз с него уезжаем */
    const isVisible = slide =>
        slide === activeSlide || (scrollDirection !== 0 && slide === previousSlide)

    // ── Рыбы ─────────────────────────────────────────────────
    function spawnFish(slide, initial) {
        const forward = Math.random() < .5

        return {
            speed: randomInteger(50, 200),
            size: randomInteger(0, 8),
            forward,
            // При первом появлении рыбы рассыпаны по всей ширине,
            // дальше заплывают из-за края
            x: initial ? randomInteger(0, width) : (forward ? -100 : width),
            y: height * slide + randomInteger(50, height - 50),
        }
    }

    for (let slide = 1; slide < SKILL_SLIDES_COUNT; slide++) {
        fishes.set(slide, Array.from({ length: FISH_PER_SLIDE }, () => spawnFish(slide, true)))
    }

    function drawFish(school, slide, index) {
        const fish = school[index]

        // Уплывшую за край рыбу заменяем новой у противоположного края
        if (fish.forward ? fish.x > width + 50 : fish.x < -50) {
            school[index] = spawnFish(slide, false)
            return
        }

        const y = scrollOffsetY + fish.y - parallaxY / 2
        const x = fish.x - parallaxX / 2
        const { size } = fish
        // Направление задаёт знак всех смещений — рыба рисуется зеркально
        const way = fish.forward ? -1 : 1

        fish.x += fish.forward ? fish.speed / 100 : -fish.speed / 100

        context.beginPath()

        // Туловище
        context.moveTo(x + way * size, y)
        context.bezierCurveTo(
            x + way * (5 + size), y - 15 + size,
            x + way * (35 - size), y - 15 + size,
            x + way * (50 - size), y,
        )
        context.bezierCurveTo(
            x + way * (35 - size), y + 15 - size,
            x + way * 5, y + 15 - size,
            x + way * size, y,
        )
        context.fill()

        // Хвост
        context.moveTo(x + way * (50 - size), y)
        context.bezierCurveTo(
            x + way * (65 - size), y - 15 + size,
            x + way * (70 - size), y - 15 + size,
            x + way * (60 - size), y,
        )
        context.bezierCurveTo(
            x + way * (70 - size), y + 15 - size,
            x + way * (65 - size), y + 15 - size,
            x + way * (50 - size), y,
        )
        context.fill()

        // Глаз: чем крупнее рыба, тем меньше зрачок относительно тела
        const eyeX = x + way * (13 + size / 4)
        const eyeY = y - 3 + size / 4
        context.moveTo(eyeX + 3, eyeY)
        context.arc(eyeX, eyeY, 3 - size / 10, 0, Math.PI * 2, true)

        // Жабры
        context.moveTo(x + way * 22, y - 6 + size / 3)
        context.bezierCurveTo(
            x + way * 25, y - 2,
            x + way * 25, y + 2,
            x + way * 22, y + 6 - size / 3,
        )

        // Верхний плавник
        context.moveTo(x + way * 18, y - 12 + size)
        context.bezierCurveTo(
            x + way * 24, y - 20 + size,
            x + way * 24, y - 20 + size,
            x + way * 25, y - 12 + size,
        )

        // Нижний плавник
        context.moveTo(x + way * 28, y + 10 - size / 1.5)
        context.bezierCurveTo(
            x + way * 36, y + 18 - size / 1.5,
            x + way * 36, y + 18 - size / 1.5,
            x + way * 35, y + 8 - size / 1.5,
        )

        context.stroke()
    }

    // ── Блики ────────────────────────────────────────────────
    function spawnBlick(slide, from) {
        return {
            x: randomInteger(0, width),
            y: slide === 0 ? randomInteger(from, height) : randomInteger(from, from + height),
            delay: randomInteger(0, 40),
            progress: 0,
        }
    }

    function drawBlicks(slide) {
        // На заставке блики держатся у горизонта, на слайдах — по всей глубине
        const from = slide === 0 ? (height / 4.8) * 3 : height * slide

        let list = blicks.get(slide)
        if (!list) {
            list = Array.from({ length: BLICK_COUNT }, () => spawnBlick(slide, from))
            blicks.set(slide, list)
        }

        for (let index = 0; index < list.length; index++) {
            const blick = list[index]

            if (blick.delay !== 0) {
                blick.delay--
                continue
            }

            blick.progress += .6
            if (blick.progress > BLICK_LIMIT * 2) {
                list[index] = spawnBlick(slide, from)
                continue
            }

            const y = blick.y - parallaxY + scrollOffsetY
            const x = blick.x - parallaxX
            // Блик сначала вытягивается вправо, потом подтягивает за собой левый край
            const tail = blick.progress >= BLICK_LIMIT ? blick.progress - BLICK_LIMIT : 0
            const head = Math.min(blick.progress, BLICK_LIMIT)

            context.beginPath()
            context.moveTo(x + tail, y)
            context.lineTo(x + head, y)
            context.stroke()
        }
    }

    // ── Небо и вода ──────────────────────────────────────────
    function drawSun() {
        context.fillStyle = COLOR_LIGHT
        context.shadowBlur = 50

        context.beginPath()
        context.arc(width - 145 - parallaxX / 7, 145 - parallaxY / 7, 100, 0, Math.PI * 2, true)
        context.closePath()
        context.stroke()
        context.fill()

        context.fillStyle = COLOR_DARK
        context.shadowBlur = 0
    }

    function drawWaves() {
        context.shadowBlur = 10

        // Нулевой слой — неподвижный фон, остальные плывут с разной скоростью
        for (let layer = 1; layer < wavePositions.length; layer++) {
            wavePositions[layer] += .15 + (.1 * layer)

            const layerParallaxX = -parallaxX * (layer / 3)
            const layerParallaxY = -parallaxY * (layer / 3)
            const layerY = waveTopOffset + WAVE_LAYER_OFFSET * layer + layerParallaxY + scrollOffsetY

            context.beginPath()
            context.moveTo(-WAVE_OFFSET_LEFT + layerParallaxX + wavePositions[layer], layerY)

            for (let segment = 0; segment < WAVE_SEGMENTS; segment++) {
                const startX = WAVE_LENGTH * segment - WAVE_OFFSET_LEFT + layerParallaxX
                const middleX = startX + WAVE_LENGTH / 2
                const endX = startX + WAVE_LENGTH

                // Уплыв на две длины волны, слой отматывается назад: рисунок
                // периодический, поэтому подмены не видно
                if (startX + wavePositions[layer] > WAVE_LENGTH * WAVE_SEGMENTS - WAVE_OFFSET_LEFT) {
                    wavePositions[layer] -= WAVE_LENGTH * 2
                }

                // Гребни и впадины чередуются, дальние слои волнуются сильнее
                const crest = segment % 2
                    ? WAVE_MAX_HEIGHT + 6 * layer
                    : -WAVE_MAX_HEIGHT - 6 * layer

                context.bezierCurveTo(
                    startX + wavePositions[layer], layerY,
                    middleX + wavePositions[layer], layerY + crest,
                    endX + wavePositions[layer], layerY,
                )
            }

            // Замыкаем контур ниже холста, чтобы слой залился сплошной толщей
            const closeRight = WAVE_LENGTH * WAVE_SEGMENTS - WAVE_LENGTH + wavePositions[layer] + layerParallaxX
            const closeLeft = wavePositions[layer] - WAVE_LENGTH + layerParallaxX
            context.lineTo(closeRight, height + 10)
            context.lineTo(closeLeft, height + 10)

            context.closePath()
            context.stroke()
            context.fill()
        }

        context.shadowBlur = 0
    }

    /** Подсказка о прокрутке: колёсико мыши с бегающей внутри точкой */
    function drawWheelHint() {
        switch (wheelHintPhase) {
            case 'grow':
                wheelHintValue += .5
                if (wheelHintValue >= WHEEL_HINT_MAX) wheelHintPhase = 'shrink'
                break

            case 'shrink':
                wheelHintValue -= .2
                if (wheelHintValue <= 0) {
                    wheelHintPhase = 'pause'
                    setTimeout(() => { wheelHintPhase = 'grow' }, WHEEL_HINT_PAUSE_MS)
                }
                break
        }

        const centerX = width / 2
        const bottom = height + scrollOffsetY

        // Корпус
        context.beginPath()
        context.arc(centerX, bottom - 45, 10, 0, Math.PI, true)
        context.arc(centerX, bottom - 30, 10, Math.PI, 0, true)
        context.closePath()
        context.stroke()
        context.fill()

        // Точка, съезжающая вниз
        context.beginPath()
        context.arc(centerX, bottom - 45 + wheelHintValue, 1, 0, Math.PI, true)
        context.arc(centerX, bottom - 40 + wheelHintValue, 1, Math.PI, 0, true)
        context.closePath()
        context.stroke()
    }

    // ── Блоки навыков ────────────────────────────────────────
    /** Прямоугольник блока на экране. Отрицательная позиция отсчитывается от края. */
    function blockRect(skill, slide) {
        const x = (skill.position.x < 0 ? width + skill.position.x : skill.position.x) - parallaxX / 4
        const y = (skill.position.y < 0 ? height + skill.position.y : skill.position.y)
            - parallaxY / 4 + height * slide + scrollOffsetY

        return { x, y, width: context.measureText(skill.name).width + BLOCK_RADIUS }
    }

    function drawBlock(skill, slide) {
        const rect = blockRect(skill, slide)

        // Под курсором блок наливается светом, вне — гаснет обратно
        const hovered =
            rect.x - BLOCK_RADIUS < pointerX && pointerX < rect.x + rect.width + BLOCK_RADIUS &&
            rect.y - BLOCK_RADIUS < pointerY && pointerY < rect.y + BLOCK_HEIGHT + BLOCK_RADIUS

        const current = blockHighlight.get(skill.name) ?? BLOCK_TONE_DARK
        const tone = hovered
            ? Math.min(BLOCK_TONE_LIGHT, current + BLOCK_HIGHLIGHT_STEP)
            : Math.max(BLOCK_TONE_DARK, current - BLOCK_HIGHLIGHT_STEP)
        blockHighlight.set(skill.name, tone)

        // Негодную строку цвета canvas молча игнорирует, оставляя предыдущую заливку
        context.fillStyle = `rgb(${tone}, ${tone}, ${tone})`

        // Скруглённый прямоугольник вокруг подписи
        context.beginPath()
        context.arc(rect.x, rect.y, BLOCK_RADIUS, Math.PI, -Math.PI / 2, false)
        context.lineTo(rect.x, rect.y - BLOCK_RADIUS)
        context.arc(rect.x + rect.width, rect.y, BLOCK_RADIUS, -Math.PI / 2, 0, false)
        context.lineTo(rect.x + rect.width + BLOCK_RADIUS, rect.y + BLOCK_HEIGHT)
        context.arc(rect.x + rect.width, rect.y + BLOCK_HEIGHT, BLOCK_RADIUS, 0, Math.PI / 2, false)
        context.lineTo(rect.x + rect.width, rect.y + BLOCK_HEIGHT + BLOCK_RADIUS)
        context.arc(rect.x, rect.y + BLOCK_HEIGHT, BLOCK_RADIUS, Math.PI / 2, Math.PI, false)
        context.lineTo(rect.x - BLOCK_RADIUS, rect.y)
        context.closePath()
        context.fill()
        context.stroke()

        // Подпись всегда контрастна подложке
        const textTone = BLOCK_TONE_LIGHT - tone
        context.fillStyle = `rgb(${textTone}, ${textTone}, ${textTone})`
        context.fillText(skill.name, rect.x + rect.width / 2, rect.y + BLOCK_HEIGHT / 2 + BLOCK_RADIUS)

        context.fillStyle = COLOR_DARK
    }

    // ── Скала ────────────────────────────────────────────────
    function drawSeaweed(baseX, baseY, group) {
        if (!isVisible(group.slide)) return

        let x = baseX + group.position.x
        const y = baseY + group.position.y

        group.seaweeds.forEach((weed, index) => {
            // Стебли растут веером: каждый следующий чуть правее предыдущего
            x += index / 2

            // Дойдя до предела, стебель начинает клониться в другую сторону
            if (weed.deviation <= -weed.deviationMax || weed.deviation >= weed.deviationMax) {
                weed.deviationDirection = !weed.deviationDirection
            }
            weed.deviation += weed.deviationDirection ? .02 : -.02

            if (weed.rotate <= -weed.rotateMax || weed.rotate >= weed.rotateMax) {
                weed.rotateDirection = !weed.rotateDirection
            }
            weed.rotate += weed.rotateDirection ? .02 : -.02

            const { deviation, rotate } = weed
            const step = weed.height / 6

            context.beginPath()
            context.moveTo(x, y)
            context.bezierCurveTo(
                x + rotate / 6, y - step,
                x + deviation + rotate / 5, y - step * 2,
                x + rotate / 4, y - step * 3,
            )
            context.bezierCurveTo(
                x - deviation + rotate / 3, y - step * 4,
                x - deviation + rotate / 2, y - step * 5,
                x + rotate, y - step * 6,
            )
            context.stroke()
        })
    }

    function drawRock() {
        const baseX = -10 + (-parallaxX / 8)
        const baseY = height - 50 + scrollOffsetY + (height / 4) * 3 + (-parallaxY / 8)

        // Каждый штрих начинает свой путь: иначе линии копятся в одном контуре
        // и обводятся заново на каждом stroke()
        const crack = points => {
            context.beginPath()
            context.moveTo(baseX + points[0][0], baseY + points[0][1])
            for (let index = 1; index < points.length; index++) {
                context.lineTo(baseX + points[index][0], baseY + points[index][1])
            }
            context.stroke()
        }

        for (const group of seaweedsOutside) drawSeaweed(baseX, baseY, group)

        // Контур скалы
        context.beginPath()
        context.moveTo(baseX + 43, baseY + 11)
        context.bezierCurveTo(baseX + 36, baseY + 3, baseX + 19, baseY, baseX + 1, baseY)
        context.lineTo(baseX + 1, baseY + 733)
        context.bezierCurveTo(baseX + 37, baseY + 715, baseX + 46, baseY + 669, baseX + 46, baseY + 648)
        context.bezierCurveTo(baseX + 80, baseY + 589, baseX + 85, baseY + 481, baseX + 82, baseY + 430)
        context.bezierCurveTo(baseX + 95, baseY + 399, baseX + 103, baseY + 359, baseX + 108, baseY + 322)
        context.bezierCurveTo(baseX + 112, baseY + 287, baseX + 114, baseY + 254, baseX + 114, baseY + 233)
        context.bezierCurveTo(baseX + 103, baseY + 235, baseX + 84, baseY + 221, baseX + 88, baseY + 152)
        context.bezierCurveTo(baseX + 91, baseY + 83, baseX + 77, baseY + 65, baseX + 70, baseY + 65)
        context.bezierCurveTo(baseX + 67, baseY + 66, baseX + 63, baseY + 65, baseX + 59, baseY + 63)
        context.bezierCurveTo(baseX + 53, baseY + 59, baseX + 48, baseY + 50, baseX + 49, baseY + 31)
        context.bezierCurveTo(baseX + 49, baseY + 22, baseX + 47, baseY + 15, baseX + 43, baseY + 11)
        context.closePath()
        context.fill()
        context.stroke()

        // Трещины в верхней части
        crack([[20, 40], [25, 65], [40, 75]])
        crack([[45, 110], [55, 115], [60, 135]])
        crack([[25, 150], [40, 170], [30, 195]])

        // Нижняя часть скалы попадает в кадр только на последнем слайде
        if (!isVisible(SKILL_SLIDES_COUNT - 1)) return

        crack([[65, 230], [75, 250], [90, 255]])
        crack([[30, 310], [50, 360], [70, 370]])

        // Цветок на уступе
        context.beginPath()
        context.moveTo(baseX + 50, baseY + 360)
        context.bezierCurveTo(baseX + 60, baseY + 340, baseX + 40, baseY + 340, baseX + 50, baseY + 360)
        context.bezierCurveTo(baseX + 50, baseY + 340, baseX + 75, baseY + 345, baseX + 50, baseY + 360)
        context.bezierCurveTo(baseX + 60, baseY + 345, baseX + 80, baseY + 355, baseX + 50, baseY + 360)
        context.bezierCurveTo(baseX + 70, baseY + 370, baseX + 80, baseY + 350, baseX + 50, baseY + 360)
        context.stroke()

        context.beginPath()
        context.moveTo(baseX + 82, baseY + 430)
        context.bezierCurveTo(baseX + 80, baseY + 435, baseX + 70, baseY + 445, baseX + 70, baseY + 450)
        context.stroke()

        crack([[0, 470], [30, 500], [50, 500]])
        crack([[60, 560], [50, 580]])

        for (const group of seaweedsInside) drawSeaweed(baseX, baseY, group)
    }

    // ── Кадр ─────────────────────────────────────────────────
    function advanceScroll() {
        if (scrollDirection === 0) return

        scrollOffsetY += scrollDirection > 0 ? SCROLL_SPEED : -SCROLL_SPEED

        const target = -activeSlide * height
        const arrived = scrollDirection > 0 ? scrollOffsetY >= target : scrollOffsetY <= target

        if (!arrived) return

        // Ставим точно в цель: иначе за много переездов накапливается сдвиг
        scrollOffsetY = target
        scrollDirection = 0
        previousSlide = activeSlide
    }

    return {
        draw() {
            context.clearRect(0, 0, width, height)

            parallaxX = (pointerX - width / 2) / PARALLAX_DAMPING
            parallaxY = (pointerY - height / 2) / PARALLAX_DAMPING

            advanceScroll()

            if (isVisible(0)) {
                drawSun()
                drawWaves()
                drawBlicks(0)
                drawWheelHint()
            }

            for (let slide = 1; slide < SKILL_SLIDES_COUNT; slide++) {
                if (!isVisible(slide)) continue

                const school = fishes.get(slide)
                if (school) {
                    for (let index = 0; index < school.length; index++) drawFish(school, slide, index)
                }

                drawBlicks(slide)
                for (const skill of SKILL_SLIDES[slide]) drawBlock(skill, slide)
            }

            drawRock()
        },

        setPointer(x, y) {
            pointerX = x
            pointerY = y
        },

        scroll(down) {
            // Пока идёт переезд, новую прокрутку не принимаем
            if (scrollDirection !== 0) return

            const next = down ? activeSlide + 1 : activeSlide - 1
            if (next < 0 || next >= SKILL_SLIDES_COUNT) return

            previousSlide = activeSlide
            activeSlide = next
            scrollDirection = down ? -1 : 1
            options.onSlideChange?.(activeSlide)
        },

        goToSlide(slide) {
            if (slide === activeSlide || slide < 0 || slide >= SKILL_SLIDES_COUNT) return

            previousSlide = activeSlide
            activeSlide = slide
            scrollOffsetY = -slide * height
            scrollDirection = 0
            options.onSlideChange?.(activeSlide)
        },

        hitTest(x, y) {
            for (const skill of SKILL_SLIDES[activeSlide]) {
                const rect = blockRect(skill, activeSlide)

                if (
                    rect.x - BLOCK_RADIUS < x && x < rect.x + rect.width + BLOCK_RADIUS &&
                    rect.y - BLOCK_RADIUS < y && y < rect.y + BLOCK_HEIGHT + BLOCK_RADIUS
                ) return skill
            }

            return null
        },
    }
}
