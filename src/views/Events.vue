<script setup>
import { onMounted, ref } from 'vue'
import { useEventsStore } from '../stores/events'
import CountryFlag from '../components/CountryFlag.vue'

const eventsStore = useEventsStore()
const conflictId = ref('')

const loadEvents = () => {
  eventsStore.fetchEvents(conflictId.value)
}

onMounted(loadEvents)
</script>

<template>
  <section class="panel">
    <h1>Eventos</h1>
    <div class="row">
      <input
        v-model="conflictId"
        type="number"
        min="1"
        placeholder="Filtrar por conflictId"
      />
      <button class="primary" @click="loadEvents">Buscar</button>
    </div>
    <p v-if="eventsStore.loading" class="muted">Cargando eventos...</p>
    <p v-if="eventsStore.error" class="danger">{{ eventsStore.error }}</p>
  </section>

  <section class="panel">
    <div v-if="eventsStore.events.length === 0" class="muted">
      No hay eventos para mostrar.
    </div>
    <div class="list" v-else>
      <article v-for="event in eventsStore.events" :key="event.id" class="panel">
        <h3>{{ event.location }} - {{ event.eventDate }}</h3>
        <p class="muted">{{ event.description }}</p>
        <p>
          <strong>conflictId:</strong> {{ event.conflictId }}
          <span class="muted">({{ event.conflictName }})</span>
          <template v-if="event.countryCodes && event.countryCodes.length">
            <CountryFlag
              v-for="code in event.countryCodes"
              :key="code"
              :code="code"
            />
          </template>
        </p>
      </article>
    </div>
  </section>
</template>