<script setup>
import { onMounted, ref, computed } from 'vue'
import { useFactionsStore } from '../stores/factions'
import CountryFlag from '../components/CountryFlag.vue'

const factionsStore = useFactionsStore()
const searchText = ref("")

const filteredFactions = computed(() => {
  const text = searchText.value.trim().toLowerCase()
  if (!text) return factionsStore.factions
  return factionsStore.factions.filter(f =>
    f.name?.toLowerCase().includes(text)
  )
})

const loadFactions = () => {
  factionsStore.fetchFactions()
}

onMounted(loadFactions)
</script>

<template>
  <section class="panel">
    <h1>{{ $t('factions.title') }}</h1>
    <div class="row">
      <input
        v-model="searchText"
        type="text"
        :placeholder="$t('factions.filter_placeholder')"
        style="max-width:220px"
      />
    </div>
    <p v-if="factionsStore.loading" class="muted">{{ $t('common.loading') }}</p>
    <p v-if="factionsStore.error" class="danger">{{ factionsStore.error }}</p>
  </section>

  <section class="panel">
    <div v-if="!factionsStore.factions?.length" class="muted">
      {{ $t('common.no_data') }}
    </div>
    <div class="list" v-else>
      <article v-for="faction in filteredFactions" :key="faction.id" class="panel">
        <h3>{{ faction.name }}</h3>
        <p>
          <strong>conflictId:</strong> {{ faction.conflictId }}
          <span class="muted">({{ faction.conflictName }})</span>
        </p>
        <p class="muted">
          {{ $t('common.supported_countries') }}
          <template v-if="faction?.supporterCountryCodes?.length">
            <CountryFlag
              v-for="code in faction.supporterCountryCodes"
              :key="code"
              :code="code"
            />
          </template>
          <template v-else>
            {{ $t('common.no_data_short') }}
          </template>
        </p>
      </article>
    </div>
  </section>
</template>