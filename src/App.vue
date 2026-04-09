<script setup>
import HeaderComponent from './components/HeaderComponent.vue'
</script>

<template>
  <div class="app-shell">
    <HeaderComponent />
    <main class="page-content">
      <RouterView />
    </main>
  </div>
</template>
