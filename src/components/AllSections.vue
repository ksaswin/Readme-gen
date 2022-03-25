<template>
  <div class="sections-wrapper wrappers-common">
    <h4 class="sections-head">Sections</h4>
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
        <button class="template-icons" @click="appendQuickTemplate('table')">
          <img
            class="template-img-table"
            src="@/assets/icons/table.png"
            alt="Table icon"
          />
        </button>
      </div>
    </div>
    <div class="scrollable-sections">
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
                  @click="changeSectionOrder(index, -1)"
                />
                <img
                  v-show="section.selected"
                  src="@/assets/icons/arrow-down.svg"
                  alt="arrow down icon"
                  class="arrow-icon"
                  @click="changeSectionOrder(index, 1)"
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
          <li v-for="section in availableSections" :key="section.id">
            <button class="section-btn" @click="moveToUsed(section)">
              <p class="available-title">
                {{ section.name }}
              </p>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { sections } from "@/defaults";

export default {
  name: "AllSections",
  props: {
    isLight: Boolean,
  },
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
      quickLink: "\n[The name goes here](Your link goes here)\n",
      quickTable: `\n| Syntax      | Description |
| ----------- | ----------- |
| Header      | Title       |
| Paragraph   | Text        |
`,
    };
  },
  methods: {
    changeSectionOrder(index, direction) {
      var element = this.usedSections[index];
      this.usedSections.splice(index, 1);
      this.usedSections.splice(index + direction, 0, element);
    },
    toggleSelection(id) {
      for (let i = 0; i < this.usedSections.length; i++) {
        if (id === this.usedSections[i].id)
          this.usedSections[i].selected = true;
        else this.usedSections[i].selected = false;
      }
    },
    moveToUsed(section) {
      for (let i = 0; i < this.availableSections.length; i++) {
        if (section.id === this.availableSections[i].id) {
          this.availableSections.splice(i, 1);
          break;
        }
      }
      section.selected = true;
      this.toggleSelection(section.id);
      this.usedSections.push(section);
    },
    appendQuickTemplate(quickTemplateChoice) {
      let index = 0;
      for (let i = 0; i < this.usedSections.length; i++) {
        if (this.usedSections[i].selected) {
          index = i;
        }
      }
      if (quickTemplateChoice === "code")
        this.usedSections[index].content += this.quickCode;
      else if (quickTemplateChoice === "link")
        this.usedSections[index].content += this.quickLink;
      else if (quickTemplateChoice === "table")
        this.usedSections[index].content += this.quickTable;
    },
  },
  mounted() {
    this.moveToUsed(this.availableSections[29]);
  },
};
</script>

<style scoped>
.sections-wrapper {
  flex-basis: 24%;
  min-width: 340px;
}

.templates-section {
  margin-bottom: 10px;
}

.scrollable-sections {
  overflow-y: auto;
}

.template-icons {
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 5px;
}

.template-img {
  width: 60%;
}

.template-img-table {
  width: 50%;
}

.quick-templates {
  display: flex;
  padding-left: 20px;
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
  cursor: pointer;
  margin-bottom: 10px;
}

.change-order {
  display: flex;
  flex-direction: column;
  min-width: 20px;
  max-width: 20px;
  min-height: 40px;
}

.section-right {
  min-width: 40px;
  max-width: 40px;
  min-height: 30px;
}

.arrow-icon {
  width: 100%;
  padding: 5px 0px 5px 0px;
}

.delete-icon {
  width: 70%;
}

.available-title {
  padding-left: 10px;
}
</style>
