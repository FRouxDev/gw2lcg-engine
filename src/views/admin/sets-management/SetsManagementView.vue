<script setup lang="ts">
import httpRequestService from '@/services/httpRequest.service';
import stringsUtilsService from '@/services/stringsUtils.service';
import type { CardSet } from '@/game/models/cardSet';
import { onMounted, ref, computed } from 'vue';
import GenericModal from '@/components/GenericModal.vue';

// Component local data
const setsData = ref<Array<CardSet>>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const confirm = ref<string | null>(null);

const isDeleteModalVisible = ref(false);
const pendingDeleteUuid = ref<string | null>(null);

const isCreateModalVisible = ref(false);
const createdSetObject = ref<Partial<CardSet>>({});

// Component local computed
const formattedData = computed(() => {
  return setsData.value.map(({ uuid, name, type, cards }) => {
    return {
      name,
      type: stringsUtilsService.capitalize(type),
      uuid,
      nbOfCards: cards?.length,
    };
  });
});

const isCreatedSetObjectOk = computed(() => {
  return !!(createdSetObject.value.name && createdSetObject.value.type);
});

// Initiates or refreshes sets data
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

// Action handlers
const seeDetails = () => console.log('Details');

// Create set handlers
const createSet = () => {
  isCreateModalVisible.value = true;
};

const confirmCreate = async () => {
  try {
    await httpRequestService.post('sets', createdSetObject.value);
    confirm.value = 'The new Card Set has been successfully created.';
    loadSetsData();
  } catch (e) {
    if (e instanceof Error) {
      error.value = e.message as string;
    }
    if (typeof e === 'string') {
      error.value = e;
    }
  }
  createdSetObject.value = {};
  isCreateModalVisible.value = false;
};

const closeCreateModal = () => {
  createdSetObject.value = {};
  isCreateModalVisible.value = false;
};

// Delete set handlers
const deleteSet = (uuid: string) => {
  pendingDeleteUuid.value = uuid;
  isDeleteModalVisible.value = true;
};

const confirmDelete = async () => {
  try {
    await httpRequestService.delete(`sets/${pendingDeleteUuid.value}`);
    confirm.value = 'The Card Set has been successfully deleted.';
    loadSetsData();
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
onMounted(() => loadSetsData());
</script>

<template>
  <div class="section">
    <generic-modal
      title="Card Set Creation"
      :display="isCreateModalVisible"
      @modal-close="closeCreateModal"
      @modal-submit="confirmCreate"
      :confirm-enabled="isCreatedSetObjectOk"
    >
      <div>
        <el-form :model="createdSetObject" label-width="120px">
          <el-form-item label="Set name">
            <el-input v-model="createdSetObject.name" placeholder="Set name" />
          </el-form-item>
          <el-form-item label="Set type">
            <el-select class="m-2" placeholder="Set type" v-model="createdSetObject.type">
              <el-option label="Player Set" value="player" />
              <el-option label="Encounter Set" value="encounter" />
              <el-option label="Special Set" value="special" />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </generic-modal>

    <generic-modal
      title="Card Set Deletion"
      :display="isDeleteModalVisible"
      @modal-close="closeDeleteModal"
      @modal-submit="confirmDelete"
    >
      Are you sure you want to delete this Card Set?
    </generic-modal>

    <el-row>
      <el-col :span="24" class="section__wrapper">
        <div class="section__wrapper__top">
          <h1 class="section__wrapper__top__title">Card Sets Management</h1>
          <el-button type="primary" class="section__wrapper__top__button" @click="createSet">
            Create New Set
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
              <el-button link type="primary" size="small" @click="deleteSet(scope.row.uuid)"> Delete </el-button>
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
