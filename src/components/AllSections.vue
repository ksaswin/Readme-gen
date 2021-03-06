<template>
  <div class="sections-wrapper wrappers-common">
    <h4 class="sections-head">Sections</h4>
    <!-- Quick template tools section -->
    <div class="templates-section">
      <p class="section-header" :style="isLight ? darkText : ''">
        Click on an icon below to add a quick template
      </p>
      <div class="quick-templates">
        <button class="template-icons" @click="appendQuickTemplate('code')">
          <img
            class="template-img"
            src="@/assets/icons/code.png"
            alt="Code icon"
          />
        </button>
        <button class="template-icons" @click="appendQuickTemplate('link')">
          <img
            class="template-img"
            src="@/assets/icons/link.png"
            alt="Link icon"
          />
        </button>
        <button class="template-icons" @click="appendQuickTemplate('image')">
          <img
            class="template-img-table"
            src="@/assets/icons/image.png"
            alt="Image icon"
          />
        </button>
        <button class="template-icons" @click="appendQuickTemplate('table')">
          <img
            class="template-img-table"
            src="@/assets/icons/table.png"
            alt="Table icon"
          />
        </button>
      </div>
    </div>
    <!-- Quick template tools section -->

    <div class="scrollable-sections">
      <!-- Templates used for user's markdown -->
      <div class="selected-sections">
        <p class="section-header" :style="isLight ? darkText : ''">
          Click on a section below to edit the contents
        </p>
        <ul class="section-name">
          <li v-for="(section, index) in usedSections" :key="section.id">
            <button
              class="section-btn"
              @click="toggleSelection(section.id)"
              :style="section.selected ? borderGlow : ''"
            >
              <div class="change-order">
                <img
                  v-show="section.selected"
                  src="@/assets/icons/arrow-up.svg"
                  alt="arrow up icon"
                  class="arrow-icon"
                  @click.stop="changeSectionOrder(index, -1)"
                />
                <img
                  v-show="section.selected"
                  src="@/assets/icons/arrow-down.svg"
                  alt="arrow down icon"
                  class="arrow-icon"
                  @click.stop="changeSectionOrder(index, 1)"
                />
              </div>
              <p class="section-title">
                {{ section.name }}
              </p>
              <div class="section-right">
                <img
                  v-show="section.selected"
                  src="@/assets/icons/delete.png"
                  alt="delete icon"
                  class="delete-icon"
                  @click.stop="removeSection(index)"
                />
              </div>
            </button>
          </li>
        </ul>
      </div>
      <!-- Templates used for user's markdown -->

      <!-- Templates available for user's markdown -->
      <div class="available-sections">
        <p class="section-header" :style="isLight ? darkText : ''">
          Click on a section below to add it to your readme
        </p>
        <button class="section-btn custom-section" @click="addNew = true">
          <h3 class="custom-title">+ Custom Section</h3>
        </button>
        <ul class="section-name available">
          <li v-for="section in availableSections" :key="section.id">
            <button class="section-btn" @click="moveToUsed(section)">
              <p class="available-title">
                {{ section.name }}
              </p>
            </button>
          </li>
        </ul>
      </div>
      <!-- Templates available for user's markdown -->
    </div>
  </div>
  <add-section
    v-if="addNew"
    @close-trigger="addNew = false"
    @add-new="addNewSection"
  ></add-section>
</template>

<script>
import { sections } from "@/defaults";
import AddSection from "./AddSection.vue";

var id = 100;

export default {
  name: "AllSections",
  props: {
    isLight: Boolean,
  },
  emits: ["selected-index"],
  components: { AddSection },
  data() {
    return {
      usedSections: sections[0],
      availableSections: sections[1],
      darkText: {
        color: "black",
      },
      borderGlow: {
        border: "2px solid rgb(84, 181, 132)",
      },
      quickCode: "\n```bash\n  npm run deploy\n```\n",
      quickLink: "[The name goes here](Your link goes here)\n",
      quickImage: "\n![Image name here](Image url here)\n",
      quickTable: `\n| Syntax      | Description |
| ----------- | ----------- |
| Header      | Title       |
| Paragraph   | Text        |\n`,
      addNew: false,
    };
  },
  methods: {
    changeSectionOrder(index, direction) {
      if (
        (index === 0 && direction === -1) ||
        (index === this.usedSections.length && direction === 1)
      )
        return;
      var element = this.usedSections[index];
      this.usedSections.splice(index, 1);
      this.usedSections.splice(index + direction, 0, element);
      this.$emit("selected-index", index + direction);
    },
    removeSection(index) {
      this.usedSections[index].selected = false;
      this.availableSections.unshift(this.usedSections[index]);
      this.availableSections.sort((a, b) =>
        a.name > b.name ? 1 : b.name > a.name ? -1 : 0
      );
      this.usedSections.splice(index, 1);
      this.$emit("selected-index", -1);
    },
    toggleSelection(id, toggleOrMove = "toggle") {
      let emitIndex = 0;
      for (let i = 0; i < this.usedSections.length; i++) {
        if (id === this.usedSections[i].id) {
          emitIndex = i;
          this.usedSections[i].selected = true;
        } else this.usedSections[i].selected = false;
      }
      if (toggleOrMove === "toggle") this.$emit("selected-index", emitIndex);
    },
    moveToUsed(section) {
      for (let i = 0; i < this.availableSections.length; i++) {
        if (section.id === this.availableSections[i].id) {
          this.availableSections.splice(i, 1);
          break;
        }
      }
      section.selected = true;
      this.toggleSelection(section.id, "move");
      this.usedSections.push(section);
      this.$emit("selected-index", this.usedSections.length - 1);
    },
    writeContent(cursorPosition, index, templateText) {
      let contentsBeforeCursor = this.usedSections[index].content.slice(
        0,
        cursorPosition
      );
      let contentsAfterCursor =
        this.usedSections[index].content.slice(cursorPosition);
      this.usedSections[
        index
      ].content = `${contentsBeforeCursor}${templateText}${contentsAfterCursor}`;
    },
    appendQuickTemplate(quickTemplateChoice) {
      try {
        let cursorPosition = document.getElementById("mdeditor").selectionStart;

        let index = 0;
        for (let i = 0; i < this.usedSections.length; i++) {
          if (this.usedSections[i].selected) {
            index = i;
          }
        }

        if (quickTemplateChoice === "code")
          this.writeContent(cursorPosition, index, this.quickCode);
        else if (quickTemplateChoice === "link")
          this.writeContent(cursorPosition, index, this.quickLink);
        else if (quickTemplateChoice === "image")
          this.writeContent(cursorPosition, index, this.quickImage);
        else if (quickTemplateChoice === "table")
          this.writeContent(cursorPosition, index, this.quickTable);

        this.$emit("selected-index", index);
      } catch (error) {
        console.log(`error: ${error}`);
        alert(
          "Looks like you have not selected a section yet!\nPlease select a section to add the template."
        );
      }
    },
    addNewSection($name) {
      let newSection = {
        selected: false,
        name: $name,
        id: id++,
        content: `
## ${$name}`,
      };
      this.availableSections.push(newSection);
      this.moveToUsed(newSection);
    },
  },
};
</script>

<style lang="scss" scoped>
@mixin sectionHeader() {
  .section-header {
    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
      "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
    font-size: 11px;
    color: white;
    margin-left: 30px;
  }
}

.sections-wrapper {
  flex-basis: 24%;
  min-width: 340px;

  .sections-head {
    color: rgb(84, 181, 132);
    margin: 10px 0 10px 20px;
  }

  .templates-section {
    margin-bottom: 10px;

    @include sectionHeader();

    .quick-templates {
      display: flex;
      padding-left: 20px;

      .template-icons {
        background: none;
        border: none;
        cursor: pointer;
        margin-right: 5px;

        .template-img {
          width: 60%;
        }

        .template-img-table {
          width: 50%;
        }
      }
    }
  }

  .scrollable-sections {
    overflow-y: auto;

    @include sectionHeader();

    .section-name {
      padding-left: 25px;

      li {
        list-style: none;

        .change-order {
          display: flex;
          flex-direction: column;
          min-width: 20px;
          max-width: 20px;
          min-height: 40px;
        }

        .arrow-icon {
          width: 100%;
          padding: 5px 0px 5px 0px;
        }

        .section-right {
          min-width: 40px;
          max-width: 40px;
          min-height: 30px;

          .delete-icon {
            width: 70%;
          }
        }

        .available-title {
          padding-left: 10px;
        }
      }
    }

    .section-btn {
      font-size: 12px;
      border-radius: 7px;
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
      cursor: pointer;
      margin-bottom: 10px;
    }

    .custom-section {
      margin-left: 25px;

      .custom-title {
        margin: 0 auto;
      }
    }
  }
}
</style>
