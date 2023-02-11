import { Themes } from "@/types/Theme";
import { useTheme } from "vuetify";

export const preferredTheme = (): string => {
  const storedTheme = localStorage.getItem('theme');
  const hasDarkPreference = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  if (storedTheme && storedTheme in Themes) return storedTheme;
  return hasDarkPreference ? 'dark' : 'light'
}

export const usePrefferedTheme = (): void => {
  useTheme().global.name.value = preferredTheme()
};