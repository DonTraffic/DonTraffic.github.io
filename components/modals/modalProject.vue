<template>
    <div 
        class="modal modal-project" 
        :class="{'modal--show': info}"
        ref="modalProject"
    >
        <div class="modal__close" @click="$emit('closeModal')">
            <svg class="modal__close-icon">
                <use xlink:href="@/assets/svg/sprite.svg#close"></use>
            </svg>
        </div>

        <template v-if="info">
            <div 
                id="scroll-project" 
                class="DTScroll scroll-project-slider scroll-project-slider--0 modal-project__slider"
                direction="vertical"
            >
                <div class="scroll-project-shadow-prev"></div>

                <div class="scroll-project-line">
                    <div class="scroll-project-item">
                        <div class="modal-project__header">
                            <template v-if="info.project">
                                <a class="modal-project__header-logo" :href="info.project.link">
                                    <img 
                                        class="modal-project__header-logo-icon" 
                                        :src="`/svg/projects/${info.project.name}-logo.svg`"
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
                                    :src="`/svg/projects/${info.company.name}-logo.svg`"
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
                                <use xlink:href="@/assets/svg/sprite.svg#bracket"></use>
                            </svg>

                            <p class="modal-project__date-sum">{{ getMonthDiff(info.experience.from, info.experience.before) }}</p>
                        </div>

                        <div class="modal-project__list" v-if="info.duties">
                            <p class="modal-project__list-title">--- Обязанности на рабочем месте:</p>
                            <ol>
                                <li 
                                class="modal-project__list-item" 
                                v-for="(dutie, dutieCount) in info.duties"
                                :key="'dutie' + dutieCount"
                                >{{ dutieCount }}. {{ dutie }}</li>
                            </ol>
                        </div>

                        <div class="modal-project__list" v-if="info.achievements">
                            <p class="modal-project__list-title">--- Достижения за время работы:</p>
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
                </div>

                <div class="scroll-project-shadow-next"></div>
            </div>
        </template>

        <div class="scroll-project-scroll modal-project__scrollbar" direction="vertical">
            <div class="scroll-project-thumb modal-project__scrollbar-thumb"></div>
        </div>
    </div>
</template>

<script>
import { DTScroll } from '~/scripts/DTScroll.min'

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

    mounted() {
        let observer = new MutationObserver(mutationRecords => {
            DTScroll.scrollsData['scroll-project'] ? 
                DTScroll.sliderUpdateDeep('scroll-project') :
                DTScroll.initScroll('scroll-project')
        });
        observer.observe(this.$refs.modalProject, {
            childList: true,
            subtree: true,
        })
    },

    methods: {
        getMonthDiff(date1, date2) {
            let dateActual
            if (date2 == 'actual') dateActual = `${new Date().getFullYear()}-${new Date().getMonth()+1}`

            const epoch = Date.parse("1970-01-01T00:00:00.000Z");
            let count = Math.ceil((Date.parse(dateActual ? dateActual : date2) - epoch - Date.parse(date1) - epoch) / (30 * 24 * 60 * 60 * 1000));

            return `${count/12 >= 1 ? Math.floor(count/12) + ' год' : ''} ${count%12} месяцев`
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