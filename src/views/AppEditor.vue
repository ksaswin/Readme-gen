<template>
  <div class="main" :style="lightModeSet ? lightMode : ''">
    <!-- Top header section starts here -->
    <div class="header-wrapper">
      <!-- Title and subtitle -->
      <div class="app-name">
        <router-link :to="{ name: 'Home' }" class="md-logo">
          <img src="@/assets/icons/markdown.png" alt="readme gen logo" />
        </router-link>
        <p>A <a href="https://readme.so/editor">readme.so</a> clone</p>
      </div>
      <!-- Title and subtitle -->

      <!-- View mode toggle and Github link -->
      <div class="header-buttons-div">
        <button class="header-btn" @click="lightModeSet = !lightModeSet">
          {{ lightModeSet ? "&#9790;" : "&#9788;" }}
        </button>
        <button class="header-btn">
          <a href="https://github.com/ksaswin/Readme-gen">
            <img class="github-img" src="@/assets/icons/github.svg" alt=""
          /></a>
        </button>
      </div>
      <!-- View mode toggle and Github link -->
    </div>
    <!-- Top header section starts here -->
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

<style lang="scss" scoped>
@import "../styles/headers";
</style>
