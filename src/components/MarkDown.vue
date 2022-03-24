<template>
  <div class="markdown-containers">
    <div class="container">
      <h4 class="editor">Editor</h4>
      <textarea v-model="sections.title.content"></textarea>
    </div>
    <div class="container">
      <div class="view-changer">
        <h4
          :style="view === 'preview' ? selected : ''"
          @click="view = 'preview'"
        >
          Preview
        </h4>
        <h4 :style="view === 'raw' ? selected : ''" @click="view = 'raw'">
          Raw
        </h4>
      </div>
      <div v-html="markdownToHtml" class="view-area"></div>
    </div>
  </div>
</template>

<script>
import { marked } from "marked";
import { sections } from "@/defaults";

export default {
  name: "MarkDown",
  data() {
    return {
      sections,
      selected: {
        color: "rgb(84, 181, 132)",
      },
      view: "preview",
    };
  },
  computed: {
    markdownToHtml() {
      return marked(this.sections.title.content);
    },
  },
};
</script>

<style scoped>
.markdown-containers {
  display: flex;
  height: 90vh;
  font-family: "Courier New", Courier, monospace;
}

.container {
  flex-basis: 50%;
  padding: 5px;
  margin: 5px;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
}

.editor {
  margin: none;
  color: rgb(84, 181, 132);
}

.view-changer {
  display: flex;
}

.view-changer h4 {
  margin: 10px;
}

.view-area {
  border: 1px solid rgb(200, 200, 200);
  height: calc(100% - 50px);
  overflow-y: auto;
  padding-left: 20px;
}

textarea {
  font-size: 15px;
  resize: none;
  border: rgb(200, 200, 200);
  outline: none;
  background-color: rgb(38, 38, 38);
  color: rgb(200, 200, 200);
  height: 100%;
  padding-left: 20px;
}
</style>
