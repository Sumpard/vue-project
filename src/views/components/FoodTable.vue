<template>
  <q-table
    ref="tableRef"
    title="食物"
    :rows="foodStore.foods"
    :columns="columns"
    row-key="id"
    binary-state-sort
    square
    flat
    dense
    class="my-sticky-table-handle"
    :filter="filter"
    :loading="loading"
  >
    <template #body-cell-name="props">
      <q-td :props="props">
        {{ props.row.name }}
        <q-popup-edit v-model="props.row.name" auto-save :cover="false" #="scope">
          <q-input v-model="scope.value" dense autofocus @keyup.enter="scope.set" />
        </q-popup-edit>
      </q-td>
    </template>
    <template #body-cell-price="props">
      <q-td :props="props">
        ￥{{ props.row.price / 10 }}
        <q-popup-edit v-model="props.row.price" auto-save :cover="false" #="scope">
          <q-input v-model="scope.value" dense autofocus clearable type="number" prefix="￥" @keyup.enter="scope.set" />
        </q-popup-edit>
      </q-td>
    </template>
    <template #body-cell-desc="props">
      <q-td :props="props">
        {{ props.row.desc }}
        <q-popup-edit v-model="props.row.desc" auto-save :cover="false" #="scope">
          <q-input v-model="scope.value" dense autofocus clearable @keyup.enter="scope.set" />
        </q-popup-edit>
      </q-td>
    </template>
    <template #body-cell-handle="props">
      <q-td :props="props">
        <q-btn flat dense round color="blue" icon="edit" size="sm" @click="onUpdateRow(props.row)" />
      </q-td>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import { Food } from "@/api/food";
import { useFoodStore } from "@/stores/food";
import { formatDate } from "@/utils/date-utils";
import Message from "@/utils/message";
import { columnDefaults } from "@/utils/table-utils";
import { QTable } from "quasar";

const foodStore = useFoodStore();

const columns = columnDefaults(
  [
    { name: "id", label: "ID" },
    { name: "name", label: "名称" },
    { name: "aliases", label: "别名", format: (val: string[]) => val.join(", ") },
    { name: "price", label: "价格", format: (val: int) => `￥${val / 10}` },
    { name: "desc", label: "描述" },
    { name: "create_time", label: "创建时间", format: formatDate },
    { name: "handle", label: "操作", sortable: false },
  ],
  { sortable: true, align: "center" }
);

const tableRef = ref<QTable>();

const loading = ref(false);
const filter = ref("");

const onUpdateRow = async (row: Food) => {
  await foodStore.update(row);
  Message.success("成功更新食物信息");
};
</script>

<style scoped>
.q-table .q-chip {
  font-size: 13px;
}
</style>
