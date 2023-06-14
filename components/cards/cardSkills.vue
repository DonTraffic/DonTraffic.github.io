<template>
    <div class="card card-skills card__position-left" id="cardSkills">
        <div class="card__content card-skills__content">
            <p class="card-skills__content-quote text-shadow">
                Аналогично тому, как написание картины является искусством для души, 
                так и написание программы является искусством для разума.
                
                <i class="card-skills__content-quote-author">- Volnik -</i>
            </p>

            <div class="card-skills__content-sea" id="scene-sea">
                <div class="card-skills__content-sea-wave-move" data-depth="0.2">
                    <div class="card-skills__content-sea-wave card-skills__content-sea-wave-1">
                        <svg class="card-skills__content-sea-wave-icon">
                            <use xlink:href="~/assets/svg/sprite.svg#wave"></use>
                        </svg>
                    </div>

                    <div class="card-skills__content-sea-wave card-skills__content-sea-wave-2">
                        <div
                            class="card-skills__content-sea-wave-item card-skills__content-sea-wave-item-js"
                            v-on:click="openDialog('JavaScript')"
                        > JS </div>

                        <svg class="card-skills__content-sea-wave-icon">
                            <use xlink:href="~/assets/svg/sprite.svg#wave"></use>
                        </svg>
                    </div>

                    <div class="card-skills__content-sea-wave card-skills__content-sea-wave-3">
                        <svg class="card-skills__content-sea-wave-icon">
                            <use xlink:href="~/assets/svg/sprite.svg#wave"></use>
                        </svg>
                    </div>

                    <div class="card-skills__content-sea-wave card-skills__content-sea-wave-4">
                        <svg class="card-skills__content-sea-wave-icon">
                            <use xlink:href="~/assets/svg/sprite.svg#wave"></use>
                        </svg>
                    </div>

                    <div class="card-skills__content-sea-wave card-skills__content-sea-wave-5">
                        <svg class="card-skills__content-sea-wave-icon">
                            <use xlink:href="~/assets/svg/sprite.svg#wave"></use>
                        </svg>
                    </div>

                    <div class="card-skills__content-sea-wave card-skills__content-sea-wave-6">
                        <svg class="card-skills__content-sea-wave-icon">
                            <use xlink:href="~/assets/svg/sprite.svg#wave"></use>
                        </svg>
                    </div>
                </div>
                
            </div>
            

        </div>

        <div class="card__background card-skills__background">
            <div class="card-skills__background-sun icon-sun"></div>
        </div>

        <controller
            parentId="cardSkills"
            :controllers="{
                right: 'cardMenu',
            }"
            :controllerHide="controllerHide"
        />

        <modal
            :activeSkill="activeSkill"
            :info="infoSkills[activeSkill]"
            @closeModal="closeModal"
        />
        
    </div>
</template>

<script>
import Parallax from 'parallax-js'

export default {
    name: 'cardSkills',

    computed: {
        activeCard() {
            return this.$store.state.activeCard
        }
	},

    watch: {
        activeCard() {
            window.innerWidth > 425 && this.activeCard == 'cardSkills' ? 
                this.parallax.enable() : 
                this.parallax.disable() ;
        }
    },

    data() {
        return{
            activeSkill: '',
            controllerHide: false,

            infoSkills: {
                'JavaScript': {
                    'experience': 'Больше 2х лет',
                    'example': 'link',

                    'courses': {
                        0: {
                            title: '«Продвинутый курс JavaScript»',
                            url: 'https://gb.ru/certificates/2183847?7d5959fd53c11adb9fc8ab88269d3ea3'
                        },
                        1: {
                            title: '«Профессиональная вёрстка»',
                            url: 'https://gb.ru/certificates/1093227?26800bfbac76f0865cff8b768767d415'
                        },
                    },
                    'tests': {
                        0: {
                            title: '«JavaScript. Сложный уровень»',
                            url: 'https://gb.ru/certificates/2185392?13da3644a25fd7f9af1bbe9255e31af5'
                        },
                    },
                    'recommendations': {
                        0: {
                            title: 'Компания «xseven»',
                            url: '_nuxt/assets/files/xseven.pdf'
                        }
                    },

                },
            },

            parallax: '',
        }
    },

    mounted() {
        if (window.innerWidth > 425) setTimeout( () => { 
            this.parallax = new Parallax(document.querySelector('#scene-sea')) 
            this.parallax.disable()
        }, 1000)
    },

    beforeDestroy() {
        this.parallax.disable();
    },

    methods: {
        openDialog(language) {
            this.activeSkill = language
            this.controllerHide = true
        },

        closeModal() {
            this.activeSkill = ''
            this.controllerHide = false
        }
    }

}

</script>