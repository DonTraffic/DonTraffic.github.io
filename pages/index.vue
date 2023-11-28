<template>
    <div id="DonTraffic">
        <div class="card card-shadow"></div>

        <cards-cardStart v-if="statusCards.cardStart" />
        <cards-cardMenu v-if="statusCards.cardMenu" />
        <cards-cardSkills v-if="statusCards.cardSkills" />
        <cards-cardProjects v-if="statusCards.cardProjects" />
        
        <div id="custom-cursor"></div>
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

        let cursor = document.querySelector('#custom-cursor')
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.pageX}px`
            cursor.style.top = `${e.pageY}px`
        })
    }
}
</script>