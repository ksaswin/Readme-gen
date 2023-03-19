<template>
  <div class='main' :class='{ light: isLightModeSet }'>
    <mark-down></mark-down>
  </div>
</template>

<script setup lang='ts'>
import { computed } from 'vue';

import { useMdStore } from '@/store/mdstore';
import MarkDown from '@/components/MarkDown.vue';

const store = useMdStore();

const isLightModeSet = computed((): boolean => {
  return store.isLightModeEnabled;
});
</script>

<style>
.light {
  background: rgb(220, 220, 220);
  color: rgb(38, 38, 38);
}
</style>

