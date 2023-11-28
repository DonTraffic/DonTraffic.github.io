<template>
    <div class="card card-menu card__position-bottom" id="cardMenu" ref="cardMenu">
        <div class="card__content card-menu__content">
            <p class="text-shadow">я Middle Frontend <br/> разработчик</p>
            <p class="text-shadow">меня зовут <br/> Уханов Дмитрий</p>
            <div class="card-menu__content-btns">
                <a href="https://t.me/DonTraffic" target="_blank">
                    <svg>
                        <use xlink:href="~/assets/svg/sprite.svg#telegram"></use>
                    </svg>
                </a>

                <a href="https://vologda.hh.ru/resume/c1497482ff0b662b500039ed1f4a6e78766c69" target="_blank">
                    hh.ru
                </a>

                <a href="tel:+79210638647" target="_blank">
                    <svg>
                        <use xlink:href="~/assets/svg/sprite.svg#phone"></use>
                    </svg>
                </a>
            </div>
        </div>

        <div class="card__background card-menu__background">
            <svg class="card-menu__background-lake">
                <use xlink:href="~/assets/svg/sprite.svg#lake"></use>
            </svg>
            <svg class="card-menu__background-stone">
                <use xlink:href="~/assets/svg/sprite.svg#stone"></use>
            </svg>
            <svg class="card-menu__background-boat">
                <use xlink:href="~/assets/svg/sprite.svg#boat"></use>
            </svg>

            <div class="card-menu__background-sun icon-sun"></div>

            <img src="~/assets/img/sakura.png" alt="sakura" class="card-menu__background-tree">
        </div>

        <controller
            parentId="cardMenu"
            :controllers="{
                left: 'cardSkills',
                right: 'cardProjects'
            }"
        />
    </div>
</template>

<script>
export default {
    name: 'cardMenu',
}
</script>