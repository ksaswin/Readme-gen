<template>
  <div class="main" :style="lightModeSet ? lightMode : ''">
    <div class="header-wrapper">
      <div class="app-name">Readme Generator</div>
      <div class="header-buttons-div">
        <button class="header-btn" @click="lightModeSet = !lightModeSet">
          {{ lightModeSet ? "&#9790;" : "&#9788;" }}
        </button>
        <button class="header-btn">
          <a href="https://github.com/ksaswin" target="_blank">
            <img src="@/assets/icons/github.svg" alt=""
          /></a>
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

.header-buttons-div {
  display: flex;
  align-items: center;
}

.header-btn {
  border: none;
  background: none;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 40px;
  color: rgb(200, 200, 200);
  cursor: pointer;
  margin-left: 20px;
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

a {
  color: rgb(240, 180, 28);
  text-decoration: none;
}

code {
  display: block;
  background: rgb(30, 30, 30);
  color: rgb(200, 200, 200);
  white-space: pre;
  -webkit-overflow-scrolling: touch;
  overflow-x: scroll;
  max-width: 90%;
  padding: 15px;
  border-radius: 8px;
}

table {
  border: 1px solid white;
  border-collapse: collapse;
}

table th,
table td {
  text-align: left;
  padding: 0.8rem 1rem;
  border: 1px solid white;
  vertical-align: middle;
}

img {
  max-width: 100%;
  height: auto;
}
</style>
