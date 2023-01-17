<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';

interface User {
  firstName: string;
  lastName: string;
  password: string;
  favoriteChampion: string;
}

const passwordRegExp = /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;

const champions = ['Teemo', 'Soraka', 'Urgot'];

const validateForm = async (): Promise<boolean> => {
  if (
    !createdUser.value.firstName ||
    !createdUser.value.lastName ||
    !createdUser.value.password ||
    !createdUser.value.favoriteChampion
  ) {
    errorMessage.value = "L'un des champs est manquant";
    return false;
  }

  if (createdUser.value.password && !createdUser.value.password.match(passwordRegExp)) {
    errorMessage.value = 'Le mot de passe doit être compliqué';
    return false;
  }

  await createUser();
  return true;
};

const createUser = async () => {
  await axios.post('/user', createdUser.value);
};

const createdUser = ref<Partial<User>>({});
const errorMessage = ref<string>('');
</script>

<template>
  <div>
    <input type="text" v-model="createdUser.firstName" />
    <input type="text" v-model="createdUser.lastName" />
    <input type="password" v-model="createdUser.password" />
    <select v-model="createdUser.favoriteChampion">
      <option v-for="(champion, index) of champions" :key="index" :value="champion">
        {{ champion }}
      </option>
    </select>
    <button @click="validateForm">Valider</button>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>
