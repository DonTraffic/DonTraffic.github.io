import { fitCanvas } from '~/composables/useCanvas'

/**
 * Стартовая сцена: поле травы и заходящее солнце.
 *
 * Сцена владеет своим состоянием и ничего не знает ни о Vue, ни о документе:
 * компонент отдаёт ей холст с размерами и раз в кадр просит нарисовать себя.
 */

const COLOR = 'rgb(235, 235, 235)'

// Солнце садится по дуге и у горизонта притормаживает
const SUN_START_ANGLE = 2.6
const SUN_END_ANGLE = 4.7
const SUN_SLOWDOWN_FROM = 4.5
const SUN_START_SPEED = 0.0015
const SUN_RADIUS = 70
const SUN_ORBIT_X = 400
const SUN_ORBIT_Y = 300

// Травинка
const BLADE_WIDTH = 8
const BLADE_MAX_HEIGHT = 180
const BLADE_HEIGHT_SPREAD = 20
const BLADE_SWAY_MAX = 10
const BLADE_SWAY_SPEED = 0.025

// Травинка: { x, height, sway, swayForward }, где swayForward — клонится ли вправо.

/**
 * @param size объект вида { width, height } в CSS-пикселях
 * @returns объект с методом draw() или null, если холст не дал контекст
 */
export function createGrassScene(canvas, size) {
    const fitted = fitCanvas(canvas, size)
    if (!fitted) return null

    const { context } = fitted

    // Ноль переезжает в левый нижний угол: трава растёт вверх, а не вниз
    context.translate(0, size.height)
    context.scale(1, -1)
    context.fillStyle = COLOR
    context.shadowColor = COLOR

    const bladeCount = Math.round(size.width / BLADE_WIDTH) + 20
    const blades = Array.from({ length: bladeCount }, (_, index) => ({
        x: index * (BLADE_WIDTH - 1) + Math.floor(Math.random() * 5) + BLADE_WIDTH - 20,
        height: Math.random() * BLADE_HEIGHT_SPREAD + BLADE_MAX_HEIGHT - BLADE_HEIGHT_SPREAD,
        sway: Math.round(Math.random() * (BLADE_SWAY_MAX - 1)),
        swayForward: Math.random() < .5,
    }))

    let sunAngle = SUN_START_ANGLE
    let sunSpeed = SUN_START_SPEED

    function drawSun() {
        if (sunSpeed > 0.000001 && sunAngle > SUN_SLOWDOWN_FROM) sunSpeed -= 0.00002
        if (sunAngle < SUN_END_ANGLE) sunAngle += Math.PI * sunSpeed

        context.beginPath()
        context.arc(
            size.width / 1.3 + SUN_ORBIT_X * Math.cos(-sunAngle),
            size.height / 12 + SUN_ORBIT_Y * Math.sin(-sunAngle),
            SUN_RADIUS, 0, Math.PI * 2,
        )
        context.shadowBlur = 15
        context.fill()
    }

    function drawBlade(blade) {
        // Дойдя до предела наклона, травинка начинает клониться в другую сторону
        if (blade.sway >= BLADE_SWAY_MAX || blade.sway <= -BLADE_SWAY_MAX) {
            blade.swayForward = !blade.swayForward
        }
        blade.sway += blade.swayForward ? BLADE_SWAY_SPEED : -BLADE_SWAY_SPEED

        const { x, height, sway } = blade

        context.beginPath()
        context.bezierCurveTo(
            x, 0,
            x + 3, height / 1.2,
            x + 6 - BLADE_WIDTH - sway * 5, height + (sway > 0 ? -sway : sway) * 2,
        )
        context.bezierCurveTo(
            x + 9 - sway * 2, height / 1.2 + sway / 3,
            x + 12, height / 2 + sway,
            x + 12, 0,
        )
        context.closePath()
        context.shadowBlur = 5
        context.fill()
    }

    return {
        draw() {
            context.clearRect(0, 0, size.width, size.height)
            for (const blade of blades) drawBlade(blade)
            drawSun()
        },
    }
}
