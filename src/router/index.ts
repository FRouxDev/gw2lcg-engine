import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/home/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/new-game',
      name: 'new-game',
      component: () => import('@/views/new-game/NewGame.vue'),
    },
    {
      path: '/game',
      name: 'game-board',
      component: () => import('@/views/game-board/GameBoard.vue'),
    },
    {
      path: '/deck-manager',
      name: 'deck-manager',
      component: () => import('@/views/deck-manager/DeckManager.vue'),
    },
    {
      path: '/admin',
      name: 'admin-home',
      component: () => import('@/views/admin/home/AdminHomeView.vue'),
    },
    {
      path: '/admin/sets-management',
      name: 'sets-management',
      component: () => import('@/views/admin/sets-management/SetsManagementView.vue'),
    },
    {
      path: '/admin/cards-management',
      name: 'cards-management',
      component: () => import('@/views/admin/cards-management/CardsManagementView.vue'),
    },
  ],
});

export default router;
