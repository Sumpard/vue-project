<template>
  <q-table
    ref="tableRef"
    title="称饭记录"
    :rows="weighStore.weighs"
    :columns="columns"
    row-key="id"
    binary-state-sort
    square
    flat
    dense
    class="my-sticky-table-handle"
    :pagination="initialPagination"
    :filter="filter"
    :loading="loading"
  >
    <template #body-cell-weight="props">
      <q-td :props="props">
        {{ props.row.weight }}
        <q-popup-edit v-model="props.row.weight" auto-save :cover="false" #="scope">
          <q-input v-model="scope.value" dense autofocus type="number" suffix="g" @keyup.enter="scope.set" />
        </q-popup-edit>
      </q-td>
    </template>
    <template #body-cell-record_date="props">
      <q-td :props="props">
        {{ props.row.record_date }}
        <q-popup-proxy auto-save :cover="false">
          <q-date v-model="props.row.record_date" minimal mask="YYYY-MM-DD" />
        </q-popup-proxy>
      </q-td>
    </template>
    <template #body-cell-handle="props">
      <q-td :props="props">
        <q-btn flat dense round color="blue" icon="edit" size="sm" @click="onUpdateRow(props.row)" />
        <q-btn flat dense round color="red" icon="delete" size="sm" @click="onDeleteRow(props.row)" />
      </q-td>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import { Weigh } from "@/api/weigh";
import { useCanteenStore } from "@/stores/canteen";
import { useFoodStore } from "@/stores/food";
import { useWeighStore } from "@/stores/weigh";
import { formatDate } from "@/utils/date-utils";
import Message from "@/utils/message";
import { columnDefaults } from "@/utils/table-utils";
import { QTable } from "quasar";

const canteenStore = useCanteenStore();
const foodStore = useFoodStore();
const weighStore = useWeighStore();

const columns = columnDefaults(
  [
    { name: "id", label: "ID" },
    { name: "canteen", label: "食堂", field: (row: Weigh) => canteenStore.get(row.canteen_id)?.name },
    { name: "food", label: "食物", field: (row: Weigh) => foodStore.get(row.food_id)?.name },
    { name: "weight", label: "重量 (g)" },
    { name: "record_date", label: "记录时间" },
    { name: "create_time", label: "创建时间", format: formatDate },
    { name: "handle", label: "操作", sortable: false },
  ],
  { sortable: true, align: "center" }
);

const initialPagination = {
  sortBy: "id",
  descending: true,
  page: 1,
  rowsPerPage: 10,
};

const tableRef = ref<QTable>();

const loading = ref(false);
const filter = ref("");

const onUpdateRow = async (row: Weigh) => {
  await weighStore.update(row);
  Message.success("成功更新记录");
};
const onDeleteRow = async (row: Weigh) => {
  await weighStore.remove(row);
  Message.success("成功删除记录");
};
</script>

<style scoped>
.q-table .q-chip {
  font-size: 13px;
}
</style>
