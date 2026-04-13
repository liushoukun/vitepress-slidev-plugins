import { detectFeatures, parseSync } from "@slidev/parser";

export interface VitepressSlidevPreviewOptions {
  /**
   * slidev 代码块渲染时附加的 class。
   */
  previewClass?: string;
  /**
   * 用于解析 Slidev 内容的虚拟文件路径。
   */
  virtualFilepath?: string;
}

/**
 * 在 VitePress 中启用 Slidev 风格代码块预览基础能力。
 */
export function vitepressSlidevPreview(
  md: {
    renderer: {
      rules: Record<string, ((...args: any[]) => string) | undefined>;
    };
    utils: {
      escapeHtml: (input: string) => string;
      unescapeAll: (input: string) => string;
    };
  },
  options: VitepressSlidevPreviewOptions = {}
): void {
  const {
    previewClass = "vp-slidev-preview",
    virtualFilepath = "inline-slidev.md"
  } = options;
  const rawFence = md.renderer.rules.fence;

  md.renderer.rules.fence = (tokens, idx, opts, env, self) => {
    const token = tokens[idx];
    const lang = token.info.trim().split(/\s+/)[0];

    if (lang === "slidev") {
      const slidev = parseSync(token.content, virtualFilepath);
      const features = detectFeatures(token.content);
      const escaped = md.utils.escapeHtml(md.utils.unescapeAll(token.content));
      const featureFlags = Object.entries(features)
        .filter(([, enabled]) => Boolean(enabled))
        .map(([key]) => key)
        .join(",");

      return `<div class="${previewClass}" data-slide-count="${slidev.slides.length}" data-feature-flags="${featureFlags}"><pre><code class="language-slidev">${escaped}</code></pre></div>`;
    }

    return rawFence ? rawFence(tokens, idx, opts, env, self) : self.renderToken(tokens, idx, opts);
  };
}
