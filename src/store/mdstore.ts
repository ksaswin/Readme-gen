import { defineStore } from 'pinia';


interface State {
  isLightModeEnabled: boolean,
  newSectionId: number
}

export const useMdStore = defineStore('mdstore', {
  state: (): State => ({
    isLightModeEnabled: false,
    newSectionId: 0
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

