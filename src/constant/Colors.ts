import {act} from 'react';
import {blue, red} from 'react-native-reanimated/lib/typescript/Colors';

const pallate = {
  white: '#ffffff',
  black: '#000000',
  deepRed: '#940000',
  red: '#ff0000',
  green: '#00ff00',
  yellow: '#ffff00',
  orange: '#ffa500',
  purple: '#800080',
  brown: '#a52a2a',
  gray: '#808080',
  lightGray: '#d3d3d3',
  darkGray: '#808080',
  blue: '#38419D',
  lightBlue: '#4d4dae',
  darkBlue: '#00008b',
  lighterBlue: '#add8e6',
  darkGeen: '#006400',
  transparent: 'transparent',
  lightPink: '#FAD4D4',
  salmon: '#ffb84d',
  pinksalmon: '#ffa07a',
  darkPink: '#ff69b4',
  lighterPink: '#FFF2F2',
  backgroundDark: '#17153B',
  backgroundLight: '#e7e5e8',
};
export const Colors = {
  ...pallate,
  backgroud: {
    dark: {
      main: pallate.backgroundDark,
    },
    light: {
      main: pallate.backgroundLight,
    },
  },

  textInput: {
    dark: {
      main: pallate.darkGray,
    },
    light: {
      main: pallate.lightGray,
    },
  },
  texts: {
    dark: {
      main: pallate.white,
      lightPink: pallate.lightPink,
      lighterPink: pallate.lighterPink,
      deepRed: pallate.deepRed,
      black: pallate.black,
      white: pallate.white,
      blue: pallate.blue,
      lightBlue: pallate.lightBlue,
      darkBlue: pallate.darkBlue,
      lighterBlue: pallate.lighterBlue,
      red: pallate.red,
      salmon: pallate.pinksalmon,
      darkGray: pallate.darkGray,
    },
    light: {
      red: pallate.red,
      main: pallate.black,
      lightPink: pallate.lightPink,
      lighterPink: pallate.lighterPink,
      deepRed: pallate.deepRed,
      black: pallate.black,
      white: pallate.white,
      blue: pallate.blue,
      lightBlue: pallate.lightBlue,
      darkBlue: pallate.darkBlue,
      lighterBlue: pallate.lighterBlue,
      salmon: pallate.pinksalmon,
      darkGray: pallate.darkGray,
    },
  },
  button: {
    dark: {
      primary: pallate.lighterBlue,
      secondary: pallate.blue,
      success: pallate.darkGeen,
      danger: pallate.red,
    },
    light: {
      primary: pallate.lighterBlue,
      secondary: pallate.blue,
      success: pallate.darkGeen,
      danger: pallate.red,
    },
  },
  separator: {
    dark: {
      main: pallate.white,
      gray: pallate.darkGray,
      lightGray: pallate.lightGray,
      darkGray: pallate.darkGray,
    },
    light: {
      main: pallate.black,
      gray: pallate.darkGray,
      lightGray: pallate.lightGray,
      darkGray: pallate.darkGray,
    },
  },
  tabIcons: {
    dark: {active: pallate.darkBlue, inactive: pallate.lightBlue},
    light: {active: pallate.backgroundLight, inactive: pallate.darkGray},
  },
};
