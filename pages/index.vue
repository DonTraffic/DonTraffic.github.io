<template>
    <div id="DonTraffic">
        <div class="card card-shadow"></div>

        <cards-cardStart />
        <cards-cardMenu />
        <cards-cardSkills />
        
    </div>
</template>

<script>
export default {
    name: 'DonTraffic',

    mounted() {
        if (process.client) document.getElementById('DonTraffic').style.height = `${window.innerHeight}px`
    }
}
</script>