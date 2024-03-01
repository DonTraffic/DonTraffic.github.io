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
        // let cursor = this.$refs['custom-cursor']
        // document.addEventListener('mousemove', (e) => {
        //     console.log(e);
        //     cursor.style.left = `${e.pageX}px`
        //     cursor.style.top = `${e.pageY}px`
        // })
    },

    setup() {
        const route = useRoute()
        const pageSEO = useStore().state.pageData[route.name]

        useHead({
            title: pageSEO.title,
            meta: [
                {
                    name: 'description',
                    content: pageSEO.description
                },
                {
                    name: 'keywords',
                    content: pageSEO.keywords
                },
            ]
        })
    }
}
</script>