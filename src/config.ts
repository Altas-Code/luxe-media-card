export type LuxeMediaCardHeight = 'flat' | 'compact' | 'comfortable' | 'tall';

export interface LuxeMediaCardConfig {
  entity: string;
  height?: LuxeMediaCardHeight;
  show_skip_controls?: boolean;
}

export interface NormalizedLuxeMediaCardConfig {
  entity: string;
  height: LuxeMediaCardHeight;
  show_skip_controls: boolean;
}

export const normalizeConfig = (config: LuxeMediaCardConfig): NormalizedLuxeMediaCardConfig => {
  throw new Error('Not implemented');
};

export const shouldShowSkipControls = (
  showSkipControls: boolean,
  supportedFeatures: number
): boolean => {
  throw new Error('Not implemented');
};
