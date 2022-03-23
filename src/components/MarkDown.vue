<template>
  <div v-html="markdownToHtml"></div>
</template>

<script>
import { marked } from "marked";

export default {
  name: "MarkDown",
  data() {
    return {
      markdown: {
        title: `
# Project Title

A brief description of what this project does and who it's for

`,
      },
    };
  },
  computed: {
    markdownToHtml() {
      return marked(this.markdown.title);
    },
  },
};
</script>
