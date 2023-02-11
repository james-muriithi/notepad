// Utilities
import { defineStore } from 'pinia';
import { useDisplay } from "vuetify";
interface State {
  isNavigationDrawerPermanent: boolean
}

export const useAppStore = defineStore('app', {
  state: ():State => ({
    isNavigationDrawerPermanent: true
  }),
})
