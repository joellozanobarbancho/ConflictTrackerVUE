<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useConflictsStore } from '../stores/conflicts'

const route = useRoute()
const router = useRouter()
const conflictsStore = useConflictsStore()

const localForm = ref({
  name: '',
  startDate: '',
  status: 'ACTIVE',
  description: '',
  countryCodes: '',
})

const conflictId = computed(() => Number(route.params.id))
const selected = computed(() => conflictsStore.selectedConflict)

const syncForm = () => {
  const conflict = selected.value
  if (!conflict) {
    return
  }

  localForm.value = {
    name: conflict.name ?? '',
    startDate: conflict.startDate ?? '',
    status: conflict.status ?? 'ACTIVE',
    description: conflict.description ?? '',
    countryCodes: (conflict.countries ?? [])
      .map((country) => country.code)
      .join(','),
  }
}

const loadDetail = async () => {
  await conflictsStore.fetchConflictById(conflictId.value)
  syncForm()
}

const toPayload = () => ({
  name: localForm.value.name,
  startDate: localForm.value.startDate,
  status: localForm.value.status,
  description: localForm.value.description,
  countryCodes: localForm.value.countryCodes
    .split(',')
    .map((code) => code.trim())
    .filter(Boolean),
})

const updateConflict = async () => {
  await conflictsStore.updateConflict(conflictId.value, toPayload())
  syncForm()
}

const removeConflict = async () => {
  await conflictsStore.deleteConflict(conflictId.value)
  router.push('/conflicts')
}

watch(selected, syncForm)
onMounted(loadDetail)
</script>

<template>
  <section class="panel">
    <h1>Detalle de conflicto #{{ conflictId }}</h1>
    <p v-if="conflictsStore.loading" class="muted">Cargando detalle...</p>
    <p v-if="conflictsStore.error" class="danger">{{ conflictsStore.error }}</p>
    <p v-if="!selected && !conflictsStore.loading" class="muted">
      No se encontró el conflicto.
    </p>
  </section>

  <section v-if="selected" class="grid-2">
    <article class="panel">
      <h2>Editar</h2>
      <form @submit.prevent="updateConflict">
        <input v-model="localForm.name" placeholder="Nombre" required />
        <input v-model="localForm.startDate" type="date" required />
        <select v-model="localForm.status" required>
          <option value="ACTIVE">ACTIVE</option>
          <option value="FROZEN">FROZEN</option>
          <option value="ENDED">ENDED</option>
        </select>
        <textarea v-model="localForm.description" placeholder="Descripción" required />
        <input
          v-model="localForm.countryCodes"
          placeholder="Códigos países (ej: ESP,FRA,DEU)"
        />
        <div class="actions">
          <button class="primary" type="submit">Actualizar</button>
          <button type="button" @click="removeConflict">Eliminar</button>
        </div>
      </form>
    </article>

    <article class="panel">
      <h2>Relaciones</h2>
      <p><strong>Facciones:</strong> {{ selected.factions?.length ?? 0 }}</p>
      <p><strong>Eventos:</strong> {{ selected.events?.length ?? 0 }}</p>
      <p class="muted">
        Países: {{ (selected.countries ?? []).map((c) => c.code).join(', ') || 'Sin países' }}
      </p>
      <div class="actions">
        <RouterLink to="/conflicts">Volver a conflictos</RouterLink>
      </div>
    </article>
  </section>
</template>