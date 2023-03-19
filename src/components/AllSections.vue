<template>
  <div class='sections-wrapper wrappers-common'>
    <h4 class='sections-head'>Sections</h4>
    <!-- Quick template tools section -->
    <div class='templates-section'>
      <p class='section-header' :class='[ isLight ? "dark-text" : "light-text" ]'>
        Click on an icon below to add a quick template
      </p>
      <div class='quick-templates'>
        <button class='template-icons' @click='appendQuickTemplate(TemplateType.code)'>
          <img
            class='template-img'
            src='@/assets/icons/code.png'
            alt='Code icon'
          />
        </button>
        <button class='template-icons' @click='appendQuickTemplate(TemplateType.link)'>
          <img
            class='template-img'
            src='@/assets/icons/link.png'
            alt='Link icon'
          />
        </button>
        <button class='template-icons' @click='appendQuickTemplate(TemplateType.image)'>
          <img
            class='template-img-table'
            src='@/assets/icons/image.png'
            alt='Image icon'
          />
        </button>
        <button class='template-icons' @click='appendQuickTemplate(TemplateType.table)'>
          <img
            class='template-img-table'
            src='@/assets/icons/table.png'
            alt='Table icon'
          />
        </button>
      </div>
    </div>
    <!-- Quick template tools section -->

    <div class='scrollable-sections'>
      <!-- Templates used for user's markdown -->
      <div class='selected-sections'>
        <p class='section-header' :class='[ isLight ? "dark-text" : "light-text" ]'>
          Click on a section below to edit the contents
        </p>
        <ul class='section-name'>
          <li v-for='(section, index) in store.usedSections' :key='section.id'>
            <button
              class='section-btn'
              :class='{ "border-glow": section.selected }'
              @click='toggleSelection(section.id)'
            >
              <div class='change-order'>
                <img
                  v-show='section.selected'
                  src='@/assets/icons/arrow-up.svg'
                  alt='arrow up icon'
                  role='button'
                  class='arrow-icon'
                  @click.stop='changeSectionOrder(index, Directions.up)'
                />
                <img
                  v-show='section.selected'
                  src='@/assets/icons/arrow-down.svg'
                  alt='arrow down icon'
                  role='button'
                  class='arrow-icon'
                  @click.stop='changeSectionOrder(index, Directions.down)'
                />
              </div>
              <p class='section-title'>
                {{ section.name }}
              </p>
              <div class='section-right'>
                <img
                  v-show='section.selected'
                  src='@/assets/icons/delete.png'
                  alt='delete icon'
                  class='delete-icon'
                  @click.stop='removeSection(index)'
                />
              </div>
            </button>
          </li>
        </ul>
      </div>
      <!-- Templates used for user's markdown -->

      <!-- Templates available for user's markdown -->
      <div class='available-sections'>
        <p class='section-header' :class='[ isLight ? "dark-text" : "light-text" ]'>
          Click on a section below to add it to your readme
        </p>
        <button class='section-btn custom-section' @click='addNew = true'>
          <h3 class='custom-title'>+ Custom Section</h3>
        </button>
        <ul class='section-name available'>
          <li v-for='section in store.availableSections' :key='section.id'>
            <button class='section-btn' @click='moveToUsed(section)'>
              <p class='available-title'>
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
    v-if='addNew'
    @close-trigger='addNew = false'
    @add-new='(sectionName) => addNewSection(sectionName)'
  ></add-section>
</template>

<script setup lang='ts'>
import { ref, computed } from 'vue';

import { TemplateType, TemplateValue, type Templates } from '@/models/templates';
import { Directions, ToggleOrMoveSection, SpliceDeleteCount } from '@/models/sections';
import type { Section, DirectionsType, ToggleOrMoveSectionType } from '@/models/sections';
import { useMdStore } from '@/store/mdstore';
import AddSection from '@/components/AddSection.vue';


export interface Emits {
  (eventName: 'selected-index', index: number): void
}

const emit = defineEmits<Emits>();

const store = useMdStore();

const addNew = ref(false);

const isLight = computed((): boolean => store.isLightModeEnabled);

function changeSectionOrder(index: number, direction: DirectionsType): void {
  if ((index === 0 && direction === Directions.up) || (index === store.usedSectionsLength && direction === Directions.down)) {
    return;
  }

  const element = store.usedSections[index];

  store.spliceUsedSection(index, SpliceDeleteCount.one);
  store.spliceUsedSection(index + direction, SpliceDeleteCount.zero, element);

  emit('selected-index', index + direction);
}

function removeSection(index: number): void {
  store.updateSelectedFlagInSection(index, false);

  store.unshiftToAvailableSections(store.usedSections[index]);

  store.spliceUsedSection(index, SpliceDeleteCount.one);

  emit('selected-index', -1);
}

function toggleSelection(id: number, toggleOrMove: ToggleOrMoveSectionType = ToggleOrMoveSection.toggle): void {
  store.updateAllSelectedFlagsInUsedSections(id);

  if (toggleOrMove === ToggleOrMoveSection.toggle) {
    emit('selected-index', store.selectedIndex ?? 0);
  }
}

function moveToUsed(section: Section): void {
  store.addSectionToUsedSections(section);

  toggleSelection(section.id, ToggleOrMoveSection.move);

  emit('selected-index', store.usedSectionsLength - 1);
}

function writeContent(cursorPosition: number, templateText: string): void {
  const contentsBeforeCursor = store.slicedUsedSectionContent(0, cursorPosition);
  const contentsAfterCursor = store.slicedUsedSectionContent(cursorPosition);

  const updateContent = `${contentsBeforeCursor}${templateText}${contentsAfterCursor}`;
  store.updateUsedSectionContent(updateContent);
}

function appendQuickTemplate(quickTemplateChoice: Templates) {
  try {
    const cursorPosition = document.getElementById('mdeditor').selectionStart;

    const index = store.selectedIndex;

    if (index === null) {
      throw new Error('Could not find the selected section');
    }

    writeContent(cursorPosition, TemplateValue[quickTemplateChoice]);

    emit('selected-index', index);
  } catch (error) {
    alert('Looks like you have not selected a section yet!\nPlease select a section to add the template.');
  }
}

function addNewSection(sectionName: string):void {
  const newSection: Section = {
    selected: false,
    name: sectionName,
    id: store.newSectionId,
    content: `\n## ${sectionName}\n`,
  };

  store.incrementId();

  store.pushToAvailableSections(newSection);

  moveToUsed(newSection);
}
</script>

<style lang='scss' scoped>
@mixin sectionHeader() {
  .section-header {
    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
      "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
    font-size: 11px;
    margin-left: 30px;
  }
}

.dark-text {
  color: black;
}

.light-text {
  color: white;
}

.border-glow {
  border: 2px solid rgb(84, 181, 132);
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
