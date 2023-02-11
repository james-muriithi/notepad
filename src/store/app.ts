// Utilities
import { defineStore } from 'pinia';

interface State {
  isNavigationDrawerPermanent: boolean
}

export const useAppStore = defineStore('app', {
  state: ():State => ({
    isNavigationDrawerPermanent: true
  }),
})
