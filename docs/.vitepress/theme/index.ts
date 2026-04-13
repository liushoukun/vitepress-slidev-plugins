import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import { initComponent } from "vitepress-plugin-legend/component";
import "vitepress-plugin-legend/dist/index.css";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    initComponent(app);
  }
} satisfies Theme;
