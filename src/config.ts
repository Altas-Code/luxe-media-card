import {
  MEDIA_PLAYER_SUPPORT_NEXT_TRACK,
  MEDIA_PLAYER_SUPPORT_PREVIOUS_TRACK
} from './media-player-support';

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

const VALID_HEIGHTS: LuxeMediaCardHeight[] = ['flat', 'compact', 'comfortable', 'tall'];

export const normalizeConfig = (config: LuxeMediaCardConfig): NormalizedLuxeMediaCardConfig => {
  if (!config?.entity || !config.entity.startsWith('media_player.')) {
    throw new Error('Luxe Media Card requires a media_player entity.');
  }

  const height = VALID_HEIGHTS.includes(config.height ?? 'compact')
    ? (config.height ?? 'compact')
    : 'compact';

  return {
    entity: config.entity,
    height,
    show_skip_controls: config.show_skip_controls ?? true
  };
};

export const shouldShowSkipControls = (
  showSkipControls: boolean,
  supportedFeatures: number
): boolean => {
  if (!showSkipControls) {
    return false;
  }

  const hasPrevious = (supportedFeatures & MEDIA_PLAYER_SUPPORT_PREVIOUS_TRACK) !== 0;
  const hasNext = (supportedFeatures & MEDIA_PLAYER_SUPPORT_NEXT_TRACK) !== 0;

  return hasPrevious || hasNext;
};
