/**
 * Состояние карточек главной страницы.
 *
 * Раньше положение карточек жило в DOM: компоненты навешивали друг другу
 * классы через `classList`, а Vuex догонял их через `setTimeout` в мутации.
 * Здесь единственный источник правды — `activeCard`, всё остальное из него
 * выводится. Карточка не знает про соседей и ничего не ищет в документе.
 */

// Имя карточки: 'cardStart' | 'cardMenu' | 'cardSkills' | 'cardProjects'
// Положение:    'center' | 'left' | 'right' | 'top' | 'bottom'

/**
 * Длительность проезда карточки.
 * Это же значение уезжает в CSS как `--card-transition`, поэтому
 * JS и стили не могут разъехаться (см. pages/index.vue).
 */
export const CARD_TRANSITION_MS = 1000

/** Названия разделов для подписей к стрелкам и скринридеров. */
export const CARD_LABELS = {
    cardStart: 'Начало',
    cardMenu: 'Визитка',
    cardSkills: 'Навыки',
    cardProjects: 'Проекты',
}

/** Где стоит карточка (ключ второго уровня) при активной карточке (ключ первого). */
const CARD_POSITIONS = {
    cardStart: { cardStart: 'center', cardMenu: 'bottom', cardSkills: 'left', cardProjects: 'right' },
    cardMenu: { cardStart: 'center', cardMenu: 'center', cardSkills: 'left', cardProjects: 'right' },
    cardSkills: { cardStart: 'center', cardMenu: 'center', cardSkills: 'center', cardProjects: 'right' },
    cardProjects: { cardStart: 'center', cardMenu: 'center', cardSkills: 'left', cardProjects: 'center' },
}

/**
 * Какие карточки держим в DOM при активной карточке.
 * Стартовая живёт только до перехода в меню и больше не возвращается,
 * поэтому смысла держать её тяжёлый canvas дальше нет.
 */
const CARD_MOUNTED = {
    cardStart: ['cardStart', 'cardMenu'],
    cardMenu: ['cardMenu', 'cardSkills', 'cardProjects'],
    cardSkills: ['cardMenu', 'cardSkills'],
    cardProjects: ['cardMenu', 'cardProjects'],
}

// Таймер размонтирования один на страницу и трогается только в браузере,
// поэтому между SSR-запросами ничего не утекает.
let unmountTimer

export function useCards() {
    const activeCard = useState('cards:active', () => 'cardStart')
    const mountedCards = useState('cards:mounted', () => CARD_MOUNTED.cardStart)
    // Карточка, которая прямо сейчас уезжает с экрана
    const leavingCard = useState('cards:leaving', () => null)

    /** Перевести фокус на другую карточку. */
    function goTo(name) {
        if (name === activeCard.value) return

        leavingCard.value = activeCard.value
        activeCard.value = name

        if (!import.meta.client) return

        // Карточки снимаем с монтирования только после проезда: убери их сразу —
        // и уезжающая карточка исчезнет рывком на середине анимации.
        clearTimeout(unmountTimer)
        unmountTimer = setTimeout(() => {
            mountedCards.value = CARD_MOUNTED[name]
            leavingCard.value = null
        }, CARD_TRANSITION_MS)
    }

    /** Положение карточки прямо сейчас — попадает в `data-position` и дальше в CSS. */
    const positionOf = name => CARD_POSITIONS[activeCard.value][name]

    const isMounted = name => mountedCards.value.includes(name)

    /**
     * Видна ли карточка на экране — включая время проезда.
     * По этому признаку запускаются и останавливаются анимации на canvas:
     * так они не крутятся вхолостую за краем экрана и не замирают на переходе.
     */
    const isOnScreen = name => activeCard.value === name || leavingCard.value === name

    return { activeCard: readonly(activeCard), goTo, positionOf, isMounted, isOnScreen }
}
