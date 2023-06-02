<template>
    <div class="controller" :class="{'controller-hide': controllerHide}" :id="`controller-${parentId}`">
        <div
            v-for="(controller, index) in controllers" :key="`controller-${index}`"
            :class="`controller__btn-container controller__btn-${index}`"
            @click="moveSlide(index, controller)"
        >
            <button class="controller__btn">
                <svg class="controller__btn-svg">
                    <use xlink:href="~/assets/svg/sprite.svg#arrow"></use>
                </svg>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'controller',

    props: {
        parentId: String,
        controllers: Object,
        controllerHide: Boolean,
    },

    methods: {
        moveSlide(type, id) {
            let status = false

            let card = document.querySelector(`#${id}`)
            let parent = document.querySelector(`#${this.parentId}`)

            for (let i = 0; i < card.classList.length; i++) {
                if (card.classList[i] == `card__position-${type}`) {
                    card.classList.remove(`card__position-${type}`)
                    document.querySelector(`#controller-${this.parentId}`)
                        .classList.add('controller-hide')
                    status = true
                }
                
            }

            if (!status) {
                parent.classList.add(`card__position-${this.reverseType(type)}`)
                document.querySelector(`#controller-${id}`)
                    .classList.remove('controller-hide')
            }



        },

        reverseType(type) {
            if (type == 'left') return 'right'
            if (type == 'right') return 'left'
            if (type == 'top') return 'bottom'
            if (type == 'bottom') return 'top'
        },
    }
}
</script>