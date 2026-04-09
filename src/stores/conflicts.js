import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '../services/api'

export const useConflictsStore = defineStore(
  'conflicts',
  () => {
    const conflicts = ref([])
    const selectedConflict = ref(null)
    const loading = ref(false)
    const error = ref('')

    const setError = (value) => {
      error.value = value
    }

    const fetchConflicts = async (status = '') => {
      loading.value = true
      setError('')
      try {
        const query = status ? `?status=${encodeURIComponent(status)}` : ''
        conflicts.value = await api.get(`/conflicts${query}`)
      } catch (e) {
        setError(e.message)
      } finally {
        loading.value = false
      }
    }

    const fetchConflictById = async (id) => {
      loading.value = true
      setError('')
      try {
        selectedConflict.value = await api.get(`/conflicts/${id}`)
      } catch (e) {
        setError(e.message)
      } finally {
        loading.value = false
      }
    }

    const createConflict = async (payload) => {
      setError('')
      const created = await api.post('/conflicts', payload)
      await fetchConflicts()
      return created
    }

    const updateConflict = async (id, payload) => {
      setError('')
      const updated = await api.put(`/conflicts/${id}`, payload)
      await fetchConflictById(id)
      await fetchConflicts()
      return updated
    }

    const deleteConflict = async (id) => {
      setError('')
      await api.delete(`/conflicts/${id}`)
      selectedConflict.value = null
      await fetchConflicts()
    }

    return {
      conflicts,
      selectedConflict,
      loading,
      error,
      fetchConflicts,
      fetchConflictById,
      createConflict,
      updateConflict,
      deleteConflict,
    }
  },
  {
    persist: true,
  },
)