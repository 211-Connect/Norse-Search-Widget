import { render, h } from "preact";
import { SearchWidget } from "./search-widget";
import { SearchWidgetConfig } from "./types/search-widget-config";
import { SearchCmsConfig } from "./types/search-cms-config";
import { ConfigContext } from "./context/config-context";
import { fetchSearchCmsConfig } from "./services/fetch-search-cms-config";

import "./styles/theme.css";

class SearchWidgetIndex {
  private container: HTMLElement | null = null;
  private searchCmsConfig: SearchCmsConfig | null = null;

  constructor(private readonly searchWidgetConfig: SearchWidgetConfig) {}

  private showLoadingSpinner() {
    if (!this.container) {
      return console.warn("Container is not set.");
    }

    this.container.innerHTML = `
      <div style="display: flex; justify-content: center; align-items: center; height: 124px;">
        <div style="
          width: 40px;
          height: 40px;
          border: 4px solid #e5e7eb;
          border-top-color: #9ca3af;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        "></div>
      </div>
      <style>
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      </style>
    `;
  }

  async mount(container: HTMLElement) {
    this.container = container;
    this.container.innerHTML = "";

    try {
      if (!this.searchCmsConfig) {
        this.showLoadingSpinner();
        const searchCmsConfig = await fetchSearchCmsConfig(
          this.searchWidgetConfig,
        );
        this.searchCmsConfig = searchCmsConfig;
      }

      this.container.innerHTML = "";

      if (!this.searchCmsConfig) {
        throw new Error("Tenant search config is not available");
      }

      if (this.searchCmsConfig.primaryColor) {
        this.container.style.setProperty(
          "--widget-primary",
          this.searchCmsConfig.primaryColor,
        );
      }

      if (this.searchCmsConfig.borderRadius) {
        this.container.style.setProperty(
          "--widget-radius",
          this.searchCmsConfig.borderRadius,
        );
      }

      render(
        h(ConfigContext.Provider, {
          value: {
            cmsConfig: this.searchCmsConfig,
            tenantId: this.searchWidgetConfig.tenantId,
            domain: this.searchWidgetConfig.domain,
            locale: this.searchWidgetConfig.locale,
          },
          children: h(SearchWidget, {}),
        }),
        this.container,
      );
    } catch (err) {
      // Show error state
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      this.container.innerHTML = `<div style="padding: 1rem; text-align: center; color: red;">Failed to load widget: ${errorMessage}</div>`;
    }
  }

  unmount() {
    if (this.container) {
      this.container.innerHTML = "";
    }
    this.container = null;
  }
}

// Auto-initialize widget on DOM ready
if (typeof window !== "undefined") {
  const initWidget = () => {
    const container = document.getElementById("search-widget");
    if (container) {
      const tenantId = container.getAttribute("tid");
      const domain = container.getAttribute("d");
      const locale = container.getAttribute("l") || "en";

      if (tenantId && domain) {
        const widget = new SearchWidgetIndex({ tenantId, domain, locale });
        widget.mount(container);
      } else {
        console.error(
          "Search widget requires both 'tid' (tenant ID) and 'd' (domain) attributes",
        );
      }
    }
  };

  // Run on DOMContentLoaded or immediately if DOM is already ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initWidget);
  } else {
    initWidget();
  }
}

export default SearchWidgetIndex;
