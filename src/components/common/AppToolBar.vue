<template>
  <q-toolbar>
    <q-btn flat dense round icon="menu" aria-label="Menu" @click="emit('switch-left')" />

    <q-toolbar-title style="max-width: 160px"> Meal tools! </q-toolbar-title>

    <q-space />

    <q-btn flat round dense class="q-mr-xs" icon="o_settings" @click="emit('switch-right')">
      <q-tooltip> 个性化 </q-tooltip>
    </q-btn>
  </q-toolbar>
</template>

<script lang="ts" setup>
const $router = useRouter();

const emit = defineEmits<{
  "switch-left": [];
  "switch-right": [];
}>();
</script>
