
<script setup>
import { onMounted, ref, computed } from 'vue'
const searchText = ref("")

// Filtrado reactivo por nombre
const filteredConflicts = computed(() => {
  const text = searchText.value.trim().toLowerCase()
  if (!text) return conflictsStore.conflicts
  return conflictsStore.conflicts.filter(c =>
    c.name?.toLowerCase().includes(text)
  )
})
import { useConflictsStore } from '../stores/conflicts'
import CountryFlag from '../components/CountryFlag.vue'


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
    <h1>{{ $t('conflicts.title') }}</h1>
    <div class="row">
      <label for="status">{{ $t('conflicts.filter_status') }}</label>
      <select id="status" v-model="statusFilter">
        <option value="">{{ $t('conflicts.filter_all') }}</option>
        <option value="ACTIVE">ACTIVE</option>
        <option value="FROZEN">FROZEN</option>
        <option value="ENDED">ENDED</option>
      </select>
      <button class="primary" @click="loadConflicts">{{ $t('conflicts.apply') }}</button>
      <input
        v-model="searchText"
        :placeholder="$t('conflicts.filter_placeholder')"
        style="max-width:220px"
        type="text"
      />
    </div>
    <p v-if="conflictsStore.loading" class="muted">{{ $t('common.loading') }}</p>
    <p v-if="conflictsStore.error" class="danger">{{ conflictsStore.error }}</p>
  </section>

  <section class="panel">
    <h2>{{ $t('conflicts.create_title') }}</h2>
    <form @submit.prevent="createConflict">
      <input v-model="form.name" :placeholder="$t('conflicts.name')" required />
      <input v-model="form.startDate" type="date" required />
      <select v-model="form.status" required>
        <option value="ACTIVE">ACTIVE</option>
        <option value="FROZEN">FROZEN</option>
        <option value="ENDED">ENDED</option>
      </select>
      <textarea v-model="form.description" :placeholder="$t('conflicts.description')" required />
      <input
        v-model="form.countryCodes"
        :placeholder="$t('conflicts.countries_placeholder')"
      />
      <div class="actions">
        <button class="primary" type="submit">{{ $t('conflicts.save') }}</button>
      </div>
    </form>
  </section>

  <section class="panel">
    <h2>{{ $t('conflicts.actions') }}</h2>
    <div v-if="filteredConflicts.length === 0" class="muted">
      {{ $t('conflicts.no_conflicts') }}
    </div>
    <div class="list" v-else>
      <article v-for="conflict in filteredConflicts" :key="conflict.id" class="panel" style="display:flex;align-items:flex-start;gap:1.5em;">
        <div style="flex:1 1 0;min-width:0;">
          <h3>{{ conflict.name }}</h3>
          <p>
            <strong>{{ $t('conflicts.status') }}: </strong>
            <span
              class="status"
              :class="{
                'status-active': conflict.status === 'ACTIVE',
                'status-frozen': conflict.status === 'FROZEN',
                'status-ended': conflict.status === 'ENDED',
              }"
              :title="conflict.status"
            >
              {{ conflict.status }}
            </span> 
            |
            <strong>{{ $t('conflicts.start') }}:</strong> {{ conflict.startDate }}
          </p>
          <p class="muted">{{ conflict.description }}</p>
          <p class="muted">
            {{ $t('conflicts.countries') }}:
            <template v-if="conflict.countryCodes && conflict.countryCodes.length">
              <CountryFlag
                v-for="code in conflict.countryCodes"
                :key="code"
                :code="code"
              />
            </template>
            <template v-else>
              {{ $t('conflicts.no_countries') }}
            </template>
          </p>
          <div class="actions">
            <RouterLink :to="`/conflicts/${conflict.id}`">{{ $t('conflicts.detail') }}</RouterLink>
          </div>
        </div>

      </article>
    </div>
  </section>
</template>