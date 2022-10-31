<template>
  <div class="page">
    <el-row v-loading="loading || deleting">
      <el-col>
        <h2>Аккаунты Dostavka.Guru:</h2>
        <el-row v-if="dgAccounts.length" :gutter="10">
          <el-col
            :span="8"
            :xs="24"
            v-for="account in dgAccounts"
            :key="account.id"
          >
            <div class="box" :class="account.active ? 'active' : 'unactive'">
              <h3>{{ account.name }}</h3>
              <table>
                <tbody>
                  <tr>
                    <td>Токен:</td>
                    <td>{{ account.token }}</td>
                  </tr>
                  <tr>
                    <td>Partner ID:</td>
                    <td>{{ account.partner_id }}</td>
                  </tr>
                </tbody>
              </table>
              <div class="actions">
                <el-button type="primary" @click="openEdit(account.id)">
                  Изменить
                </el-button>
                <el-popconfirm
                  title="Вы уверены что хотите удалить?"
                  confirm-button-text="Да"
                  cancel-button-text="Нет"
                  confirm-button-type="danger"
                  cancel-button-type="default"
                  :hide-icon="true"
                  :width="175"
                  @confirm="removeAccount(account.id)"
                >
                  <template #reference>
                    <el-button type="danger">Удалить</el-button>
                  </template>
                </el-popconfirm>
              </div>
            </div>
          </el-col>
        </el-row>
        <h4 v-else>Нет добавленных аккаунтов</h4>
      </el-col>
    </el-row>
    <el-row v-loading="loading || deleting">
      <el-col>
        <h2>Аккаунты Маркетплейсов:</h2>
        <el-row v-if="dgAccounts.length" :gutter="10">
          <el-col
            :span="8"
            :xs="24"
            v-for="account in accounts"
            :key="account.id"
          >
            <div class="box" :class="account.active ? 'active' : 'unactive'">
              <h3>
                {{ account.name }}
                <el-tag effect="dark">{{ account.type }}</el-tag>
              </h3>
              <br />
              <div class="actions">
                <el-button type="primary" @click="openEdit(account.id)">
                  Изменить
                </el-button>
                <el-popconfirm
                  title="Вы уверены что хотите удалить?"
                  confirm-button-text="Да"
                  cancel-button-text="Нет"
                  confirm-button-type="danger"
                  cancel-button-type="default"
                  :hide-icon="true"
                  :width="175"
                  @confirm="removeAccount(account.id)"
                >
                  <template #reference>
                    <el-button type="danger">Удалить</el-button>
                  </template>
                </el-popconfirm>
              </div>
            </div>
          </el-col>
        </el-row>
        <h4 v-else>Нет добавленных аккаунтов</h4>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { actionTypes } from "@/store/modules/accounts";

export default {
  name: "MainPage",
  computed: {
    ...mapState({
      allAccounts: (state) => state.accounts.accounts,
      loading: (state) => state.accounts.loading,
      deleting: (state) => state.accounts.deleting,
    }),
    dgAccounts() {
      return this.allAccounts.filter((account) => account.type === "dg");
    },
    accounts() {
      return this.allAccounts.filter((account) => account.type !== "dg");
    },
  },
  methods: {
    removeAccount(id) {
      this.$store.dispatch(actionTypes.removeAccount, id);
    },
    openEdit(id) {
      this.eventBus.emit("openEditor", id);
    },
  },
};
</script>

<style lang="scss">
.page {
  padding: 0 15px;

  .box {
    border-radius: 4px;
    border: 1px solid #ccc;
    background-color: #f7f7f7;
    box-shadow: 0 0 5px 0 rgba(50, 50, 50, 0.2);
    padding: 10px 15px;
    margin-bottom: 10px;
    position: relative;

    .el-tag {
      position: absolute;
      top: 10px;
      right: 15px;
    }

    &.active {
      border-color: green;
    }
    &.unactive {
      border-color: red;
    }

    h3 {
      padding: 0;
      margin: 0;
    }
    table {
      margin-top: 8px;
      margin-bottom: 8px;
      width: 100%;
      border-spacing: 0;
      tr {
        td {
          border-top: 1px solid #ccc;
        }
        &:last-child {
          td {
            border-bottom: 1px solid #ccc;
          }
        }
      }
    }
  }
}
</style>
