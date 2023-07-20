<script setup>
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutFixed from './components/LayoutFixed.vue'

// 获取导航列表
import { onMounted } from 'vue'
import { useCategoryStore } from '@/stores/categoryStore'

const categoryStore = useCategoryStore()

onMounted(() => categoryStore.getCategory())

</script>

<template>
  <LayoutNav />
  <LayoutHeader />
  <RouterView />
  <LayoutFooter />
  <LayoutFixed />
</template>

<style lang="scss" scoped>

</style>