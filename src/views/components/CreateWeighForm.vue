<template>
  <div style="padding: 40px">
    <q-form class="q-gutter-md" style="max-width: 400px" @submit="onSubmit">
      <q-select
      options-dense
        label="食堂"
        v-model="form.canteen"
        :options="canteenStore.canteens"
        :option-label="(opt) => `${opt.name} (${opt.aliases})`"
        emit-value
        map-options
        filled
        :rules="[(val) => val || '请选择食堂']"
      />
      <q-select
        clearable
        options-dense
        label="食物"
        v-model="form.food"
        :options="form.foodOptions"
        :option-label="(opt) => `${opt.name} (${opt.aliases}) [￥${opt.price}]`"
        use-input
        map-options
        @filter="foodFilterFn"
        filled
        :rules="[(val) => val || '请选择食物']"
      >
        <template v-slot:after>
          <q-btn round dense flat icon="add" @click="onAddFood" />
        </template>
      </q-select>
      <div style="display: flex">
        <span class="text-grey" style="width: 5em">最近</span>
        <span class="q-gutter-x-md">
          <span v-for="food in recentFoods" class="text-blue cursor-pointer inline-block" @click="onSelectRecentFood(food)">
          {{ food.name }}
        </span>
        </span>
      </div>
      <q-input
        clearable
        v-model.number="form.weight"
        label="重量"
        type="number"
        :min="0"
        filled
        :rules="[(val) => val || '请输入重量']"
      />
      <q-input label="日期" filled v-model="form.record_date" mask="####-##-##">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date v-model="form.record_date" minimal mask="YYYY-MM-DD" />
            </q-popup-proxy>
          </q-icon>
        </template>
        <template v-slot:before>
          <q-btn
            round
            dense
            flat
            icon="arrow_back"
            @click="form.record_date = formatDateToDay(date.subtractFromDate(form.record_date, { days: 1 }))"
          />
        </template>
        <template v-slot:after>
          <q-btn
            round
            dense
            flat
            icon="arrow_forward"
            @click="form.record_date = formatDateToDay(date.addToDate(form.record_date, { days: 1 }))"
          />
        </template>
      </q-input>
      <q-btn type="submit">创建</q-btn>
    </q-form>
  </div>
  <create-food-dialog ref="createFoodDialogRef" />
</template>

<script setup lang="ts">
import { Canteen } from "@/api/canteen";
import { Food, getRecentFoods } from "@/api/food";
import Message from "@/utils/message";
import PinyinMatch from "pinyin-match";
import CreateFoodDialog from "./CreateFoodDialog.vue";
import { date } from "quasar";
import { formatDateToDay } from "@/utils/date-utils";
import { useCanteenStore } from "@/stores/canteen";
import { useFoodStore } from "@/stores/food";
import { useWeighStore } from "@/stores/weigh";

const canteenStore = useCanteenStore();
const foodStore = useFoodStore();
const weighStore = useWeighStore();

const createFoodDialogRef = ref<InstanceType<typeof CreateFoodDialog>>();

const form = reactive({
  foodOptions: [] as Food[],
  canteen: undefined as Canteen | undefined,
  food: undefined as Food | undefined,
  weight: undefined as int | undefined,
  record_date: formatDateToDay(new Date()),
});
const recentFoods = ref<Food[]>([]);

watch(
  () => canteenStore.canteens,
  () => (form.canteen ??= canteenStore.canteens[0])
);

const foodFilterFn = (val: string, update: any, abort: any) => {
  update(() => {
    form.foodOptions = val
      ? foodStore.foods.filter(
          (c) => PinyinMatch.match(c.name, val) || c.aliases.some((a) => PinyinMatch.match(a, val))
        )
      : foodStore.foods;
  });
};

const fetchRecentFoods = async () => {
  recentFoods.value = await getRecentFoods();
};

const onSelectRecentFood = (food: Food) => {
  form.food = food;
};

const onAddFood = () => {
  createFoodDialogRef.value?.show().then((food) => {
    form.food = food;
  });
};

const onSubmit = async () => {
  try {
    await weighStore.create({
      canteen_id: form.canteen!.id,
      food_id: form.food!.id,
      weight: form.weight!,
      record_date: form.record_date,
    });
    Message.success("成功创建记录");
    form.food = undefined;
    form.weight = undefined;
    await fetchRecentFoods();
  } catch (e) {
    Message.error("创建失败");
  }
};

onMounted(async () => {
  await fetchRecentFoods();
});
</script>

<style scoped></style>
