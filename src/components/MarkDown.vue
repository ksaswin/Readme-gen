<template>
  <div class="markdown-containers">
    <div class="container">
      <h4 class="editor">Editor</h4>
      <textarea v-model="sections.title.content"></textarea>
    </div>
    <div class="container">
      <div class="view-changer">
        <h4>Preview</h4>
        <h4>Raw</h4>
      </div>
      <div v-html="markdownToHtml"></div>
    </div>
  </div>
</template>

<script>
import { marked } from "marked";
import { sections } from "@/defaults";

export default {
  name: "MarkDown",
  props: {
    darkmode: Boolean,
  },
  data() {
    return {
      sections,
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
}

.container {
  /* background: rgb(218, 218, 218); */
  flex-basis: 50%;
  padding: 5px;
  margin: 5px;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
}

.editor {
  margin: none;
}

.view-changer {
  display: flex;
}

.view-changer h4 {
  margin: 10px;
}

textarea {
  font-size: 15px;
  resize: none;
  border: rgb(200, 200, 200);
  outline: none;
  background-color: rgb(38, 38, 38);
  color: rgb(200, 200, 200);
  height: 100%;
}
</style>
