// Выше двух точек на пиксель разница на глаз не видна,
// а работы на кадр становится вчетверо больше
const MAX_PIXEL_RATIO = 2

/**
 * Готовит canvas к рисованию в CSS-пикселях с учётом плотности экрана:
 * без этого на HiDPI картинка выглядит мыльной.
 *
 * @param size объект вида { width, height } в CSS-пикселях
 * @returns контекст рисования или null, если холст его не дал
 */
export function fitCanvas(canvas, size) {
    const context = canvas.getContext('2d')
    if (!context) return null

    const ratio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO)

    canvas.width = Math.round(size.width * ratio)
    canvas.height = Math.round(size.height * ratio)
    canvas.style.width = `${size.width}px`
    canvas.style.height = `${size.height}px`

    // Дальше весь код рисования работает в CSS-пикселях и о плотности не знает
    context.setTransform(ratio, 0, 0, ratio, 0, 0)

    return context
}
