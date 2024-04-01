import { e as exampleThemeStorage } from "./exampleThemeStorage.js";
import { a as addHmrIntoView } from "./_virtual_reload-on-update-in-view.js";
addHmrIntoView("pages/content/injected/toggleTheme");
async function toggleTheme() {
  console.log("initial theme!", await exampleThemeStorage.get());
  await exampleThemeStorage.toggle();
  console.log("toggled theme", await exampleThemeStorage.get());
}
void toggleTheme();
