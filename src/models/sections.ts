export const Directions = {
  up: -1,
  down: 1
};

export type DirectionsType = typeof Directions[keyof typeof Directions];

export const ToggleOrMoveSection = {
  toggle: 'TOGGLE',
  move: 'MOVE'
};

export type ToggleOrMoveSectionType = typeof ToggleOrMoveSection[keyof typeof ToggleOrMoveSection];

export const ContentViewModes = {
  preview: 'PREVIEW',
  raw: 'RAW'
};

export type ContentViewModesType = typeof ContentViewModes[keyof typeof ContentViewModes];

export interface Section {
  selected: boolean,
  id: number,
  name: string,
  content: string
}

