<template>
  <div class="header-wrapper">
    <div class="app-name">Readme Generator</div>
    <div>
      <button @click="darkModeSet = !darkModeSet">
        {{ darkModeSet ? "&#9788;" : "&#9790;" }}
      </button>
    </div>
  </div>
  <mark-down></mark-down>
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
      darkModeSet: false,
      darkMode: {
        background: "rgb(38, 38, 38)",
        color: "rgb(200, 200, 200)",
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
  overflow: hidden;
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

button {
  border: none;
  background: none;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 40px;
  color: rgb(200, 200, 200);
}
</style>
