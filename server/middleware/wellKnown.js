/**
 * Chrome DevTools при открытии вкладки запрашивает
 * `/.well-known/appspecific/com.chrome.devtools.json` — файл настроек рабочей
 * папки для функции «Automatic workspace folders». Такого файла у нас нет,
 * маршрута под него тоже, поэтому запрос доходит до рендерера Vue,
 * и роутер пишет в консоль «No match found for location».
 *
 * Отвечаем 204: у нас нечего отдать, а пустой ответ — нормальный для
 * неизвестного well-known адреса. Заодно консоль остаётся чистой.
 *
 * Путь сверяется целиком, а не по префиксу: иначе middleware перехватил бы
 * и настоящие файлы из public/.well-known, если они когда-нибудь появятся.
 */
const DEVTOOLS_PROBE = '/.well-known/appspecific/com.chrome.devtools.json'

export default defineEventHandler((event) => {
    if (event.path !== DEVTOOLS_PROBE) return

    return sendNoContent(event, 204)
})
