import { Food, FoodCreate, createFood, getFoods, updateFood } from "@/api/food";
import _ from "lodash-es";
import { defineStore } from "pinia";

export const useFoodStore = defineStore("food", () => {
  const foods = ref<Food[]>([]);
  const foodDict = ref<{ [id: int]: Food }>({});

  const get = (id: int) => foodDict.value[id];

  const create = async (food: FoodCreate) => {
    const result = await createFood(food);
    foods.value.push(result);
    foodDict.value[result.id] = result;
    return result;
  };

  const update = async (food: Food) => {
    const result = await updateFood(food);
    Object.assign(food, result);
    return result;
  };

  getFoods().then((v) => {
    foods.value = v;
    foodDict.value = _.keyBy(v, "id");
  });

  return { foods, create, get, update };
});
