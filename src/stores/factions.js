import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '../services/api'

export const useFactionsStore = defineStore(
  'factions',
  () => {
    const factions = ref([])
    const loading = ref(false)
    const error = ref('')

    const fetchFactions = async (conflictId = '') => {
      loading.value = true
      error.value = ''
      try {
        const query = conflictId
          ? `?conflictId=${encodeURIComponent(conflictId)}`
          : ''
        factions.value = await api.get(`/api/v1/factions${query}`)
      } catch (e) {
        error.value = e.message
      } finally {
        loading.value = false
      }
    }

    return {
      factions,
      loading,
      error,
      fetchFactions,
    }
  },
  {
    persist: true,
  },
)
