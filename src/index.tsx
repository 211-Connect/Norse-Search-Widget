import { render, h } from "preact";
import { SearchWidget } from "./search-widget";
import { SearchWidgetConfig } from "./types/search-widget-config";
import { TenantSearchConfig } from "./types/tenant-search-config";
import { WidgetContext } from "./context/WidgetContext";

import "./styles/theme.css";

class SearchWidgetIndex {
  private container: HTMLElement | null = null;
  private searchWidgetConfig: SearchWidgetConfig;
  private tenantSearchConfig: TenantSearchConfig;

  constructor(searchWidgetConfig: SearchWidgetConfig) {
    this.searchWidgetConfig = {
      locale: "en",
      ...searchWidgetConfig,
    };

    // todo: fetch tenant config from API
    // todo: loading state
    if (
      this.searchWidgetConfig.tenantId ===
      "06f86a2b-c060-4374-8aca-3d70b280cb24"
    ) {
      this.tenantSearchConfig = {
        primaryColor: "#005191",
        borderRadius: "6px",
        domain: "https://localhost:3000/va",
        texts: {
          title: "How can we help?",
          locationInputPlaceholder: "City, state, zip, etc...",
          noResultsFallbackText: "No results found.",
          queryInputPlaceholder: "Food, clothing, shelter, etc...",
        },
      };
    } else {
      this.tenantSearchConfig = {
        primaryColor: "#10b981",
        borderRadius: "2rem",
        domain: "https://localhost:3000",
        texts: {
          title: "How can we help?",
          locationInputPlaceholder: "City, zip, etc...",
          noResultsFallbackText: "No results found.",
          queryInputPlaceholder: "Food, clothing, etc...",
        },
      };
    }
  }

  mount(container: HTMLElement) {
    this.container = container;
    this.container.innerHTML = "";

    if (this.tenantSearchConfig.primaryColor) {
      this.container.style.setProperty(
        "--widget-primary",
        this.tenantSearchConfig.primaryColor,
      );
    }

    if (this.tenantSearchConfig.borderRadius) {
      this.container.style.setProperty(
        "--widget-radius",
        this.tenantSearchConfig.borderRadius,
      );
    }

    render(
      h(WidgetContext.Provider, {
        value: { config: this.tenantSearchConfig },
        children: h(SearchWidget, {
          tenantId: this.searchWidgetConfig.tenantId,
        }),
      }),
      this.container,
    );
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
      if (tenantId) {
        const widget = new SearchWidgetIndex({ tenantId });
        widget.mount(container);
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
