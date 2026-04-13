import { defineConfig } from "vitepress";
import { vitepressSlidevPreview } from "vitepress-slidev-preview";
import { vitepressPluginLegend } from "vitepress-plugin-legend";

export default defineConfig({
  title: "VitePress Slidev Plugins",
  description: "插件集合调试与文档站点",
  markdown: {
    config(md) {
      vitepressSlidevPreview(md);
      vitepressPluginLegend(md);
    }
  },
  themeConfig: {
    nav: [
      { text: "首页", link: "/" },
      { text: "Slidev 预览调试", link: "/slidev-preview" },
      { text: "Legend 调试", link: "/legend" }
    ],
    sidebar: [
      {
        text: "指南",
        items: [
          { text: "快速开始", link: "/" },
          { text: "Slidev 预览调试", link: "/slidev-preview" },
          { text: "Legend 调试", link: "/legend" }
        ]
      }
    ]
  }
});
