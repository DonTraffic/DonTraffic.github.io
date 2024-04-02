<template>
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
    }
}
</script>

<style lang="scss">
    @use "@/assets/style/pages/DonTraffic.scss";
</style>