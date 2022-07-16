<script setup lang="ts">
import httpRequestService from '@/services/httpRequest.service';
import stringsUtilsService from '@/services/stringsUtils.service';
import type { CardSet } from '@/game/models/cardSet';
import { onMounted, ref, computed } from 'vue';

const setsData = ref<Array<CardSet>>([]);
const loading = ref(true);
const error = ref<string | null>(null);

const formattedData = computed(() => {
  return setsData.value.map(({ uuid, name, type, cards }) => {
    return {
      name,
      type: stringsUtilsService.capitalize(type),
      uuid,
      nbOfCards: cards.length,
    };
  });
});

const loadSetsData = async () => {
  try {
    const { sets } = await httpRequestService.get('sets');
    loading.value = false;
    setsData.value = sets;
  } catch (e) {
    if (e instanceof Error) {
      error.value = e.message as string;
    }
    if (typeof e === 'string') {
      error.value = e;
    }
    loading.value = true;
  }
};

const seeDetails = () => console.log('Details');
const editSet = () => console.log('Edot');

onMounted(() => loadSetsData());
</script>

<template>
  <div class="section">
    <el-row>
      <el-col :span="24" class="section__wrapper">
        <h1 class="section__wrapper__main-title">Set Management</h1>
        <el-table v-loading="loading" :data="formattedData" stripe>
          <el-table-column prop="name" label="Set name" width="180" />
          <el-table-column prop="type" label="Set type" width="180" />
          <el-table-column prop="uuid" label="Set UUID" />
          <el-table-column prop="nbOfCards" label="Nb. of cards" width="180" />
          <el-table-column fixed="right" label="Operations" width="120">
            <template #default>
              <el-button link type="primary" size="small" @click="seeDetails"> Detail </el-button>
              <el-button link type="primary" size="small" @click="editSet"> Edit </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss">
.section {
  width: 80%;
  margin: auto;

  &__wrapper {
    &__main-title {
      margin-top: $defaultMargin !important;
    }

    margin-top: $defaultMargin * 3 !important;
    padding: 2 * $defaultMargin;
    border-radius: $defaultRadius;
    background-color: $white;
    box-shadow: $defaultBoxShadow;
  }
}
</style>
