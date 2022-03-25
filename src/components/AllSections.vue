<template>
  <div class="sections-wrapper wrappers-common">
    <h4 class="sections-head">Sections</h4>
    <div class="templates-section">
      <p class="section-header" :style="isLight ? darkText : ''">
        Click on an icon below to add a quick template
      </p>
      <div class="quick-templates">
        <button class="template-icons">
          <img
            class="template-img"
            src="@/assets/icons/code.png"
            alt="Code icon"
          />
        </button>
        <button class="template-icons">
          <img
            class="template-img"
            src="@/assets/icons/link.png"
            alt="Link icon"
          />
        </button>
      </div>
    </div>
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
      sections,
      darkText: {
        color: "black",
      },
    };
  },
};
</script>

<style scoped>
.sections-wrapper {
  flex-basis: 24%;
  min-width: 340px;
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
}

.change-order {
  display: flex;
  flex-direction: column;
  max-width: 20px;
  min-height: 40px;
}

.section-right {
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