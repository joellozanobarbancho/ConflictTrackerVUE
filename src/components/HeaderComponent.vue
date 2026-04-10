<template>
  <header class="top-nav">
    <nav>
      <strong>{{ $t('header.app') }}</strong>
      <RouterLink to="/">{{ $t('header.home') }}</RouterLink>
      <RouterLink to="/conflicts">{{ $t('header.conflicts') }}</RouterLink>
      <RouterLink to="/events">{{ $t('header.events') }}</RouterLink>
      <RouterLink to="/factions">{{ $t('header.factions') }}</RouterLink>
      <select v-model="$i18n.locale" style="margin-left:auto;">
        <option value="ca">Català</option>
        <option value="en">English</option>
      </select>
    </nav>
  </header>
</template>