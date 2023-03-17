<template>
  <div class='markdown-containers'>
    <!-- Templates selector section -->
    <all-sections
      @selected-index='changeCurrentContent'
      :isLight='isLight'
    ></all-sections>
    <!-- Templates selector section -->

    <!-- Editor area -->
    <div class='container wrappers-common'>
      <h4 class='editor'>Editor</h4>
      <textarea
        v-if='workingIndex >= 0'
        v-model='store.usedSections[workingIndex].content'
        wrap='off'
        id='mdeditor'
        class='common-section'
        :class='{ "dark-border": isLight }'
      ></textarea>
      <div v-else>
        <h5 class='editor'>
          Select a section from the sidebar to edit the contents.
        </h5>
      </div>
    </div>
    <!-- Editor area -->

    <!-- Preview area -->
    <div class='container wrappers-common'>
      <!-- Buttons to change preview mode and copy to clipboard -->
      <div class='view-changer'>
        <!-- Markdown rendered or raw markdown mode selectors -->
        <div class='changer-selections'>
          <h4
            :class='{ selected: (view === ContentViewModes.preview) }'
            @click='view = ContentViewModes.preview'
          >
            Preview
          </h4>
          <h4 :class='{ selected: (view === ContentViewModes.raw) }' @click='view = ContentViewModes.raw'>
            Raw
          </h4>
        </div>
        <!-- Markdown rendered or raw markdown mode selectors -->

        <!-- Copy to clipboard buttons -->
        <button class='clipboard-btn' @click='copyToClipboard()'>
          <img
            v-if='clipboardCopyStatus'
            src='../assets/icons/clipboard_copied.png'
            alt='Copy to clipboard icon'
            class='clipboard'
          />
          <img
            v-else
            src='../assets/icons/clipboard_texts.png'
            alt='Copy to clipboard icon'
            class='clipboard'
          />
        </button>
        <!-- Copy to clipboard buttons -->
      </div>
      <!-- Buttons to change preview mode and copy to clipboard -->

      <!-- Markdown render preview area -->
      <div
        v-if='view === ContentViewModes.preview'
        v-html='markdownToHtml'
        class='view-area common-section'
        :class='{ "dark-border": isLight }'
      ></div>
      <!-- Markdown render preview area -->

      <!-- Raw markdown preview area -->
      <textarea
        disabled
        v-else
        v-html='showRawMarkdown'
        class='view-area common-section'
        :class='{ "dark-border": isLight }'
      ></textarea>
      <!-- Raw markdown preview area -->
    </div>
    <!-- Preview area -->
  </div>
</template>

<script setup lang='ts'>
import { ref, computed } from 'vue';
import { marked } from 'marked';

import { ContentViewModes, type Section, type ContentViewModesType } from '@/models/sections';
import { useMdStore } from '@/store/mdstore';
import AllSections from './AllSections.vue';


export interface Props {
  isLight: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isLight: false
});

const store = useMdStore();

const workingIndex = ref(0);
const view = ref<ContentViewModesType>(ContentViewModes.preview);
const clipboardCopyStatus = ref(false);

const markdownToHtml = computed(() => {
  return marked(store.allContent);
});

const showRawMarkdown = computed((): string => {
  return store.allContent;
});

function changeCurrentContent(index: number): void {
  workingIndex.value = index;
}

function copyToClipboard(): void {
  try {
    navigator.clipboard.writeText(store.allContent);

    clipboardCopyStatus.value = true;
    setTimeout(() => {
      clipboardCopyStatus.value = false;
    }, 2000);
  } catch (err) {
    alert('Sorry, unable to copy the text. Try again!');
  }
}
</script>

<style lang='scss' scoped>
.selected {
  color: rgb(84, 181, 132);
}

.dark-border {
  border: 1px solid rgb(38, 38, 38);
}

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
