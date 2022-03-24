<template>
  <div class="markdown-containers">
    <div class="sections-wrapper wrappers-common">
      <h4 class="sections-head">Sections</h4>
      <div class="selected-sections">
        <p :style="isLight ? darkText : ''">
          Click on a section below to edit the contents
        </p>
      </div>
      <div class="available-sections">
        <p :style="isLight ? darkText : ''">
          Click on a section below to add it to your readme
        </p>
      </div>
    </div>
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

export default {
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

.wrappers-common {
  padding: 5px;
  margin: 5px;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
}

.sections-wrapper {
  flex-basis: 24%;
}

.sections-head {
  color: rgb(84, 181, 132);
  margin: 10px 0 10px 20px;
}

.sections-wrapper p {
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  font-size: 11px;
  color: white;
  margin-left: 30px;
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
