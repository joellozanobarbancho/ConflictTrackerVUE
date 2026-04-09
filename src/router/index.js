import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Conflicts from '../views/Conflicts.vue'
import ConflictDetail from '../views/ConflictDetail.vue'
import Events from '../views/Events.vue'
import Factions from '../views/Factions.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/conflicts',
      name: 'conflicts',
      component: Conflicts,
    },
    {
      path: '/conflicts/:id',
      name: 'conflict-detail',
      component: ConflictDetail,
      props: true,
    },
    {
      path: '/events',
      name: 'events',
      component: Events,
    },
    {
      path: '/factions',
      name: 'factions',
      component: Factions,
    },
  ],
})

export default router