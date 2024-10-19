<template>
    <div class='header-wrapper'>
      <div class='app-name'>
        <router-link :to='{ name: "Home" }' class='md-logo'>
          <img src='@/assets/icons/markdown.png' alt='readme gen logo' />
        </router-link>
        <p><a :href='readmeSoUri'>readme.so</a> re-write in Vue</p>
      </div>

      <div class='header-buttons-div'>
        <button v-if='isInEditorPage' class='header-btn toggle-theme-icon' @click='store.toggleLightMode'>
          {{ isLightModeSet ? '&#9790;' : '&#9788;' }}
        </button>
        <button v-if='isInEditorPage' class='download-readme-btn' @click='store.download'>Download</button>
        <button class='header-btn'>
          <a :href='repoGithubUri'>
            <img class='github-img' src='@/assets/icons/github.svg' alt='Github icon'/>
          </a>
        </button>
      </div>
    </div>
    <router-view />
</template>

<script setup lang='ts'>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import { useMdStore } from '@/store/mdstore';


const route = useRoute();
const store = useMdStore();

const routePaths = {
  homePage: 'Home',
  editorPage: 'Editor'
};

const repoGithubUri = import.meta.env.VITE_GITHUB_APP_REPO_URI;
const readmeSoUri = import.meta.env.VITE_README_SO_URI;

const isLightModeSet = computed((): boolean => {
  return store.isLightModeEnabled;
});

const isInEditorPage = computed((): boolean => {
  return route.name === routePaths.editorPage;
});
</script>

<style lang='scss'>
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

  .app-name {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: rgb(200, 200, 200);

    .md-logo {
      width: 60%;
    }

    p {
      font-size: 12px;
      margin: 0;
    }
  }

  .header-buttons-div {
    display: flex;
    align-items: center;
    gap: 12px;

    .header-btn {
      border: none;
      background: none;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      color: rgb(200, 200, 200);
      cursor: pointer;
      padding: 0;

      .github-img {
        width: 80%;
        padding-top: 10px;
      }
    }

    .toggle-theme-icon {
      font-size: 40px;
    }

    .download-readme-btn {
      border: none;
      border-radius: 10px;
      padding: 0;
      margin: 6px 0 0 0;
      font-size: 14px;
      height: 45px;
      width: 100px;
      background-color: rgb(84, 181, 132);
      color: white;
    }
  }
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
  background: rgb(30, 30, 30);
  color: rgb(200, 200, 200);
  white-space: pre;
  -webkit-overflow-scrolling: touch;
}

/* pre code is formed within ```here``` */
pre code {
  display: block;
  overflow-x: scroll;
  max-width: 90%;
  padding: 15px;
  border-radius: 8px;
}

/* p code is formed within `here` */
p code {
  margin: 0;
  padding: 0.2em 0.4em;
  border-radius: 6px;
  word-wrap: break-word;
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
