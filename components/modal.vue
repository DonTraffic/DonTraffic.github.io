<template>
    <div class="modal" :class="{'modal--show': activeSkill}">
        <div class="modal__close" @click="$emit('closeModal')">
            <svg class="modal__close-icon">
                <use xlink:href="~/assets/svg/sprite.svg#close"></use>
            </svg>
        </div>

        <template v-if="activeSkill">
            <h2 class="modal__title">Язык: {{ activeSkill }}</h2>

            <div class="modal__content">
                <div class="modal__lists">
                    <div class="modal__lists-item">
                        <h3 class="modal__lists-title">Курсы:</h3>
                        <ul class="modal__lists-list">
                            <li
                                class="modal__lists-list-item"
                                v-for="item in info['courses']" 
                                :key="item.title"
                            ><a :href="item.url">{{ item.title }}</a></li>
                        </ul>

                    </div>

                    <div class="modal__lists-item">
                        <h3 class="modal__lists-title">Пройденные тесты:</h3>
                        <ul class="modal__lists-list">
                            <li
                                class="modal__lists-list-item"
                                v-for="item in info['tests']" 
                                :key="item.title"
                            ><a :href="item.url">{{ item.title }}</a></li>
                        </ul>
                    </div>

                    <div class="modal__lists-item">
                        <h3 class="modal__lists-title">Рекомендации:</h3>
                        <ul class="modal__lists-list">
                            <li
                                class="modal__lists-list-item"
                                v-for="item in info['recommendations']" 
                                :key="item.title"
                            ><a :href="item.url">{{ item.title }}</a></li>
                        </ul>
                    </div>
                </div>

                <div class="modal__info">
                    <img
                        class="modal__info-img"
                        :src="'_nuxt/assets/svg/' + activeSkill + '.svg'"
                        :alt="activeSkill + '.svg'"
                    >
                    <p class="modal__info-text">Опыт <br/> {{ info['experience'] }} </p>
                </div>
            </div>

            <a class="modal__example" :href="info['example']">Пример</a>
        </template>
    </div>
</template>

<script>
export default {
    name: 'modal',

    props: {
        activeSkill: String,
        info: Object
    },

    methods: {
        closeDialog() {
            
        }
    }
}
</script>