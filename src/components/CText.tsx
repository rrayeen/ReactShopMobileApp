import {useMemo} from 'react';
import {StyleSheet, TextProps} from 'react-native';
import Animated from 'react-native-reanimated';
import {Colors} from '../constant/Colors';
import {useThemeInterpolation} from '../hooks/useThemeInterpolation';

type WeightKeys = keyof typeof weightStyles;
type StylesKeys = Exclude<keyof typeof styles, 'base'>;
export type TextSizes = StylesKeys | `${StylesKeys}_${WeightKeys}`;

export type TextColors = keyof (typeof Colors)['texts']['light'];

export interface CustomProps extends TextProps {
  size?: TextSizes;
  color?: TextColors;
  isCentred?: boolean;
  mb?: number;
  mt?: number;
  isActive?: boolean;
  flexed?: boolean;
}

export const CText = ({
  size = 'sm_medium',
  color = 'main',
  isCentred = false,
  mb = 0,
  mt = 0,
  isActive = false,
  flexed = false,

  ...textProps
}: CustomProps): JSX.Element => {
  const {animatedStyle} = useThemeInterpolation(
    Colors.texts.light[color],
    Colors.texts.dark[color],
    'color',
  );

  const weights = 'bold|medium|thin|light';
  const weightRegex = new RegExp(`(${weights})$`);
  const weightMatch = size.match(weightRegex)?.[1] as WeightKeys | undefined;
  const fontSize = (
    weightMatch ? size.replace(`_${weightMatch}`, '') : size
  ) as StylesKeys;

  const fontWeight = weightMatch ? weightStyles[weightMatch] : null;
  const generatedStyles = useMemo(
    () => [
      styles.base,
      styles[fontSize],
      fontWeight,
      animatedStyle,
      !!mb && {marginBottom: mb},
      !!mt && {marginTop: mt},
      flexed && positionStyles.flexed,
      isActive && activeStyles.black,
      isCentred && positionStyles.centered,
      textProps.style,
    ],
    [fontSize, fontWeight, isActive, isCentred, mb, mt, flexed, animatedStyle],
  );

  const content = textProps.children;
  return (
    <Animated.Text {...textProps} style={generatedStyles}>
      {content}
    </Animated.Text>
  );
};

const styles = StyleSheet.create({
  base: {fontFamily: 'c-Regular'},
  xs: {fontSize: 12},
  sm: {fontSize: 14},
  md: {fontSize: 16},
  lg: {fontSize: 18},
  xl: {fontSize: 20},
  xxl: {fontSize: 24},
  xxxl: {fontSize: 32},
});

const weightStyles = StyleSheet.create({
  bold: {fontFamily: 'c-Bold'},
  medium: {fontFamily: 'c-Medium'},
  thin: {fontFamily: 'c-Thin'},
  light: {fontFamily: 'c-Light'},
});

const positionStyles = StyleSheet.create({
  centered: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexed: {
    flex: 1,
  },
});

const activeStyles = StyleSheet.create({
  black: {
    color: Colors.red,
  },
});
