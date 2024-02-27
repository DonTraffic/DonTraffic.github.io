<template>
    <div id="PrintDonTraffic">
        <main class="wrapper">
            <section class="custom block" v-show="activeCatalogItem">
                <h2 class="block-title">Настройте изделие</h2>

                <div class="custom-container">
                    <div class="custom__menu">
                        <div 
                            class="custom__menu-slider slider" 
                            id="custom-menu-slider"
                            items-count='{"0":2.2, "450":1.2, "650":1.8, "950":2.2, "1150":3.2}' 
                            gap='16'
                            padding="16"
                        >

                            <div class="slider__line-wrap">
                                <div class="slider__line">
                                    <div 
                                        class="custom__menu-slider-item slider__line-item" 
                                        v-for="(item, index) in canvas.layers.canvasList" 
                                        :key="item"
                                    >
                                        <label class="custom__menu-slider-item-label" v-if="item.image">
                                            <img 
                                                class="custom__menu-slider-item-image"
                                                :src="item.image.canvasImage.src" 
                                                :alt="`image-item-custom-${index}`"
                                            >

                                            <input
                                                class="custom__menu-slider-item-input"
                                                type="file"
                                                @change="(e) => updateUpload(e, index)"
                                            >
                                        </label>
                                    </div>

                                    <div class="custom__menu-slider-item slider__line-item">
                                        <label class="custom__menu-slider-item-label">
                                            <svg class="custom__menu-slider-item-svg">
                                                <use xlink:href="~/assets/svg/sprite.svg#image-default"></use>
                                            </svg>

                                            <input
                                                class="custom__menu-slider-item-input"
                                                type="file"
                                                @change="(e) => updateUpload(e, canvas.layers.canvasList.length)"
                                            >
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <label class="custom__menu-label" v-if="catalogItems[activeCatalogItem].setting.product">
                            Ссылку на свой продукт -
                            <input 
                                class="custom__menu-label-input" 
                                type="text"
                                placeholder="ссылка или название"
                                v-model="catalogItems[activeCatalogItem].setting.product.url"
                            >
                        </label>

                        <label class="custom__menu-label">
                            Коментарий к заказу -
                            <input 
                                class="custom__menu-label-input" 
                                type="text"
                                placeholder="выложи душу"
                                v-model="catalogItems[activeCatalogItem].setting.message"
                            >
                        </label>
                    </div>

                    <div class="custom-separator"></div>

                    <div class="custom__redactor">
                        <div class="custom__redactor-layers" :class="{'custom__redactor-layers--show': canvas.layers.show}">
                            <div 
                                class="custom__redactor-layers-button"
                                @click="canvas.layers.show = !canvas.layers.show"
                            >Слои</div>

                            <div class="custom__redactor-layers-items">
                                <div 
                                    class="custom__redactor-layers-item"
                                    v-for="(item, index) in this.canvas.layers.canvasList" 
                                    :key="`${item}-${index}`"
                                    :class="{'custom__redactor-layers-item--active': this.canvas.layers.canvasActive == index}"
                                >
                                    <input
                                        class="custom__redactor-layers-item-text"
                                        @click="this.canvas.layers.canvasActive = index; updateCanvas()"
                                        v-model="item.name"
                                        type="text"
                                    >

                                    <div class="custom__redactor-layers-item-arrows">
                                        <button 
                                            class="custom__redactor-layers-item-arrow custom__redactor-layers-item-arrow--top"
                                            v-if="index != 0 && index != 1"
                                            @click="moveLayers(Number(index), Number(index)-1)"
                                        >
                                            <svg class="custom__redactor-layers-item-arrow-svg">
                                                <use xlink:href="~/assets/svg/sprite.svg#arrow"></use>
                                            </svg>
                                        </button>

                                        <button 
                                            class="custom__redactor-layers-item-arrow custom__redactor-layers-item-arrow--bottom"
                                            v-if="index != 0 && Number(index)+1 != this.canvas.layers.canvasList.length"
                                            @click="moveLayers(Number(index), Number(index)+1)"
                                        >
                                            <svg class="custom__redactor-layers-item-arrow-svg">
                                                <use xlink:href="~/assets/svg/sprite.svg#arrow"></use>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="custom__redactor-canvas-container">
                            <canvas class="custom__redactor-canvas custom__redactor-canvas--top" id="custom-redactor-canvas-border"></canvas>
                            <canvas class="custom__redactor-canvas" id="custom-redactor-canvas-0"></canvas>
                        </div>
                        
                        <!-- <svg class="custom__redactor-fullscreen">
                            <use xlink:href="~/assets/svg/sprite.svg#icon-fullscreen"></use>
                        </svg> -->
                    </div>
                </div>
            </section>

            <section class="block catalog">
                <h2 class="block-title">Каталог</h2>

                <div class="catalog__items">
                    <div 
                        class="catalog__item" 
                        v-for="(item, key) in catalogItems" 
                        :key="'shop-item-' + item"
                    >
                        <img 
                            class="catalog__item-image"
                            :src="`_nuxt/assets/img/shop/${key}.png`" 
                            :alt="`shop-img-${key}`"
                        >

                        <h3 class="catalog__item-title">{{ item.title }}</h3>
                        <p class="catalog__item-desc">{{ item.desc }}</p>
                        <p class="catalog__item-price">От {{ item.price }}&#8381;</p>

                        <button class="catalog__item-btn" @click="changeCatalogItem = key">закастомить</button>
                    </div>
                </div>
            </section>
        </main>
    </div>
</template>

<script>
import { slider } from '~/scripts/slider'

export default {
    name: 'ShopDonTraffic',

    data () {
        return {
            activeCatalogItem: 'knife',
            catalogItems: {
                'knife': {
                    title: 'Нож с травлением',
                    desc: 'Путём травления метала, лезвию ножа придаётся нужный принт. Есть возможность добавить слои, что придаст принту красоты и объёма',
                    price: 5000,

                    setting: {
                        product: {
                            image: '/_nuxt/assets/img/shop/knife-custom.png',
                            url: '',
                        },
                        prints: {},
                        message: '',
                    }
                },

                picture: {
                    title: 'Картина с подсветкой',
                    desc: 'Картина, которая ',
                    price: 5000,
                },
            },

            canvas: {
                ctx: null,
                item: null,

                drag: false,
                action: '',

                offsetY: 0,
                offsetX: 0,

                canvasBorder: {
                    html: null,
                    ctx: null,
                },

                linkCanvasActive: null,
                layers: {
                    canvasActive: null,
                    canvasList: [],
                    show: false,
                },

                methods: {
                    rotate: (e) => {
                        this.canvas.linkCanvasActive.image.rotate = (e.offsetY * Math.PI) / 180
                    },

                    scale: (e) => {
                        if (!this.canvas.ratio) this.canvas.ratio = this.canvas.linkCanvasActive.image.size.width/this.canvas.linkCanvasActive.image.size.height

                        this.canvas.linkCanvasActive.image.size = {
                            height: e.offsetY - this.canvas.linkCanvasActive.image.points['left-top'].y,
                            width: this.canvas.linkCanvasActive.image.size.height * this.canvas.ratio
                        }
                    },

                    scaleWidth: (e) => {
                        this.canvas.linkCanvasActive.image.size.width = e.offsetX - this.canvas.linkCanvasActive.image.points['left-top'].x
                    },

                    scaleHeight: (e) => {
                        this.canvas.linkCanvasActive.image.size.height = e.offsetY - this.canvas.linkCanvasActive.image.points['left-top'].y
                    },

                    move: (e) => {
                        console.log(this.canvas.linkCanvasActive.image);
                        if (!this.canvas.offsetX) this.canvas.offsetX = e.offsetX - this.canvas.linkCanvasActive.image.position.x
                        if (!this.canvas.offsetY) this.canvas.offsetY = e.offsetY - this.canvas.linkCanvasActive.image.position.y

                        this.canvas.linkCanvasActive.image.position = {
                            x: e.offsetX - this.canvas.offsetX,
                            y: e.offsetY - this.canvas.offsetY
                        }
                    },
                },
            },
        }
    },

    mounted() {
        slider.sliderInit('custom-menu-slider')
        this.initCanvas()

        new MutationObserver((item) => {
            slider.sliderUpdate('custom-menu-slider')
        }).observe(
            document.querySelector('#custom-menu-slider').querySelector('.slider__line'), 
            { childList: true, subtree: true }
        )

        let canvasContainer = document.querySelector('.custom__redactor-canvas-container')
            canvasContainer.addEventListener('mousedown', this.startDragging)
            canvasContainer.addEventListener('mousemove', (e) => { this.drag(e) })
            canvasContainer.addEventListener('mouseup', this.stopDragging)
    },

    methods: {
        updateUpload(e, index) {
            let reader = new FileReader();
            let file = e.target.files[0]

            reader.readAsDataURL(file)
            reader.onload = (result) => {
                let htmlCanvas

                if (this.canvas.layers.canvasList[index]) {
                    htmlCanvas = this.canvas.layers.canvasList[index].html
                } else {
                    htmlCanvas = document.createElement('canvas')
                        htmlCanvas.classList.add('custom__redactor-canvas')
                        htmlCanvas.setAttribute("id", `custom-redactor-canvas-${index}`);
                        document.querySelector('.custom__redactor-canvas-container').appendChild(htmlCanvas)
                }

                let img = new Image()
                img.onload = () => {
                    this.canvas.layers.canvasList[index] = {
                        name: 'image ' + index,
                        html: htmlCanvas,
                        ctx: htmlCanvas.getContext("2d"),
                        width: htmlCanvas.offsetWidth,
                        height: htmlCanvas.offsetHeight,
                        image: {
                            canvasImage: img,
                            size: {
                                width: 200*img.width/img.height,
                                height: 200,
                            },
                            center: {
                                x: 0 + (200*img.width/img.height) / 2,
                                y: 0 + 200 / 2,
                            },
                            position: {
                                x: 0,
                                y: 0,
                            },
                            rotate: 0,
                        }
                    }
                    this.canvas.layers.canvasList[index].html.width = this.canvas.layers.canvasList[index].width
                    this.canvas.layers.canvasList[index].html.height = this.canvas.layers.canvasList[index].height

                    this.canvas.linkCanvasActive = this.canvas.layers.canvasList[index]
                    this.setItemPosition()
                    this.updateCanvas()
                }
                img.src = result.target.result                    
            }
        },

        initCanvas() {
            this.canvas.canvasBorder.html = document.querySelector('#custom-redactor-canvas-border')
                this.canvas.canvasBorder.html.width = this.canvas.canvasBorder.html.offsetWidth
                this.canvas.canvasBorder.html.height = this.canvas.canvasBorder.html.offsetHeight
            this.canvas.canvasBorder.ctx = this.canvas.canvasBorder.html.getContext("2d")


            let htmlCanvas = document.querySelector('#custom-redactor-canvas-0')
            this.canvas.layers.canvasList.push({
                name: 'product',
                html: htmlCanvas,
                ctx: htmlCanvas.getContext("2d"),
                width: htmlCanvas.offsetWidth,
                height: htmlCanvas.offsetHeight,
            })
            let item = this.canvas.layers.canvasList[0]
                item.html.width = item.width
                item.html.height = item.height
            this.canvas.layers.canvasActive = 0


            let img = new Image()
            img.onload = () => {
                item.image = {
                    canvasImage: img,
                    size: {
                        width: 200*img.width/img.height,
                        height: 200,
                    },
                    center: {
                        x: 0 + (200*img.width/img.height) / 2,
                        y: 0 + 200 / 2,
                    },
                    position: {
                        x: 0,
                        y: 0,
                    },
                    rotate: 0,
                }

                this.canvas.linkCanvasActive = this.canvas.layers.canvasList[this.canvas.layers.canvasActive]
                this.setItemPosition()
                this.updateCanvas()
            }
            img.src = this.catalogItems[this.activeCatalogItem].setting.product.image
        },

        updateCanvas() {
            let canvasActive = this.canvas.linkCanvasActive
            canvasActive.ctx.clearRect(0, 0, canvasActive.html.width, canvasActive.html.height)

            // Сохраняем текущее состояние контекста
            canvasActive.ctx.save();

            // Применяем трансформации
            canvasActive.ctx.translate(canvasActive.image.center.x, canvasActive.image.center.y)
            canvasActive.ctx.rotate(canvasActive.image.rotate)
            
            // Отрисовываем продукт
            canvasActive.ctx.drawImage(
                canvasActive.image.canvasImage, 
                -canvasActive.image.size.width / 2, 
                -canvasActive.image.size.height / 2, 
                canvasActive.image.size.width, 
                canvasActive.image.size.height
            )

            // Восстанавливаем состояние контекста
            canvasActive.ctx.restore();
            
            this.printImageSetting()
        },

        printImageSetting(){
            let canvasActive = this.canvas.layers.canvasList[this.canvas.layers.canvasActive]
            let canvasBorder = this.canvas.canvasBorder

            canvasBorder.ctx.clearRect(0, 0, canvasActive.html.width, canvasActive.html.height)

            canvasBorder.ctx.strokeStyle = "rgb(235, 235, 235)";
            canvasBorder.ctx.lineWidth = 1;

            let radiusArc = 6

            let item = canvasActive.image

            // Сохраняем текущее состояние контекста
            canvasBorder.ctx.save();

            // Применяем трансформации
            canvasBorder.ctx.translate(canvasActive.image.center.x, canvasActive.image.center.y)
            canvasBorder.ctx.rotate(canvasActive.image.rotate)

            let coordX = -item.size.width / 2
            let coordY = -item.size.height / 2

            canvasBorder.ctx.beginPath()
                // старт и круг
                canvasBorder.ctx.moveTo(
                    coordX, coordY,
                );
                canvasBorder.ctx.lineTo(
                    coordX+item.size.width-radiusArc, coordY,
                );
                canvasBorder.ctx.moveTo(
                    coordX+item.size.width+radiusArc, coordY,
                );
                canvasBorder.ctx.arc(
                    coordX+item.size.width, coordY,

                    radiusArc, 0, Math.PI*2,

                    true
                );
                canvasBorder.ctx.moveTo(
                    coordX+item.size.width, coordY+radiusArc,
                );

                // право верх - право середина 
                canvasBorder.ctx.lineTo(
                    coordX+item.size.width, coordY+item.size.height/2-5,
                );
                canvasBorder.ctx.lineTo(
                    coordX+item.size.width+5, coordY+item.size.height/2-5,
                );
                canvasBorder.ctx.lineTo(
                    coordX+item.size.width+5, coordY+item.size.height/2+5,
                );
                canvasBorder.ctx.lineTo(
                    coordX+item.size.width-5, coordY+item.size.height/2+5,
                );
                canvasBorder.ctx.lineTo(
                    coordX+item.size.width-5, coordY+item.size.height/2-5,
                );
                canvasBorder.ctx.lineTo(
                    coordX+item.size.width, coordY+item.size.height/2-5,
                );
                canvasBorder.ctx.moveTo(
                    coordX+item.size.width, coordY+item.size.height/2+5,
                );

                // право середина - нижняя часть
                canvasBorder.ctx.lineTo(
                    coordX+item.size.width, coordY+item.size.height-5,
                );
                canvasBorder.ctx.lineTo(
                    coordX+item.size.width+5, coordY+item.size.height-5,
                );
                canvasBorder.ctx.lineTo(
                    coordX+item.size.width+5, coordY+item.size.height+5,
                );
                canvasBorder.ctx.lineTo(
                    coordX+item.size.width-5, coordY+item.size.height+5,
                );
                canvasBorder.ctx.lineTo(
                    coordX+item.size.width-5, coordY+item.size.height-5,
                );
                canvasBorder.ctx.lineTo(
                    coordX+item.size.width, coordY+item.size.height-5,
                );
                canvasBorder.ctx.moveTo(
                    coordX+item.size.width-5, coordY+item.size.height,
                );

                // нижняя часть - лево
                canvasBorder.ctx.lineTo(
                    coordX+item.size.width/2+5, coordY+item.size.height,
                );
                canvasBorder.ctx.lineTo(
                    coordX+item.size.width/2+5, coordY+item.size.height+5,
                );
                canvasBorder.ctx.lineTo(
                    coordX+item.size.width/2-5, coordY+item.size.height+5,
                );
                canvasBorder.ctx.lineTo(
                    coordX+item.size.width/2-5, coordY+item.size.height-5,
                );
                canvasBorder.ctx.lineTo(
                    coordX+item.size.width/2+5, coordY+item.size.height-5,
                );
                canvasBorder.ctx.lineTo(
                    coordX+item.size.width/2+5, coordY+item.size.height,
                );
                canvasBorder.ctx.moveTo(
                    coordX+item.size.width/2-5, coordY+item.size.height,
                );

                // замыкание
                canvasBorder.ctx.lineTo(
                    coordX, coordY+item.size.height,
                );
                canvasBorder.ctx.lineTo(
                    coordX, coordY,
                );

            // Восстанавливаем состояние контекста
            canvasBorder.ctx.stroke()
            canvasBorder.ctx.restore();

        },

        moveLayers(what, where) {
            let arr = this.canvas.layers.canvasList
            let item = arr[where]
            arr[where] = arr[what]
            arr[what] = item

            if(this.canvas.layers.canvasActive == what) {
                this.canvas.layers.canvasActive = where
            } else if(this.canvas.layers.canvasActive == where) {
                this.canvas.layers.canvasActive = what
            }

            arr.forEach((item, index) => {
                item.html.style.zIndex = index+1
            });

            this.updateCanvas()
        },

        setItemPosition() {
            let item = this.canvas.linkCanvasActive.image

            item.points = {
                'left-top': {
                    x: item.position.x,
                    y: item.position.y
                },
                'right-top': {
                    x: item.position.x + item.size.width,
                    y: item.position.y
                },
                'scale-width': {
                    x: item.position.x + item.size.width,
                    y: item.position.y + item.size.height/2
                },
                'right-bottom': {
                    x: item.position.x + item.size.width,
                    y: item.position.y + item.size.height
                },
                'scale-height': {
                    x: item.position.x + item.size.width/2,
                    y: item.position.y + item.size.height
                },
                'left-bottom': {
                    x: item.position.x,
                    y: item.position.y + item.size.height
                },
                'min-max': {
                    max: {
                        x:0,
                        y:0
                    },
                    min: {
                        x: item.position.x,
                        y: item.position.y
                    }
                }
            }
            item.center = {
                x: item.position.x + item.size.width/2,
                y: item.position.y + item.size.height/2,
            }
        
            let ssin = Math.sin(item.rotate);
            let scos = Math.cos(item.rotate);

            for (const key in item.points) {
                if (key == 'min-max') break

                item.points[key].x = item.center.x + (item.points[key].x - item.center.x) * scos - (item.points[key].y - item.center.y) * ssin;
                if(item.points[key].x > item.points['min-max'].max.x) item.points['min-max'].max.x = item.points[key].x
                if(item.points[key].x < item.points['min-max'].min.x) item.points['min-max'].min.x = item.points[key].x

                item.points[key].y = item.center.y + (item.points[key].x - item.center.x) * ssin + (item.points[key].y - item.center.y) * scos;
                if(item.points[key].y > item.points['min-max'].max.y) item.points['min-max'].max.y = item.points[key].y
                if(item.points[key].y < item.points['min-max'].min.y) item.points['min-max'].min.y = item.points[key].y
            }
        },

        startDragging() {
            this.canvas.drag = true

            this.canvas.linkCanvasActive = this.canvas.layers.canvasList[this.canvas.layers.canvasActive]
        },

        drag(e) {
            if (!this.canvas.drag ) return

            let item = this.canvas.linkCanvasActive.image

            switch (this.canvas.action) {
                case 'rotate':
                    this.canvas.methods.rotate(e)
                    break;

                case 'scale':
                    this.canvas.methods.scale(e)
                    break;

                case 'scaleWidth':
                    this.canvas.methods.scaleWidth(e)
                    break;

                case 'scaleHeight':
                    this.canvas.methods.scaleHeight(e)
                    break;

                case 'move':
                    this.canvas.methods.move(e)
                    break;
            }


            if (!this.canvas.action) {
                if (
                    item.points['right-top'].x-6 <= e.offsetX && item.points['right-top'].x+6 >= e.offsetX &&
                    item.points['right-top'].y-6 <= e.offsetY && item.points['right-top'].y+6 >= e.offsetY 
                ){ this.canvas.action = 'rotate' } 

                if (
                    item.points['right-bottom'].x-6 <= e.offsetX && item.points['right-bottom'].x+6 >= e.offsetX &&
                    item.points['right-bottom'].y-6 <= e.offsetY && item.points['right-bottom'].y+6 >= e.offsetY 
                ){ this.canvas.action = 'scale' }

                if (
                    item.points['scale-width'].x-6 <= e.offsetX && item.points['scale-width'].x+6 >= e.offsetX &&
                    item.points['scale-width'].y-6 <= e.offsetY && item.points['scale-width'].y+6 >= e.offsetY 
                ){ this.canvas.action = 'scaleWidth' }

                if (
                    item.points['scale-height'].x-6 <= e.offsetX && item.points['scale-height'].x+6 >= e.offsetX &&
                    item.points['scale-height'].y-6 <= e.offsetY && item.points['scale-height'].y+6 >= e.offsetY 
                ){ this.canvas.action = 'scaleHeight' }

                if (
                    item.points['min-max'].min.x <= e.offsetX && item.points['min-max'].max.x >= e.offsetX &&
                    item.points['min-max'].min.y <= e.offsetY && item.points['min-max'].max.y >= e.offsetY
                ){ this.canvas.action = 'move' } 
            }

            item.center = { // ERROR что то не так с rotate или center
                x: item.position.x + item.size.width/2,
                y: item.position.y + item.size.height/2,
            }

            this.updateCanvas()
        },

        stopDragging() {
            this.setItemPosition()

            this.canvas.drag = false
            this.canvas.action = ''
            this.canvas.ratio = 0
            this.canvas.offsetX = 0
            this.canvas.offsetY = 0
        },

    }
}
</script>

<style lang="scss">
    @use "~/assets/style/pages/pages.scss";
    @use "~/assets/style/pages/page-shop.scss";
</style>