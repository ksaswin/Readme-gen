<template>
  <div class="main" :style="lightModeSet ? lightMode : ''">
    <mark-down :isLight="lightModeSet"></mark-down>
  </div>
</template>

<script>
import MarkDown from "@/components/MarkDown.vue";

export default {
  name: "App",
  components: {
    MarkDown,
  },
  data() {
    return {
      lightModeSet: false,
      lightMode: {
        background: "rgb(220, 220, 220)",
        color: "rgb(38, 38, 38)",
      },
    };
  },
};
</script>

