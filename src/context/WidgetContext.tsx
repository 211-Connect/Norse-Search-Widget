import { createContext } from "preact";
import { useContext } from "preact/hooks";
import { TenantSearchConfig } from "../types/tenant-search-config";

export type WidgetContextValue = {
  config: TenantSearchConfig;
  tenantId: string;
  domain: string;
  locale: string;
};

export const WidgetContext = createContext<WidgetContextValue | null>(null);

export const useWidgetConfig = (): TenantSearchConfig => {
  const context = useContext(WidgetContext);
  if (!context) {
    throw new Error(
      "useWidgetConfig must be used within WidgetContext.Provider",
    );
  }
  return context.config;
};
