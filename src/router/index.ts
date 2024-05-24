import { createRouter, createWebHistory } from 'vue-router';
import Formulaire from '../views/Formulaire.vue'; 
import Export from '../views/Export.vue'; 
import Stats from '../views/Stats.vue'; 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'formulaire',
      component: Formulaire
    },{
      path: '/export',
      name: 'export',
      component: Export
    },{
      path: '/statistiques',
      name: 'statistiques',
      component: Stats
    }
  ]
})

export default router
