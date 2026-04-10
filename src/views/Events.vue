<script setup>
import { onMounted, ref, computed } from 'vue'
import { useEventsStore } from '../stores/events'
import CountryFlag from '../components/CountryFlag.vue'

const eventsStore = useEventsStore()
const searchText = ref("")

const filteredEvents = computed(() => {
  const text = searchText.value.trim().toLowerCase()
  if (!text) return eventsStore.events
  return eventsStore.events.filter(e =>
    (e.conflictName?.toLowerCase().includes(text) ||
     e.location?.toLowerCase().includes(text) ||
     e.description?.toLowerCase().includes(text))
  )
})

const loadEvents = () => {
  eventsStore.fetchEvents()
}

onMounted(loadEvents)
</script>

<template>
  <section class="panel">
    <h1>{{ $t('events.title') }}</h1>
    <div class="row">
      <input
        v-model="searchText"
        type="text"
        :placeholder="$t('events.filter_placeholder')"
        style="max-width:220px"
      />
    </div>
    <p v-if="eventsStore.loading" class="muted">{{ $t('common.loading') }}</p>
    <p v-if="eventsStore.error" class="danger">{{ eventsStore.error }}</p>
  </section>

  <section class="panel">
    <div v-if="eventsStore.events.length === 0" class="muted">
      {{ $t('common.no_data') }}
    </div>
    <div class="list" v-else>
      <article v-for="event in filteredEvents" :key="event.id" class="panel">
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