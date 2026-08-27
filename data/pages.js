/**
 * Мета-описания страниц.
 *
 * Раньше это лежало в состоянии Vuex, созданном на уровне модуля: при
 * server-side рендере один и тот же объект обслуживал все запросы сразу.
 * Здесь это просто константы — состояния нет, а значит нечему и течь.
 */

// Описание страницы: { title, description, keywords }.

export const SITE_URL = 'https://dontraffic.ru'
export const SITE_NAME = 'DonTraffic'
export const SITE_IMAGE = `${SITE_URL}/images/wallpapperLink.jpg`

const MARKET_META = {
    title: 'DonTraffic.Market',
    description: 'Небольшой магазин по продаже интересных вещей с услугой индивидуального (кастомного) оформления',
    keywords: 'декор, подарки, интересные подарки, подарки близким, красивый декор для дома, индивидуальное оформление, кастомное оформление, свой дизайн, свой принт, своя идея, магазин с декором, доставка, оформление своего',
}

export const PAGE_META = {
    index: {
        title: 'Middle frontend разработчик DonTraffic',
        description: 'Визитная карточка middle frontend разработчика DonTraffic',
        keywords: 'визитка, визитная карточка, сайт визитка, frontend, middle, разработчик, DonTraffic, заказать сайт, вёрстка',
    },
    market: MARKET_META,
    marketPreview: MARKET_META,
}
