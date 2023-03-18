import { defineStore } from 'pinia';

import { usedSections, availableSections } from '@/models/defaults';
import type { Section, SpliceDeleteCountType } from '@/models/sections';


interface State {
  isLightModeEnabled: boolean,
  usedSections: Array<Section>,
  availableSections: Array<Section>,
  newSectionId: number
}

const INITIAL_NEW_SECTION_ID = usedSections.length + availableSections.length;

export const useMdStore = defineStore('mdstore', {
  state: (): State => ({
    isLightModeEnabled: false,
    usedSections: [ ...usedSections ],
    availableSections: [ ...availableSections ],
    newSectionId: INITIAL_NEW_SECTION_ID
  }),

  actions: {
    toggleLightMode(): void {
      this.isLightModeEnabled = !this.isLightModeEnabled;
    },
    
    incrementId(): void {
      this.newSectionId++;
    },

    updateUsedSectionContent(updateContent: string=''): void | undefined {
      const index = this.selectedIndex;

      if (index === null) {
        return;
      }

      this.usedSections[index].content = updateContent;
    },

    addSectionToUsedSections(section: Section): void {
      this.removeSectionFromAvailableSections(section);

      section.selected = true;

      this.usedSections.push(section);
    },

    updateSelectedFlagInSection(index: number, flag: boolean): void | undefined {
      if (index < 0 || index >= this.usedSectionsLength) {
        return;
      }

      this.usedSections[index].selected = flag;
    },

    updateAllSelectedFlagsInUsedSections(sectionId: number): void {
      this.usedSections.forEach((section: Section, index: number) => {
        if (sectionId === section.id) {
          this.updateSelectedFlagInSection(index, true);
        } else {
          this.updateSelectedFlagInSection(index, false);
        }
      });
    },
    
    spliceUsedSection(index: number, deleteCount: SpliceDeleteCountType, item?: Section): void {
      if (item !== undefined) {
        this.usedSections.splice(index, deleteCount, item);
      } else {
        this.usedSections.splice(index, deleteCount);
      }
    },

    slicedUsedSectionContent(sliceStart: number, sliceEnd?: number): string {
      const index = this.selectedIndex;

      if (index === null) {
        return '';
      }

      if (sliceEnd !== undefined) {
        return this.usedSections[index].content.slice(sliceStart, sliceEnd);
      } else {
        return this.usedSections[index].content.slice(sliceStart);
      }
    },

    sortAvailableSections(): void {
      this.availableSections.sort((a: Section, b: Section): number => {
        return a.name > b.name ? 1 : b.name > a.name ? -1 : 0;
      });
    },

    unshiftToAvailableSections(section: Section): void {
      this.availableSections.unshift(section);

      this.sortAvailableSections();
    },

    pushToAvailableSections(section: Section): void {
      this.availableSections.push(section);
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
    usedSectionsLength: (state: State): number => {
      return state.usedSections.length;
    },

    selectedIndex: (state: State): number | null => {
      const sectionIndex = state.usedSections.findIndex((section: Section): boolean => {
        return section.selected;
      });

      return sectionIndex >= 0 ? sectionIndex : null;
    },

    allContent: (state: State): string => {
      const previewText = state.usedSections.reduce((contentAccumulator: string, section: Section): string => {
        return contentAccumulator + section.content;
      }, '');

      return previewText;
    }
  }
});

