<template>
  <header class="page_header">
    <div class="logo">Marketplaces to Dostavka.Guru</div>
    <div class="actions">
      <el-dropdown trigger="click">
        <el-button type="primary">
          + Добавить аккаунт
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="create('dg')">
              Dostavka.Guru
            </el-dropdown-item>
            <el-dropdown-item @click="create('ozon')">Ozon</el-dropdown-item>
            <el-dropdown-item @click="create('wb')">
              Wildberries
            </el-dropdown-item>
            <el-dropdown-item @click="create('sber')">
              SberMegaMarket
            </el-dropdown-item>
            <el-dropdown-item @click="create('ym')">
              YandexMarket
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>
  <router-view />

  <el-dialog
    :before-close="clearModel"
    v-model="modals.wb"
    title="Аккаунт Wildberries"
    :draggable="true"
    :destroy-on-close="true"
  >
    <el-form
      :model="models.wb"
      label-width="180px"
      ref="wbForm"
      :rules="validationRules.wb"
      status-icon
    >
      <el-form-item label="Наименование (для себя)" prop="name">
        <el-input v-model="models.wb.name" />
      </el-form-item>
      <el-form-item label="Токен" prop="token">
        <el-input v-model="models.wb.token" />
      </el-form-item>
      <el-form-item label="Подставлять в № заказа">
        <el-input v-model="models.wb.order_pre_text" />
      </el-form-item>
      <el-form-item label="Используется">
        <el-switch v-model="models.wb.active" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="closeModals">Отменить</el-button>
      <el-button
        type="primary"
        @click="save('wb', models.wb)"
        :loading="saving"
      >
        Сохранить
      </el-button>
    </template>
  </el-dialog>
  <el-dialog
    :before-close="clearModel"
    v-model="modals.ozon"
    title="Аккаунт Ozon"
    :draggable="true"
    :destroy-on-close="true"
  >
    <el-form
      :model="models.ozon"
      label-width="180px"
      ref="ozonForm"
      :rules="validationRules.ozon"
      status-icon
    >
      <el-form-item label="Наименование (для себя)" prop="name">
        <el-input v-model="models.ozon.name" />
      </el-form-item>
      <el-form-item label="Токен" prop="token">
        <el-input v-model="models.ozon.token" />
      </el-form-item>
      <el-form-item label="Client-ID" prop="clientId">
        <el-input v-model="models.ozon.client_id" />
      </el-form-item>
      <el-form-item label="Подставлять в № заказа">
        <el-input v-model="models.ozon.order_pre_text" />
      </el-form-item>
      <el-form-item label="Используется">
        <el-switch v-model="models.ozon.active" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="closeModals">Отменить</el-button>
      <el-button
        type="primary"
        @click="save('ozon', models.ozon)"
        :loading="saving"
      >
        Сохранить
      </el-button>
    </template>
  </el-dialog>
  <el-dialog
    :before-close="clearModel"
    v-model="modals.sber"
    title="Аккаунт SberMegaMarket"
    :draggable="true"
    :destroy-on-close="true"
  >
    <el-form
      :model="models.sber"
      label-width="180px"
      ref="sberForm"
      :rules="validationRules.sber"
      status-icon
    >
      <el-form-item label="Наименование (для себя)" prop="name">
        <el-input v-model="models.sber.name" />
      </el-form-item>
      <el-form-item label="Токен" prop="token">
        <el-input v-model="models.sber.token" />
      </el-form-item>
      <el-form-item label="ID" prop="_id">
        <el-input v-model="models.sber._id" />
      </el-form-item>
      <el-form-item label="Подставлять в № заказа">
        <el-input v-model="models.sber.order_pre_text" />
      </el-form-item>
      <el-form-item label="Используется">
        <el-switch v-model="models.sber.active" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="closeModals">Отменить</el-button>
      <el-button
        type="primary"
        @click="save('sber', models.sber)"
        :loading="saving"
      >
        Сохранить
      </el-button>
    </template>
  </el-dialog>
  <el-dialog
    :before-close="clearModel"
    v-model="modals.ym"
    title="Аккаунт YandexMarket"
    :draggable="true"
    :destroy-on-close="true"
  >
    <el-form
      :model="models.ym"
      label-width="180px"
      ref="ymForm"
      :rules="validationRules.ym"
      status-icon
    >
      <el-form-item label="Наименование (для себя)" prop="name">
        <el-input v-model="models.ym.name" />
      </el-form-item>
      <el-form-item label="Код подтверждения" prop="code">
        <el-input v-model="models.ym.code">
          <template #append>
            <el-button @click="openYandexAuth">Получить код</el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="СampaignId" prop="client_id">
        <el-input v-model="models.ym.client_id" />
      </el-form-item>
      <el-form-item label="Подставлять в № заказа">
        <el-input v-model="models.ym.order_pre_text" />
      </el-form-item>
      <el-form-item label="Используется">
        <el-switch v-model="models.ym.active" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="closeModals">Отменить</el-button>
      <el-button
        type="primary"
        @click="save('ym', models.ym)"
        :loading="saving"
      >
        Сохранить
      </el-button>
    </template>
  </el-dialog>
  <el-dialog
    :before-close="clearModel"
    v-model="modals.dg"
    title="Аккаунт Dostavka.Guru"
    :draggable="true"
    :destroy-on-close="true"
  >
    <el-form
      :model="models.dg"
      label-width="180px"
      ref="dgForm"
      :rules="validationRules.dg"
      status-icon
    >
      <el-form-item label="Наименование (для себя)" prop="name">
        <el-input v-model="models.dg.name" />
      </el-form-item>
      <el-form-item label="Токен" prop="token">
        <el-input v-model="models.dg.token" />
      </el-form-item>
      <el-form-item label="Partner ID" prop="partner_id">
        <el-input v-model="models.dg.partner_id" />
      </el-form-item>
      <el-form-item label="Используется">
        <el-switch v-model="models.dg.active" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="closeModals">Отменить</el-button>
      <el-button
        type="primary"
        @click="save('dg', models.dg)"
        :loading="saving"
      >
        Сохранить
      </el-button>
    </template>
  </el-dialog>
</template>

<script>
import { ArrowDown } from "@element-plus/icons-vue";
import {
  dgEmptyObject,
  ozonEmptyObject,
  sberEmptyObject,
  wbEmptyObject,
  ymEmptyObject,
} from "@/objects/emptyObjects";
import {
  dgValidationRules,
  ozonValidationRules,
  sberValidationRules,
  wbValidationRules,
  ymValidationRules,
} from "@/objects/validationRules";

import { actionTypes } from "@/store/modules/accounts";
import { mapState } from "vuex";

export default {
  name: "App",
  data() {
    return {
      modals: {
        wb: false,
        ozon: false,
        sber: false,
        ym: false,
        dg: false,
      },
      models: {
        wb: { ...wbEmptyObject },
        ozon: { ...ozonEmptyObject },
        sber: { ...sberEmptyObject },
        ym: { ...ymEmptyObject },
        dg: { ...dgEmptyObject },
      },
      validationRules: {
        wb: wbValidationRules,
        ym: ymValidationRules,
        sber: sberValidationRules,
        ozon: ozonValidationRules,
        dg: dgValidationRules,
      },
    };
  },
  computed: {
    ...mapState({
      allAccounts: (state) => state.accounts.accounts,
      loading: (state) => state.accounts.loading,
      saving: (state) => state.accounts.saving,
    }),
    dgAccounts() {
      return this.allAccounts.filter((account) => account.type === "dg");
    },
    accounts() {
      return this.allAccounts.filter((account) => account.type !== "dg");
    },
  },
  methods: {
    openYandexAuth() {
      const link =
        "https://oauth.yandex.ru/authorize?response_type=code&client_id=45813d304d4442f2b1f754aea38a56c1";
      window.open(link, "_blank").focus();
    },
    create(type) {
      this.closeModals();

      this.modals[type] = true;
    },
    closeModals() {
      for (let key in this.modals) {
        this.modals[key] = false;
      }
      this.clearModel();
    },
    async save(type, model) {
      const ref = type + "Form";
      await this.$refs[ref].validate((valid, fields) => {
        if (valid) {
          model.type = type;
          this.$store.dispatch(actionTypes.saveAccount, model).then(() => {
            this.closeModals();
          });
        } else {
          console.log("error submit!", fields);
        }
      });
    },
    clearModel(done = null) {
      this.models.wb = { ...wbEmptyObject };
      this.models.ym = { ...ymEmptyObject };
      this.models.sber = { ...sberEmptyObject };
      this.models.ozon = { ...ozonEmptyObject };
      this.models.dg = { ...dgEmptyObject };
      if (done != null) done();
    },
    loadAccounts() {
      this.$store.dispatch(actionTypes.getAccounts);
    },
    openEdit(id) {
      const account = this.allAccounts.filter((a) => a.id == id);

      if (account.length == 1) {
        console.log(account[0].type);
        this.models[account[0].type] = { ...account[0] };
        this.modals[account[0].type] = true;
      }
    },
  },
  components: { ArrowDown },
  mounted() {
    this.loadAccounts();
    this.eventBus.on("openEditor", (id) => {
      this.openEdit(id);
    });
  },
};
</script>

<style lang="scss">
body {
  margin: 0;
  box-sizing: border-box;
  padding: 50px 0 0;
}

.page_header {
  background-color: #f7f7f7;
  color: #333;
  padding: 10px 15px;
  border-bottom: 1px solid #ccc;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1300;

  .logo {
    cursor: default;
    font-weight: bold;
    display: inline-block;
    vertical-align: top;
    font-size: 18px;
  }

  .actions {
    display: inline-block;
    margin-left: 25px;
    vertical-align: top;
  }
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.flex-grow {
  flex-grow: 1;
}
</style>
