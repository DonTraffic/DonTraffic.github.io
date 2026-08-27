/**
 * Совпадение с media-запросом в виде реактивного значения.
 *
 * Прежний код слушал `resize` и сравнивал `window.innerWidth` с числом:
 * обработчик срабатывал на каждый пиксель, слушатель никто не снимал,
 * а порог дублировал брейкпоинт из SCSS. matchMedia стреляет только
 * на переходе через границу.
 */
export function useMediaQuery(query) {
    const matches = ref(false)

    if (import.meta.client) {
        const media = window.matchMedia(query)
        matches.value = media.matches

        const update = event => { matches.value = event.matches }

        media.addEventListener('change', update)
        onScopeDispose(() => media.removeEventListener('change', update))
    }

    return matches
}

/**
 * Экран шире телефонного. Порог совпадает с $bp-phone в assets/style/media.scss:
 * ниже него тяжёлые сцены на canvas не запускаются вовсе.
 */
export const useIsDesktop = () => useMediaQuery('(min-width: 426px)')
