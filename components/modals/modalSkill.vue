<template>
    <div class="modal modal-skill" :class="{'modal--show': activeSkill}">
        <div class="modal__close" @click="$emit('closeModal')">
            <svg class="modal__close-icon">
                <use xlink:href="@/assets/svg/sprite.svg#close"></use>
            </svg>
        </div>

        <template v-if="activeSkill">
            <h2 class="modal-skill__title">Язык: {{ activeSkill }}</h2>

            <div class="modal-skill__content">
                <div class="modal-skill__lists">
                    <div class="modal-skill__lists-item" v-if="info[activeSkill]['courses']">
                        <h3 class="modal-skill__lists-title">Курсы:</h3>
                        <ul class="modal-skill__lists-list">
                            <li
                                class="modal-skill__lists-list-item"
                                v-for="item in info[activeSkill]['courses']" 
                                :key="item.title"
                            ><a :href="item.url">{{ item.title }}</a></li>
                        </ul>

                    </div>

                    <div class="modal-skill__lists-item" v-if="info[activeSkill]['tests']">
                        <h3 class="modal-skill__lists-title">Пройденные тесты:</h3>
                        <ul class="modal-skill__lists-list">
                            <li
                                class="modal-skill__lists-list-item"
                                v-for="item in info[activeSkill]['tests']" 
                                :key="item.title"
                            ><a :href="item.url">{{ item.title }}</a></li>
                        </ul>
                    </div>

                    <div class="modal-skill__lists-item" v-if="info[activeSkill]['recommendations']">
                        <h3 class="modal-skill__lists-title">Рекомендации:</h3>
                        <ul class="modal-skill__lists-list">
                            <li
                                class="modal-skill__lists-list-item"
                                v-for="item in info[activeSkill]['recommendations']" 
                                :key="item.title"
                            ><a :href="item.url">{{ item.title }}</a></li>
                        </ul>
                    </div>
                </div>

                <div class="modal-skill__info">
                    <img
                        class="modal-skill__info-img"
                        :src="'/svg/skills/' + activeSkill + '.svg'"
                        :alt="activeSkill + '.svg'"
                    >
                    <p class="modal-skill__info-text">Опыт <br/> {{ info[activeSkill]['experience'] }} </p>
                </div>
            </div>

            <a class="modal-skill__example" :href="info[activeSkill]['example']">Пример</a>
        </template>
    </div>
</template>

<script>
export default {
    name: 'modal-skill',

    props: {
        activeSkill: String,
        info: Object
    },
}
</script>