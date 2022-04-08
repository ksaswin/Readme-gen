<template>
  <app-editor></app-editor>
</template>

<script>
import AppEditor from "./views/AppEditor.vue";

export default {
  name: "App",
  components: {
    AppEditor,
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
  display: flex;
  flex-direction: column;
  align-items: center;
  color: rgb(200, 200, 200);
}

.app-name p {
  font-size: 12px;
  margin: 0;
}

.md-logo {
  width: 60%;
}

.github-img {
  width: 80%;
  padding-top: 10px;
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
