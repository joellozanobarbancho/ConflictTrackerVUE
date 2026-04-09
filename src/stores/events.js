import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '../services/api'

export const useEventsStore = defineStore(
  'events',
  () => {
    const events = ref([])
    const loading = ref(false)
    const error = ref('')

    const fetchEvents = async (conflictId = '') => {
      loading.value = true
      error.value = ''
      try {
        const query = conflictId
          ? `?conflictId=${encodeURIComponent(conflictId)}`
          : ''
        events.value = await api.get(`/events${query}`)
      } catch (e) {
        error.value = e.message
      } finally {
        loading.value = false
      }
    }

    return {
      events,
      loading,
      error,
      fetchEvents,
    }
  },
  {
    persist: true,
  },
)
