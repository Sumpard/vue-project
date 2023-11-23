import { Canteen, getCanteens } from "@/api/canteen";
import _ from "lodash-es";
import { defineStore } from "pinia";

export const useCanteenStore = defineStore("canteen", () => {
  const canteens = ref<Canteen[]>([]);
  const canteenDict = ref<{ [id: int]: Canteen }>({});

  const get = (id: int) => canteenDict.value[id];

  getCanteens().then((v) => {
    canteens.value = v;
    canteenDict.value = _.keyBy(v, "id");
  });

  return { canteens, get };
});
