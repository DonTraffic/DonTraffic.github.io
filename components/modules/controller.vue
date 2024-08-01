<template>
    <div 
        class="controller" 
        :class="{'controller--hide': controllerHide}" 
        :id="`controller-${parentId}`"
    >
        <div
            v-for="(controller, index) in controllers" :key="`controller--${index}`"
            :class="`controller__btn-container controller__btn--${index}`"
            @click="moveSlide(index, controller)"
        >
            <button class="controller__btn">
                <svg class="controller__btn-svg">
                    <use xlink:href="@/assets/svg/sprite.svg#arrow"></use>
                </svg>
            </button>
        </div>
    </div>
</template>

<script setup>
import { useStore } from 'vuex'

const props = defineProps({
    parentId: String,
    controllers: Object,
    controllerHide: Boolean,
})

const store = useStore()

const moveSlide = (type, id) => {
    const card = document.querySelector(`#${id}`)
    let status = false

    if (card.classList.contains(`card--position-${type}`)) {
        card.classList.remove(`card--position-${type}`)
        document.querySelector(`#controller-${props.parentId}`)
            .classList.add('controller--hide')
        status = true
    }

    if (!status) {
        document.querySelector(`#${props.parentId}`)
            .classList.add(`card--position-${reverseType(type)}`)
        document.querySelector(`#controller-${id}`)
            .classList.remove('controller--hide')
    }

    store.commit('changeActiveCard', id)
};

const reverseType = (type) => {
    if (type == 'left') return 'right'
    if (type == 'right') return 'left'
    if (type == 'top') return 'bottom'
    if (type == 'bottom') return 'top'
};
</script>