<template>
    <!-- @touchstart="(event) => moveSlideTouch(event)" -->
    <div id="DonTraffic">
        <div class="card card-shadow"></div>

        <cards-cardStart v-if="statusCards.cardStart" />
        <cards-cardMenu v-if="statusCards.cardMenu" />
        <cards-cardSkills v-if="statusCards.cardSkills" />
        <cards-cardProjects v-if="statusCards.cardProjects" />
    </div>
</template>

<script>
export default {
    name: 'DonTraffic',

    computed: {
        statusCards() {
            return this.$store.state.statusCards
        }
	},

    mounted() {
        if (process.client) document.getElementById('DonTraffic').style.height = `${window.innerHeight}px`
    },

    methods: {
        moveSlideTouch(event) {
            let startX = event.touches[0].pageX
            let startY = event.touches[0].pageY
            
            window.ontouchmove = (event) => {
                if(startX + 125 < event.touches[0].pageX) console.log('left');
                if(startX - 125 > event.touches[0].pageX) console.log('right');
                if(startY + 125 < event.touches[0].pageY) console.log('top');
                if(startY - 125 > event.touches[0].pageY) console.log('bottom');
            }; window.ontouchend = () => { window.ontouchmove = null }
        },
    },
}
</script>

<style lang="scss">
    @use "@/assets/style/pages/DonTraffic.scss";
</style>