<template>
  <div class="markdown-containers">
    <all-sections
      @selected-index="changeCurrentContent"
      :isLight="isLight"
    ></all-sections>
    <div class="container wrappers-common">
      <h4 class="editor">Editor</h4>
      <textarea
        v-if="workingIndex >= 0"
        class="common-section"
        v-model="currentContent"
        :style="isLight ? darkBorder : ''"
        wrap="off"
      ></textarea>
      <div v-else :style="isLight ? darkBorder : ''">
        <h5 class="editor">
          Select a section from the sidebar to edit the contents.
        </h5>
      </div>
    </div>
    <div class="container wrappers-common">
      <div class="view-changer">
        <div class="changer-selections">
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
        <button class="clipboard-btn" @click="copyToClipboard()">
          <img
            v-if="clipboardCopyStatus"
            src="../assets/icons/clipboard_copied.png"
            alt="Copy to clipboard icon"
            class="clipboard"
          />
          <img
            v-else
            src="../assets/icons/clipboard_texts.png"
            alt="Copy to clipboard icon"
            class="clipboard"
          />
        </button>
      </div>
      <div
        v-if="view === 'preview'"
        v-html="markdownToHtml"
        class="view-area common-section"
        :style="isLight ? darkBorder : ''"
      ></div>
      <textarea
        disabled
        v-else
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
      clipboardCopyStatus: false,
    };
  },
  methods: {
    changeCurrentContent(index) {
      if (index >= 0) this.currentContent = this.usedSections[index].content;
      this.workingIndex = index;
    },
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
          this.clipboardCopyStatus = true;
          setTimeout(() => {
            return (this.clipboardCopyStatus = false);
          }, 3000);
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
  align-items: center;
  justify-content: space-between;
  padding-right: 10px;
}

.changer-selections {
  display: flex;
}

h4 {
  margin: 10px 30px 10px 20px;
}

.view-changer h4 {
  cursor: pointer;
}

.clipboard {
  width: 50%;
}

.clipboard-btn {
  cursor: pointer;
  border: none;
  background: none;
}

.clipboard-btn:active {
  background: #888;
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
