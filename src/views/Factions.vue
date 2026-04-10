<script setup>
import { onMounted, ref } from 'vue'
import { useFactionsStore } from '../stores/factions'
import CountryFlag from '../components/CountryFlag.vue'

const factionsStore = useFactionsStore()
const conflictId = ref('')

const loadFactions = () => {
  factionsStore.fetchFactions(conflictId.value)
}

onMounted(loadFactions)
</script>

<template>
  <section class="panel">
    <h1>Facciones</h1>
    <div class="row">
      <input
        v-model="conflictId"
        type="number"
        min="1"
        placeholder="Filtrar por conflictId"
      />
      <button class="primary" @click="loadFactions">Buscar</button>
    </div>
    <p v-if="factionsStore.loading" class="muted">Cargando facciones...</p>
    <p v-if="factionsStore.error" class="danger">{{ factionsStore.error }}</p>
  </section>

  <section class="panel">
    <div v-if="factionsStore.factions.length === 0" class="muted">
      No hay facciones para mostrar.
    </div>
    <div class="list" v-else>
      <article v-for="faction in factionsStore.factions" :key="faction.id" class="panel">
        <h3>{{ faction.name }}</h3>
        <p>
          <strong>conflictId:</strong> {{ faction.conflictId }}
          <span class="muted">({{ faction.conflictName }})</span>
        </p>
        <p class="muted">
          Soporte países:
          <template v-if="faction.supporterCountryCodes && faction.supporterCountryCodes.length">
            <CountryFlag
              v-for="code in faction.supporterCountryCodes"
              :key="code"
              :code="code"
            />
          </template>
          <template v-else>
            Sin datos
          </template>
        </p>
      </article>
    </div>
  </section>
</template>