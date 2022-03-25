<template>
  <div class="markdown-containers">
    <all-sections :isLight="isLight"></all-sections>
    <div class="container wrappers-common">
      <h4 class="editor">Editor</h4>
      <textarea
        class="common-section"
        v-model="sections.title.content"
        :style="isLight ? darkBorder : ''"
      ></textarea>
    </div>
    <div class="container wrappers-common">
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
      <div
        v-html="markdownToHtml"
        class="view-area common-section"
        :style="isLight ? darkBorder : ''"
      ></div>
    </div>
  </div>
</template>

<script>
import { marked } from "marked";
import { sections } from "@/defaults";
import AllSections from "./AllSections.vue";

export default {
  components: { AllSections },
  name: "MarkDown",
  props: {
    isLight: Boolean,
  },
  data() {
    return {
      sections,
      selected: {
        color: "rgb(84, 181, 132)",
      },
      view: "preview",
      darkBorder: {
        border: "1px solid rgb(38, 38, 38)",
      },
      darkText: {
        color: "black",
      },
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
  flex-basis: 38%;
}

.editor {
  color: rgb(84, 181, 132);
  margin: 10px 0 10px 20px;
}

.view-changer {
  display: flex;
}

h4 {
  margin: 10px 30px 10px 20px;
}

.view-changer h4 {
  cursor: pointer;
}

.common-section {
  border: 1px solid rgb(200, 200, 200);
  padding-left: 20px;
  border-radius: 10px;
  height: calc(100% - 50px);
}

.view-area {
  overflow-y: auto;
}

textarea {
  font-size: 15px;
  resize: none;
  outline: none;
  background-color: rgb(38, 38, 38);
  color: rgb(200, 200, 200);
}
</style>
