<template>
  <v-app-bar flat>
    <v-btn icon flat :size="40">
      <v-icon icon="mdi-square-edit-outline" />
    </v-btn>
    <template v-slot:append v-if="!smAndUp">
      <v-app-bar-nav-icon @click="isNavigationDrawerPermanent = !isNavigationDrawerPermanent" />
    </template>
    <v-spacer></v-spacer>
    <v-btn icon @click="changeTheme">
      <v-icon v-if="preferredTheme === 'light'">mdi-weather-night</v-icon>
      <v-icon v-else>mdi-weather-sunny</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useDisplay, useTheme } from "vuetify";
import { usePrefferedTheme } from "@/composables/usePrefferedTheme";
import { useAppStore } from "@/store/app";
import { storeToRefs } from "pinia";

// store
const store = useAppStore()

const preferredTheme = ref(usePrefferedTheme());
const vTheme = useTheme();
vTheme.global.name.value = preferredTheme.value;

const changeTheme = () => {
  const theme = preferredTheme.value === "dark" ? "light" : "dark";
  localStorage.setItem("theme", theme);
  preferredTheme.value = theme;

  vTheme.global.name.value = theme;
};


// show sidebar toggle
const { isNavigationDrawerPermanent } = storeToRefs(store);
const { smAndUp } = useDisplay();
</script>
