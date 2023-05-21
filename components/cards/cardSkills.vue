<template>
    <div class="card card-skills card__position-left" id="cardSkills">
        <div class="card__content card-skills__content">
            <p class="card-skills__content-quote">
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
                        <div class="card-skills__content-sea-wave-item card-skills__content-sea-wave-item-js"> JS </div>

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
        />
    </div>
</template>

<script>
import Parallax from 'parallax-js'

export default {
    name: 'cardSkills',

    mounted() {
        if (window.innerWidth > 425) new Parallax(document.querySelector('#scene-sea'))
    },

}

</script>