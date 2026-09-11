/**
 * Цикл requestAnimationFrame, привязанный к жизни компонента и к условию.
 * Повторно не запускается, останавливается сразу по смене условия
 * и отменяет запланированный кадр при размонтировании.
 *
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

    // Срабатывает и на размонтирование, и на ручную остановку области видимости
    onScopeDispose(stop)

    return { start, stop }
}
