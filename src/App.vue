<template>
  <div class="main" :style="lightModeSet ? lightMode : ''">
    <div class="header-wrapper">
      <div class="app-name">Readme Generator</div>
      <div>
        <button class="theme-toggle-btn" @click="lightModeSet = !lightModeSet">
          {{ lightModeSet ? "&#9790;" : "&#9788;" }}
        </button>
      </div>
    </div>
    <mark-down :isLight="lightModeSet"></mark-down>
  </div>
</template>

<script>
import MarkDown from "./components/MarkDown.vue";

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

<style>
html {
  height: 100%;
}

body {
  height: 100%;
  margin: 0;
  background: rgb(38, 38, 38);
  color: rgb(200, 200, 200);
}

.header-wrapper {
  display: flex;
  padding: 1rem;
  justify-content: space-between;
  align-items: center;
  background: rgb(38, 38, 38);
}

.app-name {
  font-size: 20px;
  color: rgb(200, 200, 200);
}

.theme-toggle-btn {
  border: none;
  background: none;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 40px;
  color: rgb(200, 200, 200);
  cursor: pointer;
}

.wrappers-common {
  padding: 5px;
  margin: 5px;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
}
</style>
