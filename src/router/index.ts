import DeckManager from "@/views/deck-manager/DeckManager.vue";
import GameBoard from "@/views/game-board/GameBoard.vue";
import NewGame from "@/views/new-game/NewGame.vue";
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/home/HomeView.vue";

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
