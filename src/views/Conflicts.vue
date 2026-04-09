<script setup>
import { onMounted, ref } from 'vue'
import { useConflictsStore } from '../stores/conflicts'

const conflictsStore = useConflictsStore()

const statusFilter = ref('')
const form = ref({
  name: '',
  startDate: '',
  status: 'ACTIVE',
  description: '',
  countryCodes: '',
})

const toPayload = () => ({
  name: form.value.name,
  startDate: form.value.startDate,
  status: form.value.status,
  description: form.value.description,
  countryCodes: form.value.countryCodes
    .split(',')
    .map((code) => code.trim())
    .filter(Boolean),
})

const loadConflicts = () => {
  conflictsStore.fetchConflicts(statusFilter.value)
}

const createConflict = async () => {
  try {
    await conflictsStore.createConflict(toPayload())
    form.value = {
      name: '',
      startDate: '',
      status: 'ACTIVE',
      description: '',
      countryCodes: '',
    }
  } catch (e) {
    console.error(e)
  }
}

onMounted(loadConflicts)
</script>

<template>
  <section class="panel">
    <h1>Conflictos</h1>
    <div class="row">
      <label for="status">Filtrar por estado</label>
      <select id="status" v-model="statusFilter">
        <option value="">Todos</option>
        <option value="ACTIVE">ACTIVE</option>
        <option value="FROZEN">FROZEN</option>
        <option value="ENDED">ENDED</option>
      </select>
      <button class="primary" @click="loadConflicts">Aplicar</button>
    </div>
    <p v-if="conflictsStore.loading" class="muted">Cargando conflictos...</p>
    <p v-if="conflictsStore.error" class="danger">{{ conflictsStore.error }}</p>
  </section>

  <section class="panel">
    <h2>Crear conflicto</h2>
    <form @submit.prevent="createConflict">
      <input v-model="form.name" placeholder="Nombre" required />
      <input v-model="form.startDate" type="date" required />
      <select v-model="form.status" required>
        <option value="ACTIVE">ACTIVE</option>
        <option value="FROZEN">FROZEN</option>
        <option value="ENDED">ENDED</option>
      </select>
      <textarea v-model="form.description" placeholder="Descripción" required />
      <input
        v-model="form.countryCodes"
        placeholder="Códigos países (ej: ESP,FRA,DEU)"
      />
      <div class="actions">
        <button class="primary" type="submit">Guardar</button>
      </div>
    </form>
  </section>

  <section class="panel">
    <h2>Listado</h2>
    <div v-if="conflictsStore.conflicts.length === 0" class="muted">
      No hay conflictos para mostrar.
    </div>
    <div class="list" v-else>
      <article v-for="conflict in conflictsStore.conflicts" :key="conflict.id" class="panel">
        <h3>{{ conflict.name }}</h3>
        <p>
          <strong>Estado:</strong> {{ conflict.status }} |
          <strong>Inicio:</strong> {{ conflict.startDate }}
        </p>
        <p class="muted">{{ conflict.description }}</p>
        <p class="muted">
          Países: {{ conflict.countryCodes?.join(', ') || 'Sin países' }}
        </p>
        <div class="actions">
          <RouterLink :to="`/conflicts/${conflict.id}`">Ver detalle</RouterLink>
        </div>
      </article>
    </div>
  </section>
</template>