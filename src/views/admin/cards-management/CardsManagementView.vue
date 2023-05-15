<script setup lang="ts">
import httpRequestService, { baseUrl, uploadUri, importUri } from '@/services/httpRequest.service';
import type { Card } from '@/game/models/card';
import { onMounted, ref, computed, watch, nextTick } from 'vue';
import GenericModal from '@/components/GenericModal.vue';
import type { CardSetOption, FormMapping } from '@/config/forms/form-mapping/form.mapping.type';
import { cardForm } from '@/config/forms/form-mapping/form.mapping';
import type { CardSet } from '@/game/models/cardSet';
import { ModalSize } from '@/config/types/modalSize.type';
import { FORM_MAP } from '@/config/forms/form-mapping/form.map';
import Gw2GenericFileInput from '@/components/forms/Gw2GenericFileInput.vue';
import AlertSection from '../../../components/alerts/AlertSection.vue';
import router from '@/router';
import { useI18n } from 'vue-i18n';
import { CARD_SPHERES_I18N, CARD_TYPES_I18N } from '@/assets/i18n/i18n.mapping';
import type { CardType } from '@/game/models/types/cardType.type';
const { t } = useI18n();

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

const isEditModalVisible = ref(false);
const editedCardObject = ref<Partial<Card>>({});

const fileUpload = ref<InstanceType<typeof Gw2GenericFileInput>>();
const uploadPostUri = ref<string>(uploadUri);

const fileImport = ref<InstanceType<typeof Gw2GenericFileInput>>();
const isImportModalVisible = ref(false);
const importPostUri = ref<string>(importUri);

// Component local computed
const iscreatedCardObjectOk = computed(() => {
  return !!(createdCardObject.value.name && createdCardObject.value.type);
});

const isEditedCardObjectOk = computed(() => {
  return !!(editedCardObject.value.name && editedCardObject.value.type);
});

const isCreatingQuestCard = computed(() => {
  return createdCardObject.value.type === 'Quest';
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

watch(
  () => editedCardObject.value.type,
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
    loading.value = false;
  }
};

const loadSetsData = () => {
  cardFormMapper.value.set.options = cardSets.value.map((set: CardSet) => {
    const cardSetOptions: CardSetOption = { value: set.uuid || '', label: set.name };
    return cardSetOptions;
  });
};

const importJson = () => {
  isImportModalVisible.value = true;
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
    uploadPostUri.value = `${uploadUri}/${newCard.set}/${newCard.uuid}`;
    await nextTick();
    fileUpload.value?.submitUpload();
    console.log(uploadPostUri.value);
    confirm.value = t('admin.cards.messages.notifyCreated');
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

// Edit cards handlers
const editCard = (uuid: string) => {
  const cardToEdit = cardsData.value.find((card) => card.uuid === uuid);
  if (cardToEdit) {
    isEditModalVisible.value = true;
    editedCardObject.value = { ...cardToEdit };
  }
};

const confirmEdit = async () => {
  console.log(editedCardObject.value);
  try {
    const updatedCard: Card = await httpRequestService.put('cards', editedCardObject.value);
    // uploadPostUri.value = `${uploadUri}/${updatedCard.set}/${updatedCard.uuid}`;
    await nextTick();
    // fileUpload.value?.submitUpload();
    // console.log(uploadPostUri.value);
    confirm.value = t('admin.cards.messages.notifyUpdated');
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
  closeEditModal();
};

const closeEditModal = () => {
  editedCardObject.value = {};
  isEditModalVisible.value = false;
  cardFormMapper.value = cardForm;
};

// Delete cards handlers
const deleteCard = (uuid: string) => {
  pendingDeleteUuid.value = uuid;
  isDeleteModalVisible.value = true;
};

const confirmDelete = async () => {
  try {
    await httpRequestService.delete(`cards/${pendingDeleteUuid.value}`);
    confirm.value = t('admin.cards.messages.notifyDeleted');
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

const confirmImport = async () => {
  fileImport.value?.submitUpload();
  confirm.value = t('admin.cards.messages.notifyImportSuceeded');
  await nextTick();
  loadCardsData();
  closeImportModal();
};

const closeImportModal = () => {
  isImportModalVisible.value = false;
};

const imageUrl = (cardImage: string): string => {
  return `${baseUrl}${cardImage}`;
};

const cardTooltipHtml = (cardImage: string): string => {
  return `<img width="360" src="${imageUrl(cardImage)}" />`;
};

const resetAlerts = () => {
  error.value = null;
  confirm.value = null;
};

const backToMenu = () => {
  router.push('/admin');
};

// Life cycle hooks
onMounted(() => loadCardsData());
</script>

<template>
  <div class="section">
    <generic-modal
      :title="$t('admin.cards.modal.import.title')"
      :display="isImportModalVisible"
      @modal-close="closeImportModal"
      @modal-submit="confirmImport"
      :modal-size="ModalSize.SMALL"
      accept=".json"
    >
      <div>
        <el-form label-width="120px">
          <el-form-item :label="$t('admin.cards.modal.import.label')">
            <gw2-generic-file-input
              ref="fileImport"
              :action="importPostUri"
              :button-text="$t('admin.cards.modal.import.button')"
            />
          </el-form-item>
        </el-form>
      </div>
    </generic-modal>

    <generic-modal
      :title="$t('admin.cards.modal.create.title')"
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
              <el-form-item :label="isCreatingQuestCard ? 'B side image' : 'Card Image'">
                <gw2-generic-file-input
                  ref="fileUpload"
                  :action="uploadPostUri"
                  :button-text="$t('admin.cards.modal.create.upload.button')"
                  is-picture
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-divider />
          <el-row>
            <el-col :span="12">
              <el-form-item
                v-for="[key, mapping] of Object.entries(cardFormMapper).slice(5, 10)"
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
                v-for="[key, mapping] of Object.entries(cardFormMapper).slice(10)"
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
      :title="$t('admin.cards.modal.edit.title')"
      :display="isEditModalVisible"
      @modal-close="closeEditModal"
      @modal-submit="confirmEdit"
      :confirm-enabled="isEditedCardObjectOk"
      :modalSize="ModalSize.MEDIUM"
    >
      <div>
        <el-form :model="editedCardObject" label-width="120px">
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
                  v-model="editedCardObject[key as keyof Card]"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="isCreatingQuestCard ? 'B side image' : 'Card Image'">
                <gw2-generic-file-input
                  ref="fileUpload"
                  :action="uploadPostUri"
                  :button-text="$t('admin.cards.modal.create.upload.button')"
                  is-picture
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-divider />
          <el-row>
            <el-col :span="12">
              <el-form-item
                v-for="[key, mapping] of Object.entries(cardFormMapper).slice(5, 10)"
                :key="key"
                :label="mapping.label"
              >
                <component
                  :is="mapping.component"
                  :options="mapping.options"
                  v-model="editedCardObject[key as keyof Card]"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                v-for="[key, mapping] of Object.entries(cardFormMapper).slice(10)"
                :key="key"
                :label="mapping.label"
              >
                <component
                  :is="mapping.component"
                  :options="mapping.options"
                  v-model="editedCardObject[key as keyof Card]"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-divider v-if="editedCardObject.type" />
        </el-form>
      </div>
    </generic-modal>

    <generic-modal
      :title="$t('admin.cards.modal.delete.title')"
      :display="isDeleteModalVisible"
      @modal-close="closeDeleteModal"
      @modal-submit="confirmDelete"
    >
      {{ $t('admin.cards.modal.delete.text') }}
    </generic-modal>

    <el-row>
      <el-col :span="24" class="section__navigation">
        <el-button link type="primary" size="small" @click="backToMenu">{{ $t('admin.cards.back') }}</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="section__wrapper">
        <div class="section__wrapper__top">
          <h1 class="section__wrapper__top__title">{{ $t('admin.cards.pageTitle') }}</h1>
          <div>
            <el-button type="primary" class="section__wrapper__top__button" @click="importJson" icon="Upload">
              {{ $t('admin.cards.buttons.import') }}
            </el-button>
            <el-button type="success" class="section__wrapper__top__button" @click="createCard" icon="Plus">
              {{ $t('admin.cards.buttons.create') }}
            </el-button>
          </div>
        </div>
        <alert-section @close="resetAlerts" />
        <div class="section__wrapper__index">
          {{ $t('admin.cards.text.total') }} {{ cardsData.length || '0' }} {{ $t('admin.cards.text.cards') }}
        </div>
        <el-table v-loading="loading" :data="cardsData" :default-sort="{ prop: 'name', order: 'ascending' }" stripe>
          <el-table-column :label="$t('admin.cards.table.labels.cardImage')" width="100">
            <template #default="scope">
              <el-tooltip
                effect="light"
                :show-after="250"
                :content="cardTooltipHtml(scope.row.cardImage)"
                class="section__wrapper__table__tooltip"
                raw-content
              >
                <div style="display: flex; align-items: center" class="section__wrapper__table__img">
                  <el-image :src="imageUrl(scope.row.cardImage)" />
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="name" :label="$t('admin.cards.table.labels.cardName')" sortable />
          <el-table-column prop="set.name" :label="$t('admin.cards.table.labels.cardSet')" width="240" sortable />
          <el-table-column :label="$t('admin.cards.table.labels.type')" width="120" sortable>
            <template #default="scope">
              {{ $t(CARD_TYPES_I18N[scope.row.type as keyof typeof CARD_TYPES_I18N]) }}
            </template>
          </el-table-column>
          <el-table-column :label="$t('admin.cards.table.labels.sphere')" width="140">
            <template #default="scope">
              {{ $t(CARD_SPHERES_I18N[scope.row.sphere as keyof typeof CARD_SPHERES_I18N]) }}
            </template>
          </el-table-column>
          <el-table-column prop="uuid" :label="$t('admin.cards.table.labels.uuid')" />
          <el-table-column fixed="right" :label="$t('admin.cards.table.labels.controls')" width="240">
            <template #default="scope">
              <el-button link type="primary" size="small" @click="seeDetails">
                {{ $t('admin.cards.table.buttons.details') }}
              </el-button>
              <el-button link type="primary" size="small" @click="editCard(scope.row.uuid)">
                {{ $t('admin.cards.table.buttons.edit') }}
              </el-button>
              <el-button link type="primary" size="small" @click="deleteCard(scope.row.uuid)">
                {{ $t('admin.cards.table.buttons.delete') }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.section {
  width: 80%;
  margin: auto;

  &__navigation {
    margin-top: $defaultMargin;
    margin-bottom: $defaultMargin;
  }

  &__wrapper {
    &__top {
      &__title,
      &__button {
        margin-top: 0 !important;
      }
      display: flex;
      justify-content: space-between;
    }

    &__index {
      font-size: $defaultSize;
    }

    &__table {
      &__tooltip {
        border-radius: $defaultRadius !important;
        box-shadow: $defaultBoxShadow !important;
      }
      &__img {
        cursor: pointer !important;
      }
    }

    padding: 2 * $defaultMargin;
    border-radius: $defaultRadius;
    background-color: $white;
    box-shadow: $defaultBoxShadow;
  }
}
</style>
