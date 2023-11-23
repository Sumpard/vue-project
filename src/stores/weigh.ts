import { Weigh, WeighCreate, createWeigh, deleteWeigh, getWeighs, updateWeigh } from "@/api/weigh";
import "@/utils/array-extensions";
import _ from "lodash-es";
import { defineStore } from "pinia";

export const useWeighStore = defineStore("weigh", () => {
  const weighs = ref<Weigh[]>([]);
  const weighDict = ref<{ [id: int]: Weigh }>({});

  const get = (id: int) => weighDict.value[id];

  const create = async (weigh: WeighCreate) => {
    const result = await createWeigh(weigh);
    weighs.value.push(result);
    weighDict.value[result.id] = result;
    return result;
  };

  const update = async (weigh: Weigh) => {
    const result = await updateWeigh(weigh);
    Object.assign(weigh, result);
    return result;
  };

  const remove = async (weigh: Weigh) => {
    const result = await deleteWeigh(weigh.id);
    weighs.value.removeOne(weigh);
    delete weighDict.value[weigh.id];
    return result;
  };

  getWeighs().then((v) => {
    weighs.value = v;
    weighDict.value = _.keyBy(v, "id");
  });

  return { weighs, create, get, remove, update };
});
