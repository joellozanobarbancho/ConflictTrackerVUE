<script setup>
import { api } from '../services/api'
</script>

<template>
  <section class="panel">
    <h1>ConflictTracker Frontend</h1>
    <p class="muted">
      Frontend separado del backend, preparado para consumir tu API REST.
    </p>
    <div class="actions">
      <RouterLink to="/conflicts">Ir a conflictos</RouterLink>
      <RouterLink to="/events">Ir a eventos</RouterLink>
      <RouterLink to="/factions">Ir a facciones</RouterLink>
    </div>
  </section>

  <section class="panel">
    <h2>Configuración API</h2>
    <p>
      Base URL actual: <strong>{{ api.baseUrl }}</strong>
    </p>
    <p class="muted">
      Puedes cambiarla con <strong>VITE_API_BASE_URL</strong>.
    </p>
  </section>
</template>