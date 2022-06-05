import DeckManager from "@/views/DeckManager.vue";
import GameBoard from "@/views/GameBoard.vue";
import NewGame from "@/views/NewGame.vue";
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/new-game",
      name: "new-game",
      component: NewGame,
    },
    {
      path: "/game",
      name: "game-board",
      component: GameBoard,
    },
    {
      path: "/deck-manager",
      name: "deck-manager",
      component: DeckManager,
    },
  ],
});

export default router;
