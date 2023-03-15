import { defineStore } from 'pinia';


interface State {
  isLightModeEnabled: boolean
}

export const useMdStore = defineStore('mdstore', {
  state: (): State => ({
    isLightModeEnabled: false,
  }),
  actions: {
    toggleLightMode(): void {
      this.isLightModeEnabled = !this.isLightModeEnabled;
    }
  }
});

