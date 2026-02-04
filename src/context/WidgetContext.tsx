import { createContext } from 'preact';
import { useContext } from 'preact/hooks';
import { TenantSearchConfig } from '../types/tenant-search-config';

interface WidgetContextValue {
  config: TenantSearchConfig;
}

export const WidgetContext = createContext<WidgetContextValue | null>(null);

export const useWidgetConfig = () => {
  const context = useContext(WidgetContext);
  if (!context) {
    throw new Error(
      'useWidgetConfig must be used within WidgetContext.Provider',
    );
  }
  return context.config;
};
