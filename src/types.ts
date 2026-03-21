export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, any>;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  callService: (domain: string, service: string, data?: Record<string, unknown>) => void;
  localize?: (key: string) => string;
}

declare global {
  interface Window {
    customCards?: Array<Record<string, unknown>>;
  }
}
