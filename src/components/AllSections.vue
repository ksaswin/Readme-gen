<template>
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
</template>

<script>
export default {
  name: "AllSections",
  props: {
    isLight: Boolean,
  },
  data() {
    return {
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
  border: 1px solid black;
  max-width: 20px;
  min-height: 40px;
}

.section-title {
  /* min-width: 200px; */
}

.arrow-icon {
  width: 30%;
  padding: 5px 0px 5px 0px;
}

.delete-icon {
  width: 40%;
}

.available-title {
  padding-left: 10px;
}
</style>
