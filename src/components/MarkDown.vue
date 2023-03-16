<template>
  <div class="markdown-containers">
    <!-- Templates selector section -->
    <all-sections
      @selected-index="changeCurrentContent"
      :isLight="isLight"
    ></all-sections>
    <!-- Templates selector section -->

    <!-- Editor area -->
    <div class="container wrappers-common">
      <h4 class="editor">Editor</h4>
      <textarea
        v-if="workingIndex >= 0"
        id="mdeditor"
        class="common-section"
        v-model="usedSections[workingIndex].content"
        :style="isLight ? darkBorder : ''"
        wrap="off"
      ></textarea>
      <div v-else>
        <h5 class="editor">
          Select a section from the sidebar to edit the contents.
        </h5>
      </div>
    </div>
    <!-- Editor area -->

    <!-- Preview area -->
    <div class="container wrappers-common">
      <!-- Buttons to change preview mode and copy to clipboard -->
      <div class="view-changer">
        <!-- Markdown rendered or raw markdown mode selectors -->
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
        <!-- Markdown rendered or raw markdown mode selectors -->

        <!-- Copy to clipboard buttons -->
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
        <!-- Copy to clipboard buttons -->
      </div>
      <!-- Buttons to change preview mode and copy to clipboard -->

      <!-- Markdown render preview area -->
      <div
        v-if="view === 'preview'"
        v-html="markdownToHtml"
        class="view-area common-section"
        :style="isLight ? darkBorder : ''"
      ></div>
      <!-- Markdown render preview area -->

      <!-- Raw markdown preview area -->
      <textarea
        disabled
        v-else
        v-html="showRawMarkdown"
        class="view-area common-section"
        :style="isLight ? darkBorder : ''"
      ></textarea>
      <!-- Raw markdown preview area -->
    </div>
    <!-- Preview area -->
  </div>
</template>

<script>
import { marked } from "marked"; // Module to render markdown content
import { sections } from "@/defaults"; // Contains all the default templates
import AllSections from "./AllSections.vue"; // Component for template selector section

export default {
  components: { AllSections },
  name: "MarkDown",
  props: {
    isLight: Boolean,
  },
  data() {
    return {
      defaults: sections[1], // Contains all the default templates
      usedSections: sections[0], // Keeps track of all the sections that are moved to used
      selected: {
        color: "rgb(84, 181, 132)",
      },
      view: "preview",
      darkBorder: {
        border: "1px solid rgb(38, 38, 38)",
      },
      workingIndex: 0, // Index of the template currently being used
      fullPreviewText: "",
      clipboardCopyStatus: false,
    };
  },
  methods: {
    // Called when a change is detected in currently used section index
    changeCurrentContent(index) {
      this.workingIndex = index;
    },

    // Called by computed methods
    addtoPreview() {
      this.fullPreviewText = "";
      for (let i = 0; i < this.usedSections.length; i++) {
        this.fullPreviewText += this.usedSections[i].content;
      }
    },

    // Called when copy to clipboard button is clicked
    copyToClipboard() {
      this.$copyText(this.fullPreviewText)
        .then(() => {
          this.clipboardCopyStatus = true;
          setTimeout(() => {
            return (this.clipboardCopyStatus = false);
          }, 2000);
        })
        .catch(() => {
          alert("Sorry, unable to copy the text. Try again!");
        });
    },
  },
  computed: {
    // Returns rendered markdown when view mode is Preview
    markdownToHtml() {
      this.addtoPreview();
      return marked(this.fullPreviewText);
    },
    // Returns raw markdown when view mode is Raw
    showRawMarkdown() {
      this.addtoPreview();
      return this.fullPreviewText;
    },
  },
};
</script>

<style lang="scss" scoped>
.markdown-containers {
  display: flex;
  height: 90vh;
  font-family: "Courier New", Courier, monospace;

  .container {
    flex-basis: 38%;

    h4 {
      margin: 10px 30px 10px 20px;
    }

    .editor {
      color: rgb(84, 181, 132);
      margin: 10px 0 10px 20px;
    }

    textarea {
      font-size: 15px;
      resize: none;
      outline: none;
      background-color: rgb(38, 38, 38);
      color: rgb(200, 200, 200);
    }

    .common-section {
      border: 1px solid rgb(200, 200, 200);
      padding-left: 20px;
      border-radius: 10px;
      height: calc(100% - 50px);
    }

    .view-changer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-right: 10px;

      .changer-selections {
        display: flex;

        h4 {
          cursor: pointer;
        }
      }

      .clipboard-btn {
        cursor: pointer;
        border: none;
        background: none;

        .clipboard {
          width: 50%;
        }
      }
    }

    .view-area {
      overflow-y: auto;
    }
  }
}
</style>
