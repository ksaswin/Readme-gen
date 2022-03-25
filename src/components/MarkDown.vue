<template>
  <div class="markdown-containers">
    <div class="sections-wrapper wrappers-common">
      <h4 class="sections-head">Sections</h4>
      <div class="selected-sections">
        <p class="section-header" :style="isLight ? darkText : ''">
          Click on a section below to edit the contents
        </p>
        <ul class="section-name used">
          <li>
            <button class="section-btn">
              <div class="change-order">
                <img
                  src="@/assets/icons/arrow-up.svg"
                  alt="arrow up icon"
                  class="arrow-icon"
                />
                <img
                  src="@/assets/icons/arrow-down.svg"
                  alt="arrow down icon"
                  class="arrow-icon"
                />
              </div>
              <p class="section-title">Title and description</p>
              <div class="section-right">
                <img
                  src="@/assets/icons/delete.png"
                  alt="delete icon"
                  class="delete-icon"
                />
              </div>
            </button>
          </li>
        </ul>
      </div>
      <div class="available-sections">
        <p class="section-header" :style="isLight ? darkText : ''">
          Click on a section below to add it to your readme
        </p>
        <ul class="section-name available">
          <li>
            <button class="section-btn">
              <p class="available-title">Title and description</p>
            </button>
          </li>
        </ul>
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
  min-width: 340px;
  overflow-y: auto;
}

.sections-head {
  color: rgb(84, 181, 132);
  margin: 10px 0 10px 20px;
}

.section-name {
  padding-left: 25px;
}

.section-header {
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  font-size: 11px;
  color: white;
  margin-left: 30px;
}

li {
  list-style: none;
}

.section-btn {
  font-size: 12px;
  border-radius: 7px;
  /* font-family: Courier New; */
  color: #000000;
  font-size: 15px;
  background: #ffffff;
  box-shadow: 0px 4px 4px #363636;
  padding: 0px 10px 0px 10px;
  border: none;
  text-decoration: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  width: 290px;
}

.change-order {
  display: flex;
  flex-direction: column;
}

.arrow-icon {
  width: 30%;
  padding: 5px 0px 5px 0px;
}

.delete-icon {
  width: 40%;
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

.available-title {
  padding-left: 10px;
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
