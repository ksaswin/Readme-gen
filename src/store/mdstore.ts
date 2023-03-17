import { defineStore } from 'pinia';

import { sections } from '@/defaults';
import type { Section } from '@/models/sections';


interface State {
  isLightModeEnabled: boolean,
  usedSections: Array<Section>,
  availableSections: Array<Section>,
  newSectionId: number
}

const INITIAL_NEW_SECTION_ID = sections[0].length + sections[1].length + 1;

export const useMdStore = defineStore('mdstore', {
  state: (): State => ({
    isLightModeEnabled: false,
    usedSections: sections[0],
    availableSections: sections[1],
    newSectionId: INITIAL_NEW_SECTION_ID
  }),

  actions: {
    toggleLightMode(): void {
      this.isLightModeEnabled = !this.isLightModeEnabled;
    },
    
    incrementId(): void {
      this.newSectionId++;
    },

    updateUsedSectionContent(index: number, updateContent: string=''): void {
      this.usedSections[index].content = updateContent;
    },

    addSectionToUsedSections(section: Section): void {
      this.removeSectionFromAvailableSections(section);

      section.selected = true;

      this.usedSections.push(section);
    },

    updateSelectedFlagInSection(index: number, flag: boolean): void {
      this.usedSections[index].selected = flag;
    },
    
    spliceUsedSection(index: number, deleteCount: number=1, item?: Section): void {
      if (item !== undefined) {
        this.usedSections.splice(index, deleteCount, item);
      } else {
        this.usedSections.splice(index, deleteCount);
      }
    },

    slicedUsedSectionContent(index: number, sliceStart: number, sliceEnd?: number): string {
      if (sliceEnd !== undefined) {
        return this.usedSections[index].content.slice(sliceStart, sliceEnd)
      } else {
        return this.usedSections[index].content.slice(sliceStart)
      }
    },

    removeSectionFromAvailableSections(section: Section): void {
      for (let i = 0; i < this.availableSections.length; i++) {
        if (section.id === this.availableSections[i].id) {
          this.availableSections.splice(i, 1);

          break;
        }
      }
    }
  },

  getters: {
    usedSectionsLength: (state) => {
      return state.usedSections.length;
    },
  }
});

