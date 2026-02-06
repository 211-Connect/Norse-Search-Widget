import { createContext } from "preact";
import { useContext } from "preact/hooks";
import { SearchCmsConfig } from "../types/search-cms-config";

export type ConfigContextValue = {
  cmsConfig: SearchCmsConfig;
  tenantId: string;
  domain: string;
  locale: string;
};

export const ConfigContext = createContext<ConfigContextValue | null>(null);

export const useCmsConfig = (): SearchCmsConfig => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error("useCmsConfig must be used within ConfigContext.Provider");
  }
  return context.cmsConfig;
};

export const useConfigContext = (): ConfigContextValue => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error(
      "useConfigContext must be used within ConfigContext.Provider",
    );
  }
  return context;
};
