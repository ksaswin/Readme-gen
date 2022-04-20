<template>
  <router-view />
</template>

<script>
export default {
  name: "App",
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
