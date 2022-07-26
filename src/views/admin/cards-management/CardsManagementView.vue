<script setup lang="ts">
import httpRequestService, { baseUrl, uploadUri } from '@/services/httpRequest.service';
import type { Card } from '@/game/models/card';
import { onMounted, ref, computed, watch, nextTick } from 'vue';
import GenericModal from '@/components/GenericModal.vue';
import type { CardSetOption, FormMapping } from '@/config/forms/form-mapping/form.mapping.type';
import { cardForm } from '@/config/forms/form-mapping/form.mapping';
import type { CardSet } from '@/game/models/cardSet';
import { ModalSize } from '@/config/types/modalSize.type';
import { FORM_MAP } from '@/config/forms/form-mapping/form.map';
import type Gw2ImageInputVue from '@/components/forms/Gw2ImageInput.vue';
import Gw2ImageInput from '../../../components/forms/Gw2ImageInput.vue';

// Component local data
const cardsData = ref<Array<Card>>([]);
const cardSets = ref<Array<CardSet>>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const confirm = ref<string | null>(null);

const isDeleteModalVisible = ref(false);
const pendingDeleteUuid = ref<string | null>(null);

const isCreateModalVisible = ref(false);
const cardFormMapper = ref<FormMapping>(cardForm);
const createdCardObject = ref<Partial<Card>>({});

const fileUpload = ref<InstanceType<typeof Gw2ImageInputVue>>();

const uploadPostUri = ref<string>(uploadUri);

// Component local computed
const iscreatedCardObjectOk = computed(() => {
  return !!(createdCardObject.value.name && createdCardObject.value.type);
});

// Component watchers
watch(
  () => createdCardObject.value.type,
  (newType) => {
    console.log(newType);
    if (FORM_MAP[newType as keyof typeof FORM_MAP]) {
      cardFormMapper.value = FORM_MAP[newType as keyof typeof FORM_MAP];
      loadSetsData();
    }
  },
);

// Initiates or refreshes sets data
const loadCardsData = async () => {
  try {
    const { cards } = await httpRequestService.get('cards');
    const { sets } = await httpRequestService.get('sets');
    loading.value = false;
    cardsData.value = cards;
    cardSets.value = sets;
    loadSetsData();
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

const loadSetsData = () => {
  cardFormMapper.value.set.options = cardSets.value.map((set: CardSet) => {
    const cardSetOptions: CardSetOption = { value: set.uuid || '', label: set.name };
    return cardSetOptions;
  });
};

// Action handlers
const seeDetails = () => console.log('Details');

// Create card handlers
const createCard = () => {
  isCreateModalVisible.value = true;
};

const confirmCreate = async () => {
  try {
    const newCard: Card = await httpRequestService.post('cards', createdCardObject.value);
    uploadPostUri.value = `${uploadUri}/${newCard.uuid}`;
    await nextTick();
    fileUpload.value?.submitUpload();
    confirm.value = 'The new Card has been successfully created.';
    await nextTick();
    loadCardsData();
  } catch (e) {
    if (e instanceof Error) {
      error.value = e.message as string;
    }
    if (typeof e === 'string') {
      error.value = e;
    }
  }
  closeCreateModal();
};

const closeCreateModal = () => {
  createdCardObject.value = {};
  isCreateModalVisible.value = false;
  cardFormMapper.value = cardForm;
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

const imageUrl = (cardImage: string): string => {
  return `${baseUrl}uploads/img/${cardImage}`;
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
      :modalSize="ModalSize.MEDIUM"
    >
      <div>
        <el-form :model="createdCardObject" label-width="120px">
          <el-row>
            <el-col :span="12">
              <el-form-item
                v-for="[key, mapping] of Object.entries(cardFormMapper).slice(0, 5)"
                :key="key"
                :label="mapping.label"
              >
                <component
                  :is="mapping.component"
                  :options="mapping.options"
                  v-model="createdCardObject[key as keyof Card]"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="cardFormMapper.cardImage.label">
                <gw2-image-input ref="fileUpload" :action="uploadPostUri" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-divider />
          <el-row>
            <el-col :span="12">
              <el-form-item
                v-for="[key, mapping] of Object.entries(cardFormMapper).slice(6, 11)"
                :key="key"
                :label="mapping.label"
              >
                <component
                  :is="mapping.component"
                  :options="mapping.options"
                  v-model="createdCardObject[key as keyof Card]"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                v-for="[key, mapping] of Object.entries(cardFormMapper).slice(11)"
                :key="key"
                :label="mapping.label"
              >
                <component
                  :is="mapping.component"
                  :options="mapping.options"
                  v-model="createdCardObject[key as keyof Card]"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-divider v-if="createdCardObject.type" />
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
        <el-table v-loading="loading" :data="cardsData" :default-sort="{ prop: 'name', order: 'descending' }" stripe>
          <el-table-column label="Card image" width="90">
            <template #default="scope">
              <div style="display: flex; align-items: center">
                <el-image :src="imageUrl(scope.row.cardImage)" />
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="Card name" width="180" sortable />
          <el-table-column prop="set.name" label="Card Set" width="180" sortable />
          <el-table-column prop="type" label="Type" width="120" sortable />
          <el-table-column prop="sphere" label="Sphere" width="140" sortable />
          <el-table-column prop="uuid" label="UUID" />
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
