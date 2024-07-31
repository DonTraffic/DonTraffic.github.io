<template>
    <header class="header wrapper">
        <h1 class="header__title">{{ store.state.pageData[route.name].title }}</h1>
        <h2 class="header__desc">{{ store.state.pageData[route.name].description }}</h2>
    </header>
</template>

<script setup>
    import { useStore } from 'vuex';
    import { useRoute } from 'vue-router';

    const store = useStore();
    const route = useRoute();
</script>