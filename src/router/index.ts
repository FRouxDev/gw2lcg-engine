import CardsManagementView from '@/views/admin/cards-management/CardsManagementView.vue';
import AdminHomeView from '@/views/admin/home/AdminHomeView.vue';
import SetsManagementView from '@/views/admin/sets-management/SetsManagementView.vue';
import DeckManager from '@/views/deck-manager/DeckManager.vue';
import GameBoard from '@/views/game-board/GameBoard.vue';
import NewGame from '@/views/new-game/NewGame.vue';
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
      component: NewGame,
    },
    {
      path: '/game',
      name: 'game-board',
      component: GameBoard,
    },
    {
      path: '/deck-manager',
      name: 'deck-manager',
      component: DeckManager,
    },
    {
      path: '/admin',
      name: 'admin-home',
      component: AdminHomeView,
    },
    {
      path: '/admin/sets-management',
      name: 'sets-management',
      component: SetsManagementView,
    },
    {
      path: '/admin/cards-management',
      name: 'cards-management',
      component: CardsManagementView,
    },
  ],
});

export default router;
