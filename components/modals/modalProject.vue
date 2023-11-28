<template>
    <div 
        class="modal modal-project" 
        :class="{'modal--show': info}"
        ref="modalProject"
    >
        <div class="modal__close" @click="$emit('closeModal')">
            <svg class="modal__close-icon">
                <use xlink:href="~/assets/svg/sprite.svg#close"></use>
            </svg>
        </div>

        <template v-if="info">
            <div 
                class="modal-project-content" 
                ref="modalProjectContent"
                :style="`translate: 0 ${contentPositionDinamic}px`"
                @mousedown="(event) => { updateScroll(event); scrollDirection=true }"
                @ondragstart="() => { return }"
                @wheel="(event) => scrollWheel(event)"
                
            >
                <div class="modal-project__header">
                    <template v-if="info.project">
                        <a class="modal-project__header-logo" :href="info.project.link">
                            <img 
                                class="modal-project__header-logo-icon" 
                                :src="`_nuxt/assets/svg/projects/${info.project.name}-logo.svg`"
                                :alt="`${info.project.name}-logo.svg`"
                            >

                            <span class="modal-project__header-logo-title" v-html="info.project.name"></span>
                        </a>

                        <div class="modal-project__header-link">
                            Компания: <a :href="info.company.link" v-html="info.company.name"></a>
                        </div>
                    </template>
                    <a class="modal-project__header-logo" :href="info.company.link" v-else>
                        <img 
                            class="modal-project__header-logo-icon" 
                            :src="`_nuxt/assets/svg/projects/${info.company.name}-logo.svg`"
                            :alt="`${info.company.name}-logo.svg`"
                        >

                        <span class="modal-project__header-logo-title" v-html="info.company.name"></span>
                    </a>

                    <div class="modal-project__header-link">
                        Должность: <a :href="info.job.link" v-html="info.job.name"></a>
                    </div>
                </div>

                <div class="modal-project__date">
                    <div class="modal-project__date-point">
                        <p>От: {{ formatMonthName(info.experience.from) }}</p>
                        <p>До: {{ formatMonthName(info.experience.before) }}</p>
                    </div>

                    <svg class="modal-project__date-bracket">
                        <use xlink:href="~/assets/svg/sprite.svg#bracket"></use>
                    </svg>

                    <p class="modal-project__date-sum">{{ getMonthDiff(info.experience.from, info.experience.before) }}</p>
                </div>

                <div class="modal-project__list" v-if="info.duties">
                    <p class="modal-project__list-title">Обязанности на рабочем месте:</p>
                    <ol>
                        <li 
                        class="modal-project__list-item" 
                        v-for="(dutie, dutieCount) in info.duties"
                        :key="'dutie' + dutieCount"
                        >{{ dutieCount }}. {{ dutie }}</li>
                    </ol>
                </div>

                <div class="modal-project__list" v-if="info.achievements">
                    <p class="modal-project__list-title">Достижения за время работы:</p>
                    <ol>
                        <li 
                        class="modal-project__list-item" 
                        v-for="(achievement, achievementCount) in info.achievements"
                        :key="'achievement' + achievementCount"
                        >{{ achievementCount }}. {{ achievement }}</li>
                    </ol>
                </div>

                <div class="modal-project__tags" v-if="info.tags">{{ info.tags }}</div>
            </div>
        </template>

        <div 
            class="modal-project__scrollbar" 
            ref="modalProjectScrollbar"
        >
            <div 
                class="modal-project__scrollbar-thumb"
                ref="modalProjectScrollbarThumb"
                :style="`
                    translate: 0 ${-scrollbarPositionDinamic}px;
                    height: ${scrollbarThumbHeight}px;
                `"
                @mousedown="(event) => {updateScroll(event); scrollDirection=false}"
                @ondragstart="() => { return false }"
            ></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'modal',

    props: {
        info: Object
    },

    data() {
        return {
            scrollClientY: 0,
            scrollDirection: true,
            
            contentPosition: 0,
            contentPositionMax: 0,
            contentPositionDinamic: 0,

            scrollbarThumbHeight: 0,
            scrollbarScrollMax: 0,
            scrollbarPositionDinamic: 0,
        }
    },

    watch: {
        info () { 
            this.contentPosition = 0 
            this.contentPositionMax = 0
            this.contentPositionDinamic = 0; 
            this.scrollbarPositionDinamic = 0

            let looping = () => {
                setTimeout(() => {
                    if (this.info) this.$refs.modalProjectContent ? this.initProject() : looping()
                }, 100)
            }; looping()
        }
    },

    mounted() {        
        if (this.info) this.initProject()
    },

    methods: {
        scrollWheel(event) {
            this.contentPosition-=event.deltaY

            if (this.contentPosition > 0) {
                this.contentPosition = 0
            } else if (this.contentPosition < -this.contentPositionMax) {
                this.contentPosition = -this.contentPositionMax
            }

            let scrollWheelAnim = () => {
                setTimeout(() => {
                    let localScrollPositionDinamic = Math.round(this.contentPositionDinamic)
                    let localScrollPosition = Math.round(this.contentPosition)

                    if(localScrollPositionDinamic > localScrollPosition) {
                        this.contentPositionDinamic--
                        scrollWheelAnim()
                    } else if (localScrollPositionDinamic < localScrollPosition) {
                        this.contentPositionDinamic++
                        scrollWheelAnim()
                    }

                    this.scrollbarPositionDinamic = localScrollPositionDinamic * (this.scrollbarScrollMax/this.contentPositionMax)
                }, 1);
            }; scrollWheelAnim()
        },

        initProject() {
            let contentHeight = (this.$refs.modalProjectContent.offsetHeight + parseInt(window.getComputedStyle(this.$refs.modalProject).padding, 10)*2)

            this.contentPositionMax = contentHeight - this.$refs.modalProject.offsetHeight

            let scrollbarHeight = this.$refs.modalProjectScrollbar.offsetHeight
            this.scrollbarThumbHeight = (scrollbarHeight/100) * ((this.$refs.modalProject.offsetHeight*100) / contentHeight)
            this.scrollbarScrollMax = scrollbarHeight - this.scrollbarThumbHeight
        },

        updateScroll(event) {
            this.scrollClientY = event.clientY
            event.preventDefault()

            document.addEventListener('mousemove', this.onMouseMove)
            document.addEventListener('mouseup', this.onMouseUp)
        },

        onMouseMove(e) {    
            let scrollDinamic = this.scrollDirection ? this.contentPosition + (e.clientY-this.scrollClientY) : this.contentPosition - (e.clientY-this.scrollClientY)*(this.contentPositionMax/this.scrollbarScrollMax)
            if (scrollDinamic > 0) return this.contentPositionDinamic = 0
            this.contentPositionDinamic = -this.contentPositionMax > scrollDinamic ? -this.contentPositionMax : scrollDinamic
            this.scrollbarPositionDinamic = this.contentPositionDinamic * (this.scrollbarScrollMax/this.contentPositionMax)
        },

        onMouseUp(e) {
            this.contentPosition = this.contentPositionDinamic
            document.removeEventListener('mousemove', this.onMouseMove)
            document.removeEventListener('mouseup', this.onMouseUp)
        },

        getMonthDiff(date1, date2) {
            let dateActual
            if (date2 == 'actual') dateActual = `${new Date().getFullYear()}-${new Date().getMonth()+1}`

            const epoch = Date.parse("1970-01-01T00:00:00.000Z");
            let count = Math.ceil((Date.parse(dateActual ? dateActual : date2) - epoch - Date.parse(date1) - epoch) / (30 * 24 * 60 * 60 * 1000));

            return `${Math.floor(count/12)} год ${count%12} месяцев`
        },

        formatMonthName(date) {
            let parts

            date == 'actual' ? 
                parts = [new Date().getFullYear(), new Date().getMonth()+1] :
                parts = date.split('-') ;

            let monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

            return monthNames[parseInt(parts[1], 10) - 1] + ' ' + parts[0];
        }
    }
}
</script>