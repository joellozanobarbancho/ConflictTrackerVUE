<script setup>
import { api } from '../services/api'
</script>

<template>
  <section class="panel">
    <h1>{{ $t('home.title') }}</h1>
    <p class="muted">
      {{ $t('home.subtitle') }}
    </p>
    <div class="actions">
      <RouterLink to="/conflicts">{{ $t('home.go_conflicts') }}</RouterLink>
      <RouterLink to="/events">{{ $t('home.go_events') }}</RouterLink>
      <RouterLink to="/factions">{{ $t('home.go_factions') }}</RouterLink>
    </div>
  </section>

  <section class="panel">
    <h2>{{ $t('home.api_config') }}</h2>
    <p>
      {{ $t('home.base_url') }} <strong>{{ api.baseUrl }}</strong>
    </p>
    <p class="muted">
      {{ $t('home.change_with') }} <strong>VITE_API_BASE_URL</strong>.
    </p>
  </section>
</template>