<template>
    <div class="card card-projects" :data-position="positionOf('cardProjects')">
        <modules-controller
            card="cardProjects"
            :hide="controllerHide"
            :controllers="{
                left: 'cardMenu',
            }"
        />
        
        <canvas
            class="card-projects__canvas"
            ref="canvas"
            id="canvas-projects"

            @pointerdown="handlePointerDown"
            @pointermove="handlePointerMove"
            @pointerup="handlePointerUp"
            @pointercancel="handlePointerUp"
            @pointerleave="handlePointerLeave"
            @wheel.prevent="handleWheel"
        ></canvas>
    </div>
</template>

<script setup>
const { positionOf, isOnScreen } = useCards()

// Карточка считается на экране и во время проезда, поэтому анимация
// не замирает на переходе и не крутится за краем экрана
const onScreen = computed(() => isOnScreen('cardProjects'))



// данные проектов (порядок = хронология сверху вниз)
const projectsData = [
    {
        title: 'Кайли',

        project: {
            name: 'qayli',
            link: 'https://qayli.com/',
            description: 'Портал для поиска новостроек и ипотечных предложений'
        },

        company: {
            name: 'x.seven',
            link: 'https://xseven.io/'
        },

        job: {
            name: 'Frontend-разработчик',
            link: 'https://vologda.hh.ru/resume/c1497482ff0b662b500039ed1f4a6e78766c69'
        },

        experience: {
            from: '2021-08',
            before: '2023-04'
        },

        duties: {
            1: 'Декомпозиция задач и оценка сроков',
            2: 'Адаптивная верстка (html, css, scss) страниц портала по макетам из Figma',
            3: 'Написание, исправление и поддержка компонентов Vue.js',
            4: 'Перенос страниц портала со стека php/html+css на стек php/nuxt.js',
            5: 'Работа с REST-API для реализации логики на стороне клиента',
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

    {
        title: 'Сервизория',

        company: {
            name: 'servizoria',
            link: 'https://servizoria.ru/',
            description: 'Экосистема маркетинговых исследований и продуктов для бизнеса'
        },

        job: {
            name: 'Frontend-разработчик',
            link: 'https://vologda.hh.ru/resume/c1497482ff0b662b500039ed1f4a6e78766c69'
        },

        experience: {
            from: '2023-04',
            before: '2024-07'
        },

        duties: {
            1: 'Декомпозиция задач и оценка сроков',
            2: 'Адаптивная верстка (html, css, scss) страниц портала по макетам из Figma',
            3: 'Добавление нового функционала',
            4: 'Написание кода на jQuery и поддержка/обновление legacy кода',
            5: 'Перенос проекта на Nuxt 3',
        },

        tags: 'JavaScript, jQuery, Nuxt3, SCSS, Figma, Git'
    },

    {
        title: 'Нанософт',

        project: {
            name: 'nanosoft',
            link: 'https://nanosoft.team/',
            description: 'Сайт компании: дизайн и разработка целиком, от макета до сервера'
        },

        company: {
            name: 'nanocad',
            link: 'https://www.nanocad.ru/'
        },

        job: {
            name: 'Программист 1С / Интегратор',
            link: 'https://vologda.hh.ru/resume/c1497482ff0b662b500039ed1f4a6e78766c69'
        },

        experience: {
            from: '2024-11',
            before: '2026-10'
        },

        duties: {
            1: 'Настройка и создание интеграций с внешними сервисами',
            2: 'Доработка и создание печатных форм, внешних обработок и функционала по требованиям',
            3: 'Работа с клиентами: помощь и формирование задач',
            4: 'Разработка и поддержка сайта компании как дизайнер и fullstack-разработчик',
        },

        achievements: {
            1: 'Прошёл официальное обучение Anthropic по Claude Code: не формат «сделай мне задачу», а тонкая настройка и понимание процессов под капотом — два сертификата',
        },

        tags: '1С, JavaScript, HTML, CSS, Figma, Claude Code'
    }
]



// метрики отрисовки
const COLOR_LINE = 'rgb(235, 235, 235)'
const COLOR_BACK = 'rgb(15, 15, 15)'
const FONT_FAMILY = "'Montserrat', sans-serif"

// пилюля с датой
const PILL_HEIGHT = 22
const PILL_RADIUS = 6
const PILL_PADDING = 10
const PILL_FONT = `500 10px ${FONT_FAMILY}`

// блок проекта
const BLOCK_HEIGHT = 46
const BLOCK_RADIUS = 10
const BLOCK_PADDING = 18
const BLOCK_ICON = 26
const BLOCK_ICON_GAP = 10
const BLOCK_FONT = `400 24px ${FONT_FAMILY}`

// расстояния по оси
const LINK_GAP = 20 // сплошная линия внутри группы
const GROUP_GAP = 86 // пунктир между группами
const TIMELINE_PADDING = 24

// панель подробностей
const PANEL_RADIUS = 10
const PANEL_PADDING_X = 16
const PANEL_PADDING_Y = 14
const PANEL_MARGIN = 16
const PANEL_ARROW = 72
const CONTROLLER_SAFE = 52 // полоса у левого края под кнопку контроллера
const PANEL_FONT = `300 13px ${FONT_FAMILY}`
const PANEL_FONT_BOLD = `500 13px ${FONT_FAMILY}`
const PANEL_FONT_SIZE = 13
const PANEL_LINE_HEIGHT = 18
const PANEL_SCROLLBAR = 3
const PANEL_OVERSCROLL = 56 // насколько текст можно утянуть за границу
const PANEL_SCROLL_EASE = 0.2
const PANEL_SCROLL_RETURN = 0.14 // скорость возврата резинки

// свечение элементов
const GLOW_BASE = 6
const GLOW_HIGHLIGHT = 14

// «плавание» блоков и параллакс от курсора
const FLOAT_X = 3
const FLOAT_Y = 4
const FLOAT_SPEED = 0.00035
const PARALLAX_DEPTH = 26 // больше значение — слабее смещение
const PARALLAX_EASE = 0.07

// сдвиг соседних групп вправо, когда одна из них раскрыта
const NEIGHBOR_SHIFT = 56

// раскрытое состояние
const OPEN_MARGIN = 56 // отступ блока от левого края (широкий экран), мимо кнопки контроллера
const OPEN_TOP = 78 // положение центра блока сверху (узкий экран)
const NARROW_WIDTH = 620 // ниже этой ширины панель выезжает вниз, а не вправо
const PANEL_DURATION = 420
const PANEL_DELAY = 140



// канвас
const canvas = ref(null)
let context = null
let canvasWidth = 0
let canvasHeight = 0

// геометрия ленты, пересчитывается на resize и после загрузки шрифтов
const layout = {
    blockWidths: [],
    maxBlockWidth: 0,
    groupHeight: 0,
    pitch: 0,
    totalHeight: 0,
    groupTop: []
}

// логотипы проектов
const logos = {}

// анимируемые значения
let columnX = 0
let columnXTarget = 0
let offsetY = 0
let offsetYTarget = 0
let velocityY = 0

// «плавание» и параллакс
let elapsed = 0
let parallaxX = 0
let parallaxY = 0

// насколько лента находится в раскрытом состоянии (0..1) и вокруг какой группы
let openAmount = 0
let openIndex = -1

// панель подробностей
const activeIndex = ref(-1)
let pendingIndex = -1
let panelValue = 0 // 0..1 линейный прогресс твина
let panelDirection = 0 // 1 раскрываем, -1 закрываем
let panelDelay = 0
let panelDoc = null
let panelContentHeight = 0 // высота текста после раскладки, панель по ней ужимается
let panelScroll = 0 // отрисовываемое значение, догоняет цель
let panelScrollTarget = 0 // цель, может уходить за границы — это и есть резинка
let panelScrollMax = 0
let panelRect = { x: 0, y: 0, width: 0, height: 0 }

// указатель
let pointerX = -1
let pointerY = -1
let pointerDown = false
let pointerMoved = false
let pointerStartY = 0
let pointerLastY = 0
let dragTarget = null // 'timeline' | 'panel'

// зоны попадания, пересобираются каждый тик
let hitBlocks = []
let hitLinks = []

// служебное
let lastTime = 0
let animationId = null
const controllerHide = ref(false)



// вспомогательные функции
const lerp = (from, to, weight) => from + (to - from) * weight

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

// короткое «раздутие» поперёк движения: 0 → 5% → 0
const bulge = (t) => 1 + Math.sin(clamp(t, 0, 1) * Math.PI) * 0.05

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

const plural = (count, forms) => {
    const tail = count % 10
    const hundred = count % 100

    if (tail === 1 && hundred !== 11) return forms[0]
    if (tail >= 2 && tail <= 4 && (hundred < 10 || hundred >= 20)) return forms[1]

    return forms[2]
}

const MONTHS = [
    'ЯНВАРЬ', 'ФЕВРАЛЬ', 'МАРТ', 'АПРЕЛЬ', 'МАЙ', 'ИЮНЬ',
    'ИЮЛЬ', 'АВГУСТ', 'СЕНТЯБРЬ', 'ОКТЯБРЬ', 'НОЯБРЬ', 'ДЕКАБРЬ'
]

// подпись на пилюле даты
const formatDate = (date) => {
    if (date === 'actual') return 'ПО НАСТОЯЩЕЕ ВРЕМЯ'

    const [year, month] = date.split('-').map(Number)

    return `${MONTHS[month - 1]} ${year}`
}

// количество месяцев между двумя точками
const monthsBetween = (from, before) => {
    const [fromYear, fromMonth] = from.split('-').map(Number)
    let beforeYear
    let beforeMonth

    if (before === 'actual') {
        const now = new Date()

        beforeYear = now.getFullYear()
        beforeMonth = now.getMonth() + 1
    } else {
        const parts = before.split('-').map(Number)

        beforeYear = parts[0]
        beforeMonth = parts[1]
    }

    return Math.max(0, (beforeYear - fromYear) * 12 + (beforeMonth - fromMonth))
}

// стаж прописью: «1 год 8 месяцев»
const getExperience = (experience) => {
    const total = monthsBetween(experience.from, experience.before)
    const years = Math.floor(total / 12)
    const months = total % 12
    const parts = []

    if (years) parts.push(`${years} ${plural(years, ['год', 'года', 'лет'])}`)
    if (months) parts.push(`${months} ${plural(months, ['месяц', 'месяца', 'месяцев'])}`)

    return parts.length ? parts.join(' ') : 'меньше месяца'
}

const getName = (project) => project.project ? project.project.name : project.company.name
const getTitle = (project) => project.title || getName(project)

// путь скруглённого прямоугольника
const roundRectPath = (x, y, width, height, radius) => {
    const limit = Math.min(radius, width / 2, height / 2)

    context.beginPath()
    context.moveTo(x + limit, y)
    context.arcTo(x + width, y, x + width, y + height, limit)
    context.arcTo(x + width, y + height, x, y + height, limit)
    context.arcTo(x, y + height, x, y, limit)
    context.arcTo(x, y, x + width, y, limit)
    context.closePath()
}

// попадание точки в прямоугольник
const isInside = (x, y, rect) => {
    return x >= rect.x && x <= rect.x + rect.width && y >= rect.y && y <= rect.y + rect.height
}

// экран узкий — панель выезжает вниз, а не вправо
const isNarrow = () => canvasWidth < NARROW_WIDTH



// расчёт геометрии ленты
const measureLayout = () => {
    context.font = BLOCK_FONT

    layout.blockWidths = projectsData.map((project) => {
        return BLOCK_PADDING * 2 + BLOCK_ICON + BLOCK_ICON_GAP + context.measureText(getTitle(project)).width
    })

    layout.maxBlockWidth = Math.max(...layout.blockWidths)
    layout.groupHeight = PILL_HEIGHT * 2 + LINK_GAP * 2 + BLOCK_HEIGHT
    layout.pitch = layout.groupHeight + GROUP_GAP
    layout.totalHeight = projectsData.length * layout.pitch - GROUP_GAP
    layout.groupTop = projectsData.map((project, index) => index * layout.pitch)
}

// границы прокрутки ленты
const scrollBounds = () => {
    if (layout.totalHeight + TIMELINE_PADDING * 2 <= canvasHeight) {
        const center = (canvasHeight - layout.totalHeight) / 2

        return { min: center, max: center }
    }

    return {
        min: canvasHeight - TIMELINE_PADDING - layout.totalHeight,
        max: TIMELINE_PADDING
    }
}

// собственное «дыхание» элемента: у каждого свои фаза и частота, поэтому лента не пульсирует разом
const floatOffset = (seed) => ({
    x: Math.sin(elapsed * FLOAT_SPEED * (1 + (seed % 3) * 0.17) + seed) * FLOAT_X,
    y: Math.cos(elapsed * FLOAT_SPEED * (1 + (seed % 5) * 0.11) + seed * 1.7) * FLOAT_Y
})

// соседние группы отъезжают вправо, чтобы не спорить с раскрытой
const groupShift = (index) => {
    if (isNarrow() || openAmount < 0.001 || index === openIndex) return 0

    return NEIGHBOR_SHIFT * openAmount
}

// все опорные точки группы с учётом плавания, параллакса и сдвига соседей
const groupAnchors = (index) => {
    const top = layout.groupTop[index] + offsetY + parallaxY
    const column = columnX + groupShift(index) + parallaxX
    const width = layout.blockWidths[index]

    const startFloat = floatOffset(index * 3 + 1)
    const blockFloat = floatOffset(index * 3 + 2)
    const endFloat = floatOffset(index * 3 + 3)

    const blockTop = top + PILL_HEIGHT + LINK_GAP

    return {
        start: {
            x: column + startFloat.x,
            y: top + PILL_HEIGHT / 2 + startFloat.y
        },
        block: {
            x: column + blockFloat.x - width / 2,
            y: blockTop + blockFloat.y,
            width,
            height: BLOCK_HEIGHT
        },
        end: {
            x: column + endFloat.x,
            y: blockTop + BLOCK_HEIGHT + LINK_GAP + PILL_HEIGHT / 2 + endFloat.y
        }
    }
}

// прямоугольник блока проекта в координатах канваса
const blockRect = (index) => groupAnchors(index).block

// прямоугольник блока в устоявшемся положении — по нему считается геометрия панели,
// иначе её ширина зависела бы от текущего кадра анимации колонки
const settledBlockRect = (index) => {
    const width = layout.blockWidths[index]

    return {
        x: columnTarget() - width / 2,
        y: layout.groupTop[index] + offsetTarget() + PILL_HEIGHT + LINK_GAP,
        width,
        height: BLOCK_HEIGHT
    }
}

// целевое положение колонки: по центру или сдвинутое под открытую панель
const columnTarget = () => {
    if (activeIndex.value < 0 || isNarrow()) return canvasWidth / 2

    return Math.min(OPEN_MARGIN + layout.maxBlockWidth / 2, canvasWidth / 2)
}

// целевая прокрутка ленты
const offsetTarget = () => {
    if (activeIndex.value < 0) {
        const bounds = scrollBounds()

        return clamp(offsetYTarget, bounds.min, bounds.max)
    }

    const blockCenter = layout.groupTop[activeIndex.value] + PILL_HEIGHT + LINK_GAP + BLOCK_HEIGHT / 2
    const anchor = isNarrow() ? OPEN_TOP : canvasHeight / 2

    return anchor - blockCenter
}

// финальное положение панели в раскрытом состоянии
const panelTarget = () => {
    const index = activeIndex.value < 0 ? 0 : activeIndex.value
    const block = settledBlockRect(index)

    // если текст короче доступного места — панель ужимается под него
    const fit = (available) => {
        if (!panelContentHeight) return available

        return Math.max(120, Math.min(available, panelContentHeight + PANEL_PADDING_Y * 2))
    }

    if (isNarrow()) {
        // панель уходит вниз — стартуем под нижней пилюлей группы, а не сразу под блоком
        const y = block.y + block.height + LINK_GAP + PILL_HEIGHT + PANEL_ARROW / 2

        return {
            x: CONTROLLER_SAFE,
            y,
            width: canvasWidth - CONTROLLER_SAFE - PANEL_MARGIN,
            height: fit(Math.max(120, canvasHeight - y - PANEL_MARGIN))
        }
    }

    const x = block.x + block.width + PANEL_ARROW
    const height = fit(Math.min(260, canvasHeight - PANEL_MARGIN * 4))

    return {
        x,
        y: (canvasHeight - height) / 2,
        width: canvasWidth - PANEL_MARGIN - x,
        height
    }
}



// сборка содержимого панели
const buildPanelBlocks = (project) => {
    const blocks = []

    blocks.push({
        runs: [
            { text: 'Работал ' },
            { text: project.job.name, link: project.job.link, underline: true },
            { text: ' в течении ' },
            { text: getExperience(project.experience), underline: true }
        ]
    })

    if (project.project) {
        blocks.push({
            marginTop: 6,
            runs: [
                { text: 'Проект ' },
                { text: project.project.name, link: project.project.link, underline: true },
                { text: ' компании ' },
                { text: project.company.name, link: project.company.link, underline: true }
            ]
        })
    } else {
        blocks.push({
            marginTop: 6,
            runs: [
                { text: 'Компания ' },
                { text: project.company.name, link: project.company.link, underline: true }
            ]
        })
    }

    const description = project.project ? project.project.description : project.company.description
    if (description) blocks.push({ marginTop: 6, runs: [{ text: description }] })

    if (project.duties) {
        blocks.push({ marginTop: 16, runs: [{ text: 'Обязанности на рабочем месте:', font: PANEL_FONT_BOLD }] })

        for (const key in project.duties) {
            blocks.push({ marginTop: 6, hanging: 16, runs: [{ text: `${key}. ${project.duties[key]}` }] })
        }
    }

    if (project.achievements) {
        blocks.push({ marginTop: 16, runs: [{ text: 'Достижения за время работы:', font: PANEL_FONT_BOLD }] })

        for (const key in project.achievements) {
            blocks.push({ marginTop: 6, hanging: 16, runs: [{ text: `${key}. ${project.achievements[key]}` }] })
        }
    }

    if (project.tags) {
        blocks.push({ marginTop: 16, runs: [{ text: project.tags, color: 'rgba(235, 235, 235, .55)' }] })
    }

    return blocks
}

// раскладка текста панели по строкам с переносом по словам
const layoutPanelBlocks = (blocks, maxWidth) => {
    const lines = []
    let top = 0

    for (const block of blocks) {
        top += block.marginTop || 0

        const hanging = block.hanging || 0
        let parts = []
        let cursor = 0

        const pushLine = () => {
            lines.push({ top, parts })
            parts = []
            top += PANEL_LINE_HEIGHT
            cursor = hanging
        }

        for (const run of block.runs) {
            const font = run.font || PANEL_FONT

            context.font = font

            // делим на слова, сохраняя пробелы отдельными кусками
            const words = run.text.split(/(\s+)/).filter((word) => word.length)

            for (const word of words) {
                const isSpace = /^\s+$/.test(word)
                const width = context.measureText(word).width

                if (isSpace && !parts.length) continue

                if (cursor + width > maxWidth && parts.length) {
                    pushLine()
                    context.font = font

                    if (isSpace) continue
                }

                parts.push({
                    text: word,
                    x: cursor,
                    width,
                    font,
                    color: run.color,
                    link: run.link,
                    underline: run.underline
                })

                cursor += width
            }
        }

        if (parts.length) pushLine()
    }

    return { lines, height: top }
}

// пересборка панели под текущую ширину
const rebuildPanel = () => {
    if (activeIndex.value < 0) {
        panelDoc = null
        panelContentHeight = 0

        return
    }

    // первый проход считаем на всю доступную высоту: от неё ширина не зависит
    panelContentHeight = 0

    const maxWidth = panelTarget().width - PANEL_PADDING_X * 2 - PANEL_SCROLLBAR - 6

    panelDoc = layoutPanelBlocks(buildPanelBlocks(projectsData[activeIndex.value]), maxWidth)
    panelContentHeight = panelDoc.height

    panelScrollMax = Math.max(0, panelDoc.height - (panelTarget().height - PANEL_PADDING_Y * 2))
    panelScrollTarget = clamp(panelScrollTarget, 0, panelScrollMax)
    panelScroll = clamp(panelScroll, 0, panelScrollMax)
}

// сдвиг прокрутки панели с сопротивлением за границами — эффект резинки
const addPanelScroll = (delta) => {
    const overshoot = panelScrollTarget < 0
        ? -panelScrollTarget
        : Math.max(0, panelScrollTarget - panelScrollMax)

    // чем дальше утянули, тем меньше отрабатывает каждый следующий пиксель
    const resistance = 1 - Math.min(1, overshoot / PANEL_OVERSCROLL) * 0.85

    panelScrollTarget = clamp(
        panelScrollTarget + delta * resistance,
        -PANEL_OVERSCROLL,
        panelScrollMax + PANEL_OVERSCROLL
    )
}



// отрисовка пилюли с датой, центр задаётся точкой из groupAnchors
const printPill = (text, point) => {
    context.font = PILL_FONT
    context.letterSpacing = '1px'

    const width = context.measureText(text).width + PILL_PADDING * 2
    const x = point.x - width / 2
    const y = point.y - PILL_HEIGHT / 2

    // тело со свечением
    context.shadowColor = COLOR_LINE
    context.shadowBlur = GLOW_BASE
    roundRectPath(x, y, width, PILL_HEIGHT, PILL_RADIUS)
    context.fillStyle = COLOR_BACK
    context.fill()
    context.strokeStyle = COLOR_LINE
    context.lineWidth = 1
    context.stroke()
    context.shadowBlur = 0

    // подпись
    context.fillStyle = COLOR_LINE
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.fillText(text, point.x, point.y + 1)

    context.letterSpacing = '0px'
}

// отрисовка блока проекта
const printBlock = (index, rect, hovered) => {
    const highlight = hovered || index === activeIndex.value

    // тело со свечением
    context.shadowColor = COLOR_LINE
    context.shadowBlur = highlight ? GLOW_HIGHLIGHT : GLOW_BASE
    roundRectPath(rect.x, rect.y, rect.width, rect.height, BLOCK_RADIUS)
    context.fillStyle = highlight ? 'rgb(38, 38, 38)' : COLOR_BACK
    context.fill()
    context.strokeStyle = COLOR_LINE
    context.lineWidth = 1
    context.stroke()
    context.shadowBlur = 0

    // логотип
    const logo = logos[index]
    const iconX = rect.x + BLOCK_PADDING

    if (logo && logo.complete && logo.naturalWidth) {
        const scale = Math.min(BLOCK_ICON / logo.naturalWidth, BLOCK_ICON / logo.naturalHeight)
        const width = logo.naturalWidth * scale
        const height = logo.naturalHeight * scale

        context.drawImage(
            logo,
            iconX + (BLOCK_ICON - width) / 2,
            rect.y + (rect.height - height) / 2,
            width,
            height
        )
    } else {
        // заглушка пока логотип не загружен
        roundRectPath(iconX, rect.y + (rect.height - BLOCK_ICON) / 2, BLOCK_ICON, BLOCK_ICON, 6)
        context.strokeStyle = 'rgba(235, 235, 235, .4)'
        context.stroke()
    }

    // название
    context.font = BLOCK_FONT
    context.fillStyle = COLOR_LINE
    context.textAlign = 'left'
    context.textBaseline = 'middle'
    context.fillText(
        getTitle(projectsData[index]),
        iconX + BLOCK_ICON + BLOCK_ICON_GAP,
        rect.y + rect.height / 2 + 1
    )
}

// отрезок оси между двумя точками: блоки плавают, поэтому линия строится по ним, а не по колонке
const printAxis = (from, to, dashed) => {
    if (to.y <= from.y) return

    context.strokeStyle = dashed ? 'rgba(235, 235, 235, .55)' : COLOR_LINE
    context.lineWidth = 1
    context.setLineDash(dashed ? [2, 6] : [])

    context.beginPath()
    context.moveTo(from.x, from.y)
    context.lineTo(to.x, to.y)
    context.stroke()

    context.setLineDash([])
}

// отрисовка всей ленты
const printTimeline = () => {
    hitBlocks = []

    projectsData.forEach((project, index) => {
        const top = layout.groupTop[index] + offsetY

        // группа целиком за пределами канваса
        if (top > canvasHeight + layout.pitch || top + layout.groupHeight < -layout.pitch) return

        const anchors = groupAnchors(index)
        const block = anchors.block

        // сплошные отрезки внутри группы
        printAxis(
            { x: anchors.start.x, y: anchors.start.y + PILL_HEIGHT / 2 },
            { x: block.x + block.width / 2, y: block.y },
            false
        )
        printAxis(
            { x: block.x + block.width / 2, y: block.y + block.height },
            { x: anchors.end.x, y: anchors.end.y - PILL_HEIGHT / 2 },
            false
        )

        // пунктир до следующей группы — при сдвинутых соседях он становится диагональным
        if (index < projectsData.length - 1) {
            const next = groupAnchors(index + 1)

            printAxis(
                { x: anchors.end.x, y: anchors.end.y + PILL_HEIGHT / 2 },
                { x: next.start.x, y: next.start.y - PILL_HEIGHT / 2 },
                true
            )
        }

        printPill(formatDate(project.experience.from), anchors.start)
        printPill(formatDate(project.experience.before), anchors.end)

        printBlock(index, block, !pointerDown && isInside(pointerX, pointerY, block))
        hitBlocks.push({ index, ...block })
    })
}

// стрелка от блока к панели
const printArrow = (block, target, progress) => {
    context.save()
    context.globalAlpha = progress
    context.strokeStyle = COLOR_LINE
    context.fillStyle = COLOR_LINE
    context.lineWidth = 1

    if (isNarrow()) {
        const fromY = block.y + block.height + LINK_GAP + PILL_HEIGHT + 4
        const toY = target.y - 2

        context.beginPath()
        context.moveTo(columnX, fromY)
        context.lineTo(columnX, toY)
        context.stroke()

        context.beginPath()
        context.moveTo(columnX, toY + 2)
        context.lineTo(columnX - 4, toY - 5)
        context.lineTo(columnX + 4, toY - 5)
    } else {
        const fromX = block.x + block.width + 6
        const toX = target.x - 2
        const centerY = block.y + block.height / 2

        context.beginPath()
        context.moveTo(fromX, centerY)
        context.lineTo(toX, centerY)
        context.stroke()

        context.beginPath()
        context.moveTo(toX + 2, centerY)
        context.lineTo(toX - 5, centerY - 4)
        context.lineTo(toX - 5, centerY + 4)
    }

    context.closePath()
    context.fill()
    context.restore()
}

// отрисовка панели подробностей
const printPanel = () => {
    hitLinks = []

    if (activeIndex.value < 0 || panelValue <= 0) return

    const progress = easeOutCubic(panelValue)
    const swell = bulge(panelValue)
    const block = blockRect(activeIndex.value)
    const target = panelTarget()

    // панель «выплёвывается» из блока: вылетает от его края к финальной позиции
    // и по дороге коротко раздувается поперёк движения
    if (isNarrow()) {
        const width = target.width * swell

        panelRect = {
            x: target.x - (width - target.width) / 2,
            y: lerp(block.y + block.height + LINK_GAP + PILL_HEIGHT, target.y, progress),
            width,
            height: target.height * progress
        }
    } else {
        const height = target.height * swell

        panelRect = {
            x: lerp(block.x + block.width, target.x, progress),
            y: target.y - (height - target.height) / 2,
            width: target.width * progress,
            height
        }
    }

    printArrow(block, panelRect, Math.min(panelValue * 1.6, 1))

    // тело панели
    context.shadowColor = COLOR_LINE
    context.shadowBlur = 8
    roundRectPath(panelRect.x, panelRect.y, panelRect.width, panelRect.height, PANEL_RADIUS)
    context.fillStyle = COLOR_BACK
    context.fill()
    context.strokeStyle = COLOR_LINE
    context.lineWidth = 1
    context.stroke()
    context.shadowBlur = 0

    if (!panelDoc) return

    // текст с обрезкой по телу панели
    context.save()
    roundRectPath(panelRect.x, panelRect.y, panelRect.width, panelRect.height, PANEL_RADIUS)
    context.clip()

    context.globalAlpha = clamp((panelValue - 0.35) / 0.5, 0, 1)
    context.textAlign = 'left'
    context.textBaseline = 'top'

    const textX = panelRect.x + PANEL_PADDING_X
    const textY = panelRect.y + PANEL_PADDING_Y - panelScroll

    for (const line of panelDoc.lines) {
        const lineY = textY + line.top

        if (lineY + PANEL_LINE_HEIGHT < panelRect.y || lineY > panelRect.y + panelRect.height) continue

        for (const part of line.parts) {
            const partX = textX + part.x
            const partRect = { x: partX, y: lineY, width: part.width, height: PANEL_LINE_HEIGHT }
            const hovered = part.link && !pointerDown && isInside(pointerX, pointerY, partRect)

            context.font = part.font
            context.fillStyle = hovered ? 'rgb(255, 255, 255)' : (part.color || COLOR_LINE)
            context.fillText(part.text, partX, lineY)

            if (part.underline) context.fillRect(partX, lineY + PANEL_FONT_SIZE + 3, part.width, hovered ? 1.5 : 1)
            if (part.link && panelValue > 0.9) hitLinks.push({ link: part.link, ...partRect })
        }
    }

    context.restore()

    printPanelScrollbar()
}

// скроллбар внутри панели
const printPanelScrollbar = () => {
    if (panelScrollMax <= 0 || panelValue < 0.9) return

    const trackX = panelRect.x + panelRect.width - PANEL_PADDING_X / 2 - PANEL_SCROLLBAR
    const trackY = panelRect.y + PANEL_PADDING_Y
    const trackHeight = panelRect.height - PANEL_PADDING_Y * 2
    const thumbHeight = clamp(trackHeight * (trackHeight / panelDoc.height), 24, trackHeight)
    // за резинкой ползунок не убегает, он просто стоит в крайнем положении
    const thumbY = trackY + (trackHeight - thumbHeight) * (clamp(panelScroll, 0, panelScrollMax) / panelScrollMax)

    roundRectPath(trackX, trackY, PANEL_SCROLLBAR, trackHeight, PANEL_SCROLLBAR / 2)
    context.fillStyle = 'rgba(235, 235, 235, .18)'
    context.fill()

    roundRectPath(trackX, thumbY, PANEL_SCROLLBAR, thumbHeight, PANEL_SCROLLBAR / 2)
    context.fillStyle = COLOR_LINE
    context.fill()
}



// раскрыть проект
const openProject = (index) => {
    if (index === activeIndex.value) return closeProject()

    if (activeIndex.value >= 0) {
        // сначала убираем открытую панель, потом показываем новую
        pendingIndex = index
        panelDirection = -1
        panelDelay = 0

        return
    }

    activeIndex.value = index
    openIndex = index
    panelScroll = 0
    panelScrollTarget = 0
    panelDirection = 1
    panelDelay = PANEL_DELAY
    velocityY = 0
    rebuildPanel()
}

// свернуть панель
const closeProject = () => {
    if (activeIndex.value < 0) return

    pendingIndex = -1
    panelDirection = -1
    panelDelay = 0
}

// мгновенный сброс: анимировать нечем, пока карточка неактивна
const resetPanel = () => {
    activeIndex.value = -1
    pendingIndex = -1
    panelDirection = 0
    panelDelay = 0
    panelValue = 0
    panelScroll = 0
    panelScrollTarget = 0
    panelDoc = null
    panelContentHeight = 0
    openAmount = 0
    openIndex = -1
    velocityY = 0
}



// координаты указателя относительно канваса
const pointerPosition = (event) => {
    const rect = canvas.value.getBoundingClientRect()

    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    }
}

const handleWheel = (event) => {
    const position = pointerPosition(event)

    pointerX = position.x
    pointerY = position.y

    // колесо над раскрытой панелью крутит её содержимое
    if (activeIndex.value >= 0 && panelValue > 0.9 && isInside(pointerX, pointerY, panelRect)) {
        addPanelScroll(event.deltaY)

        return
    }

    closeProject()
    velocityY = 0

    const bounds = scrollBounds()

    offsetYTarget = clamp(offsetYTarget - event.deltaY, bounds.min, bounds.max)
}

const handlePointerDown = (event) => {
    const position = pointerPosition(event)

    pointerX = position.x
    pointerY = position.y
    pointerDown = true
    pointerMoved = false
    pointerStartY = position.y
    pointerLastY = position.y
    dragTarget = activeIndex.value >= 0 && isInside(pointerX, pointerY, panelRect) ? 'panel' : 'timeline'
    velocityY = 0

    canvas.value.setPointerCapture(event.pointerId)
}

const handlePointerMove = (event) => {
    const position = pointerPosition(event)

    pointerX = position.x
    pointerY = position.y

    if (!pointerDown) return

    const delta = position.y - pointerLastY

    pointerLastY = position.y

    if (Math.abs(position.y - pointerStartY) > 6) pointerMoved = true
    if (!pointerMoved) return

    if (dragTarget === 'panel') {
        addPanelScroll(-delta)

        return
    }

    closeProject()

    const bounds = scrollBounds()

    offsetYTarget = clamp(offsetYTarget + delta, bounds.min, bounds.max)
    offsetY = offsetYTarget
    velocityY = delta
}

const handlePointerUp = (event) => {
    if (!pointerDown) return

    pointerDown = false

    if (canvas.value.hasPointerCapture(event.pointerId)) canvas.value.releasePointerCapture(event.pointerId)

    if (pointerMoved) {
        // инерция только для ленты
        velocityY = dragTarget === 'panel' ? 0 : clamp(velocityY, -40, 40)
        pointerMoved = false
        dragTarget = null

        return
    }

    dragTarget = null
    handleClick()
}

const handlePointerLeave = () => {
    if (pointerDown) return

    pointerX = -1
    pointerY = -1
}

// клик без перетаскивания
const handleClick = () => {
    for (const item of hitLinks) {
        if (!isInside(pointerX, pointerY, item)) continue

        window.open(item.link, '_blank', 'noopener')

        return
    }

    for (const item of hitBlocks) {
        if (!isInside(pointerX, pointerY, item)) continue

        openProject(item.index)

        return
    }

    // клик мимо панели и блоков сворачивает подробности
    if (activeIndex.value >= 0 && !isInside(pointerX, pointerY, panelRect)) closeProject()
}

const handleKeydown = (event) => {
    if (event.key === 'Escape') closeProject()
}



// подготовка канваса
const resizeCanvas = () => {
    const ratio = window.devicePixelRatio || 1
    const rect = canvas.value.getBoundingClientRect()

    canvasWidth = rect.width
    canvasHeight = rect.height

    canvas.value.width = Math.round(canvasWidth * ratio)
    canvas.value.height = Math.round(canvasHeight * ratio)

    // все расчёты ведём в css-пикселях, ретину закрывает трансформация
    context.setTransform(ratio, 0, 0, ratio, 0, 0)

    measureLayout()
    rebuildPanel()

    const bounds = scrollBounds()

    offsetYTarget = clamp(offsetYTarget, bounds.min, bounds.max)
}

const handleResize = () => {
    resizeCanvas()

    columnX = columnTarget()
    offsetY = offsetTarget()

    requestFrame()
}

// загрузка логотипов
const loadLogos = () => {
    projectsData.forEach((project, index) => {
        const image = new Image()

        image.src = `/svg/projects/${getName(project)}-logo.svg`
        image.onload = () => {
            logos[index] = image
            requestFrame()
        }
    })
}



// кадр анимации
const tick = (time) => {
    animationId = null

    const delta = lastTime ? Math.min(time - lastTime, 64) : 16

    lastTime = time
    elapsed += delta

    // твин панели
    if (panelDirection !== 0) {
        if (panelDelay > 0) {
            panelDelay -= delta
        } else {
            panelValue = clamp(panelValue + panelDirection * (delta / PANEL_DURATION), 0, 1)

            if (panelValue === 0 || panelValue === 1) {
                panelDirection = 0

                if (panelValue === 0) {
                    activeIndex.value = -1
                    panelDoc = null
                    panelContentHeight = 0

                    if (pendingIndex >= 0) {
                        const next = pendingIndex

                        pendingIndex = -1
                        openProject(next)
                    }
                }
            }
        }
    }

    // инерция ленты
    if (!pointerDown && Math.abs(velocityY) > 0.1) {
        const bounds = scrollBounds()

        offsetYTarget = clamp(offsetYTarget + velocityY, bounds.min, bounds.max)
        velocityY *= 0.92
    }

    // резинка панели: цель возвращается в границы, отрисовка догоняет цель
    if (!(pointerDown && dragTarget === 'panel')) {
        panelScrollTarget = lerp(panelScrollTarget, clamp(panelScrollTarget, 0, panelScrollMax), PANEL_SCROLL_RETURN)
    }

    panelScroll = lerp(panelScroll, panelScrollTarget, PANEL_SCROLL_EASE)

    // параллакс от курсора, сглаженный чтобы не дёргался
    const depth = pointerX < 0 ? { x: 0, y: 0 } : {
        x: -(pointerX - canvasWidth / 2) / PARALLAX_DEPTH,
        y: -(pointerY - canvasHeight / 2) / PARALLAX_DEPTH
    }

    parallaxX = lerp(parallaxX, depth.x, PARALLAX_EASE)
    parallaxY = lerp(parallaxY, depth.y, PARALLAX_EASE)

    // плавное доведение до целей
    openAmount = lerp(openAmount, activeIndex.value < 0 ? 0 : 1, 0.12)

    columnXTarget = columnTarget()
    columnX = lerp(columnX, columnXTarget, 0.12)

    offsetYTarget = offsetTarget()
    offsetY = lerp(offsetY, offsetYTarget, pointerDown ? 1 : 0.16)

    // рисуем
    context.clearRect(0, 0, canvasWidth, canvasHeight)
    printTimeline()
    printPanel()

    if (onScreen.value) requestFrame()
}

const requestFrame = () => {
    if (animationId) return

    animationId = requestAnimationFrame(tick)
}

const canvasInit = () => {
    context = canvas.value.getContext('2d')

    loadLogos()
    resizeCanvas()

    columnX = columnTarget()
    offsetY = offsetTarget()
    offsetYTarget = offsetY

    requestFrame()

    // шрифт может подъехать позже — пересчитываем ширины и переносы
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
            measureLayout()
            rebuildPanel()
            requestFrame()
        })
    }
}



// старт компонента
onMounted(() => {
    if (!process.client) return

    canvasInit()

    window.addEventListener('resize', handleResize)
    window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
    if (!process.client) return

    if (animationId) cancelAnimationFrame(animationId)

    window.removeEventListener('resize', handleResize)
    window.removeEventListener('keydown', handleKeydown)
})

watch(onScreen, (visible) => {
    if (visible) {
        // Пауза между кадрами могла тянуться секундами — не даём delta скакнуть
        lastTime = 0
        requestFrame()
        return
    }

    // Карточка уже за краем экрана: сбрасываем панель и доводим ленту
    // до исходного положения одним кадром, без анимации
    resetPanel()
    columnX = columnTarget()
    offsetY = offsetTarget()
    requestFrame()
})
</script>
