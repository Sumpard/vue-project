<template>
  <q-input filled v-model="modelValue">
    <template v-slot:prepend>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-date v-model="modelValue" mask="YYYY-MM-DD HH:mm" today-btn />
        </q-popup-proxy>
      </q-icon>
    </template>
    <template v-slot:append>
      <q-icon name="access_time" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-time v-model="modelValue" mask="YYYY-MM-DD HH:mm" format24h now-btn />
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script setup lang="ts">
const modelValue = defineModel<string>();
</script>

<style scoped></style>
