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
    
    incrementId(incrementBy: number=1): void {
      this.newSectionId += incrementBy;
    }
  }
});

