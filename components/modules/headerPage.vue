<template>
    <div v-if="meta" class="wrapper">
        <header class="header">
            <h1 class="header__title">{{ meta.title }}</h1>
            <p class="header__desc">{{ meta.description }}</p>
        </header>
    </div>
</template>

<script setup>
// Раньше шапка лезла в состояние Vuex по имени маршрута и падала,
// если для страницы там не оказывалось записи
const meta = useCurrentPageMeta()
</script>
