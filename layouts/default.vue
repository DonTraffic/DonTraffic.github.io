<template>
    <div id="app">
        <modules-headerPage v-if="$store.state.pageData[$route.name].settings.header"/>
        <slot />

        <div id="custom-cursor" ref="custom-cursor"></div>
    </div>
</template>

<script>
import { useStore } from 'vuex'

export default {
    name: 'app',

    mounted() {
        let cursor = this.$refs['custom-cursor']
        document.addEventListener('mousemove', (e) => {
            console.log(e);
            cursor.style.left = `${e.pageX}px`
            cursor.style.top = `${e.pageY}px`
        })
    },

    setup() {
        const route = useRoute()
        const pageSEO = useStore().state.pageData[route.name]

        useHead({
            title: pageSEO.title,
            meta: [
                { name: 'keywords', content: pageSEO.keywords },
                { charset: "utf-8" },
                { name: "viewport", content: "width=device-width, initial-scale=1" },
                { property: "og:title", content: pageSEO.title, },
                { property: "og:url", content: `https://dontraffic.ru${route.name != 'index' ? '/' + route.name : ''}` },
                { name: 'description', content: pageSEO.description },
                { property: "og:description", content: pageSEO.description },
                { property: "og:image", content: 'https://dontraffic.ru/images/wallpapperLink.jpg', }
            ]
        })
    }
}
</script>