/**
 * Навыки, разложенные по «слайдам» подводной сцены.
 * Индекс массива = номер слайда: нулевой — заставка с цитатой, без блоков.
 *
 * Путь к иконке лежит в данных, а не собирается из имени навыка:
 * прежняя склейка '/svg/skills/' + name + '.svg' давала /svg/skills/CSS.svg,
 * тогда как файл называется css.svg — на регистрозависимом сервере это 404.
 */

// Навык:
//   name        — подпись на блоке и заголовок модального окна
//   icon        — путь к svg в /public/svg/skills
//   experience  — стаж строкой
//   example     — ссылка на живой пример; нет примера — нет и кнопки
//   courses / tests / recommendations — списки ссылок { title, url }
//   position    — { x, y } на холсте в пикселях; отрицательное значение
//                 отсчитывается от правого или нижнего края
//   mobile      — { wave, left, label } — размещение на волнах узкой версии

export const SKILL_SLIDES = [
    [],
    [
        {
            name: 'HTML',
            icon: '/svg/skills/html.svg',
            mobile: { wave: 2, left: '50%' },
            experience: 'Больше 3х лет',
            courses: [
                {
                    title: '«Профессиональная вёрстка»',
                    url: 'https://gb.ru/certificates/1093227'
                }
            ],
            tests: [
                {
                    title: '«HTML&CSS. Сложный уровень»',
                    url: 'https://gb.ru/go/VNNXB05'
                }
            ],
            recommendations: [
                {
                    title: 'Компания «xseven»',
                    url: '/files/xseven.pdf'
                }
            ],
            position: {
                x: -150,
                y: -150
            }
        },
        {
            name: 'CSS',
            icon: '/svg/skills/css.svg',
            mobile: { wave: 3, left: '95%' },
            experience: 'Больше 3х лет',
            courses: [
                {
                    title: '«Профессиональная вёрстка»',
                    url: 'https://gb.ru/certificates/1093227'
                }
            ],
            tests: [
                {
                    title: '«HTML&CSS. Сложный уровень»',
                    url: 'https://gb.ru/go/VNNXB05'
                }
            ],
            recommendations: [
                {
                    title: 'Компания «xseven»',
                    url: '/files/xseven.pdf'
                }
            ],
            position: {
                x: 150,
                y: -100
            }
        },
        {
            name: 'jQuery',
            icon: '/svg/skills/jquery.svg',
            mobile: { wave: 7, left: '85%' },
            experience: 'Больше 1 года',
            recommendations: [
                {
                    title: 'Компания «xseven»',
                    url: '/files/xseven.pdf'
                }
            ],
            position: {
                x: -250,
                y: 175
            }
        },
        {
            name: 'JavaScript',
            icon: '/svg/skills/javascript.svg',
            mobile: { wave: 5, left: '65%', label: 'JS' },
            experience: 'Больше 2х лет',
            example: 'https://dontraffic.ru/market',
            courses: [
                {
                    title: '«Продвинутый курс JavaScript»',
                    url: 'https://gb.ru/certificates/2183847?7d5959fd53c11adb9fc8ab88269d3ea3'
                },
                {
                    title: '«Профессиональная вёрстка»',
                    url: 'https://gb.ru/certificates/1093227?26800bfbac76f0865cff8b768767d415'
                }
            ],
            tests: [
                {
                    title: '«JavaScript. Сложный уровень»',
                    url: 'https://gb.ru/certificates/2185392?13da3644a25fd7f9af1bbe9255e31af5'
                }
            ],
            recommendations: [
                {
                    title: 'Компания «xseven»',
                    url: '/files/xseven.pdf'
                }
            ],
            position: {
                x: 100,
                y: 100
            }
        }
    ],
    [
        {
            name: 'Canvas',
            icon: '/svg/skills/canvas.svg',
            mobile: { wave: 10, left: '45%' },
            experience: 'Больше 3х лет',
            recommendations: [
                {
                    title: 'Этот сайт',
                    url: '#'
                }
            ],
            position: {
                x: 150,
                y: -100
            }
        },
        {
            name: 'VUE',
            icon: '/svg/skills/vue.svg',
            mobile: { wave: 11, left: '70%' },
            experience: 'Больше 1 года',
            recommendations: [
                {
                    title: 'Компания «xseven»',
                    url: '/files/xseven.pdf'
                }
            ],
            position: {
                x: -150,
                y: 175
            }
        },
        {
            name: 'NUXT',
            icon: '/svg/skills/nuxt.svg',
            mobile: { wave: 13, left: '95%' },
            experience: 'Больше 2х лет',
            example: 'https://dontraffic.ru/market',
            recommendations: [
                {
                    title: 'Компания «xseven»',
                    url: '/files/xseven.pdf'
                }
            ],
            position: {
                x: 200,
                y: 100
            }
        }
    ]
]

/** Слайдов ровно столько, сколько описано данными — константу больше не держим отдельно. */
export const SKILL_SLIDES_COUNT = SKILL_SLIDES.length

/** Плоский список всех навыков в виде { skill, slide } — для перебора вне сцены. */
export const ALL_SKILLS = SKILL_SLIDES.flatMap(
    (skills, slide) => skills.map(skill => ({ skill, slide })),
)

/** Сколько слоёв волн рисует узкая версия карточки. */
export const MOBILE_WAVE_COUNT = 16
