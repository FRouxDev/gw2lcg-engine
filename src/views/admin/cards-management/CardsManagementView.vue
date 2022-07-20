<script setup lang="ts">
import httpRequestService from '@/services/httpRequest.service';
import type { Card } from '@/game/models/card';
import { onMounted, ref, computed } from 'vue';
import GenericModal from '@/components/GenericModal.vue';

// Component local data
const cardsData = ref<Array<Card>>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const confirm = ref<string | null>(null);

const isDeleteModalVisible = ref(false);
const pendingDeleteUuid = ref<string | null>(null);

const isCreateModalVisible = ref(false);
const createdCardObject = ref<Partial<Card>>({});

// Component local computed
const formattedData = computed(() => {
  return '';
});

const iscreatedCardObjectOk = computed(() => {
  return !!(createdCardObject.value.name && createdCardObject.value.type);
});

// Initiates or refreshes sets data
const loadCardsData = async () => {
  try {
    const { cards } = await httpRequestService.get('cards');
    loading.value = false;
    cardsData.value = cards;
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

// Action handlers
const seeDetails = () => console.log('Details');

// Create card handlers
const createCard = () => {
  isCreateModalVisible.value = true;
};

const confirmCreate = async () => {
  try {
    await httpRequestService.post('cards', createdCardObject.value);
    confirm.value = 'The new Card has been successfully created.';
    loadCardsData();
  } catch (e) {
    if (e instanceof Error) {
      error.value = e.message as string;
    }
    if (typeof e === 'string') {
      error.value = e;
    }
  }
  createdCardObject.value = {};
  isCreateModalVisible.value = false;
};

const closeCreateModal = () => {
  createdCardObject.value = {};
  isCreateModalVisible.value = false;
};

// Delete set handlers
const deleteCard = (uuid: string) => {
  pendingDeleteUuid.value = uuid;
  isDeleteModalVisible.value = true;
};

const confirmDelete = async () => {
  try {
    await httpRequestService.delete(`cards/${pendingDeleteUuid.value}`);
    confirm.value = 'The Card has been successfully deleted.';
    loadCardsData();
  } catch (e) {
    if (e instanceof Error) {
      error.value = e.message as string;
    }
    if (typeof e === 'string') {
      error.value = e;
    }
  }
  pendingDeleteUuid.value = null;
  isDeleteModalVisible.value = false;
};

const closeDeleteModal = () => {
  pendingDeleteUuid.value = null;
  isDeleteModalVisible.value = false;
};

// Life cycle hooks
onMounted(() => loadCardsData());
</script>

<template>
  <div class="section">
    <generic-modal
      title="Create a New Card"
      :display="isCreateModalVisible"
      @modal-close="closeCreateModal"
      @modal-submit="confirmCreate"
      :confirm-enabled="iscreatedCardObjectOk"
    >
      <div>
        <el-form :model="createdCardObject" label-width="120px">
          <el-form-item label="Card name">
            <el-input v-model="createdCardObject.name" placeholder="Card name" />
          </el-form-item>
          <el-form-item label="Card type">
            <el-select class="m-2" placeholder="Card type" v-model="createdCardObject.type">
              <el-option label="Player Set" value="player" />
              <el-option label="Encounter Set" value="encounter" />
              <el-option label="Special Set" value="special" />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </generic-modal>

    <generic-modal
      title="Card Deletion"
      :display="isDeleteModalVisible"
      @modal-close="closeDeleteModal"
      @modal-submit="confirmDelete"
    >
      Are you sure you want to delete this Card?
    </generic-modal>

    <el-row>
      <el-col :span="24" class="section__wrapper">
        <div class="section__wrapper__top">
          <h1 class="section__wrapper__top__title">Cards Management</h1>
          <el-button type="primary" class="section__wrapper__top__button" @click="createCard">
            Create New Card
          </el-button>
        </div>
        <div>
          <el-alert v-if="confirm" :title="confirm" type="success" @close="confirm = null" show-icon />
          <el-alert v-if="error" :title="confirm" type="error" @close="error = null" show-icon />
        </div>
        <el-table
          v-loading="loading"
          :data="formattedData"
          :default-sort="{ prop: 'name', order: 'descending' }"
          stripe
        >
          <el-table-column prop="name" label="Set name" width="180" sortable />
          <el-table-column prop="type" label="Set type" width="120" sortable />
          <el-table-column prop="uuid" label="Set UUID" />
          <el-table-column prop="nbOfCards" label="Nb. of cards" align="center" width="140" sortable />
          <el-table-column fixed="right" label="Operations" width="180">
            <template #default="scope">
              <el-button link type="primary" size="small" @click="seeDetails"> Detail </el-button>
              <el-button link type="primary" size="small" @click="deleteCard(scope.row.uuid)"> Delete </el-button>
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
    &__top {
      &__title,
      &__button {
        margin-top: $defaultMargin !important;
      }
      display: flex;
      justify-content: space-between;
    }

    margin-top: $defaultMargin * 3 !important;
    padding: 2 * $defaultMargin;
    border-radius: $defaultRadius;
    background-color: $white;
    box-shadow: $defaultBoxShadow;
  }
}
</style>
