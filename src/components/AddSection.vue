<template>
  <div class="custom-window">
    <div class="all-contents">
      <h3 class="custom-header">New Custom Section</h3>
      <input
        class="section-name"
        placeholder="Section Title"
        v-model="titleName"
      />
      <div class="all-buttons">
        <button class="cancel" @click="closeModal()">Cancel</button>
        <button
          class="add"
          @click="addNewSection()"
          :disabled="titleName.length > 0 ? false : true"
        >
          Add Section
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["close-trigger", "add-new"],
  data() {
    return {
      titleName: "",
    };
  },
  methods: {
    closeModal() {
      this.$emit("close-trigger");
    },
    addNewSection() {
      this.$emit("add-new", this.titleName);
      this.closeModal();
    },
  },
};
</script>

<style scoped>
.custom-window {
  z-index: 500;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.25);
}

.all-contents {
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  display: flex;
  flex-direction: column;
  background: white;
  width: 35vw;
  height: 25vh;
  margin: 20% auto;

  border-radius: 10px;
}

.custom-header {
  margin-bottom: 10px;
  margin-top: 40px;
  color: rgb(38, 38, 38);
  text-align: center;
}

.section-name {
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  height: 35px;
  width: 85%;
  margin: 10px auto;
  padding-left: 10px;
  border-radius: 8px;
  resize: none;
  border: none;
  outline: 1px solid #888;
}

.section-name:focus {
  outline: 2px solid rgb(84, 181, 132);
}

.all-buttons {
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
}

button {
  background: none;
  border-radius: 5px;
  flex-basis: 50%;
  height: 180%;
  font-size: 15px;
  cursor: pointer;
}

button:disabled {
  background: rgba(84, 181, 133, 0.5);
}

.cancel {
  border: 1px solid #888;
  margin: 0 5px 0 30px;
}

.add {
  border: none;
  margin: 0 30px 0 5px;
  background: rgb(84, 181, 132);
  color: white;
}
</style>
