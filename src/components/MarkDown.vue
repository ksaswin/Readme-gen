<template>
  <div class="markdown-containers">
    <all-sections
      @selected-index="changeCurrentContent"
      :isLight="isLight"
    ></all-sections>
    <div class="container wrappers-common">
      <h4 class="editor">Editor</h4>
      <textarea
        class="common-section"
        v-model="currentContent"
        :style="isLight ? darkBorder : ''"
        wrap="off"
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
        v-if="view === 'preview'"
        v-html="markdownToHtml"
        class="view-area common-section"
        :style="isLight ? darkBorder : ''"
      ></div>
      <textarea
        disabled
        v-if="view === 'raw'"
        v-html="showRawMarkdown"
        class="view-area common-section"
        :style="isLight ? darkBorder : ''"
      ></textarea>
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
      defaults: sections[1],
      usedSections: sections[0],
      selected: {
        color: "rgb(84, 181, 132)",
      },
      view: "preview",
      darkBorder: {
        border: "1px solid rgb(38, 38, 38)",
      },
      workingIndex: 0,
      currentContent: sections[0][0].content,
      fullPreviewText: "",
    };
  },
  methods: {
    changeCurrentContent(index) {
      this.currentContent = this.usedSections[index].content;
      this.workingIndex = index;
    },
    // findCurrentSelection() {
    //   for (let i = 0; i < this.usedSections.length; i++) {
    //     if (this.usedSections[i].selected)
    //       this.currentContent = this.usedSections[i].content;
    //   }
    // },
    addtoPreview() {
      this.fullPreviewText = "";
      for (let i = 0; i < this.usedSections.length; i++) {
        this.fullPreviewText += this.usedSections[i].content;
      }
    },
    copyToClipboard() {
      this.$copyText(this.fullPreviewText)
        .then(() => {
          console.log("copied!");
        })
        .catch(() => {
          console.log(`can't copy`);
        });
    },
  },
  watch: {
    currentContent: function () {
      this.usedSections[this.workingIndex].content = this.currentContent;
    },
  },
  computed: {
    // editCurrentContent() {
    //   this.findCurrentSelection();
    //   return this.currentContent;
    // },
    markdownToHtml() {
      this.addtoPreview();
      return marked(this.fullPreviewText);
    },
    showRawMarkdown() {
      this.addtoPreview();
      return this.fullPreviewText;
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
