/**
 * Цикл requestAnimationFrame, привязанный к жизни компонента и к условию.
 *
 * Решает три проблемы прежнего кода:
 *   1. цикл перезапускался наблюдателем, не проверив, не крутится ли уже один —
 *      при быстром переключении карточек их набиралось несколько сразу;
 *   2. остановка проверялась внутри самого кадра, из-за чего цикл жил
 *      на кадр дольше нужного;
 *   3. при размонтировании компонента кадр никто не отменял.
 */
/**
 * @param frame   что рисовать раз в кадр
 * @param enabled функция-условие: пока возвращает true, цикл крутится
 */
export function useAnimationFrame(frame, enabled) {
    let frameId = 0

    const loop = () => {
        frame()
        frameId = requestAnimationFrame(loop)
    }

    function start() {
        // Второй цикл на тот же кадр удваивает скорость анимации
        if (frameId || !import.meta.client) return
        frameId = requestAnimationFrame(loop)
    }

    function stop() {
        if (!frameId) return
        cancelAnimationFrame(frameId)
        frameId = 0
    }

    watch(computed(enabled), isEnabled => (isEnabled ? start() : stop()))

    // Ловит и размонтирование компонента, и ручную остановку области видимости
    onScopeDispose(stop)

    return { start, stop }
}
